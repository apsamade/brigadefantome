'use client'

import { useState, useEffect, Suspense } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Calendrier from "@components/Calendrier"

const AddTournoi = () => {
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [jeux, setJeux] = useState([])
    const [erreur, setErreur] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/jeux')
                const data = await response.json();
                setJeux(data);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const handleSubmitCreateTournoi = async (e) => {
        e.preventDefault()
        setSubmitting(true)
    }

    return (
        <main className="grow">
            <h1 className='text-center text-xl uppercase py-8'>Ajouter un tournoi</h1>
            <form
                onSubmit={handleSubmitCreateTournoi}
                className="max-w-[800px] mx-auto p-4 flex items-center justify-center flex-wrap bg-fond-3 rounded-md shadow-2xl"
            >
                <input
                    type="text"
                    name="nom"
                    id="nom"
                    placeholder="Nom du tournoi"
                    className="grow basis-full p-3 rounded-md bg-transparent shadow-2xl block m-2 focus:outline-sky-600 duration-200 outline outline-1 outline-gray-400"
                />
                <div className="grow basis-[350px] m-2">
                    <Calendrier />
                </div>
                
                <div className="flex items-center justify-center flex-wrap p-2">
                    <Suspense>
                        {jeux?.map((j) =>
                            <Image
                                key={j._id}
                                alt={j.nom}
                                src={j.image}
                                width={150}
                                height={150}
                                className="m-2 rounded-md shadow-2xl hover:scale-110 duration-200"
                            />
                        )}
                    </Suspense>
                </div>
                <button type="submit" className="grow m-2 hover:bg-sky-500 duration-200 bg-black p-3 rounded-md shadow-2xl uppercase">Créer un tournoi</button>
            </form>
        </main>

    )
}

export default AddTournoi