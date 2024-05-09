'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

const ModifierTournoi = ({ params }) => {
  const [tournoi, setTournoi] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [erreur, setErreur] = useState('')
  const [message, setMessage] = useState('Modifier')


  useEffect(() => {
    const fetchTournoi = async () => {
      const response = await fetch(`/api/admin/tournois/${params.id}`);
      const data = await response.json();
      setTournoi(data);
      console.log('datas : ', data)
    };
    fetchTournoi();
  }, [params.id]);



  if (tournoi.erreur) {
    return (
      <section className="grow">
        <p className="mx-auto text-center uppercase text-xl pt-32">Aucun tournoi trouvé sur cette route mon frérot !</p>
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
      {tournoi &&
        <form>
          <Image
            src={tournoi?.jeu?.image}
            alt={tournoi?.jeu?.nom}
            width={800}
            height={800}
            className="rounded-md object-contain xl:object-cover xl:h-[100%]"
          />
          <div className="p-4 bg-fond-3 rounded-md my-5 flex items-center justify-center flex-wrap">
            <input
              type="text"
              name="nom"
              id="nom"
              value={tournoi.nom}
              className="grow bg-transparent basis-[300px] p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
            />
            <textarea
              name="description"
              id="description"
              className="grow bg-transparent basis-full p-3 m-2 rounded-md shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
              value={tournoi.description}
            />
            <button className={`p-4 my-2 w-[95%] ${submitting ? 'bg-green-600 cursor-default' : 'bg-sky-500 hover:bg-blue-700'}  text-white rounded-md uppercase text-md hover:w-full m-2 shadow-2xl duration-200 font-light`} type="submit">{message}</button>
          </div>
        </form>
      }
    </section>
  );
}

export default ModifierTournoi;
