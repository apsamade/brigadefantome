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
        <main className='grow'>
            <h1 className='text-xl text-center uppercase py-8'>Dashboard Admin</h1>
            <p className='text-center uppercase font-light'>Ici tu pourras ajouter de nouveau jeux / tournois et gérer un peu tout le site fais pas de bêtise !</p>
        
            <section className="mx-auto my-4 max-w-[600px] p-4 bg-black shadow-2xl">
                <h2 className="uppercase text-xl text-center py-4">Gestion de jeux</h2>
                <div className="my-8">
                    <Link
                        href="/dashboard/admin/add-game"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Ajouter un jeux
                    </Link>
                    <Link
                        href="/dashboard/admin/edit-game"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Modifier un jeux
                    </Link>
                    <Link
                        href="/dashboard/admin/delete-game"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Supprimer un jeux
                    </Link>
                </div>
            </section>
            <section className="mx-auto my-4 max-w-[600px] p-4 bg-black shadow-2xl">
                <h2 className="uppercase text-xl text-center py-4">Gestion de Tournois</h2>
                <div className="my-8">
                    <Link
                        href="/dashboard/admin/add-tournoi"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Ajouter un tournoi
                    </Link>
                    <Link
                        href="/dashboard/admin/edit-tournoi"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Modifier un tournoi
                    </Link>
                    <Link
                        href="/dashboard/admin/delete-tournoi"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Supprimer un tournoi
                    </Link>
                </div>
            </section>
            <section className="mx-auto my-4 max-w-[600px] p-4 bg-black shadow-2xl">
                <h2 className="uppercase text-xl text-center py-4">Gestion de Team</h2>
                <div className="my-8">
                    <Link
                        href="/dashboard/admin/add-team"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Ajouter une équipe
                    </Link>
                    <Link
                        href="/dashboard/admin/edit-team"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Modifier une équipe
                    </Link>
                    <Link
                        href="/dashboard/admin/delete-team"
                        className="min-w-[250px] my-4 block p-3 bg-fond-3 rounded-md duration-200 hover:bg-white hover:text-black"
                    >
                        Supprimer une équipe
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Admin