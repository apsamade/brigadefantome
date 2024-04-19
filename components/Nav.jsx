import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
    return (
        <nav className='flex w-full justify-between items-center absolute p-3'>
            <Image 
                src='/logo/logo_brigade_2.png'
                alt='Logo Brigade Fantôme'
                width={75}
                height={75}
            />
            <ul className='flex justify-center items-center'>
                <li>
                    <Link
                        href='/decouvrir'
                        className='p-4'
                    >
                        Découvrir
                    </Link>
                </li>
                <li>
                    <Link
                        href='/evenements'
                        className='p-4'
                    >
                        Évenements
                    </Link>
                </li>
                <li>
                    <Link
                        href='/contact'
                        className='p-4'
                    >
                        Contact & Support
                    </Link>
                </li>
            </ul>

            <ul className='flex justify-center items-center'>
                <li>
                    <Link
                        href='/connexion'
                        className='p-4'
                    >
                        Connexion
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav