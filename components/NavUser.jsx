'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession()
    const [openMenu, setOpenMenu] = useState(false)
    const handleNav = () => {
        setOpenMenu(!openMenu)
    }
    return (
        <>
            <div className='min-w-[350px] hidden lg:block mr-4'>
                <aside className='lg:flex shadow-2xl rounded-lg w-[350px] hidden bg-fond-2 top-4 bottom-4 fixed flex-col justify-between items-center'>
                    <Link
                        href='/dashboard'
                        className='p-4 mb-4'
                    >
                        <Image
                            src='/logo/logo_brigade_2.png'
                            alt='Logo Brigade Fantôme'
                            width={85}
                            height={85}
                            className='rounded-[100%] bg-black p-3 hover:scale-110 duration-200'
                        />
                    </Link>
                    <ul className='flex px-4 my-4 w-full justify-center flex-col items-start'>
                        <li>
                            <Link
                                href='/dashboard'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/dashboard/jeux'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Nos Jeux
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/dashboard/tournois'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Nos Tournois
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/dashboard/teams'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Les Équipes
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/dashboard/evenements'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Évenements
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/dashboard/aide'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Aide
                            </Link>
                        </li>
                    </ul>

                    <ul className='flex m-4 mt-16 flex-col justify-center items-center'>
                        <li>

                            <Link
                                href='/dashboard/parametre'
                                className='p-4 mb-2 block rounded-full hover:bg-emerald-700 px-8 bg-red-600 duration-200'
                            >
                                Paramètres
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
            <div
                onClick={handleNav}
                className='fixed z-50 top-0 hover:px-6 duration-200 right-0 lg:hidden cursor-pointer p-1'
            >
                <AiOutlineMenu size={45} className='text-sky-300' />
            </div>
            <aside
                className={openMenu ? 'fixed z-20 top-0 right-0 bottom-0 max-w-[350px] w-[70%] lg:hidden duration-200 p-2 bg-black ease-out justify-center flex-col flex items-center'
                    : 'fixed z-20 top-0 right-[-101%] bottom-0 max-w-[400px] w-[70%] lg:hidden duration-300 p-2 bg-black ease-out justify-center flex-col flex items-center'}
            >
                <Link
                        href='/dashboard'
                        className='p-4 mb-4'
                        onClick={handleNav}
                    >
                        <Image
                            src='/logo/logo_brigade_2.png'
                            alt='Logo Brigade Fantôme'
                            width={85}
                            height={85}
                            className='rounded-[100%] bg-black p-3 hover:scale-110 duration-200'
                        />
                    </Link>
                    <ul className='flex px-4 my-4 w-full justify-center flex-col items-start'>
                        <li>
                            <Link
                                onClick={handleNav}
                                href='/dashboard'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={handleNav}
                                href='/dashboard/jeux'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Nos Jeux
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={handleNav}
                                href='/dashboard/tournois'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Nos Tournois
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={handleNav}
                                href='/dashboard/teams'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Les Équipes
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={handleNav}
                                href='/dashboard/event'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Évenements
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={handleNav}
                                href='/dashboard/aide'
                                className='p-4 pl-0 py-2 ml-2 my-2 block border-b border-transparent hover:border-white duration-200'
                            >
                                Aide
                            </Link>
                        </li>
                    </ul>

                    <ul className='flex m-4 mt-16 flex-col justify-center items-center'>
                        <li>

                            <Link
                                onClick={handleNav}
                                href='/dashboard/parametre'
                                className='p-4 mb-2 block rounded-full hover:bg-emerald-700 px-8 bg-red-600 duration-200'
                            >
                                Paramètres
                            </Link>
                        </li>
                    </ul>
                </aside>
        </>
    )
}

export default Nav