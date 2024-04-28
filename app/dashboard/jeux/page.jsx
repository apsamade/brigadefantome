'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import CardJeu from "@components/CardJeu"

const Jeux = () => {
    const [jeux, setJeux] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/jeux')
                const data = await response.json();
                setJeux(data);
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
                {jeux.map((jeu) => ( 
                    <CardJeu
                        classChange={"shadow-2xl xl:h-[100%] overflow-hidden min-h-[300px] xl:basis-[400px] grow duration-200 m-1 rounded-md relative"}
                        key={jeu._id}
                        nom={jeu.nom}
                        description={jeu.description}
                        image={jeu.image}
                        id={'/dashboard/jeux/' + jeu._id}
                    />
                ))}
            </section>
        </main>
    )
}

export default Jeux