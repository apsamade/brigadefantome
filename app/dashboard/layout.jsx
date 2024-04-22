'use client'

import NavUser from '@components/NavUser'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const LayoutDashboard = ({ children }) => {
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
            <NavUser />
            {children}
        </>
    )
}

export default LayoutDashboard