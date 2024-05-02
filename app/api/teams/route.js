import Team from "@models/team";
import Jeu from "@models/jeu";
import User from "@models/user";
import { connectToDB } from "@utils/connectToDB";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await connectToDB()
        const teams = await Team.find()
            .populate({
                path: 'jeux.jeu_id',  
                model: Jeu   
            })
            .populate({
                path: 'all_players.user_id', 
                model: User                 
            });
        return NextResponse.json(teams, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue lors de la récupération des équipes.' }, { status: 500 })
    }
}