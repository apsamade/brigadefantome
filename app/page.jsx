'use client'

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { PuffLoader } from "react-spinners"

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
                    <p className='my-8 text-center sm:text-left leading-8 font-light'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel nemo impedit cum magnam expedita natus laborum odit minima, explicabo distinctio aspernatur dignissimos quae molestiae autem omnis deleniti! Illo, ipsum totam!</p>
                    <Link
                        className="p-4 mx-auto sm:mx-0 hover:text-white hover:bg-black bg-white rounded-md text-black uppercase font-semibold max-w-[100%] w-[250px] text-center min-w-[250px] hover:w-[450px] block duration-200"
                        href="/inscription"
                    >
                        S'inscrire
                    </Link>
                </div>
            </header>
            <section>
                <h2><strong className='bg-gradient-to-r pl-4 pt-4 text-4xl uppercase from-sky-300 to-sky-600 text-transparent bg-clip-text'>La Brigade Fantôme</strong></h2>
                <p className="pt-4 pl-4">La plateforme ultime pour les tournois de jeux vidéo compétitifs sur plus de 10 jeux populaires !</p>
                <div className="features">
                    {chargedJeux ? (
                        <section className="flex w-[100%] flex-wrap max-w-[1800px] min-h-[400px] mx-auto items-center justify-center p-4">
                            {jeux?.slice(0, 4).map((jeu) => (
                                <div key={jeu._id} className="relative shadow-2xl z-10 m-3 outline outline-3 outline-offset-[6px] outline-transparent hover:outline-gray-300 duration-200 rounded-md xl:basis-[40%] basis-[350px] grow xl:min-h-[550px] min-h-[300px] overflow-hidden">
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

                <section id="about">
                    <h2>À propos de nous</h2>
                    <p>La Brigade Fantôme est une communauté passionnée de jeux vidéo qui a pour objectif de créer et d'organiser des tournois de jeux vidéo compétitifs sur les titres les plus populaires du moment. Nous nous engageons à offrir une expérience de jeu fair-play et amusante à tous les participants.</p>
                </section>

                <section id="signup">
                    <h2>Créez votre compte et rejoignez la communauté</h2>
                    <p>Inscrivez-vous dès aujourd'hui pour créer votre compte, rejoindre une équipe ou participer à nos prochains tournois.</p>
                    <Link href="#" className="btn">Inscription</Link>
                </section>

                <section id="discord">
                    <h2>Rejoignez notre communauté Discord</h2>
                    <p>Discutez avec d'autres joueurs, trouvez des coéquipiers et restez informés des derniers tournois sur notre serveur Discord.</p>
                    <Link href="https://discord.gg/brigLinkdefantome" className="btn">Rejoindre Discord</Link>
                </section>

                <section id="prizes">
                    <h2>Des prix incroyables pour les vainqueurs</h2>
                    <p>Certains de nos tournois offrent des récompenses en cash pouvant aller jusqu'à 1000€ !</p>
                </section>

                <section id="partners">
                    <h2>Devenez partenaire ou sponsor</h2>
                    <p>Si vous êtes intéressé par un partenariat ou un sponsoring avec La Brigade Fantôme, n'hésitez pas à nous contacter.</p>
                    <Link href="#" className="btn">Contactez-nous</Link>
                </section>
            </section>
        </>
    )
}

export default Home