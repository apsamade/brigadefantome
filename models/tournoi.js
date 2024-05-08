import { Schema, model, models } from "mongoose"

const TournoiSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Nom obligatoire !'],
        trim: true,
    },
    jeu: {
        type: Schema.Types.ObjectId,
        ref: 'Jeu'
    },
    date: {
        type: Date,
        required: [true, 'Date obligatoire']
    },
    heure: {
        type: String,
        required: [true, 'Heure obligatoire !']
    },
    description: {
        type: String,
        required: [true, 'Déscription obligatoire !']
    },
    max_teams: {
        type: Number,
        required: [true, 'Nombre d\'équipe maximum obligatoire !']
    },
    mode: {
        type: String,
        required: [true, 'Mode de jeux obligatoire']
    },
    teams: [
        {
            team_id: {
                type: Schema.Types.ObjectId,
                ref: 'Team'
            },
            team_name: {
                type: String
            }
        }
    ],
    recompense: {
        type: String,
        required: true
    },
    fin_inscription: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })


const Tournoi = models.Tournoi || model('Tournoi', TournoiSchema, 'tournois');

export default Tournoi;