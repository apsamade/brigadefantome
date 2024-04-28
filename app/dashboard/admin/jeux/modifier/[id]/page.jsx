'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

const ModifierJeu = ({ params }) => {
  const [jeu, setJeu] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    const fetchJeu = async () => {
      const response = await fetch(`/api/admin/jeux/${params.id}`);
      const data = await response.json();
      setJeu(data);
      console.log('datas : ', data)
    };
    fetchJeu();
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setJeu(prev => ({ ...prev, [name]: checked }));
    } else {
      setJeu(prev => ({ ...prev, [name]: value }));
    }
  };

  let requestBody = {
    nom: jeu.nom,
    description: jeu.description,
    top_jeu: jeu.top_jeu,
  };

  const modifierJeu = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const image = e.target.image.files[0];
    const formData = new FormData();
    formData.append('image', image);

    console.log('Le request body : ', requestBody.image)

    try {
      const imgBbResponse = await fetch('https://api.imgbb.com/1/upload?key=e237e8cd5a4f302b941cf8c6eff045b5', {
        method: 'POST',
        body: formData,
      });

      const imgData = await imgBbResponse.json();
      console.log('Image data : ', imgData)

      if (imgData.success) {
        requestBody.image = imgData.data.url;
        setJeu(requestBody)

        const response = await fetch(`/api/admin/jeux/${params.id}`, {
          method: 'PATCH',
          body: JSON.stringify(requestBody)
        })

        const data = await response.json()

        console.log('la réponse : ', response)
        console.log('les datas : ', data)

      } else {
        setErreur('Une erreur est survenue lors du téléchargement de l\'image')
      }
    } catch (error) {
      console.log('Erreur lors de la modification du jeu :', error)
    }

  };
  if (jeu.erreur) {
    return (
      <section className="grow">
        <p className="mx-auto text-center uppercase text-xl pt-32">Aucun jeu trouvé sur cette route mon frérot !</p>
        <Image
          src="/assets/elements/tk-404.gif"
          alt="oupsi 404 not found"
          width={700}
          height={500}
          className='object-contain mx-auto block rounded-lg mt-24'
        />
      </section>
    );
  }
  return (
    <section className="grow">
      <form onSubmit={modifierJeu}>
        <Image
          src={jeu.image}
          alt={jeu.nom}
          width={800}
          height={800}
          className="rounded-md object-contain xl:object-cover xl:h-[100%]"
        />
        <div className="p-4 bg-white rounded-md my-5 text-black flex items-center justify-center flex-wrap">
          <input
            type="text"
            name="nom"
            id="nom"
            value={jeu.nom}
            onChange={handleInputChange}
            className="grow basis-[300px] p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
          />
          <textarea
            name="description"
            id="description"
            className="grow basis-full p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
            value={jeu.description}
            onChange={handleInputChange}
          />
          <input
            type="file"
            name="image"
            id="image"
            className="grow basis-full p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
          />
          <div className="flex items-center justify-leftgrow basis-full m-2">
            <label htmlFor="top_jeu" className="shadow-2xl p-3 rounded-md outline outline-1 duration-200 hover:outline-blue-500 outline-blue-100">Jeu du moment</label>
            <input
              type="checkbox"
              name="top_jeu"
              id="top_jeu"
              className="w-[25px] h-[25px] m-2"
              checked={jeu.top_jeu}
              onChange={handleInputChange}
            />
          </div>
          <button className="p-4 my-2 bg-sky-500 text-white rounded-md uppercase text-md hover:px-12 shadow-2xl duration-200 hover:bg-blue-700 font-light" type="submit">Modifier</button>
        </div>
      </form>
    </section>
  );
}

export default ModifierJeu;
