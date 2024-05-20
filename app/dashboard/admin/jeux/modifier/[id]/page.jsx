'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import PuffLoader from "react-spinners/PuffLoader"


const ModifierJeu = ({ params }) => {
  const [jeu, setJeu] = useState({});
  const [charged, setCharged] = useState(false)
  const [submitting, setSubmitting] = useState(false);
  const [erreur, setErreur] = useState('')
  const [message, setMessage] = useState('Modifier')


  useEffect(() => {
    const fetchJeu = async () => {
      const response = await fetch(`/api/admin/jeux/${params.id}`);
      const data = await response.json();
      setJeu(data);
      setCharged(false)
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
    setCharged(false)
    setMessage('Modification en cours ...');

    const image = e.target.image.files[0];
    const formData = new FormData();

    try {
      if (image) {
        formData.append('image', image);

        const imgBbResponse = await fetch('https://api.imgbb.com/1/upload?key=e237e8cd5a4f302b941cf8c6eff045b5', {
          method: 'POST',
          body: formData,
        });
        const imgData = await imgBbResponse.json();

        if (imgData.success) {
          requestBody.image = imgData.data.url;
          setJeu({ image: imgData.data.url })
        } else {
          setErreur('Une erreur est survenue lors du téléchargement de l\'image');
          return;  // Arrêter la fonction ici si l'image est obligatoire pour continuer
        }
      }

      const response = await fetch(`/api/admin/jeux/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setJeu(data.jeu)
        setCharged(true)
        setMessage('Modification effectuée avec succès.');
        setTimeout(() => { setMessage('modifier'); setSubmitting(false) }, 5000)
      } else {
        setMessage('Erreur lors de la modification.');
        setTimeout(() => { setMessage('modifier'); setSubmitting(false) }, 5000)
      }

    } catch (error) {
      console.error('Erreur lors de la modification du jeu :', error);
      setErreur('Erreur lors de la modification du jeu');
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
      {charged ? (
        <form onSubmit={modifierJeu}>
          <Image
            src={jeu.image}
            alt={jeu.nom}
            width={800}
            height={800}
            className="rounded-md object-contain xl:object-cover xl:h-[100%]"
          />
          <div className="p-4 bg-fond-3 rounded-md my-5 flex items-center justify-center flex-wrap">
            <input
              type="text"
              name="nom"
              id="nom"
              value={jeu.nom}
              onChange={handleInputChange}
              className="grow bg-transparent basis-[300px] p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
            />
            <textarea
              name="description"
              id="description"
              className="grow bg-transparent basis-full p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
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
              <label htmlFor="top_jeu" className="shadow-2xl p-3 rounded-md outline outline-1 duration-200 hover:outline-blue-500 outline-transparent">Jeu du moment</label>
              <input
                type="checkbox"
                name="top_jeu"
                id="top_jeu"
                className="w-[25px] h-[25px] m-2"
                checked={jeu.top_jeu}
                onChange={handleInputChange}
              />
            </div>
            <button className={`p-4 my-2 ${submitting ? 'bg-green-600 cursor-default' : 'bg-sky-500 hover:bg-blue-700'}  text-white rounded-md uppercase text-md hover:px-12 shadow-2xl duration-200 font-light`} type="submit">{message}</button>
          </div>
        </form>
      ) : (
        <div className="mx-auto w-fit mt-12">
          <PuffLoader 
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

export default ModifierJeu;
