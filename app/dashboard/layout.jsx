'use client'

import '@styles/global.css'
import NavUser from '@components/NavUser'

export default function Layout({ children }) {
    return (
        <body className='bg-fond text-white flex p-4'>
            <NavUser />
            {children}
        </body>
    )
}
