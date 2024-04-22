'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

const Dashboard = () => {
    const { data: session } = useSession()
    return (
        <main className="grow">
            <nav className="flex justify-between flex-wrap items-center">
                <h1 className="mx-auto lg:p-0 p-4 pt-8">Dashboard {session?.user.pseudo}</h1>
                <Link
                    href="/dashboard/profile"
                    className="flex mx-auto lg:mx-0 text-white items-center justify-center p-4 rounded-lg hover:bg-fond-3 duration-200 bg-fond-2"
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
            <section className="flex w-[100%] max-w-[1200px] h-[400px] mx-auto items-center justify-center p-4">
                <div className="shadow-2xl h-[100%] overflow-hidden flex-[1.5] hover:flex-[6] duration-200 m-1 rounded-md relative">
                    <Image
                        src='/assets/elements/FC24.png'
                        alt="FC24"
                        width={600}
                        height={400}
                        className="rounded-md object-cover h-[100%]"
                    />
                    <div className="absolute opacity-0 flex flex-col justify-end hover:opacity-100 duration-200 p-4 overflow-hidden  btn-decouvrir left-0 bottom-0 right-0 top-0 rounded-lg">
                        <h3 className="text-3xl">FC 24</h3>
                        <p className="mt-1 mb-4 font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <Link
                            href="/dashboard/decouvrir"
                            className="py-3 uppercase font-light hover:px-16 duration-200 hover:bg-black hover:text-white w-fit px-8 bg-white text-black rounded-md block text-center my-1"
                        >
                            Découvrir
                        </Link>
                    </div>
                </div>
                <div className="shadow-2xl h-[100%] overflow-hidden flex-[1.5] hover:flex-[6] duration-200 m-1 rounded-md relative">
                    <Image
                        src='/assets/elements/Fortnite.png'
                        alt="FC24"
                        width={1200}
                        height={800}
                        className="rounded-md object-cover h-[100%]"
                    />
                    <div className="absolute opacity-0 flex flex-col justify-end hover:opacity-100 duration-200 p-4 overflow-hidden  btn-decouvrir left-0 bottom-0 right-0 top-0 rounded-lg">
                        <h3 className="text-3xl">Fortnite</h3>
                        <p className="mt-1 mb-4 font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <Link
                            href="/dashboard/decouvrir"
                            className="py-3 uppercase font-light hover:px-16 duration-200 hover:bg-black hover:text-white w-fit px-8 bg-white text-black rounded-md block text-center my-1"
                        >
                            Découvrir
                        </Link>
                    </div>
                </div>
                <div className="shadow-2xl h-[100%] overflow-hidden flex-[1.5] hover:flex-[6] duration-200 m-1 rounded-md relative">
                    <Image
                        src='/assets/elements/LOL.png'
                        alt="FC24"
                        width={1200}
                        height={800}
                        className="rounded-md object-cover h-[100%]"
                    />
                    <div className="absolute opacity-0 flex flex-col justify-end hover:opacity-100 duration-200 p-4 overflow-hidden  btn-decouvrir left-0 bottom-0 right-0 top-0 rounded-lg">
                        <h3 className="text-3xl">League Of Legends</h3>
                        <p className="mt-1 mb-4 font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <Link
                            href="/dashboard/decouvrir"
                            className="py-3 uppercase font-light hover:px-16 duration-200 hover:bg-black hover:text-white w-fit px-8 bg-white text-black rounded-md block text-center my-1"
                        >
                            Découvrir
                        </Link>
                    </div>
                </div>
                <div className="shadow-2xl h-[100%] overflow-hidden flex-[1.5] hover:flex-[6] duration-200 m-1 rounded-md relative">
                    <Image
                        src='/assets/elements/NBA2K24.png'
                        alt="FC24"
                        width={1200}
                        height={800}
                        className="rounded-md object-cover h-[100%]"
                    />
                    <div className="absolute opacity-0 flex flex-col justify-end hover:opacity-100 duration-200 p-4 overflow-hidden  btn-decouvrir left-0 bottom-0 right-0 top-0 rounded-lg">
                        <h3 className="text-3xl">NBA 2K24</h3>
                        <p className="mt-1 mb-4 font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <Link
                            href="/dashboard/decouvrir"
                            className="py-3 uppercase font-light hover:px-16 duration-200 hover:bg-black hover:text-white w-fit px-8 bg-white text-black rounded-md block text-center my-1"
                        >
                            Découvrir
                        </Link>
                    </div>
                </div>
                <div className="shadow-2xl h-[100%] overflow-hidden flex-[1.5] hover:flex-[6] duration-200 m-1 rounded-md relative">
                    <Image
                        src='/assets/elements/Warzone.png'
                        alt="FC24"
                        width={1200}
                        height={800}
                        className="rounded-md object-cover h-[100%]"
                    />
                    <div className="absolute opacity-0 flex flex-col justify-end hover:opacity-100 duration-200 p-4 overflow-hidden  btn-decouvrir left-0 bottom-0 right-0 top-0 rounded-lg">
                        <h3 className="text-3xl">Warzone</h3>
                        <p className="mt-1 mb-4 font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <Link
                            href="/dashboard/decouvrir"
                            className="py-3 uppercase font-light hover:px-16 duration-200 hover:bg-black hover:text-white w-fit px-8 bg-white text-black rounded-md block text-center my-1"
                        >
                            Découvrir
                        </Link>
                    </div>
                </div>
                <div className="shadow-2xl h-[100%] overflow-hidden flex-[1.5] hover:flex-[6] duration-200 m-1 rounded-md relative">
                    <Image
                        src='/assets/elements/Valorant.png'
                        alt="FC24"
                        width={1200}
                        height={800}
                        className="rounded-md object-cover h-[100%]"
                    />
                    <div className="absolute opacity-0 flex flex-col justify-end hover:opacity-100 duration-200 p-4 overflow-hidden  btn-decouvrir left-0 bottom-0 right-0 top-0 rounded-lg">
                        <h3 className="text-3xl">Valorant</h3>
                        <p className="mt-1 mb-4 font-light">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <Link
                            href="/dashboard/decouvrir"
                            className="py-3 uppercase font-light hover:px-16 duration-200 hover:bg-black hover:text-white w-fit px-8 bg-white text-black rounded-md block text-center my-1"
                        >
                            Découvrir
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Dashboard