import { connectToDB } from "@utils/connectToDB";
import Tournoi from "@models/tournoi";
import { NextResponse } from "next/server";

export const POST = async(req) =>{
    const bodyRequest = await req.json()
    try {
        if(bodyRequest.nom && bodyRequest.selectedDate && bodyRequest.selectedHour && bodyRequest.gameSelected && bodyRequest.mode && bodyRequest.description && bodyRequest.recompense && bodyRequest.tournoiSize){
            const newTournoi = new Tournoi({
                nom: bodyRequest.nom,
                date: bodyRequest.selectedDate,
                heure: bodyRequest.selectedHour,
                jeu: bodyRequest.gameSelected,
                mode: bodyRequest.mode,
                description: bodyRequest.description,
                recompense: bodyRequest.recompense,
                max_teams: bodyRequest.tournoiSize,
                max_player_team: bodyRequest.teamSize
            })
            await newTournoi.save()
            console.log('Tournoi créer avec succès !')
            return NextResponse.json({message: 'Tournoi créer avec succès.', newTournoi}, {status: 200})
        }else{
            console.log('Champs manquant lors de la création du tournoi.')
            return NextResponse.json({erreur: "Des informations manquantes n'a pu être envoyé sur le serveur."}, {status: 409})
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la création du tournoi.'}, {status: 500})
    }
}