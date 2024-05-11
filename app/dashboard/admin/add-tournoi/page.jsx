'use client'

import { useState, useEffect, Suspense } from "react"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import Image from "next/image"
import Link from "next/link"
import DatePicker from "@components/DatePicker"
import HourPicker from "@components/HourPicker"

const AddTournoi = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const [tournoiSize, setTournoiSize] = useState("");

    const [isOpenPlayer, setIsOpenPlayer] = useState(false);
    const [teamSize, setTeamSize] = useState("");

    const [jeux, setJeux] = useState([])
    const [gameSelected, setGameSelected] = useState("")
    const [erreur, setErreur] = useState('')
    const [message, setMessage] = useState('')

    const [selectedDate, setSelectedDate] = useState();
    const [selectedHour, setSelectedHour] = useState("");



    /////////////////// RECUPERATION DES JEUX
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/jeux')
                const data = await response.json();
                setJeux(data);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

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
        console.log(date)
    };

    /////////////////// SELECTION DE LA HOUR
    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
    };

    // ajout de id de jeux
    const addGame = (gameId) => {
        setGameSelected(gameId);
    }

    /////////////////// ENVOIE DU FORMULAIRE
    const handleSubmitCreateTournoi = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        const nom = e.target.nom.value
        const mode = e.target.mode.value
        const recompense = e.target.recompense.value
        const description = e.target.description.value

        const bodyRequest = {
            nom,
            selectedHour,
            selectedDate,
            gameSelected,
            tournoiSize,
            teamSize,
            mode,
            recompense,
            description,
        }

        console.log(bodyRequest)

        try {
            console.log(bodyRequest.selectedDate)
            if (!bodyRequest.nom) return setErreur('Vous devez un nom pour le tournoi.')
            if (!bodyRequest.selectedHour) return setErreur('Vous devez choisir une heure.')
            if (!bodyRequest.selectedDate) return setErreur('Vous devez choisir une date.')
            if (!bodyRequest.tournoiSize) return setErreur('Vous devez choisir une quantité de team maximal.')
            if (!bodyRequest.teamSize) return setErreur('Vous devez choisir une quantité de joueurs par équipe maximal.')
            if (!bodyRequest.gameSelected) return setErreur('Vous devez choisir un jeu.')

            const response = await fetch('/api/admin/add-tournoi', {
                method: 'POST',
                body: JSON.stringify(bodyRequest)
            })
            const data = await response.json()
            console.log(data)
            console.log(response)

            if (response.ok) {
                setMessage('Tournoi créer avec succès.')
                router.push(`/dashboard/tournois/${data.newTournoi._id}`)
            } else {
                setErreur('Une erreur est survenue lors de la création du tournoi.')
            }
        } catch (error) {
            console.log(error)
            setErreur('Une erreur est survenue lors de l\'envoie du formulaire.')
        }
    }

    return (
        <main className="grow">
            <h1 className='text-center text-xl uppercase py-8'>Ajouter un tournoi</h1>
            <form
                onSubmit={handleSubmitCreateTournoi}
                className="max-w-[800px] mx-auto p-4 flex items-center justify-center flex-wrap bg-fond-3 rounded-md shadow-2xl"
            >
                <input
                    type="text"
                    name="nom"
                    id="nom"
                    placeholder="Nom du tournoi"
                    className="grow basis-full p-3 rounded-md bg-transparent shadow-2xl block m-2 focus:outline-sky-600 duration-200 outline outline-1 outline-gray-400"
                />
                <div className="basis-[350px] m-2">
                    <DatePicker onDateSelect={handleDateSelect} />
                </div>
                <div className="grow basis-[350px] m-2">
                    <HourPicker onHeureSelect={handleHourSelect} />
                </div>
                <div className="grid grid-cols-3 gap-3 p-2">
                    <Suspense>
                        {jeux?.map((j) =>
                            <Image
                                onClick={() => addGame(j._id)}
                                key={j._id}
                                alt={j.nom}
                                src={j.image}
                                width={180}
                                height={80}
                                className={`w-auto rounded-md shadow-xl duration-200 hover:shadow-2xl hover:scale-105 ${gameSelected.includes(j._id) ? 'outline outline-2 outline-offset-2 outline-green-700' : 'outline outline-2 outline-offset-2 outline-transparent'}`}
                            />
                        )}
                    </Suspense>
                </div>
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
                    placeholder="Mode de jeu"
                    className="grow basis-[350px] p-3 rounded-md bg-transparent shadow-2xl block m-2 focus:outline-sky-600 duration-200 outline outline-1 outline-gray-400"
                />
                <input
                    type="text"
                    name="recompense"
                    id="recompense"
                    placeholder="Récompense du tournoi."
                    className="grow basis-[350px] p-3 rounded-md bg-transparent shadow-2xl block m-2 focus:outline-sky-600 duration-200 outline outline-1 outline-gray-400"
                />
                <textarea
                    name="description"
                    id="description"
                    placeholder="Description du tournoi."
                    className="p-3 rounded-md shadow-xl bg-transparent outline outline-1 outline-white focus:outline-sky-600 duration-200 basis-full grow m-2 my-5"
                ></textarea>
                <button type="submit" className="grow m-2 hover:bg-sky-500 duration-200 bg-black p-3 rounded-md shadow-2xl uppercase">Créer un tournoi</button>
                {erreur &&
            <p className="text-center grow basis-full text-red-500 py-4">{erreur}</p>
            }
            </form>
        </main>

    )
}

export default AddTournoi