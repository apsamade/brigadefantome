'use client'

import { useState, useEffect, Suspense } from "react"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"
import Link from "next/link"
import DatePicker from "@components/DatePicker"
import HourPicker from "@components/HourPicker"

const AddTournoi = () => {
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [tournoiSize, setTournoiSize] = useState("");
    const [jeux, setJeux] = useState([])
    const [erreur, setErreur] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/jeux')
                const data = await response.json();
                setJeux(data);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    // ouverture du menue déroulant pour le nombre maximum de joueur
    const toggleDropdown = () => setIsOpen(!isOpen);

    // séléction du nombre de joueur max dans l'équipe
    const selectTournoiSize = (size) => {
        setTournoiSize(size);
        setIsOpen(false);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleSubmitCreateTournoi = async (e) => {
        e.preventDefault()
        setSubmitting(true)
    }

    return (
        <main className="grow">
            <h1 className='text-center text-xl uppercase py-8'>Ajouter un tournoi</h1>
            <form
                onSubmit={handleSubmitCreateTournoi}
                className="max-w-[800px] mx-auto p-4 flex items-center justify-center flex-wrap bg-fond-3 rounded-md shadow-2xl"
            >
                <input
                    type="text"
                    name="nom"
                    id="nom"
                    placeholder="Nom du tournoi"
                    className="grow basis-full p-3 rounded-md bg-transparent shadow-2xl block m-2 focus:outline-sky-600 duration-200 outline outline-1 outline-gray-400"
                />
                <div className="grow basis-[350px] m-2">
                    <DatePicker onDateSelect={handleDateSelect} />
                </div>
                <div className="grow basis-[350px] m-2">
                    <HourPicker />
                </div>

                <div className="flex items-center justify-center flex-wrap p-2">
                    <Suspense>
                        {jeux?.map((j) =>
                            <Image
                                key={j._id}
                                alt={j.nom}
                                src={j.image}
                                width={180}
                                height={80}
                                className="m-2 h-auto rounded-md shadow-2xl hover:scale-110 duration-200"
                            />
                        )}
                    </Suspense>
                </div>
                <section className="relative basis-full grow p-2">
                    <div onClick={toggleDropdown} className="p-3 rounded-md shadow-xl focus:shadow-2xl outline outline-1 duration-200 focus:outline-blue-500 outline-blue-100 cursor-pointer">
                        <div className="flex justify-between items-center">
                            {tournoiSize ? 'Nombre d\'équipe maximum ' + tournoiSize : "Choisir la taille maximale du tournoi"}
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-3 grid grid-cols-12 gap-2 rounded-md absolute left-[6px] top-full right-[6px] bg-white text-black shadow-2xl z-10"
                                >
                                    {Array.from({ length: 63 }, (_, index) => index + 2).map(size => (
                                        <motion.span
                                            key={size}
                                            className="p-2 outline outline-1 outline-sky-200 flex items-center justify-center hover:bg-sky-200 duration-200 rounded-md"
                                            onClick={() => selectTournoiSize(size)}
                                        >
                                            {size}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
                <input
                    type="text"
                    name="mode"
                    id="mode"
                    placeholder="Mode de jeu"
                    className="grow basis-[350px] p-3 rounded-md bg-transparent shadow-2xl block m-2 focus:outline-sky-600 duration-200 outline outline-1 outline-gray-400"
                />
                <input
                    type="text"
                    name="recompense"
                    id="recompense"
                    placeholder="Récompense du tournoi."
                    className="grow basis-[350px] p-3 rounded-md bg-transparent shadow-2xl block m-2 focus:outline-sky-600 duration-200 outline outline-1 outline-gray-400"
                />
                <textarea
                    name="description"
                    id="description"
                    placeholder="Description du tournoi."
                    className="p-3 rounded-md shadow-xl bg-transparent outline outline-1 outline-white focus:outline-sky-600 duration-200 basis-full grow m-2 my-5"
                ></textarea>
                <button type="submit" className="grow m-2 hover:bg-sky-500 duration-200 bg-black p-3 rounded-md shadow-2xl uppercase">Créer un tournoi</button>
            </form>
        </main>

    )
}

export default AddTournoi