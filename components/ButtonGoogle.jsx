'use client'

import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';

const ButtonGoogle = ({ type }) => {

    return (
        <button
            className='bg-black duration-300 hover:bg-green-50 hover:text-black mt-12 text-white flex items-center justify-center p-3 m-1 shadow-lg rounded-lg basis-full flex-grow'
            type="button"
            onClick={() => {
                signIn("google")
            }
            }
        >
            <FcGoogle
                className='text-3xl mx-2'
            />
            {type}
        </button>
    )
}

export default ButtonGoogle