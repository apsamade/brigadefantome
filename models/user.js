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
        type: String
    },
    pseudo: {
        type: String,
        unique: true,
        trim: true
    },
    mdp: {
        type: String,
        trim: true
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