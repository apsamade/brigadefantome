import { connectToDB } from "@utils/connectToDB";
import Tournoi from "@models/tournoi";
import Jeu from "@models/jeu";
import Team from "@models/team";
import { NextResponse } from "next/server";

export const GET = async (req) =>{
    try {
        await connectToDB()
        const tournois = await Tournoi.find().populate({
            path: 'jeu',
            model: Jeu
        }).populate({
            path: 'teams.team_id',
            model: Team
        })
        return NextResponse.json(tournois, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreure est survenue lors de la récupération des tournois.' }, { status: 500 })
    }
}