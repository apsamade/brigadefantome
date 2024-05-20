import Tournoi from "@models/tournoi";
import Jeu from "@models/jeu";
import Team from "@models/team";
import User from "@models/user";

import { authOptions } from "@app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { connectToDB } from "@utils/connectToDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
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
        const myTeam = await Team.findById(session.user.in_team).populate({ path: 'all_players.user_id', model: User })
        return NextResponse.json({ tournoi, myTeam }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue lors de la récupération du tournoi.' }, { status: 500 })
    }
}
export const PATCH = async (req, { params }) => {
    const body = await req.json()
    console.log(body)
    try {
        if (body.playerSelected && body.tournoiId && body.teamId) {
            await Tournoi.findByIdAndUpdate(body.tournoiId, {
                $addToSet: {
                    'teams': {
                        team_id: body.teamId,
                        players: body.playerSelected
                    }
                }
            })
            console.log('Équipe inscrite avec succès.')
            const tournoi = await Tournoi.findById(body.tournoiId).populate({
                path: 'jeu',
                model: Jeu
            }).populate({
                path: 'teams.team_id',
                model: Team
            })
            return NextResponse.json({ message: 'Équipe inscrite avec succès.', tournoi }, { status: 200 })
        }
        return NextResponse.json({ erreur: 'Une erreur est survenue lors de la tentative d\'inscription.' }, { satus: 409 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue lors de la tentaive de mise à jour du tournoi.' }, { status: 500 })
    }
}