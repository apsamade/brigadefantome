'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import CardJeu from "@components/CardJeu"
import { PuffLoader } from "react-spinners"

const Jeux = () => {
    const [jeux, setJeux] = useState([])
    const [charged, setCharged] = useState(false)

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

    return (
        <main className='grow'>
            <h1 className='text-2xl py-8 uppercase text-center'>Nos Jeux</h1>
            <section className="flex w-[100%] flex-wrap max-w-[1200px] mx-auto items-center justify-center p-4">
                {charged ? (
                    jeux.map((jeu) => (
                        <CardJeu
                            classChange={"shadow-2xl xl:h-[100%] overflow-hidden min-h-[300px] xl:basis-[400px] grow duration-200 m-1 rounded-md relative"}
                            key={jeu._id}
                            nom={jeu.nom}
                            description={jeu.description}
                            image={jeu.image}
                            id={'/dashboard/jeux/' + jeu._id}
                        />
                    ))
                ) : (
                    <div className="mx-auto w-fit my-12">
                        <PuffLoader
                            cssOverride={{ display: 'block', margin: 'auto' }}
                            color={"#123abc"}
                            loading={true}
                            size={150}
                            speedMultiplier={2}
                        />
                        <p className="mt-6">Chargement des jeux en cours ...</p>
                    </div>
                )}

            </section>
        </main>
    )
}

export default Jeux