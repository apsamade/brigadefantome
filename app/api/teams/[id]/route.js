import Team from "@models/team";
import Jeu from "@models/jeu";
import User from "@models/user";
import { connectToDB } from "@utils/connectToDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        const team = await Team.findById(params.id)
            .populate({
                path: 'jeux.jeu_id',
                model: Jeu
            })
            .populate({
                path: 'all_players.user_id',
                model: User
            });
        return NextResponse.json(team, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue lors de la récupération de l\'équipe' }, { status: 500 })
    }
}