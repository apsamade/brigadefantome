'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion";

const CreateTeam = () => {
    const [jeux, setJeux] = useState([])
    const [teamSize, setTeamSize] = useState("");  // Aucune taille sélectionnée par défaut
    const [isOpen, setIsOpen] = useState(false);
    const [gameSelected, setGameSelected] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/jeux')
                const data = await response.json();
                setJeux(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const addGame = (gameId) => {
        if (gameSelected.includes(gameId)) {
            setGameSelected(gameSelected.filter(id => id !== gameId));
        } else {
            setGameSelected([...gameSelected, gameId]);
        }
    }

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectTeamSize = (size) => {
        setTeamSize(size);
        setIsOpen(false);
    };

    return (
        <form className='grow'>
            <h1 className='text-center uppercase text-xl py-8'>Créer une équipe</h1>
            <div
                className='bg-white text-black p-4 rounded-md flex items-center flex-wrap justify-center'
            >
                <input
                    className="p-3 rounded-md shadow-xl focus:shadow-2xl grow basis-full m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
                    type="text"
                    name="nom"
                    id="nom"
                    placeholder="Nom de l'équipe"
                    required
                />
                <section className="my-12">
                    <p className="mr-auto ml-3 uppercase">Jeux jouer par votr équipe</p>
                    <div className="basis-full flex items-center justify-center">
                        {jeux.map((jeu) => (
                            <Image
                                onClick={() => addGame(jeu._id)}
                                key={jeu._id}
                                src={jeu.image}
                                alt={jeu.nom}
                                width={110}
                                height={50}
                                className={`m-2 rounded-md shadow-xl duration-200 hover:shadow-2xl hover:scale-110 ${gameSelected.includes(jeu._id) ? 'outline outline-2 outline-offset-2 outline-green-700' : 'outline outline-2 outline-offset-2 outline-transparent'}`}
                            />
                        ))}
                    </div>
                    <div className="basis-full grow flex flex-wrap items-center justify-center">
                        {gameSelected.map((gameId) => {
                            const selectedGame = jeux.find((jeu) => jeu._id === gameId);
                            return (
                                <input
                                    key={gameId}
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    placeholder={`Pseudo ${selectedGame.nom}`}
                                    className="p-3 rounded-md shadow-xl focus:shadow-2xl grow basis-[300px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
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
                                    className="p-3 rounded-md absolute left-0 top-full right-0 w-full bg-white shadow-2xl z-10"
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
                    className="p-3 rounded-md shadow-xl focus:shadow-2xl grow basis-[250px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
                />
                <input
                    type="password"
                    name="mdpv"
                    id="mdpv"
                    placeholder='Confirmation mot de passe'
                    className="p-3 rounded-md shadow-xl focus:shadow-2xl grow basis-[250px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
                />
                <button type="submit" className="grow basis-full p-4 bg-black rounded-md text-white m-2 shadow-2xl mt-6 duration-200 hover:bg-sky-500 uppercase">Créer mon équipe</button>
            </div>
        </form>
    )
}

export default CreateTeam