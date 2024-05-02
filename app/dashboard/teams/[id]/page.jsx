'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

const ThisTeam = ({ params }) => {
    const [erreur, setErreur] = useState('')
    const [team, setTeam] = useState({})

    useEffect(() => {
        const fetchTeam = async () => {
            const response = await fetch(`/api/teams/${params.id}`, {
                method: 'GET'
            })
            const data = await response.json()
            console.log('datas', data)
            console.log('datas', response)

            setTeam(data)
        }
        fetchTeam()
    }, [params.id])

    console.log(team)
    return (
        <main className="grow">
            <section className="p-4 rounded-md bg-fond-2 shadow-2xl">
                {team.jeux &&
                    <div>
                        <h1 className="py-3 text-center mx-auto text-3xl">{team.nom}</h1>
                        <div className="my-12">
                            <p className="text-xl uppercase">Les jeux jouer :</p>
                            <div className="flex items-center justify-center flex-wrap">
                                {team.jeux.map(j =>
                                    <Image
                                        key={j.jeu_id._id}
                                        alt={j.jeu_id.nom}
                                        src={j.jeu_id.image}
                                        width={200}
                                        height={200}
                                        className="rounded-md shadow-2xl m-3 hover:scale-110 duration-200"
                                    />
                                )}
                            </div>

                        </div>
                        <div>
                            <p className="text-xl uppercase">Les joueurs :</p>
                            <div className="flex items-center justify-center flex-col">
                                {team.all_players.map(ap =>
                                    <span className={`${ap.chef ? 'text-orange-500': 'text-white'}`} key={ap.user_id._id}>{ap.user_id.pseudo} #{ap.user_id.hashtag}</span>
                                )}
                            </div>
                        </div>
                    </div>
                }
                {/* si l'user n'est pas de l'équipe, lui proposer les fonctionnalité pour rejoindre l'équipe */}
                {/* si l'user est dans l'équipe lui proposer les fonctionnalité de modification à la limite du simple équipier */}
                {/* si l'user est admin lui proposer toute les fonction admin de l'équipe */}
                <button className="my-6 rounded-md shadow-2xl uppercase block w-full p-3 bg-black text-white hover:text-white hover:bg-green-600 duration-200" type="button">Rejoindre</button>
            </section>
        </main>
    )
}

export default ThisTeam