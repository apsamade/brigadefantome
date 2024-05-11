import { connectToDB } from "@utils/connectToDB";
import Tournoi from "@models/tournoi";
import Jeu from "@models/jeu";
import Team from "@models/team";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
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
        return NextResponse.json(tournoi, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue lors de la récupération du tournoi' }, { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()
        await Tournoi.findByIdAndDelete(params.id)
        return NextResponse.json({ message: 'Tournoi supprimé avec succès.' }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue lors de la suppression du tournoi' }, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {
    const body = await req.json()
    try {
        await connectToDB()
        if (body.gameSelected) {
            await Tournoi.findByIdAndUpdate(params.id, {
                $set: {
                    jeu: body.gameSelected
                }
            })
        }
        if (body.tournoiSize) {
            await Tournoi.findByIdAndUpdate(params.id, {
                $set: {
                    max_teams: body.tournoiSize
                }
            })
        }
        if (body.teamSize) {
            await Tournoi.findByIdAndUpdate(params.id, {
                $set: {
                    max_player_team: body.teamSize
                }
            })
        }
        if (body.selectedDate) {
            await Tournoi.findByIdAndUpdate(params.id, {
                $set: {
                    date: body.selectedDate
                }
            })
        }
        if (body.selectedHour) {
            await Tournoi.findByIdAndUpdate(params.id, {
                $set: {
                    heure: body.selectedHour
                }
            })
        }
        if (body.nom) {
            await Tournoi.findByIdAndUpdate(params.id, {
                $set: {
                    nom: body.nom
                }
            })
        }
        if (body.mode) {
            await Tournoi.findByIdAndUpdate(params.id, {
                $set: {
                    mode: body.mode
                }
            })
        }
        if (body.recompense) {
            await Tournoi.findByIdAndUpdate(params.id, {
                $set: {
                    recompense: body.recompense
                }
            })
        }
        await Tournoi.findByIdAndUpdate(params.id, {
            $set: {
                fin_inscription: body.fin_inscription
            }
        })
        if (body.description) {
            await Tournoi.findByIdAndUpdate(params.id, {
                $set: {
                    description: body.description
                }
            })
        }
        console.log('le body : ', body)
        const tournoi = await Tournoi.findById(params.id)
        console.log('le tournoi : ', tournoi)

        return NextResponse.json(tournoi, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ erreur: 'Une erreur est survenue lors de la mise à jour du tournoi' }, { status: 500 })
    }
}