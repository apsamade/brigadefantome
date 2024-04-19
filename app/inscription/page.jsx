'use client';

import { React, useState, useEffect } from 'react';
import Link from 'next/link'
import ButtonGoogle from '@components/ButtonGoogle';
import { signIn } from 'next-auth/react';



const Inscription = () => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [users, setUsers] = useState([]);

    const handlErr = () => {
        setSubmitting(false)
        setTimeout(() => {
            setError('')
        }, 3000)
    }

    const getUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Une erreur est survenue lors de la récupération des utilisateurs');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error.message);
            setError(error.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)


        const email = e.target.email.value;
        const mdp = e.target.mdp.value;
        const mdpv = e.target.mdpv.value;

        const credentials = { email, mdp, mdpv }

        if (!email || !mdp || !mdpv) {
            setError('Veuillez remplir tous les champs.')
            handlErr()
        } else if (mdp != mdpv) {
            setError('Mot de passe de confirmation erroné.')
            handlErr()
        } else if (email == users.map(u => u.email)) {
            setError('Email déja existant.')
            handlErr()
        } else {
            try {
                const response = await signIn('credentials', {
                    ...credentials,
                    redirect: true,
                });

                console.log(response)
                if (response.error) {
                    setError('new erreur est surevenue')
                    handlErr();
                }
            } catch (error) {
                console.log('Erreur lors de l\'envoie de formulaire', error)
                setError(error)
                handlErr()
            }
        }

    }
    return (
        <main className='min-h-screen bg-from-2 bg-cover bg-center flex flex-col justify-center items-center'>
            <form
                onSubmit={handleSubmit}
                className='max-w-4xl m-2 p-5 text-black bg-white rounded-md shadow-xl'
            >
                <h2 className='uppercase bg-gradient-to-r pt-5 lg:text-3xl text-2xl pb-8 text-center'>Inscription</h2>
                <div className='flex flex-wrap items-center justify-center'>
                    <input className='rounded-md p-3 m-2 bg-sky-200 basis-2/5 grow duration-300 outline-transparent focus:outline focus:outline-sky-600' type="email" placeholder='E-mail' name='email' />
                    <input className='rounded-md p-3 m-2 bg-sky-200 basis-2/5 grow duration-300 outline-transparent focus:outline focus:outline-sky-600' type="text" placeholder='Pseudo' name='pseudo' />
                    <div>
                        
                    </div>
                    <input className='rounded-md p-3 m-2 bg-sky-200 basis-2/5 flex-grow duration-300 outline-transparent focus:outline focus:outline-sky-600' type="password" name="mdp" id="mdp" placeholder='Mot de passe' />
                    <input className='rounded-md p-3 m-2 bg-sky-200 basis-2/5 flex-grow duration-300 outline-transparent focus:outline focus:outline-sky-600' type="password" name="mdpv" id="mdpv" placeholder='Mot de passe Confirmation' />
                    <button
                        className={submitting ?
                            'p-3 m-2 flex-grow basis-full rounded-3xl outline outline-1 outline-sky-600 bg-sky-600 text-white duration-300'
                            : 'p-3 m-2 flex-grow basis-full rounded-3xl outline outline-1 outline-black hover:bg-black hover:text-white duration-300'}
                        type="submit"
                        disabled={submitting}
                    >
                        Inscription
                    </button>
                    {error &&
                        <p className='message text-center xl:text-left basis-full p-2 text-red-600 font-normal'>
                            {error}
                        </p>
                    }
                    <ButtonGoogle type="S'inscrire avec Google" />
                </div>
            </form>
            <Link
                href="/connexion"
                className='pt-2 pb-1 m-2 border-b border-white hover:px-3 duration-300'
            >
                Se connecter
            </Link>
        </main>
    )
}

export default Inscription