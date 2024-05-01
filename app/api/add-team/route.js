import { connectToDB } from "@utils/connectToDB";
import Team from "@models/team"
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req) =>{
    const session = await getServerSession(authOptions)
    const body  = await req.json()

    try {
        await connectToDB()
        // trouver si le joueur est deja dans une team
        const existsTeam = await Team.findOne({ "jeux.players.user_id": session.user._id.toString() });

        if(existsTeam) return NextResponse.json({erreur: 'Vous avez déjà une équipe. Quittez votre équipe actuelle avant d\'en créer ou rejoindre une nouvelle.'}, {status: 409})
        const jeux = body.jeux.map(jeu => ({
            jeu_id: jeu.jeu_id,
            players: jeu.players.map(player => ({
                user_id: player.user_id,
                chef: player.chef,
                jeu_pseudo: player.jeu_pseudo
            }))
        }));
    
        // Créer un nouvel objet Team
        const newTeam = new Team({
            nom: body.nom,
            jeux: jeux,
            team_size: body.teamSize,
        });
        if(body.mdp){
            newTeam.mdp = body.mdp
        }
        await newTeam.save();
        console.log('Équipe créée avec succès :', newTeam);
        
        return NextResponse.json({newTeam}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur : error}, {status: 500})
    }
}