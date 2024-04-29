'use client'

import Link from "next/link"

const Teams = () => {
    return (
        <main className='grow'>
            <h1 className='text-2xl py-8 uppercase text-center'>Nos Teams</h1>
            <Link 
                href="/dashboard/teams/create-team"
                className="p-4 bg-white text-black rounded-md uppercase hover:bg-black hover:text-white hover:px-12 duration-200"
            >
                Créer une équipe
            </Link>
        </main>
    )
}

export default Teams