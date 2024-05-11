'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"

const Tournoi = ({ params }) => {
    const { data: session } = useSession()
    const [tournoi, setTournoi] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const [openJoinForm, setOpenJoinForm] = useState(false)

    useEffect(() => {
        const fetchTournoi = async () => {
            const response = await fetch(`/api/tournois/${params.id}`, {
                method: 'GET'
            })
            const data = await response.json()
            setTournoi(data)
        }
        fetchTournoi()
    }, [params.id])

    // Ouverture du formulaire pour rejoindre le tournoi
    const toggleOpenFormJoin = () =>{
        setOpenJoinForm(!openJoinForm)
    }

    // FORMULAIRE POUR REJOINDRE LE TOURNOI 
    const handleSubmitJoinForm = async (e) =>{
        e.preventDefault()
        setSubmitting(true)
    }
    return (
        <main className="grow">
            <section className="bg-fond-3 p-4 m-5 rounded-md outline outline-2 hover:outline-green-600 duration-500 outline-orange-400 outline-offset-4">
                <h1 className="text-3xl text-center py-4">{tournoi.nom}</h1>
                <Image
                    alt={tournoi?.jeu?.nom}
                    src={tournoi?.jeu?.image}
                    width={300}
                    height={300}
                    className="rounded-md mx-auto"
                />

                {session.user.in_team ? (
                    <button onClick={toggleOpenFormJoin} type="button" className={` ${openJoinForm ? 'bg-sky-600' : 'bg-orange-500 uppercase'} block mx-auto w-[25%] min-w-[300px] max-w-[500px] py-4 mt-8 rounded-md shadow-md hover:bg-green-600 hover:shadow-2xl duration-200 hover:w-[60%]`}>
                        {openJoinForm ? 'Annuler' : 'Rejoindre le tournoi'}
                    </button>
                ) : (
                    <Link href="/dashboard/teams" className="text-center block p-4 text-white m-4 bg-orange-400 rounded-md hover:bg-green-600 duration-200">Pour rejoindre un tournoi il vous faut obligatoirement une équipe.</Link>
                )}
                <p className="text-center my-3 leading-8 uppercase">{tournoi.description}</p>
                {openJoinForm &&
                    <form onSubmit={handleSubmitJoinForm} className="p-4 rounded-md outline outline-2 outline-gray-500">
                        <h2 className="text-center uppercase text-2xl">Rejoindre le tournoi !</h2>
                        <p className="text-center pt-8">Pour pouvoir rejoindre le tournoi vous devez séléctionné les joueurs qui y participeront.</p>
                        <button className="mx-auto uppercase mt-4 mb-2 p-4 rounded-md bg-orange-500 block min-w-[350px] w-[50%] max-w-[800px] hover:w-[75%] hover:bg-green-600 duration-200" type="submit">Rejoindre le tournoi</button>
                    </form>
                }
            </section>

        </main>
    )
}

export default Tournoi