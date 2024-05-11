import Tournoi from "@models/tournoi";
import Jeu from "@models/jeu";
import Team from "@models/team";
import User from "@models/user";

import { authOptions } from "@app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { connectToDB } from "@utils/connectToDB";
import { NextResponse } from "next/server";

export const GET = async(req, {params}) =>{
    const session = await getServerSession(authOptions)

    try {
        await connectToDB()
        const tournoi = await Tournoi.findById(params.id).populate({
            path: 'jeu',
            model: Jeu
        }).populate({
            path: 'teams.team_id',
            model: Team
        })
        const myTeam = await Team.findById(session.user.in_team).populate({path: 'all_players.user_id', model: User})
        return NextResponse.json({tournoi, myTeam}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la récupération du tournoi.'}, {status: 500})
    }
}
export const PATCH = async(req, {params}) =>{
    const body = await req.json()
    try {
        console.log(body)
        return NextResponse.json({message: 'Tout est ok.'}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la tentaive de mise à jour du tournoi.'}, {status: 500})
    }
}