'use client'

import { useEffect, useState } from "react"
import Image from "next/image"

const SupprimerTournoi = ({ params }) => {
    const [tournoi, setTournoi] = useState({})
    const [supprimer, setSupprimer] = useState(false)

    useEffect(() => {
        const fetchTournoi = async () => {
            const response = await fetch(`/api/admin/tournois/${params.id}`, {
                method: 'GET'
            })
            const data = await response.json()
            setTournoi(data)
        }
        fetchTournoi()
    }, [])

    const deleteTournoi = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/admin/tournois/${params.id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            setSupprimer(true)
        }
    }

    if (tournoi) {
        return (
            <section className="grow">
                {supprimer ? (
                    <div>
                    <p className="my-4 p-3 shadow-2xl uppercase text-xl text-center w-full bg-fond-3 rounded-md">Tournoi Supprimer avec succès</p>
                    <Link href='/dashboard/admin/tournois'>
                        Retour
                    </Link>
                    </div>
                ) :
                    (
                        <form onSubmit={deleteTournoi}>
                            <Image
                                src={tournoi?.jeu?.image}
                                alt={tournoi?.jeu?.nom}
                                width={800}
                                height={800}
                                className="rounded-md object-contain xl:object-cover xl:h-[100%]"
                            />
                            <div>
                                <h3 className="text-3xl">{tournoi.nom}</h3>
                                <p className="mt-1 mb-4 font-light text-ellipsis">{tournoi.description}</p>
                                <button className="p-4 my-2 bg-red-500 rounded-md uppercase text-md hover:px-12 shadow-2xl duration-200 hover:bg-red-600 font-light" type="submit">Supprimer</button>
                            </div>
                        </form>
                    )}

            </section>
        )
    } else {
        return (
            <section className="grow">
                <p className="mx-auto text-center uppercase text-xl pt-32">Aucun tournoi trouvé sur cette route mon frérot !</p>
                <Image
                    unoptimized
                    src="/assets/elements/tk-404.gif"
                    alt="oupsi 404 not found"
                    width={700}
                    height={500}
                    className='object-contain mx-auto block rounded-lg mt-24'
                />
            </section>
        )
    }

}

export default SupprimerTournoi