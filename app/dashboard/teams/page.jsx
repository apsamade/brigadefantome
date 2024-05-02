'use client'

import Link from "next/link"
import { useState, useEffect } from "react"

const Teams = () => {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch('/api/teams', {
                method: 'GET'
            })
            const data = await response.json()
            setTeams(data)
        }
        fetchTeams()
    }, [])
    return (
        <main className='grow'>
            <h1 className='text-2xl py-8 uppercase text-center'>Nos Teams</h1>
            <Link
                href="/dashboard/teams/create-team"
                className="p-4 bg-white text-black rounded-md uppercase hover:bg-black hover:text-white hover:px-12 duration-200"
            >
                Créer une équipe
            </Link>
            <section className="mt-16">
                {teams.map(t => (
                    <div key={t._id} className="bg-black relative text-white p-4 rounded-md max-w-[400px]">
                        <h3 className="text-center py-2 text-2xl uppercase">{t.nom}</h3>
                        <div className="flex items center justify-center flex-wrap">
                            {t.jeux.map(j => (
                                <p key={j.jeu_id._id} className="mr-2 text-red-500">
                                    {j.jeu_id.nom} <span className="text-white">/</span>
                                </p>
                            ))}
                            <ul className="mr-auto mt-5 ml-3">
                                <p>Joueurs de l'équipe :</p>
                                {t.all_players.map(ap =>
                                    <li key={ap.user_id._id} className={`${ap.chef ? 'text-orange-300' : 'text-white'} p-2 mt-2`}>
                                        {ap.user_id.pseudo} #{ap.user_id.hashtag}
                                    </li>
                                )}
                            </ul>
                        </div>
                        <p className="absolute top-3 right-3 opacity-40">{t.all_players.length} / {t.team_size}</p>
                        <Link 
                        href={`/dashboard/teams/${t._id}`}
                        className="p-3 rounded-md bg-white shadow-2xl text-black w-full block text-center uppercase hover:bg-orange-500 hover:text-white duration-200"
                        >
                            Voir l'équipe
                        </Link>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Teams