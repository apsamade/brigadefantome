import { connectToDB } from "@utils/connectToDB";
import Jeu from "@models/jeu";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const jeu = await Jeu.findById(params.id);
        return NextResponse.json(jeu, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue' }, { status: 500 })
    }
}
