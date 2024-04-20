'use client'

import '@styles/global.css'
import NavUser from '@components/NavUser'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Layout({ children }) {
    const { data: session, status } = useSession();
    if (status === 'unauthenticated') return redirect('/connexion')

    if (status === 'loading') {
        return (
            <body className='bg-fond text-white flex p-4'>
                <h1 className='text-center flex items-center justify-center h-full uppercase font-light text-4xl absolute top-0 left-0 bottom-0 right-0 '>Chargement en cours ...</h1>
            </body>
        )
    }
    return (
        <body className='bg-fond text-white flex p-4'>
            <NavUser />
            {children}
        </body>
    )
}
