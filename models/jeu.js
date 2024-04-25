import {Schema, model, models} from "mongoose"

const JeuxSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Nom obligatoire !'],
        unique: [true, 'Nom déjà existant !'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Déscription obligatoire !']
    },
    image: {
        type: String,
        required: [true, 'Image obligatoire !']
    }

}, { timestamps: true })


const Jeu = models.Jeu || model('Jeu', JeuxSchema, 'jeux');

export default Jeu;