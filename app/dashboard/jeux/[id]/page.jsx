'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

const ThisJeu = ({ params }) => {
    const [jeu, setJeu] = useState({});

    useEffect(() => {
        const fetchJeu = async () => {
            const response = await fetch(`/api/admin/jeux/${params.id}`);
            const data = await response.json();
            setJeu(data);
            console.log('datas : ', data)
        };
        fetchJeu();
    }, [params.id]);

    return (
        <section className="grow">
            {jeu != null ? (
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
        )}
        </section>
    );
}

export default ThisJeu;
