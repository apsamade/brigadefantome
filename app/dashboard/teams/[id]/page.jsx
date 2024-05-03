'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"


const ThisTeam = ({ params }) => {
    const { data: session, status } = useSession()
    const [erreur, setErreur] = useState('')
    const [gameSelected, setGameSelected] = useState([]);
    const [pseudos, setPseudos] = useState({});
    const [team, setTeam] = useState({})
    const [openFormJoinTeam, setOpenFormJoinTeam] = useState(false)
    const [submitting, setSubmitting] = useState(false)



    // jeu sélectionné
    const addGame = (gameId) => {
        if (gameSelected.includes(gameId)) {
            setGameSelected(gameSelected.filter(id => id !== gameId));
        } else {
            setGameSelected([...gameSelected, gameId]);
        }
        console.log(gameSelected)
    }

    // recupération de l'équipe en question
    useEffect(() => {
        const fetchTeam = async () => {
            const response = await fetch(`/api/teams/${params.id}`, {
                method: 'GET'
            })
            const data = await response.json()
            setTeam(data)
        }
        fetchTeam()
    }, [params.id])

    // rejoindre une équipe 
    const openJoinTeam = () => setOpenFormJoinTeam(!openFormJoinTeam);

    return (
        <main className="grow">
            <section className="p-4 rounded-md bg-fond-2 shadow-2xl">
                <div>
                    <h1 className="py-3 text-center mx-auto text-3xl">{team.nom}</h1>
                    <div className="my-12">
                        <p className="text-xl uppercase">Les jeux jouer :</p>
                        <div className="flex items-center justify-center flex-wrap">
                            {team.jeux?.map(j =>
                                <Link
                                    key={j.jeu_id._id}
                                    href={`/dashboard/jeux/${j.jeu_id._id}`}
                                >
                                    <Image
                                        alt={j.jeu_id.nom}
                                        src={j.jeu_id.image}
                                        width={200}
                                        height={200}
                                        className="rounded-md shadow-2xl m-3 hover:scale-110 duration-200"
                                    />
                                </Link>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="text-xl uppercase">Les joueurs :</p>
                        <div className="flex items-center justify-center flex-col">
                            {team?.all_players?.map(ap =>
                                <span className={`${ap.chef ? 'text-orange-500' : 'text-white'}`} key={ap.user_id._id}>{ap.user_id.pseudo} #{ap.user_id.hashtag}</span>
                            )}
                        </div>
                    </div>
                </div>
                {/* si l'user n'est pas de l'équipe, lui proposer les fonctionnalité pour rejoindre l'équipe */}
                {/* si l'user est dans l'équipe lui proposer les fonctionnalité de modification à la limite du simple équipier */}
                {/* si l'user est admin lui proposer toute les fonction admin de l'équipe */}
                {!session?.user.in_team &&
                    <section>
                        <button
                            onClick={openJoinTeam}
                            className={`my-6 rounded-md shadow-2xl uppercase block w-full p-3 bg-black text-white hover:text-white ${openFormJoinTeam ? 'hover:bg-red-600' : 'hover:bg-green-600'}  duration-200`}
                            type="button"
                        >
                            {openFormJoinTeam ? ('Fermer'): ('Rejoindre')}
                        </button>
                        {openFormJoinTeam &&
                            <form className="flex rounded-md outline outline-gray-700 outline-1 p-4 items-center flex-wrap justify-center">
                                
                                <div className="grow basis-full flex p-4 items-center justify-center flex-wrap">
                                    <h3 className="uppercase text-2xl basis-full grow text-center my-3">Rejoindre {team.nom}</h3>
                                    {/* les jeux de l'équipe */}
                                    {team.jeux?.map((jeu) => (
                                        <Image
                                            onClick={() => addGame(jeu.jeu_id._id)}
                                            key={jeu.jeu_id._id}
                                            src={jeu.jeu_id.image}
                                            alt={jeu.jeu_id.nom}
                                            width={160}
                                            height={50}
                                            className={`m-2 w-auto rounded-md shadow-xl duration-200 hover:shadow-2xl hover:scale-110 ${gameSelected.includes(jeu.jeu_id._id) ? 'outline outline-2 outline-offset-2 outline-green-700' : 'outline outline-2 outline-offset-2 outline-transparent'}`}
                                        />
                                    ))}
                                </div>
                                {/* les pseudos pour chaque jeu séléctionné */}
                                <div className="basis-full grow flex flex-wrap items-center justify-center">
                                    {gameSelected?.map((gameId) => {
                                        const selectedGame = team?.jeux?.find((jeu) => jeu.jeu_id._id === gameId);
                                        return (
                                            <input
                                                required
                                                key={gameId}
                                                type="text"
                                                name={`pseudo-${selectedGame.jeu_id.nom}`}
                                                id={`pseudo-${selectedGame.jeu_id.nom}`}
                                                onChange={(e) => setPseudos({ ...pseudos, [gameId]: e.target.value })}
                                                placeholder={`Pseudo ${selectedGame.jeu_id.nom}`}
                                                className="p-3 my-5 bg-transparent rounded-md shadow-xl focus:shadow-2xl grow basis-[300px] m-2 outline outline-1 duration-200 focus:outline-green-600 outline-blue-100"
                                            />
                                        );
                                    })}
                                </div>
                                {team?.mdp &&
                                    <input
                                        type="password"
                                        name="mdp"
                                        id="mdp"
                                        placeholder="Mot de passe"
                                        className="p-3 rounded-md shadow-xl focus:shadow-2xl grow basis-[300px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
                                    />
                                }
                                <button type="submit" className={submitting ? "grow basis-full p-4 bg-green-600 cursor-default uppercase rounded-md text-white m-2 shadow-2xl mt-6" : "grow basis-full p-4 bg-black rounded-md text-white m-2 shadow-2xl mt-6 duration-200 hover:bg-green-600 uppercase"}>
                                    Rejoindre l'équipe
                                </button>
                            </form>
                        }
                    </section>
                }
                {team?._id == session?.user?.in_team?.toString() &&
                    <button
                        className="my-6 rounded-md shadow-2xl uppercase block w-full p-3 bg-black text-white hover:text-white hover:bg-red-600 duration-200"
                        type="button"
                    >
                        Quittez
                    </button>
                }
            </section>
        </main>
    )
}

export default ThisTeam