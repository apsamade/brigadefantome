'use client'

import { useState } from "react"

const AddGame = () => {
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('Ajouter')
  const [erreur, setErreur] = useState('')

  const newGameSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('En cours d\'ajout ...')

    const nom = e.target.nom.value;
    const description = e.target.description.value;
    const image = e.target.image.files[0];
    const topJeu = e.target.top_jeu.checked;
    console.log(topJeu)

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=e237e8cd5a4f302b941cf8c6eff045b5', {
        method: 'POST',
        body: formData,
      });

      const imgbbResponse = await response.json();

      if (imgbbResponse) {
        const res = await fetch('/api/admin/add-jeu', {
          method: 'POST',
          body: JSON.stringify({ nom, description, topJeu, image: imgbbResponse.data.url })
        })

        if (res.ok) {
          e.target.reset();
          setMessage('Jeu Ajouter !')
          setTimeout(() => {
            setSubmitting(false)
            setMessage('Ajouter')
          }, 12000)
        } else {
          setErreur(res.error)
          setSubmitting(false)
          setTimeout(() => {
            setErreur('')
          }, 12000)
        }
      }
    } catch (error) {
      console.log(error)
      setErreur(error)
      setSubmitting(false)
      setTimeout(() => {
        setErreur('')
      }, 12000)
    }
  };
  return (
    <main className="grow">
      <h1 className='text-center text-xl uppercase py-8'>Ajouter un jeux</h1>
      <form
        onSubmit={newGameSubmit}
        className='bg-fond-3 text-white w-full max-w-6xl flex items-center justify-center flex-wrap shadow-2xl rounded-md p-4 mx-auto'
      >
        <input
          className="p-3 bg-transparent rounded-md shadow-xl focus:shadow-2xl grow basis-[250px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
          type="text"
          name="nom"
          id="nom"
          placeholder='Nom du jeux'
          required
        />
        <div className="flex items-center justify-left basis-full grow p-3">
          <label htmlFor="top_jeux">Jeu du moment</label>
          <input
            type="checkbox"
            name="top_jeu"
            id="top_jeu"
            className="w-[25px] h-[25px] m-2"
          />          
        </div>

        <textarea
          className="p-3 bg-transparent rounded-md shadow-xl focus:shadow-2xl basis-full grow m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
          name="description"
          id="description"
          placeholder='Déscription du jeux'
          required
        ></textarea>
        <input
          className="p-3 rounded-md shadow-xl focus:shadow-2xl basis-[250px] grow xl:max-w-full w-[100%] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
          type="file"
          name="image"
          id="image"
          required />
        <input
          type="submit"
          disabled={submitting}
          className={message == 'Jeu Ajouter !' ?
            "p-3 rounded-md shadow-xl hover:shadow-2xl basis-full grow m-2 duration-200 text-white uppercase font-light bg-green-600"
            : "p-3 rounded-md shadow-xl hover:shadow-2xl basis-full grow m-2 duration-200 cursor-pointer text-white uppercase font-light hover:bg-sky-500 bg-black"}

          value={message}
        />
        {erreur &&
          <p className='message text-center xl:text-left basis-full p-2 text-red-600 font-normal'>
            {erreur}
          </p>
        }
      </form>
    </main>
  )
}

export default AddGame