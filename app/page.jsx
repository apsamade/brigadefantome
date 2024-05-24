'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PuffLoader } from "react-spinners"
import BackgroundAnime from "@components/BackgroundAnime"

const Home = () => {
    const [jeux, setJeux] = useState([])
    const [chargedJeux, setChargedJeux] = useState(false)

    // fetch jeux
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/jeux')
                const data = await response.json();

                const jeuxTop = data.filter(jeu => jeu.top_jeu); // Filtrer les jeux avec top_jeu à true
                setJeux(jeuxTop);
                setChargedJeux(true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <header className='sm:pt-24 pt-16 bg-header bg-cover min-h-[80vh]'>
                <div className='max-w-[800px] lg:ml-[15%] p-6 mx-auto lg:mx-0'>
                    <h1 className='text-4xl text-center sm:text-left xl:text-5xl xl:mr-[-200px] font-semibold'>Bienvenue dans la <strong className='bg-gradient-to-r from-sky-300 to-sky-600 text-transparent bg-clip-text'>Brigade Fantôme</strong></h1>
                    <h4 className='my-8 text-center sm:text-left leading-8 font-light'>Votre destination ultime pour les tournois de jeux vidéo compétitifs</h4>
                    <p className='my-8 text-center sm:text-left leading-8'>
                        Plongez dans l'univers palpitant des tournois de jeux vidéo compétitifs avec Brigade Fantôme, la plateforme ultime pour les joueurs passionnés. Affrontez des adversaires du monde entier, gravissez les échelons du classement et remportez des prix incroyables dans des tournois sur vos jeux préférés, dont Warzone, Fortnite, Valorant, League of Legends et bien plus encore.
                    </p>
                    <Link
                        className="p-4 mx-auto sm:mx-0 hover:text-white hover:bg-black bg-white rounded-md text-black uppercase font-semibold max-w-[100%] w-[250px] text-center min-w-[250px] hover:w-[450px] block duration-200"
                        href="/inscription"
                    >
                        S'inscrire
                    </Link>
                </div>
            </header>
            <section className="mt-24">
                <h2><strong className='bg-gradient-to-r block mx-auto text-center md:text-left md:pl-4 md:pt-4 text-3xl md:text-4xl uppercase from-sky-300 to-sky-600 text-transparent bg-clip-text'>La Brigade Fantôme</strong></h2>
                <p className="pt-4 pl-4">La plateforme ultime pour les tournois de jeux vidéo compétitifs sur plus de 10 jeux populaires !</p>
                <div className="features">
                    {chargedJeux ? (
                        <section className="flex w-[100%] flex-wrap max-w-[1800px] min-h-[400px] mx-auto items-center justify-center p-4">
                            {jeux?.slice(0, 4).map((jeu) => (
                                <div key={jeu._id} className="relative shadow-2xl z-10 m-3 outline outline-3 outline-offset-[6px] outline-transparent hover:outline-gray-300 duration-200 rounded-md xl:basis-[40%] basis-[350px] grow xl:min-h-[450px] min-h-[300px] overflow-hidden">
                                    <Image
                                        src={jeu.image}
                                        alt={jeu.nom}
                                        width={1000}
                                        height={500}
                                        className="absolute -z-10 object-cover h-full w-full top-0 left-0 right-0 bottom-0"
                                    />
                                    <div
                                        className="absolute p-4 -z-10 object-cover h-full w-full top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-[#0009] to-transparent"
                                    >
                                        <h3 className="text-2xl uppercase font-semibold">{jeu.nom}</h3>
                                        <p className="mt-3 font-light">{jeu.description}</p>
                                    </div>

                                </div>
                            ))}
                        </section>
                    ) : (
                        <div className="mx-auto w-fit my-12">
                            <p className="mb-6 text-center">Chargement des jeux en cours ...</p>
                            <PuffLoader
                                cssOverride={{ display: 'block', margin: 'auto' }}
                                color={"#123abc"}
                                loading={true}
                                size={150}
                                speedMultiplier={2}
                            />
                        </div>
                    )}
                </div>


                <section className="p-4 mt-16 bg-fortnite-tournoi bg-cover bg-left min-h-[50vh] relative z-0">
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-l to-black from-[#00000038] duration-200 hover:opacity-65 z-[-1]"></div>
                    <div className="max-w-[800px] xl:mt-24 xl:ml-12 mx-auto my-12">
                        <h2 className="text-3xl text-center xl:text-left pb-4"><strong className='bg-gradient-to-r text-4xl uppercase from-sky-300 to-sky-600 text-transparent bg-clip-text'>À propos de nous</strong></h2>
                        <p className="leading-7 xl:text-left text-center">La Brigade Fantôme est une communauté passionnée de jeux vidéo qui a pour objectif de créer et d'organiser des tournois de jeux vidéo compétitifs sur les titres les plus populaires du moment. Nous nous engageons à offrir une expérience de jeu fair-play et amusante à tous les participants.</p>
                    </div>
                </section>
                <section className="relative">
                    <BackgroundAnime />
                    <section className="max-w-[1400px] mx-auto p-4">
                        <div className="max-w-[800px] bg-neon-run bg-cover p-4 py-8 mr-auto rounded-md mt-12 z-0 xl:mt-32 shadow-2xl relative">
                            <h2 className="my-4 text-2xl">Créez votre compte et rejoignez la communauté</h2>
                            <p className="mb-8">Inscrivez-vous dès aujourd'hui pour créer votre compte, rejoindre une équipe ou participer à nos prochains tournois.</p>
                            <Link href="#" className="p-4 uppercase bg-blue-600 rounded-md px-8 shadow-2xl block my-2 w-fit hover:px-24 duration-200">Inscription</Link>
                            <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-l -z-10 to-black from-transparent"></div>
                        </div>
                    </section>

                    <section className="max-w-[1400px] mx-auto p-4">
                        <div className="max-w-[800px] bg-discord bg-cover p-4 py-8 ml-auto rounded-md mt-12 xl:mt-32 shadow-2xl relative z-0">
                            <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-l -z-10 to-black from-transparent"></div>
                            <h2 className="my-4 text-2xl">Rejoignez notre communauté Discord</h2>
                            <p className="mb-8">Rejoignez notre communauté dynamique de joueurs sur Discord, trouvez des coéquipiers et préparez-vous à vivre des moments d'adrénaline pure. Inscrivez-vous dès aujourd'hui et découvrez un monde de compétition et de divertissement sans limites !</p>
                            <Link href="https://discord.gg/brigLinkdefantome" className="p-4 uppercase bg-blue-600 rounded-md px-8 shadow-2xl block my-2 w-fit hover:px-24 duration-200">Rejoindre Discord</Link>
                        </div>
                    </section>
                </section>
                <section className="relative">
                    <BackgroundAnime />

                    <section className="max-w-[1400px] mx-auto p-4">
                        <div className="max-w-[800px] bg-cashprize bg-cover p-4 py-8 mr-auto rounded-md mt-12 xl:mt-32 shadow-2xl relative z-0">
                            <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-l -z-10 to-black from-transparent"></div>
                            <h2 className="my-4 text-2xl">Des prix incroyables pour les vainqueurs</h2>
                            <p className="mb-8">Certains de nos tournois offrent des récompenses en cash pouvant aller jusqu'à 1000€ !</p>
                            <Link href="/decouvrir" className="p-4 uppercase bg-blue-600 rounded-md px-8 shadow-2xl block my-2 w-fit hover:px-24 duration-200">Découvrir</Link>
                        </div>
                    </section>

                    <section className="max-w-[1400px] mx-auto mb-12 p-4">
                        <div className="max-w-[800px] bg-partenaire bg-cover p-4 py-8 ml-auto rounded-md mt-12 xl:mt-32 shadow-2xl relative z-0">
                            <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-l -z-10 to-black from-transparent"></div>
                            <h2 className="my-4 text-2xl">Devenez partenaire ou sponsor</h2>
                            <p className="mb-8">Si vous êtes intéressé par un partenariat ou un sponsoring avec La Brigade Fantôme, n'hésitez pas à nous contacter.</p>
                            <Link href="/contact" className="p-4 uppercase bg-blue-600 rounded-md px-8 shadow-2xl block my-2 w-fit hover:px-24 duration-200">Contactez-nous</Link>
                        </div>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Home