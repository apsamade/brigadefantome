'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Suspense } from "react"
import { PuffLoader } from "react-spinners"
import { useRouter } from "next/navigation"

const ThisTeam = ({ params }) => {
    const router = useRouter()
    const { data: session, update, status } = useSession()
    const [erreur, setErreur] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [charged, setCharged] = useState()

    // const rejoindre une équipe
    const [gameSelected, setGameSelected] = useState([]);
    const [pseudos, setPseudos] = useState({});
    const [team, setTeam] = useState({})
    const [openFormJoinTeam, setOpenFormJoinTeam] = useState(false)

    // const quittez une équipe
    const [openFormLeaveTeam, setOpenFormLeaveTeam] = useState(false)

    // const supprimer cette équipe
    const [supprimer, setSupprimer] = useState(false)
    const [openFormDeleteTeam, setOpenFormDeleteTeam] = useState(false)


    // recupération de l'équipe en question
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch(`/api/teams/${params.id}`, {
                    method: 'GET',
                    cache: 'no-store',
                    next: { revalidate: 0 }
                });
                console.log(response)
                const data = await response.json()
                if (response.ok) {
                    setTeam(data)
                    setCharged(true)
                }
            } catch (error) {
                console.log(error)
                setErreur('Une erreur est survenue lors de la récupération de l\'équipe.')
            }
        }
        fetchTeam()
    }, [params.id])

    ////////////////////////////////////////////////// CREATION //////////////////////////////////
    // jeu sélectionné
    const addGame = (gameId) => {
        if (gameSelected.includes(gameId)) {
            setGameSelected(gameSelected.filter(id => id !== gameId));
        } else {
            setGameSelected([...gameSelected, gameId]);
        }
    }

    // rejoindre une équipe 
    const openJoinTeam = () => setOpenFormJoinTeam(!openFormJoinTeam);

    // formulaire pour rejoindre l'équipe//
    const handleSubmitJoinTeam = async (e) => {
        e.preventDefault()
        setSubmitting(false)
        setCharged(false)
        setOpenFormJoinTeam(!openFormJoinTeam)

        let mdp;

        try {
            let bodyRequest = {}
            if (gameSelected.some((gameId) => pseudos[gameId] === undefined)) {
                // Si au moins un jeu n'a pas de pseudo défini, affiche une erreur
                return setErreur('Le pseudo pour chaque jeu sélectionné est requis.');
            } else {
                // Si tous les jeux ont un pseudo défini, continue avec la création de la demande de corps
                bodyRequest.jeux = gameSelected.map((gameId) => ({
                    jeu_id: gameId,
                    players: {
                        user_id: session?.user._id,
                        chef: false,
                        jeu_pseudo: pseudos[gameId]
                    }
                }));
            }

            if (team.mdp) {
                mdp = e.target.mdp.value
                if (mdp) {
                    bodyRequest.mdp = mdp
                } else {
                    return setErreur('Mot de passe de obligatoire.')
                }
            }
            if (bodyRequest.gameSelected < 1) return setErreur('Sélectionnez au moin un jeu.')

            if (team.team_size >= team.players) return setErreur('Équipe déjà complète.')
            bodyRequest.join = true;
            const response = await fetch(`/api/teams/${params.id}`, {
                method: 'PATCH',
                body: JSON.stringify(bodyRequest),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log('datas', data)
            if (data.erreur) {
                setErreur(data.erreur);
                setMessage('Créer une équipe')
                setCharged(true)
            }
            if (response.ok) {
                setTeam({ all_players: data.all_players })
                setCharged(true)
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
            }
        } catch (error) {
            console.log(error)
            setCharged(true)
        }
    }

    ////////////////////////////////////////////////// QUITTER //////////////////////////////////
    const openLeaveTeam = () => setOpenFormLeaveTeam(!openFormLeaveTeam);

    // formulaire pour quitter l'équipe
    const handleSubmitLeaveTeam = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setCharged(false)
        setOpenFormLeaveTeam(!openFormLeaveTeam)

        try {
            const response = await fetch(`/api/teams/${params.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ leave: true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            if (data.erreur) {
                setErreur(data.erreur);
                setCharged(true)
            }
            if (response.ok) {
                setTeam({ all_players: data.all_players })
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        in_team: undefined
                    }
                });
                setCharged(true)
                setErreur('')
            }

        } catch (error) {
            console.log(error)
            setCharged(true)
            setErreur('Une erreur est survenue lors de la tentative pour quitter l\'équipe')
        }
    }

    ////////////////////////////////////////////////// SUPPRIMER //////////////////////////////////
    const openDeleteTeam = () => setOpenFormDeleteTeam(!openFormDeleteTeam);

    // formulaire pour supprimer l'équipe
    const handleSubmitDeleteTeam = async (e) => {
        e.preventDefault()
        setOpenFormDeleteTeam(!openFormDeleteTeam)

        try {
            const response = await fetch(`/api/teams/${params.id}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            console.log(response)
            console.log(data)
            if (response.ok) {
                setSupprimer(true)
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        in_team: undefined
                    }
                });
                router.push('/dashboard/teams')
            }
        } catch (error) {
            console.log(error)
            setErreur('Une erreure est survenue lors de la tentative de suppression d\'équipe')
        }
    }
    console.log(supprimer)
    return (
        <main className="grow">
            <section className="p-4 rounded-md bg-fond-2 shadow-2xl">
                {charged ? (
                    <div>
                        <h1 className="py-3 text-center mx-auto text-3xl">{team.nom}</h1>
                        <div className="my-12">
                            <p className="text-xl uppercase">Les jeux jouer :</p>
                            <div className="flex items-center justify-center flex-wrap">
                                <Suspense>
                                    {team?.jeux?.map(j =>
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
                                </Suspense>
                            </div>
                        </div>
                        <div>
                            <p className="text-xl uppercase">Les joueurs :</p>
                            <div className="flex items-center justify-center flex-col">
                                <Suspense>
                                    {team?.all_players?.map(ap =>
                                        <span className={`${ap.chef ? 'text-orange-500' : 'text-white'}`} key={ap._id}>{ap.user_id.pseudo} #{ap.user_id.hashtag}</span>
                                    )}
                                </Suspense>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto w-fit my-12">
                        <p className="mb-6 text-center">Chargement de l'équipe en cours ...</p>
                        <PuffLoader
                            cssOverride={{ display: 'block', margin: 'auto' }}
                            color={"#123abc"}
                            loading={true}
                            size={150}
                            speedMultiplier={2}
                        />
                    </div>
                )}

                {team._id &&
                    <>
                        {!session?.user.in_team &&
                            <section>
                                <button
                                    onClick={openJoinTeam}
                                    className={`my-6 rounded-md shadow-2xl uppercase block w-full p-3 bg-black text-white hover:text-white ${openFormJoinTeam ? 'hover:bg-red-600' : 'hover:bg-green-600'}  duration-200`}
                                    type="button"
                                >
                                    {openFormJoinTeam ? ('Fermer') : ('Rejoindre')}
                                </button>
                                {openFormJoinTeam &&
                                    <form
                                        onSubmit={handleSubmitJoinTeam}
                                        className="flex rounded-md outline outline-gray-700 outline-1 p-4 items-center flex-wrap justify-center"
                                    >

                                        <div className="grow basis-full flex p-4 items-center justify-center flex-wrap">
                                            <h3 className="uppercase text-2xl basis-full grow text-center my-3">Rejoindre {team.nom}</h3>
                                            {/* les jeux de l'équipe */}
                                            {team.jeux?.map((jeu) => (
                                                <Image
                                                    onClick={() => addGame(jeu.jeu_id._id)}
                                                    key={jeu._id}
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
                                                className="p-3 text-black rounded-md shadow-xl focus:shadow-2xl grow basis-[300px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
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
                            <>
                                <button
                                    onClick={openLeaveTeam}
                                    className="my-6 rounded-md shadow-2xl uppercase block w-full p-3 bg-black text-white hover:text-white hover:bg-red-600 duration-200"
                                    type="button"
                                >
                                    Quittez
                                </button>
                                {openFormLeaveTeam &&
                                    <form onSubmit={handleSubmitLeaveTeam} className="bg-[#000000A0] flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
                                        <div className="p-4 bg-fond-3 rounded-md">
                                            <p className="text-center">Êtes vous sur de vouloir quitter votre équipe ?</p>
                                            <div className="flex items-center justify-center flex-wrap my-3">
                                                <button className="grow p-3 hover:bg-sky-600 duration-200 bg-sky-500 rounded-md m-1" onClick={openLeaveTeam} type="button">Annuler</button>
                                                <button className="grow p-3 hover:bg-red-700 duration-200 bg-red-500 rounded-md m-1" type="submit">Quitter</button>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </>
                        }
                        {team?.all_players?.find(p => p.user_id._id === session?.user?._id && p.chef === true) &&
                            <>
                                <button
                                    onClick={openDeleteTeam}
                                    className="my-6 rounded-md shadow-2xl uppercase block w-full p-3 bg-black text-white hover:text-white hover:bg-red-600 duration-200"
                                    type="button"
                                >
                                    Supprimer cette équipe
                                </button>
                                {openFormDeleteTeam &&
                                    <form onSubmit={handleSubmitDeleteTeam} className="bg-[#000000A0] flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
                                        <div className="p-4 bg-fond-3 rounded-md">
                                            <p className="text-center">Êtes vous sur de vouloir supprimer votre équipe ?</p>
                                            <div className="flex items-center justify-center flex-wrap my-3">
                                                <button className="grow p-3 hover:bg-sky-600 duration-200 bg-sky-500 rounded-md m-1" onClick={openDeleteTeam} type="button">Annuler</button>
                                                <button className="grow p-3 hover:bg-red-700 duration-200 bg-red-500 rounded-md m-1" type="submit">Supprimer</button>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </>
                        }
                    </>
                }
                {erreur &&
                    <p className="text-center text-red-500 p-4">{erreur}</p>
                }
            </section>
        </main>
    )

}

export default ThisTeam