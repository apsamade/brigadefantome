import {Schema, model, models} from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email obligatoire !'],
        unique: [true, 'Email déjà existant !'],
        trim: true,
        lowercase: true
    },
    image: {
        type: String,
        trim: true,
        required: [true, 'Un pseudo est obligatoire !']
    },
    pseudo: {
        type: String,
        trim: true,
        required: [true, 'Un pseudo est obligatoire !'],
    },
    mdp: {
        type: String,
        trim: true
    },
    hashtag: {
        type: String,
        required: [true, 'Chaque utilisateur doit avoir un #']
    },
    admin: {
        type: Boolean,
        default: false
    },
    in_team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }

}, { timestamps: true })

UserSchema.pre('save', async function(next) {
    if(!this.isModified('mdp')) return next();
    const hash = await bcrypt.hash(this.mdp, 10)
    this.mdp = hash;
    next();
})

const User = models.User || model('User', UserSchema, 'users');

export default User;