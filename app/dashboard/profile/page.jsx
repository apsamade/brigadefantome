"use client"

import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"

const Profile = () => {
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError]= useState('')

    const deleteAccount = async (e) =>{
        e.preventDefault()

        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                body : JSON.stringify({userId : session?.user._id})
            })
            console.log(res)
            if(res.ok){
                signOut({ redirect: false })
            }else{
                console.log(res)
            }
        } catch (error) {
            console.log('erreur coté serveur ? ',error)
            setError(error)
        }
    }
    return (
        <>
            <section className="min-h-[75vh] grow">
                <h1 className="p-8 text-center uppercase">Bienvenue {session?.user.pseudo}</h1>
                <button
                    onClick={() => signOut({ redirect: false })}
                    className="text-center my-5 block shadow-2xl mx-auto p-4 px-12 hover:px-16 hover:bg-red-700 duration-200 bg-red-500 rounded-lg"
                    type="button"
                >
                    Déconnexion
                </button>
                <form onSubmit={deleteAccount}>
                    <button
                        className="text-center my-5 block shadow-2xl mx-auto p-4 px-12 hover:px-16 hover:bg-red-700 duration-200 bg-red-500 rounded-lg"
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