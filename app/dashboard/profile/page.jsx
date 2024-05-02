"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

const Profile = () => {
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const deleteAccount = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                body: JSON.stringify({ userId: session?.user._id })
            })
            console.log(res)
            if (res.ok) {
                signOut({ redirect: false })
            } else {
                console.log(res)
            }
        } catch (error) {
            console.log('erreur coté serveur ? ', error)
            setError(error)
        }
    }
    return (
        <>
            <div className="fixed -z-50 top-0 right-0 left-0 bottom-0 bg-profile-bg bg-cover bg-fixed"></div>

            <section className="min-h-[75vh] grow">
                <h1 className="p-8 text-3xl text-center uppercase">Mon Profile</h1>

                {/* information perso */}
                <section className="bg-black my-3 p-5 max-w-3xl mx-auto rounded-md shadow-2xl">
                    <h2 className="text-xl uppercase text-center py-4">Informations personnelles</h2>
                    <ul>
                        <li className="py-3">Pseudo : <span className="text-sm sm:text-base sm:font-normal font-light">{session?.user.pseudo}#{session?.user.hashtag}</span></li>
                        <li className="py-3">Email : <span className="text-sm sm:text-base sm:font-normal font-light">{session?.user.email}</span></li>
                    </ul>
                </section>

                {/* gestion d'équipe */}
                <section className="bg-black my-3 p-5 max-w-3xl mx-auto rounded-md shadow-2xl">
                    <h2 className="text-xl uppercase text-center py-4">Mon équipe</h2>
                    {session?.user.in_team ? (
                        <ul>
                            <li className="py-3"><Link className="bg-fond-3 p-3 text-white rounded-md shadow-2xl hover:bg-white hover:text-black duration-200 block w-full" href={`/dashboard/teams/${session?.user.in_team}`}>Mon équipe</Link></li>
                        </ul>
                    ) : (
                        <div>
                        <p>Vous êtes dans aucune équipe pour le moment.</p>
                        <Link href="/dashboard/teams" className="bg-fond-3 p-3 text-white rounded-md shadow-2xl hover:bg-white hover:text-black duration-200 block w-full">Rejoindre une équipe</Link>
                        </div>
                    )}

                </section>
                <button
                    onClick={() => signOut({ redirect: false })}
                    className="text-center min-w-[325px] my-5 block shadow-2xl mx-auto p-4 px-12 hover:px-16 hover:bg-red-700 duration-200 bg-red-500 rounded-lg"
                    type="button"
                >
                    Déconnexion
                </button>
                <form onSubmit={deleteAccount}>
                    <button
                        className="text-center min-w-[325px] my-5 block shadow-2xl mx-auto p-4 px-12 hover:px-16 hover:bg-red-700 duration-200 bg-red-500 rounded-lg"
                        type="submit"
                    >
                        Supprimer mon compte
                    </button>
                </form>
            </section>
        </>
    )
}

export default Profile