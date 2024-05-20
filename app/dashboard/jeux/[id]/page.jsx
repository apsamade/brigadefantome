'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { PuffLoader } from "react-spinners";

const ThisJeu = ({ params }) => {
    const [jeu, setJeu] = useState({});
    const [charged, setCharged] = useState(false)

    useEffect(() => {
        const fetchJeu = async () => {
            const response = await fetch(`/api/admin/jeux/${params.id}`);
            const data = await response.json();
            setJeu(data);
            setCharged(true)
            console.log('datas : ', data)
        };
        fetchJeu();
    }, [params.id]);

    return (
        <section className="grow">
            {charged ? (
                jeu != null ? (
                    <section>
                        <Image
                            src={jeu.image}
                            alt={jeu.nom}
                            width={800}
                            height={800}
                            className="rounded-md object-contain xl:object-cover xl:h-[100%]"
                        />
                        <p>{jeu.nom}</p>
                        <p>{jeu.description}</p>
                    </section>
                ) : (
                    <p className="text-center p-4 rounded-md bg-fond-2 shadow-2xl">Aucun jeu trouvé</p>
                )
            ) : (
                <div className="mx-auto w-fit my-12">
                    <PuffLoader
                        cssOverride={{ display: 'block', margin: 'auto' }}
                        color={"#123abc"}
                        loading={true}
                        size={150}
                        speedMultiplier={2}
                    />
                </div>
            )}

        </section>
    );
}

export default ThisJeu;
