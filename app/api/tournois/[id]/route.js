import Tournoi from "@models/tournoi";
import Jeu from "@models/jeu";
import Team from "@models/team";
import { connectToDB } from "@utils/connectToDB";
import { NextResponse } from "next/server";

export const GET = async(req, {params}) =>{
    try {
        await connectToDB()
        const tournoi = await Tournoi.findById(params.id).populate({
            path: 'jeu',
            model: Jeu
        }).populate({
            path: 'teams.team_id',
            model: Team
        })
        return NextResponse.json(tournoi, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la récupération du tournoi.'}, {status: 500})
    }
}
export const PATCH = async(req, {params}) =>{
    try {
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la tentaive de mise à jour du tournoi.'}, {status: 500})
    }
}