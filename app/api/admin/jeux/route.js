import Jeu from "@models/jeu";
import { connectToDB } from "@utils/connectToDB";
import { NextResponse } from "next/server";

export const GET = async (req) =>{
    try {
        await connectToDB();
        const jeux = await Jeu.find()
        return NextResponse.json(jeux, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Aucun jeu trouvée.'}, {status: 500})
    }
}