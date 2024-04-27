'use client'

import { useEffect, useState } from "react"
import Image from "next/image"

const ModifierJeu = ({ params }) => {
  const [jeu, setJeu] = useState({})

  useEffect(() => {
    const fetchJeu = async () => {
      const response = await fetch(`/api/admin/jeux/${params.id}`, {
        method: 'GET'
      })
      const data = await response.json()
      setJeu(data)
    }
    fetchJeu()
  }, [])

  if (jeu) {
    return (
      <section className="grow">
        <div className="">
          <Image
            src={jeu.image}
            alt={jeu.nom}
            width={800}
            height={800}
            className="rounded-md object-contain xl:object-cover xl:h-[100%]"
          />
          <form className="">
            <h3 className="text-3xl">{jeu.nom}</h3>
            <p className="mt-1 mb-4 font-light text-ellipsis">{jeu.description}</p>
            <button className="p-4 my-2 bg-sky-500 rounded-md uppercase text-md hover:px-12 shadow-2xl duration-200 hover:bg-blue-700 font-light" type="submit">Modifier</button>

          </form>
        </div>
      </section>
    )
  } else {
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
    )
  }
}

export default ModifierJeu