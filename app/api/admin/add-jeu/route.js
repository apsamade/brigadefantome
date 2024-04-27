import Jeu from "@models/jeu";
import { connectToDB } from "@utils/connectToDB";
import { NextResponse } from "next/server";

export const POST = async (req) =>{
    const {nom, description, image, topJeu} = await req.json()
    console.log(topJeu)
    try {
        await connectToDB();
        if(nom && description && image){
            const newJeu = new Jeu({ nom, description, image, top_jeu: topJeu })

            await newJeu.save()
            return NextResponse.json({message: 'Jeu ajouter avec succès'}, newJeu, {status: 200})
        }else{
            return NextResponse.json({error: 'Éléments manquants.'}, {status: 400})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({error}, {status: 500})
    }
}