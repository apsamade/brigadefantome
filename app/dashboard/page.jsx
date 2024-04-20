'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

const Dashboard = () => {
    const { data: session } = useSession()
    return (
        <main className="grow">
            <nav className="flex justify-between items-center">
                <h1>Dashboard {session?.user.pseudo}</h1>
                <Link
                    href="/dashboard/profile"
                    className="flex text-white items-center justify-center p-4 rounded-lg hover:bg-fond-3 duration-200 bg-fond-2"
                >
                    <Image
                        src={session?.user.image}
                        alt='Photo de profile'
                        width={50}
                        height={50}
                        className='block rounded-[100%] mr-2'
                    />
                    <span className="m-2">{session?.user.pseudo}</span>
                </Link>
            </nav>
        </main>
    )
}

export default Dashboard