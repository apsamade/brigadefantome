import { connectToDB } from "@utils/connectToDB";
import Tournoi from "@models/tournoi";
import Jeu from "@models/jeu";
import Team from "@models/team";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) =>{
    const id = params.id
    try {
        await connectToDB()
        const tournoi = await Tournoi.findById(id).populate({
            path: 'jeu',
            model: Jeu
        }).populate({
            path: 'teams.team_id',
            model: Team
        })
        return NextResponse.json(tournoi, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la récupération du tournoi'}, {status: 500})
    }
}

export const DELETE = async(req, { params }) => {
    try {
        await connectToDB()
        await Tournoi.findByIdAndDelete(params.id)
        return NextResponse.json({message: 'Tournoi supprimé avec succès.'}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la suppression du tournoi'}, {status: 500})
    }
}

export const PATCH = async (req, {params}) =>{
    const body = await req.json()
    try {
        await connectToDB()
        const tournoi = await Tournoi.findById(params.id)
        console.log(body)
        return NextResponse.json({ body, tournoi }, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la mise à jour du tournoi'}, {status: 500})
    }
}