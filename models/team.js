import { Schema, model, models } from "mongoose"
import bcrypt from "bcrypt"

const TeamSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Nom obligatoire !'],
        unique: [true, 'Nom déjà existant !'],
        trim: true,
    },
    all_players: [
        {
            chef: {
                type: Boolean,
                default: false,
            },
            user_id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        }
    ],
    jeux: [
        {
            jeu_id: {
                type: Schema.Types.ObjectId,
                ref: 'Jeu'
            },
            players: [
                {
                    user_id: {
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    jeu_pseudo: {
                        type: String,
                        required: [true, 'Nom du jeu obligatoire']
                    }
                }
            ],
        }
    ],
    team_size: {
        type: Number,
        required: [true, 'Nombre de joueurs maximum dans l\'équipe obligatoire !']
    },
    mdp: {
        type: String,
    }

}, { timestamps: true })

TeamSchema.pre('save', async function (next) {
    if (!this.isModified('mdp')) return next();
    const hash = await bcrypt.hash(this.mdp, 10)
    this.mdp = hash;
    next();
})
const Team = models.Team || model('Team', TeamSchema, 'teams');

export default Team;