'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import CardJeu from "@components/CardJeu"
import { PuffLoader } from "react-spinners"

const Dashboard = () => {
    const { data: session } = useSession()
    const [jeux, setJeux] = useState([])
    const [tournois, setTournois] = useState([])
    const [chargedTournoi, setChargedTournoi] = useState(false)
    const [chargedJeu, setChargedJeu] = useState(false)


    // fetch jeux
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/jeux')
                const data = await response.json();

                const jeuxTop = data.filter(jeu => jeu.top_jeu); // Filtrer les jeux avec top_jeu à true
                setJeux(jeuxTop);
                setChargedJeu(true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    // fetch tournois
    useEffect(() => {
        const fetchTournois = async () => {
            const response = await fetch('/api/tournois', {
                method: 'GET'
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                setTournois(data)
                setChargedTournoi(true)
            } else {
                setErreur('Une erreur est survenue lors de la récupération de tournois')
            }
        }
        fetchTournois()
    }, [])

    return (
        <main className="grow">
            <nav className="flex justify-between flex-wrap items-center">
                <h1 className="mx-auto uppercase text-2xl font-light lg:p-0 p-4 pt-8">Brigade Fantôme</h1>
                <Link
                    href="/dashboard/profile"
                    className="flex mx-auto lg:mx-0 text-white items-center justify-center p-4 rounded-lg hover:bg-fond-3 duration-200 bg-fond-2"
                >
                    <Image
                        src={session?.user.image}
                        alt='Photo de profile'
                        width={50}
                        height={50}
                        className='block rounded-[100%] mr-2'
                    />
                    <span className="m-2">{session?.user.pseudo}</span>
                </Link>
            </nav>
            {chargedJeu ? (
                <section className="flex w-[100%] flex-wrap xl:flex-nowrap max-w-[1200px] min-h-[400px] xl:h-[400px] mx-auto items-center justify-center p-4">
                    {jeux?.slice(0, 6).map((jeu) => (
                        <CardJeu
                            classChange={"shadow-2xl xl:h-[100%] overflow-hidden basis-[300px] grow xl:flex-[1.5] xl:hover:flex-[6] duration-200 m-1 rounded-md relative"}
                            key={jeu._id}
                            nom={jeu.nom}
                            description={jeu.description}
                            image={jeu.image}
                            id={'/dashboard/jeux/' + jeu._id}
                        />
                    ))}
                </section>
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


            <section className="min-h-[30vh]">
                <h2 className="uppercase text-2xl font-light mt-5 lg:p-0 p-4 pt-8">Prochain Tournois</h2>
                {chargedTournoi ? (
                    <div className="flex items-center justify-center">
                        {tournois?.length <= 0 ? (
                            <p className="lg:pt-32 pt-16">Aucun tournois prévu pour le moment ...</p>
                        ) : (
                            <section className="pt-8 max-w-[1200px] w-full pb-8 flex items-center justify-center flex-wrap">
                                {tournois?.slice(0, 3)?.map(tournoi =>
                                    <Link href={`dashboard/tournois/${tournoi._id}`} className="relative overflow-hidden m-3 z-[1] p-4 basis-[300px] grow min-h-[320px] bg-fond-3 rounded-md shadow-2xl flex flex-col items-center justify-between">
                                        <h3 className="text-2xl pt-4 text-center">{tournoi.nom}</h3>
                                        <Image
                                            alt={tournoi.jeu.nom}
                                            src={tournoi.jeu.image}
                                            width={1200}
                                            height={50}
                                            className="rounded-md w-full object-cover h-full absolute top-0 left-0 right-0 bottom-0 z-[-1]"
                                        />
                                        <p className="p-3 text-white bg-black rounded-md hover:px-12 duration-200 text-lg">{tournoi.recompense}</p>
                                        <span className="absolute top-[6px] right-[6px] z-20 text-black font-bold opacity-70">{tournoi.teams?.length} / {tournoi.max_teams}</span>
                                        <button type="button" className="w-full p-3 block bg-black shadow-2xl rounded-md text-center uppercase hover:bg-white duration-200 hover:text-black">Rejoindre</button>
                                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-60 hover:opacity-20 duration-200 z-[-1]"></div>
                                    </Link>
                                )}
                            </section>
                        )}
                    </div>
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

            </section>
        </main>
    )
}

export default Dashboard