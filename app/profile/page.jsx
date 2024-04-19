"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

const Profile = () => {
    const { data: session } = useSession()
    console.log('ma session user ?', session?.user)
    if (!session?.user) {
        redirect('/connexion')
    }
    return (
        <>
            <section className="min-h-[75vh]">
                <h1 className="p-8 text-center uppercase">Bienvenue {session?.user.pseudo}</h1>
                <button
                    onClick={() => signOut()}
                    className="text-center block shadow-2xl mx-auto p-4 px-12 hover:px-16 hover:bg-red-700 duration-200 bg-red-500 rounded-lg"
                    type="button"
                >
                    Déconnexion
                </button>
            </section>
        </>
    )
}

export default Profile