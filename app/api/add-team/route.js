import { connectToDB } from "@utils/connectToDB";
import Team from "@models/team"
import User from "@models/user";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req) => {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    try {
        await connectToDB()
        // trouver si le joueur est deja dans une team
        if (session.user.in_team) return NextResponse.json({ erreur: 'Vous avez déjà une équipe. Quittez votre équipe actuelle avant d\'en créer ou rejoindre une nouvelle.' }, { status: 409 })

        // trouver si ce nom d'équipe existe déjà
        const nameTeamExist = await Team.findOne({ nom: body.nom })
        if (nameTeamExist) return NextResponse.json({ erreur: 'Ce nom d\'équipe déjà utilisé.' }, { status: 409 })

        const jeux = body.jeux.map(jeu => ({

            jeu_id: jeu.jeu_id,
            players: {
                user_id: jeu.players.user_id,
                jeu_pseudo: jeu.players.jeu_pseudo
            }

        }));
        // Créer un nouvel objet Team
        const newTeam = new Team({
            nom: body.nom,
            jeux: jeux,
            team_size: body.teamSize,
            all_players: { user_id: session.user._id.toString(), chef: true }
        });
        if (body.mdp) {
            newTeam.mdp = body.mdp
        }
        await User.findByIdAndUpdate(session.user._id, {
            $set: {
                in_team: newTeam._id
            }
        })
        session.user.in_team = newTeam._id;
        await newTeam.save();
        console.log('Équipe créée avec succès :', newTeam);

        return NextResponse.json({ newTeam }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: error }, { status: 500 })
    }
}