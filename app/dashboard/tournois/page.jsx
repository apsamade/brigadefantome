'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { PuffLoader } from "react-spinners"

const Tournois = () => {
    const [erreur, setErreur] = useState('')
    const [tournois, setTournois] = useState([])
    const [charged, setCharged] = useState(false)

    useEffect(() => {
        const fetchTournois = async () => {
            const response = await fetch('/api/tournois', {
                method: 'GET'
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                setTournois(data)
                setCharged(true)
            } else {
                setCharged(true)
                setErreur('Une erreur est survenue lors de la récupération de tournois')
            }
        }
        fetchTournois()
    }, [])

    console.log(tournois.map(t => t.nom))
    return (
        <main className='grow'>
            <div className="pb-12">
                <h1 className='text-center text-3xl uppercase pt-8'>Tournois</h1>
                <p className="uppercase text-center pt-8 font-light max-w-[800px] mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestias doloremque voluptatem eos ullam inventore, quaerat non quos blanditiis. Error rem quibusdam dolore magnam assumenda animi debitis facilis nulla quasi.</p>
            </div>
            {charged ? (
                <section className="grid-tournois shadow-2xl gap-3 w-full">
                    {tournois?.map(tournoi =>
                        <Link href={`/dashboard/tournois/${tournoi._id}`} key={tournoi._id} className="mt-2 block bg-fond-3 outline outline-2 outline-offset-4 outline-transparent hover:outline-orange-400 duration-200 shadow-2xl p-3 rounded-md">
                            <h3 className="text-xl uppercase text-center pt-3 pb-2">{tournoi.nom}</h3>
                            <Image
                                alt={tournoi.jeu.nom}
                                src={tournoi.jeu.image}
                                width={1200}
                                height={800}
                                className="rounded-md w-full shadow-2xl my-3 hover:scale-105 duration-200"
                            />
                            <p className="py-2">Date : {new Date(tournoi.date).toLocaleDateString()}</p>
                            <p className="py-2">Heure : {tournoi.heure}</p>
                            <p>Nombre d'équipe autorisé : {tournoi.max_teams}</p>
                            <p>Mode de jeu : {tournoi.mode}</p>
                            <p>Récompenses du tournoi : {tournoi.recompense}</p>
                        </Link>
                    )}
                </section>
            ) : (
                <div className="mx-auto shadow-2xl w-3/4 my-12 bg-gradient-to-l from-fond-3 to-fond p-4 rounded-md">
                    <p className="mb-6 text-center">Chargement des tournois en cours ...</p>
                    <PuffLoader
                        cssOverride={{ display: 'block', margin: 'auto' }}
                        color={"#ffffff"}
                        loading={true}
                        size={150}
                        speedMultiplier={2}
                    />
                </div>
            )}


        </main>
    )
}

export default Tournois