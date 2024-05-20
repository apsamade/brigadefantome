'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import PuffLoader from "react-spinners/PuffLoader"
import CardJeuAdmin from "@components/CardJeuAdmin"

const JeuxAdmin = () => {
    const { data: session } = useSession()
    const [jeux, setJeux] = useState([])
    const [charged, setCharged] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/jeux')
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
        <main className="grow">
            <h1 className='text-center text-xl uppercase py-8'>Jeux Admin</h1>
            <section className="flex w-[100%] flex-wrap max-w-[1200px] mx-auto items-center justify-center p-4">
                {charged ? (
                    jeux.map((jeu) => (
                        <CardJeuAdmin
                            classChange={"shadow-2xl xl:h-[100%] overflow-hidden min-h-[300px] xl:basis-[400px] grow duration-200 m-1 rounded-md relative"}
                            key={jeu._id}
                            nom={jeu.nom}
                            description={jeu.description}
                            image={jeu.image}
                            modifier={'/dashboard/admin/jeux/modifier/' + jeu._id}
                            supprimer={'/dashboard/admin/jeux/supprimer/' + jeu._id}
                        />
                    ))
                ) : (
                    <PuffLoader speedMultiplier={2} size={100} color={"#123abc"} loading={true} />
                )}

            </section>
        </main>

    )
}

export default JeuxAdmin