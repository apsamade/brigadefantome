'use client'

import { useState } from "react"

const AddGame = () => {
  return (
    <main className="grow">
      <h1 className='text-center text-xl uppercase py-8'>Ajouter un jeux</h1>
      <form className='bg-white w-full max-w-6xl flex items-center justify-center flex-wrap text-black shadow-2xl rounded-md p-4 mx-auto'>
        <input
          className="p-3 rounded-md shadow-xl focus:shadow-2xl grow basis-[250px] m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
          type="text"
          name="nom"
          id="nom"
          placeholder='Nom du jeux'
          required
        />
        <textarea
          className="p-3 rounded-md shadow-xl focus:shadow-2xl basis-full grow m-2 outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100"
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
          value="Ajouter un nouveau jeu"
          className="p-3 rounded-md shadow-xl hover:shadow-2xl basis-full grow m-2 duration-200 cursor-pointer text-white uppercase font-light hover:bg-sky-500 bg-black"
        />
      </form>
    </main>
  )
}

export default AddGame