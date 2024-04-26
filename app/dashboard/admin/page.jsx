'use client'

import Link from "next/link"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

const Admin = () => {
    const { data: session, status } = useSession();
    if (status === 'unauthenticated') return redirect('/connexion')

    if (status === 'loading') {
        return (
            <>
                <h1 className='text-center flex items-center justify-center h-full uppercase font-light text-4xl absolute top-0 left-0 bottom-0 right-0 '>Chargement en cours ...</h1>
            </>
        )
    }
    return (
        <>
        <div className="fixed -z-50 top-0 right-0 left-0 bottom-0 bg-profile-2-bg bg-cover bg-fixed"></div>
        <main className='grow'>
            <h1 className='text-xl text-center uppercase py-8'>Dashboard Admin</h1>
            <p className='text-center uppercase font-light'>Ici tu pourras ajouter de nouveau jeux / tournois et gérer un peu tout le site fais pas de bêtise !</p>
        
            <section className="mx-auto rounded-md my-4 max-w-[600px] p-4 bg-black shadow-2xl">
                <h2 className="uppercase text-xl text-center py-4">Gestion de jeux</h2>
                <div className="my-8">
                    <Link
                        href="/dashboard/admin/add-jeu"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Ajouter un jeux
                    </Link>
                    <Link
                        href="/dashboard/admin/jeux"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Modifier / Supprimer un jeux
                    </Link>
                </div>
            </section>
            <section className="mx-auto rounded-md my-4 max-w-[600px] p-4 bg-black shadow-2xl">
                <h2 className="uppercase text-xl text-center py-4">Gestion de Tournois</h2>
                <div className="my-8">
                    <Link
                        href="/dashboard/admin/add-tournoi"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Ajouter un tournoi
                    </Link>
                    <Link
                        href="/dashboard/admin/tournois"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Modifier / Supprimer un tournoi
                    </Link>
                </div>
            </section>
            <section className="mx-auto rounded-md my-4 max-w-[600px] p-4 bg-black shadow-2xl">
                <h2 className="uppercase text-xl text-center py-4">Gestion de Teams</h2>
                <div className="my-8">
                    <Link
                        href="/dashboard/admin/add-team"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Ajouter une équipe
                    </Link>
                    <Link
                        href="/dashboard/admin/teams"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Modifier / Supprimer une équipe
                    </Link>
                </div>
            </section>
        </main>
        </>
    )
}

export default Admin