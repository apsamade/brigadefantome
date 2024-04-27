import { connectToDB } from "@utils/connectToDB";
import Jeu from "@models/jeu";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const GET = async (req, { params }) =>{

    try {
        await connectToDB()
        const jeu = await Jeu.findById(params.id);
        console.log('jeu existant ? ', jeu)
        console.log('ici les params', params)
        return NextResponse.json(jeu, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue'},  {status: 500})
    }
}

export const DELETE = async (req, {params}) =>{
    try {
        await connectToDB()
        await Jeu.findByIdAndDelete(params.id)
        return NextResponse.json({message: 'Jeu supprimer avec succès'}, {status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la suppression du jeu'},  {status: 500})
    }
}