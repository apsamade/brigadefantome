'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { PuffLoader } from "react-spinners"

const EditTournoi = () => {
    const [tournois, setTournois] = useState([])
    const [erreur, setErreur] = useState("")
    const [charged, setCharged] = useState(false)

    useEffect(() => {
        const fetchTournois = async () => {
            try {
                const response = await fetch('/api/admin/tournois', {
                    method: 'GET',
                    cache: 'no-store',
                    next: { revalidate: 0 }
                })
                const data = await response.json()
                console.log(data)
                if (response.ok) {
                    setTournois(data)
                    setCharged(true)
                } else {
                    setCharged(true)
                    setErreur("Une erreur est survenue lors de la récupération des tournois.")
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchTournois()
    }, [])
    return (
        <main className="grow">
            <div className="pb-12">
                <h1 className='text-center text-3xl uppercase pt-8'>Tournois Admin</h1>
                <p className="uppercase text-center pt-8 font-light max-w-[800px] mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestias doloremque voluptatem eos ullam inventore, quaerat non quos blanditiis. Error rem quibusdam dolore magnam assumenda animi debitis facilis nulla quasi.</p>
            </div>
            {charged ? (
                <section className="grid-tournois shadow-2xl gap-3 w-full">
                    {tournois?.map(tournoi =>
                        <div key={tournoi._id} className="bg-fond-3 p-3 rounded-md shadow-2xl">
                            <h3 className="text-center py-3 text-xl uppercase">{tournoi.nom}</h3>
                            <Image
                                alt={tournoi.jeu.nom}
                                src={tournoi.jeu.image}
                                width={1200}
                                height={800}
                                className="rounded-md w-[100%] shadow-2xl my-2 hover:scale-105 duration-200"
                            />
                            <div className="flex items-center justify-start flex-wrap">
                                <Link
                                    href={`/dashboard/admin/tournois/modifier/${tournoi._id}`}
                                    className="py-3 m-2 grow text-sm uppercase font-light duration-200 hover:bg-black hover:text-white w-fit px-2 bg-sky-500 text-white rounded-md block text-center my-1"
                                >
                                    Modifier
                                </Link>
                                <Link
                                    href={`/dashboard/admin/tournois/supprimer/${tournoi._id}`}
                                    className="py-3 m-2 grow text-sm uppercase font-light duration-200 hover:bg-black hover:text-white w-fit px-2 bg-red-500 text-white rounded-md block text-center my-1"
                                >
                                    Supprimer
                                </Link>
                            </div>
                        </div>
                    )}
                </section>
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

        </main>

    )
}

export default EditTournoi