import Team from "@models/team";
import Jeu from "@models/jeu";
import User from "@models/user";
import bcrypt from "bcrypt"
import { connectToDB } from "@utils/connectToDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

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
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()
        await Team.findByIdAndDelete(params.id)
        return NextResponse.json({ message: 'Équipe supprimé avec succès.' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue' }, { error }, { status: 500 })
    }
}
export const PATCH = async (req, { params }) => {
    const requestBody = await req.json()
    const session = await getServerSession(authOptions)
    try {
        await connectToDB()
        // trouver si le joueur est deja dans une team
        if (session.user.in_team) return NextResponse.json({ erreur: 'Vous avez déjà une équipe. Quittez votre équipe actuelle avant d\'en créer ou rejoindre une nouvelle.' }, { status: 409 })

        const myTeam = await Team.findById(params.id)
        if (myTeam.mdp) {
            if (!requestBody.mdp || !bcrypt.compareSync(requestBody.mdp, myTeam.mdp)) {
                return NextResponse.json({ erreur: 'Mot de passe incorrect.' }, { status: 409 })
            }
        }
        if(myTeam.all_players.length >= myTeam.team_size) return NextResponse.json({ erreur: 'Équipe complète, faite une demande au chef pour agrandir la taille de l\'équie.' }, { status: 409 })

        myTeam.all_players.push({user_id: session.user._id})

        requestBody.jeux.forEach(jeu => {
            const jeuDansEquipe = myTeam.jeux.find(jeuEquipe => jeuEquipe.jeu_id.toString() === jeu.jeu_id.toString());
            if (jeuDansEquipe) {
                jeuDansEquipe.players.push({
                    user_id: jeu.players.user_id,
                    jeu_pseudo: jeu.players.jeu_pseudo,
                });
            }
        })
        
        await User.findByIdAndUpdate(session.user._id, {
            $set: {
                in_team: myTeam._id
            }
        })
        session.user.in_team = myTeam._id;
        await myTeam.save()

        return NextResponse.json({ team: await Team.findById(params.id) }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue' }, { error }, { status: 500 })
    }
}