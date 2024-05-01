import { connectToDB } from "@utils/connectToDB";
import Jeu from "@models/jeu";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {

    try {
        await connectToDB()
        const jeu = await Jeu.findById(params.id);
        console.log('jeu existant ? ', jeu)
        console.log('ici les params', params)
        return NextResponse.json(jeu, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue' }, { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()
        await Jeu.findByIdAndDelete(params.id)
        return NextResponse.json({ message: 'Jeu supprimer avec succès' }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue lors de la suppression du jeu' }, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const { nom, image, description, top_jeu } = await req.json()
    console.log('top jeu ?????', top_jeu)
    console.log('les informations sont ok ? ', nom, image, description, top_jeu)
    try {
        if (nom) {
            await Jeu.findByIdAndUpdate(params.id, {
                $set: {
                    nom: nom
                }
            })
            console.log('Nom changé avec succès')
        }
        if (image) {
            await Jeu.findByIdAndUpdate(params.id, {
                $set: {
                    image: image
                }
            })
            console.log('Image changé avec succès')
        }
        if (description) {
            await Jeu.findByIdAndUpdate(params.id, {
                $set: {
                    description: description
                }
            })
            console.log('Déscription changé avec succès')
        }
        await Jeu.findByIdAndUpdate(params.id, {
            $set: {
                top_jeu: top_jeu
            }
        })
        console.log('Top Jeu du moment changé avec succès')

        const jeu = await Jeu.findById(params.id)
        console.log('ce jeu', jeu)
        return NextResponse.json({ jeu }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: error }, { status: 500 })
    }
}