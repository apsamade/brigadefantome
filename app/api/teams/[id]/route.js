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
        const myTeam = await Team.findById(params.id)
        const session = await getServerSession(authOptions)

        myTeam.all_players.forEach(async p => {
            await User.findByIdAndUpdate(p.user_id, {
                $unset: {
                    in_team: 1
                }
            })
        })
        session.user.in_team = undefined;
        await Team.findByIdAndDelete(params.id)
        return NextResponse.json({ message: 'Équipe supprimé avec succès.', supprimer: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue', error }, { status: 500 })
    }
}
export const PATCH = async (req, { params }) => {
    const requestBody = await req.json()
    console.log('le request body ici : ', requestBody)

    const session = await getServerSession(authOptions)
    try {
        await connectToDB()
        if (requestBody.join) {
            // trouver si le joueur est deja dans une team
            if (session.user.in_team) return NextResponse.json({ erreur: 'Vous avez déjà une équipe. Quittez votre équipe actuelle avant d\'en créer ou rejoindre une nouvelle.' }, { status: 409 })

            const myTeam = await Team.findById(params.id)
            if (myTeam.mdp) {
                if (!requestBody.mdp || !bcrypt.compareSync(requestBody.mdp, myTeam.mdp)) {
                    return NextResponse.json({ erreur: 'Mot de passe incorrect.' }, { status: 409 })
                }
            }
            if (myTeam.all_players.length >= myTeam.team_size) return NextResponse.json({ erreur: 'Équipe complète, faite une demande au chef pour agrandir la taille de l\'équie.' }, { status: 409 })

            myTeam.all_players.push({ user_id: session.user._id })

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

            return NextResponse.json(myTeam, { status: 200 })
        }
        if (requestBody.leave) {
            const myTeam = await Team.findById(params.id)

            if (myTeam._id.toString() != session.user.in_team.toString()) return NextResponse.json({ erreur: 'Vous ne faite déjà plus partis de cette équipe.' }, { status: 409 })
            
            myTeam.all_players = myTeam.all_players.filter(player => player.user_id.toString() !== session.user._id.toString())

            if (myTeam.all_players.length >= 1 && !myTeam.all_players.find(p => p.chef = true)) myTeam.all_players[0].chef = true
            // Retire le joueur de chaque jeu dans l'équipe
            myTeam.jeux.forEach(jeu => {
                jeu.players = jeu.players.filter(player => player.user_id.toString() !== session.user._id.toString())
            })
            await User.findByIdAndUpdate(session.user._id, {
                $unset: {
                    in_team: 1
                }
            })
            session.user.in_team = undefined;
            await myTeam.save()
            if(myTeam.all_players <= 0){
                await Team.findByIdAndDelete(params.id)
                console.log('Supprimé car plus personnes dans l\'équipe ...')
                return NextResponse.json({message: 'Équipe supprimer.'}, { status: 200 })
            }else{
                return NextResponse.json(myTeam, { status: 200 })
            } 
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue' }, { error }, { status: 500 })
    }
}