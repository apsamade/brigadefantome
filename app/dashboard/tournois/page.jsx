'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const Tournois = () => {
    const [erreur, setErreur] = useState('')
    const [tournois, setTournois] = useState([])

    useEffect(() => {
        const fetchTournois = async () => {
            const response = await fetch('/api/tournois', {
                method: 'GET'
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                setTournois(data)
            } else {
                setErreur('Une erreur est survenue lors de la récupération de tournois')
            }
        }
        fetchTournois()
    }, [])

    console.log(tournois.map(t => t.nom))
    return (
        <main className='grow'>
            <h1 className='text-2xl py-8 uppercase text-center'>Nos Tournois</h1>
            {tournois?.map(tournoi =>
                <Link href={`/dashboard/tournois/${tournoi._id}`} key={tournoi._id} className="mt-2 block bg-fond-3 shadow-2xl p-2 rounded-md">
                    <Image 
                    alt={tournoi.jeu.nom}
                    src={tournoi.jeu.image}
                    width={300}
                    height={100}
                    className="rounded-md shadow-2xl my-3"
                    />
                    <p className="py-2">Date : {new Date(tournoi.date).toLocaleDateString()}</p>
                    <p className="py-2">Heure : {tournoi.heure}</p>
                    <p className="p-3 leading-[175%]">{tournoi.description}</p>
                    <p>Nombre d'équipe autorisé : {tournoi.max_teams}</p>
                    <p>Mode de jeu : {tournoi.mode}</p>
                    <p>Récompenses du tournoi : {tournoi.recompense}</p>
                </Link>
            )}
        </main>
    )
}

export default Tournois