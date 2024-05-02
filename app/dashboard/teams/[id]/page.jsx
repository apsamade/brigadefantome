'use client'

import { useState, useEffect } from "react"

const ThisTeam = ({params}) => {
    const [erreur, setErreur] = useState('')
    const [team, setTeam] = useState({})

    useEffect(()=>{
        const fetchTeam = async () =>{
            const response = await fetch(`/api/teams/${params.id}`, {
                method: 'GET'
            })
            const data = await response.json()
            setTeam(data)
        }
        fetchTeam()
    }, [params.id])
    return (
        <section className="grow">
            <h1>{team.nom}</h1>
            <div>
                {team.jeux.map(j => 
                <span> {j.jeu_id.nom} /</span>
                )}
            </div>
            <div>{team.all_players.map(ap =>
                <span>{ap.user_id.pseudo}</span>
            )}
            </div>
            <button type="button">Rejoindre</button>
        </section>
    )
}

export default ThisTeam