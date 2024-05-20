'use client'

import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PuffLoader from "react-spinners/PuffLoader"
import Image from "next/image";

import DatePicker from "@components/DatePicker"
import HourPicker from "@components/HourPicker"

const ModifierTournoi = ({ params }) => {
  const [tournoi, setTournoi] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [chargedTournoi, setChargedTournoi] = useState(false)
  const [chargedJeu, setChargedJeu] = useState(false)


  const [isOpen, setIsOpen] = useState(false);
  const [tournoiSize, setTournoiSize] = useState("");

  const [isOpenPlayer, setIsOpenPlayer] = useState(false);
  const [teamSize, setTeamSize] = useState("");

  const [gameSelected, setGameSelected] = useState("")
  const [jeux, setJeux] = useState([])
  const [erreur, setErreur] = useState('')
  const [message, setMessage] = useState('Modifier')

  const [selectedDate, setSelectedDate] = useState();
  const [selectedHour, setSelectedHour] = useState("");


  /////////////////// RECUPERATION DU TOURNOI
  useEffect(() => {
    const fetchTournoi = async () => {
      const response = await fetch(`/api/admin/tournois/${params.id}`);
      const data = await response.json();
      setTournoi(data);
      const formattedDate = new Date(data.date).toLocaleDateString('fr-FR').slice(0, 10)
      setSelectedDate(formattedDate)
      setSelectedHour(data.heure)
      setTournoiSize(data.max_teams)
      setGameSelected(data.jeu._id);
      setChargedTournoi(true)
      console.log('datas : ', data)
      console.log('datas : ', formattedDate)
    };
    fetchTournoi();
  }, [params.id]);

  /////////////////// RECUPERATION DES JEUX
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/jeux')
        const data = await response.json();
        setJeux(data);
        setChargedJeu(true)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setTournoi(prev => ({ ...prev, [name]: checked }));
    } else {
      setTournoi(prev => ({ ...prev, [name]: value }));
    }

  };

  /////////////////// SELECTION DU NOMBRE D'EQUIPE
  // ouverture du menue déroulant pour le nombre maximum de joueur
  const toggleDropdown = () => setIsOpen(!isOpen);

  // séléction du nombre de joueur max dans l'équipe
  const selectTournoiSize = (size) => {
    setTournoiSize(size);
    setIsOpen(false);
  };

  /////////////////// SELECTION DU NOMBRE DE JOUEURS PAR ÉQUIPE
  // ouverture du menue déroulant pour le nombre maximum de joueur
  const toggleDropdownPlayer = () => setIsOpenPlayer(!isOpenPlayer);

  // séléction du nombre de joueur max dans l'équipe
  const selectTeamSize = (size) => {
    setTeamSize(size);
    setIsOpenPlayer(false);
  };

  /////////////////// SELECTION DE LA DATE
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  /////////////////// SELECTION DE LA HOUR
  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
  };

  // ajout de id de jeux
  const addGame = (gameId) => {
    setGameSelected(gameId);
  }

  const handleSubmitModifierTournoi = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setChargedTournoi(false)

    const nom = tournoi.nom
    const mode = tournoi.mode
    const description = tournoi.description
    const recompense = tournoi.recompense
    const fin_inscription = tournoi.fin_inscription

    const requestBody = {
      gameSelected,
      tournoiSize,
      teamSize,
      selectedDate,
      selectedHour,
      nom,
      mode,
      recompense,
      fin_inscription,
      description
    }

    try {
      if (!requestBody.gameSelected) return setErreur('Vous devez choisir un jeu.')

      const response = await fetch(`/api/admin/tournois/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody)
      })
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setTournoi(data)
        setSubmitting(false)
        setChargedTournoi(true)
      } else {
        setErreur('Une erreur est survenue lors de la modification du tournoi')
        setSubmitting(false)
        setChargedTournoi(true)
      }


    } catch (error) {
      console.log(error)
      setChargedTournoi(true)
      setErreur('Une erreure est survenue lors de l\'envoie du formulaire.')
    }
    console.log(requestBody)
  }

  if (tournoi.erreur) {
    return (
      <section className="grow">
        <p className="mx-auto text-center uppercase text-xl pt-32">Aucun tournoi trouvé sur cette route mon frérot !</p>
        <Image
          src="/assets/elements/tk-404.gif"
          alt="oupsi 404 not found"
          width={700}
          height={500}
          className='object-contain mx-auto block rounded-lg mt-24'
        />
      </section>
    );
  }
  return (
    <section className="grow">
      {chargedTournoi ?
        (
          <form onSubmit={handleSubmitModifierTournoi}>
            <Image
              src={tournoi?.jeu?.image}
              alt={tournoi?.jeu?.nom}
              width={800}
              height={800}
              className="rounded-md object-contain xl:object-cover xl:h-[100%]"
            />
            <div className="p-4 bg-fond-3 rounded-md my-5 flex items-center justify-center flex-wrap">
              <input
                type="text"
                name="nom"
                id="nom"
                value={tournoi.nom}
                onChange={handleInputChange}
                className="grow bg-transparent basis-[300px] p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
              />
              <div className="basis-[350px] m-2">
                <DatePicker onDateSelect={handleDateSelect} value={new Date(selectedDate).toLocaleDateString('fr-FR').slice(0, 10)} />
              </div>
              <div className="grow basis-[350px] m-2">
                <HourPicker onHeureSelect={handleHourSelect} value={tournoi.heure} />
              </div>
              {chargedJeu ? (
                <div className="grid grid-cols-3 gap-3 p-2">
                  <Suspense>
                    {jeux?.map((j) =>
                      <Image
                        onClick={() => addGame(j._id)}
                        key={j._id}
                        alt={j.nom}
                        src={j.image}
                        width={200}
                        height={80}
                        className={`w-auto rounded-md shadow-xl duration-200 hover:shadow-2xl hover:scale-105 ${gameSelected.includes(j._id) ? 'outline outline-2 outline-offset-2 outline-green-700' : 'outline outline-2 outline-offset-2 outline-transparent'}`}
                      />
                    )}
                  </Suspense>
                </div>
              ) : (
                <div className="mx-auto w-fit my-12">
                  <PuffLoader
                    cssOverride={{ display: 'block', margin: 'auto' }}
                    color={"#123abc"}
                    loading={true}
                    size={150}
                    speedMultiplier={2}
                  />
                </div>
              )}

              <section className="relative basis-full grow p-2">
                <div onClick={toggleDropdown} className="p-3 rounded-md shadow-xl focus:shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100 cursor-pointer">
                  <div className="flex justify-between items-center">
                    {tournoiSize ? 'Nombre d\'équipe maximum ' + tournoiSize : "Choisir la taille maximale du tournoi"}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-3 grid grid-cols-12 gap-2 rounded-md absolute left-[6px] top-full right-[6px] bg-white text-black shadow-2xl z-10"
                      >
                        {Array.from({ length: 63 }, (_, index) => index + 2).map(size => (
                          <motion.span
                            key={size}
                            className="p-2 outline outline-1 outline-sky-200 flex items-center justify-center hover:bg-sky-200 duration-200 rounded-md"
                            onClick={() => selectTournoiSize(size)}
                          >
                            {size}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
              <section className="relative basis-full grow p-2">
                <div onClick={toggleDropdownPlayer} className="p-3 rounded-md shadow-xl focus:shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100 cursor-pointer">
                  <div className="flex justify-between items-center">
                    {teamSize ? 'Nombre de joueurs par équipe maximum ' + teamSize : "Choisir la taille maximale de joueurs par équipe"}
                  </div>
                  <AnimatePresence>
                    {isOpenPlayer && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-3 grid grid-cols-12 gap-2 rounded-md absolute left-[6px] top-full right-[6px] bg-white text-black shadow-2xl z-[5]"
                      >
                        {Array.from({ length: 7 }, (_, index) => index + 1).map(size => (
                          <motion.span
                            key={size}
                            className="p-2 outline outline-1 outline-sky-200 flex items-center justify-center hover:bg-sky-200 duration-200 rounded-md"
                            onClick={() => selectTeamSize(size)}
                          >
                            {size}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
              <input
                type="text"
                name="mode"
                id="mode"
                value={tournoi.mode}
                onChange={handleInputChange}
                className="grow bg-transparent basis-[300px] p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
              />
              <input
                type="text"
                name="recompense"
                id="recompense"
                value={tournoi.recompense}
                onChange={handleInputChange}
                className="grow bg-transparent basis-[300px] p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
              />
              <div className="flex items-center justify-left grow basis-[200px] p-3 m-2">
                <label htmlFor="fin_inscription" className="shadow-2xl py-2 rounded-md outline outline-1 duration-200 hover:outline-blue-500 outline-transparent">Fin d'inscription</label>
                <input
                  type="checkbox"
                  name="fin_inscription"
                  id="fin_inscription"
                  className="w-[25px] h-[25px] ml-3"
                  checked={tournoi.fin_inscription}
                  onChange={handleInputChange}
                />
              </div>
              <textarea
                name="description"
                id="description"
                className="grow bg-transparent basis-full p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
                value={tournoi.description}
                onChange={handleInputChange}
              />
              <button className={`p-4 my-2 w-[95%] ${submitting ? 'bg-green-600 cursor-default' : 'bg-sky-500 hover:bg-blue-700'}  text-white rounded-md uppercase text-md hover:w-full m-2 shadow-2xl duration-200 font-light`} type="submit">{message}</button>
            </div>
            {erreur &&
              <p className="text-center py-4 text-red-600">{erreur}</p>
            }
          </form>
        ) : (
          <div className="mx-auto w-fit my-12">
            <PuffLoader
              cssOverride={{ display: 'block', margin: 'auto' }}
              color={"#123abc"}
              loading={true}
              size={150}
              speedMultiplier={2}
            />
          </div>
        )
      }
    </section>
  );
}

export default ModifierTournoi;
