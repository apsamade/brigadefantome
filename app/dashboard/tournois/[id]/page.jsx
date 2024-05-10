'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

const Tournoi = ({ params }) => {
    const [tournoi, setTournoi] = useState({})

    useEffect(()=>{
        const fetchTournoi = async() =>{
            const response = await fetch(`/api/tournois/${params.id}`, {
                method: 'GET'
            })
            const data = await response.json()
            setTournoi(data)
        }
        fetchTournoi()
    }, [params.id])

    return (
        <main className="grow">
            <section>
                <h1 className="text-3xl text-center py-4">{tournoi.nom}</h1>
                <Image 
                    alt={tournoi?.jeu?.nom}
                    src={tournoi?.jeu?.image}
                    width={300}
                    height={300}
                    className="rounded-md mx-auto"
                />
                <p className="text-center my-3 leading-8 uppercase">{tournoi.description}</p>
            </section>
            
        </main>
    )
}

export default Tournoi