'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion";
import { PuffLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateTeam = () => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [message, setMessage] = useState('Créer une équipe')
    const [erreur, setErreur] = useState('')
    const [charged, setCharged] = useState(false)

    const [jeux, setJeux] = useState([])
    const [teamSize, setTeamSize] = useState("");  // Aucune taille sélectionnée par défaut
    const [gameSelected, setGameSelected] = useState([]);
    const [pseudos, setPseudos] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const { data: session, update } = useSession()

    // récupération de tous nos jeux
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/jeux')
                const data = await response.json();
                setJeux(data);
                setCharged(true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    // ajout de id de jeux dans l'array
    const addGame = (gameId) => {
        if (gameSelected.includes(gameId)) {
            setGameSelected(gameSelected.filter(id => id !== gameId));
        } else {
            setGameSelected([...gameSelected, gameId]);
        }
    }

    // ouverture du menue déroulant pour le nombre maximum de joueur
    const toggleDropdown = () => setIsOpen(!isOpen);

    // séléction du nombre de joueur max dans l'équipe
    const selectTeamSize = (size) => {
        setTeamSize(size);
        setIsOpen(false);
    };

    // envoie du formulaire
    const handleSubmitTeam = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setMessage('Création d\'une équipe en cours ...')

        const nom = e.target.nom.value
        const mdp = e.target.mdp.value
        const mdpv = e.target.mdpv.value

        try {
            const bodyRequest = { nom, teamSize }
            if (gameSelected.some((gameId) => pseudos[gameId] === undefined)) {
                // Si au moins un jeu n'a pas de pseudo défini, affiche une erreur
                return setErreur('Le pseudo pour chaque jeu sélectionné est requis.');
            } else {
                // Si tous les jeux ont un pseudo défini, continue avec la création de la demande de corps
                bodyRequest.jeux = gameSelected.map((gameId) => ({
                    jeu_id: gameId,
                    players: {
                        user_id: session?.user._id,
                        chef: true,
                        jeu_pseudo: pseudos[gameId]
                    }
                }));
            }

            if (mdp && mdpv && mdp == mdpv) {
                bodyRequest.mdp = mdp
            } else if (mdp && mdpv && mdp != mdpv) {
                return setErreur('Mot de passe de confirmation différent.')
            }
            if (bodyRequest.jeux.length < 1) return setErreur('Sélectionnez au moin un jeu.')

            if (!teamSize) return setErreur('Sélectionnez la taille maximale de votre équipe.')
            const response = await fetch('/api/add-team', {
                method: 'POST',
                body: JSON.stringify(bodyRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log('datas : ', data._id)
            if (data.erreur) { setErreur(data.erreur); setMessage('Créer une équipe') }
            if (response.ok) {
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        in_team: data._id
                    }
                });
                console.log(session?.user)
                setErreur('')
                setMessage('Équipe créer avec succès.')
                return router.push(`/dashboard/teams/${data._id}`)
            }

        } catch (error) {
            console.log('une erreur est survenue', error)
        }
    }

    return (
        <form className='grow' onSubmit={handleSubmitTeam}>
            <h1 className='text-center uppercase text-xl py-8'>Créer une équipe</h1>
            <div
                className='bg-fond-3 p-4 rounded-md flex items-center flex-wrap justify-center'
            >
                <input
                    className="p-3 bg-transparent rounded-md shadow-xl focus:shadow-2xl grow basis-full m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
                    type="text"
                    name="nom"
                    id="nom"
                    placeholder="Nom de l'équipe"
                    required
                />
                <section className="my-12">
                    <p className="mr-auto ml-3 uppercase">Jeux jouer par votr équipe</p>
                    {charged ? (
                        <div className="basis-full flex-wrap flex items-center justify-center">
                            {jeux?.map((jeu) => (
                                <Image
                                    onClick={() => addGame(jeu._id)}
                                    key={jeu._id}
                                    src={jeu.image}
                                    alt={jeu.nom}
                                    width={110}
                                    height={50}
                                    className={`m-2 w-auto rounded-md shadow-xl duration-200 hover:shadow-2xl hover:scale-110 ${gameSelected.includes(jeu._id) ? 'outline outline-2 outline-offset-2 outline-green-700' : 'outline outline-2 outline-offset-2 outline-transparent'}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mx-auto w-fit my-12">
                            <p className="mb-6 text-center">Chargement des jeux en cours ...</p>
                            <PuffLoader
                                cssOverride={{ display: 'block', margin: 'auto' }}
                                color={"#123abc"}
                                loading={true}
                                size={150}
                                speedMultiplier={2}
                            />
                        </div>
                    )}

                    <div className="basis-full grow flex flex-wrap items-center justify-center">
                        {gameSelected?.map((gameId) => {
                            const selectedGame = jeux.find((jeu) => jeu._id === gameId);
                            return (
                                <input
                                    required
                                    key={gameId}
                                    type="text"
                                    name={`pseudo-${selectedGame.nom}`}
                                    id={`pseudo-${selectedGame.nom}`}
                                    onChange={(e) => setPseudos({ ...pseudos, [gameId]: e.target.value })}
                                    placeholder={`Pseudo ${selectedGame.nom}`}
                                    className="p-3 bg-transparent rounded-md shadow-xl focus:shadow-2xl grow basis-[300px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
                                />
                            );
                        })}
                    </div>
                </section>
                <section className="relative basis-full grow">
                    <div onClick={toggleDropdown} className="p-3 rounded-md shadow-xl focus:shadow-2xl m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100 cursor-pointer">
                        <div className="flex justify-between items-center">
                            {teamSize ? 'Nombre de joueurs maximum ' + teamSize : "Choisir la taille maximale de votre équipe"}
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-3 rounded-md absolute left-[6px] top-full right-[6px] bg-white text-black shadow-2xl z-10"
                                >
                                    {[3, 4, 5, 6, 7].map(size => (
                                        <motion.li
                                            key={size}
                                            className="p-2 hover:bg-sky-200 duration-200 rounded-md"
                                            onClick={() => selectTeamSize(size)}
                                        >
                                            {size}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
                <i className="grow text-center basis-full p-3">Si vous ne mettez pas de mot de passe votre équipe pourra être ouvert à tous.</i>
                <input
                    type="password"
                    name="mdp"
                    id="mdp"
                    placeholder='Mot de passe'
                    className="p-3 bg-transparent rounded-md shadow-xl focus:shadow-2xl grow basis-[250px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
                />
                <input
                    type="password"
                    name="mdpv"
                    id="mdpv"
                    placeholder='Confirmation mot de passe'
                    className="p-3 bg-transparent rounded-md shadow-xl focus:shadow-2xl grow basis-[250px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
                />
                <button type="submit" className={submitting ? "grow basis-full p-4 bg-green-600 cursor-default uppercase rounded-md text-white m-2 shadow-2xl mt-6" : "grow basis-full p-4 bg-black rounded-md text-white m-2 shadow-2xl mt-6 duration-200 hover:bg-sky-500 uppercase"}>
                    {message}
                </button>
                {erreur &&
                    <p className="text-red-600 message text-center p-3">{erreur}</p>
                }
                {message == 'Équipe créer avec succès.' &&
                    <p className="text-green-600 message text-center p-3">{message}</p>
                }
            </div>
        </form>
    )
}

export default CreateTeam