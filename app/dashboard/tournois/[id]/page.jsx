'use client'

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { PuffLoader } from "react-spinners"

const Tournoi = ({ params }) => {
    const { data: session } = useSession()
    const [charged, setCharged] = useState(false)

    const [tournoi, setTournoi] = useState({})
    const [myTeam, setMyTeam] = useState({})

    const [playerSelected, setPlayerSelected] = useState([])

    const [submitting, setSubmitting] = useState(false)
    const [erreur, setErreur] = useState('')
    const [message, setMessage] = useState('')

    const [openJoinForm, setOpenJoinForm] = useState(false)

    useEffect(() => {
        const fetchTournoi = async () => {
            const response = await fetch(`/api/tournois/${params.id}`, {
                method: 'GET'
            })
            const data = await response.json()
            setTournoi(data.tournoi)
            setMyTeam(data.myTeam)
            setCharged(true)
            console.log(data)
        }
        fetchTournoi()
    }, [params.id])

    // Ouverture du formulaire pour rejoindre le tournoi
    const toggleOpenFormJoin = () => {
        setOpenJoinForm(!openJoinForm)
    }

    // ajout de id d'user dans l'array
    const addPlayer = (playerId) => {
        if (playerSelected.includes(playerId)) {
            setPlayerSelected(playerSelected.filter(id => id !== playerId));
        } else {
            setPlayerSelected([...playerSelected, playerId]);
        }
    }

    // FORMULAIRE POUR REJOINDRE LE TOURNOI 
    const handleSubmitJoinForm = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            console.log(playerSelected.length)
            if (myTeam.all_players.find(p => p.user_id._id == session.user._id && !p.chef)) return setErreur('Seul le chef de votre équipe peux vous inscrire aux tournois.')
            if (playerSelected.length != tournoi.max_player_team) return setErreur(`Vous devez séléctionné ${tournoi.max_player_team} joueurs`)

            const response = await fetch(`/api/tournois/${tournoi._id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    playerSelected,
                    tournoiId: tournoi._id,
                    teamId: myTeam._id
                })
            })
            if (response.ok) {
                setCharged(false)
                const data = await response.json()
                setTournoi(data.tournoi)
                setPlayerSelected([])
                setOpenJoinForm(!openJoinForm)
                setCharged(true)
                setMessage('Votre équipe a été inscrite avec succès.')
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <main className="grow">
            <section className="bg-fond-3 p-4 m-5 rounded-md outline outline-2 hover:outline-green-600 duration-500 outline-orange-400 outline-offset-4">
                {charged ? (
                    <>
                        <h1 className="text-3xl text-center py-4">{tournoi.nom}</h1>
                        <Image
                            alt={tournoi?.jeu?.nom}
                            src={tournoi?.jeu?.image}
                            width={300}
                            height={300}
                            className="rounded-md mx-auto"
                        />
                        <p className="text-center pt-8">Nombre de joueurs maximal par équipe : {tournoi?.max_player_team}</p>
                        {session.user.in_team ? (
                            <button onClick={toggleOpenFormJoin} type="button" className={` ${openJoinForm ? 'bg-sky-600' : 'bg-orange-500 uppercase'} block mx-auto w-[25%] min-w-[300px] max-w-[500px] py-4 mt-8 rounded-md shadow-md hover:bg-green-600 hover:shadow-2xl duration-200 hover:w-[60%]`}>
                                {openJoinForm ? 'Annuler' : 'Rejoindre le tournoi'}
                            </button>
                        ) : (
                            <Link href="/dashboard/teams" className="text-center block p-4 text-white m-4 bg-orange-400 rounded-md hover:bg-green-600 duration-200">Pour rejoindre un tournoi il vous faut obligatoirement une équipe.</Link>
                        )}
                        <p className="text-center my-3 leading-8 p-4">{tournoi.description}</p>
                        {openJoinForm &&
                            <form onSubmit={handleSubmitJoinForm} className="p-4 rounded-md outline outline-2 outline-gray-500">
                                <h2 className="text-center uppercase text-2xl">Rejoindre le tournoi !</h2>
                                <p className="text-center pt-8">Pour pouvoir rejoindre le tournoi vous devez séléctionné les joueurs qui y participeront.</p>
                                <div className="w-full max-w-[600px] flex-wrap flex items-center justify-center mx-auto my-8">
                                    {myTeam?.all_players?.map(player =>
                                        <span
                                            onClick={() => addPlayer(player.user_id._id)}
                                            key={player._id}
                                            className={`bg-black m-2 grow duration-200 p-3 rounded-md shadow-2xl cursor-pointer ${playerSelected.includes(player.user_id._id) ? 'outline outline-2 outline-offset-2 outline-green-700' : 'outline outline-2 outline-offset-2 outline-transparent'}`}
                                        >
                                            {player.user_id.pseudo}
                                        </span>
                                    )}
                                </div>
                                <button className="mx-auto uppercase mt-4 mb-2 p-4 rounded-md bg-orange-500 block min-w-[350px] w-[50%] max-w-[800px] hover:w-[75%] hover:bg-green-600 duration-200" type="submit">Rejoindre le tournoi</button>
                                {message &&
                                    <p className="text-center text-green-500 py-4">{message}</p>
                                }
                            </form>
                        }
                    </>
                ) : (
                    <div className="mx-auto w-fit my-12">
                        <p className="mb-6 text-center">Chargement des tournois en cours ...</p>
                        <PuffLoader
                            cssOverride={{ display: 'block', margin: 'auto' }}
                            color={"#123abc"}
                            loading={true}
                            size={150}
                            speedMultiplier={2}
                        />
                    </div>
                )}
                {erreur &&
                    <p className="text-center py-4 text-red-500">{erreur}</p>
                }
            </section>
            {tournoi?.teams?.length > 0 ? (
                <section className="w-full my-4">
                    <h2 className="pt-4 text-center text-2xl">Équipe inscrite</h2>
                    <section className="grid-team-inscrite">
                        <Suspense>
                            {tournoi?.teams?.map(team =>
                                <Link href={`/dashboard/teams/${team.team_id._id}`} className="bg-fond-3 hover:bg-sky-900 duration-200 rounded-md mt-8 m-3 p-3" key={team._id}>{team.team_id.nom}</Link>
                            )}
                        </Suspense>
                    </section>
                </section>
            ) : (
                <p className="text-center pt-4 bg-fond-3 rounded-md mt-8 m-3 p-3">Aucune équipe inscrite pour le moment.</p>
            )}



        </main>
    )
}

export default Tournoi