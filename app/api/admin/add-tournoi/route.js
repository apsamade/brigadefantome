import { connectToDB } from "@utils/connectToDB";
import Tournoi from "@models/tournoi";
import { NextResponse } from "next/server";

export const POST = async(req) =>{
    const bodyRequest = await req.json()
    try {
        console.log(bodyRequest)
        return NextResponse.json({message: 'all good'}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({erreur: 'Une erreur est survenue lors de la création du tournoi.'}, {status: 500})
    }
}