import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import nextAuth from "next-auth";
import bcrypt from "bcrypt"

import User from '@models/user';
import { connectToDB } from "@utils/connectToDB";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                try {
                    await connectToDB();
                    const userExisting = await User.findOne({ email: credentials.email })

                    // si l'utilisateur existe pas
                    if (!userExisting && credentials.mdpv == credentials.mdp) {
                        const newUser = new User({
                            email: credentials.email,
                            pseudo: credentials.pseudo,
                            image: credentials.image,
                            mdp: credentials.mdp
                        })
                        await newUser.save()
                        return newUser
                    }

                    if (userExisting) return userExisting

                    return null
                } catch (error) {
                    console.log('une erreur est survenue dans le credentialProvider : ', error)
                    return null
                }
            }
        })
    ],

    callbacks: {
        async signIn({ account, profile, user, credentials }) {
            await connectToDB();
            if (account.provider == 'google') {
                try {
                    // check if user already exists
                    const userExists = await User.findOne({ email: profile.email });

                    // if not, create a new document and save user in MongoDB
                    if (!userExists) {
                        const newUser = new User({
                            email: profile.email,
                            pseudo: profile.name,
                            image: profile.picture
                        })
                        await newUser.save()
                        console.log("user créer avec google !")
                        return true
                    }
                    if(userExists) return true

                    return false
                } catch (error) {
                    console.log("Error checking if user exists dans google: ", error);
                    return false
                }
            }

            if (account.provider == 'credentials') {
                try {
                    const userExists = await User.findOne({ email: credentials.email });
                    if (!userExists) return false
                    // si l'utilisateur existe
                    if (typeof userExists.mdp != 'undefined' && bcrypt.compareSync(credentials.mdp, userExists.mdp)) {
                        console.log('user succes')
                        return true
                    } else {
                        console.log('erreur lors de la connexion.')
                        return false
                    }
                } catch (error) {
                    console.log("Error checking if user exists dans credentials: ", error)
                    return false
                }

            }

        },
        async session({ session }) {
            // store the user id from MongoDB to session
            await connectToDB();
            const sessionUser = await User.findOne({ email: session.user.email });
            if (sessionUser) {
                session.user = sessionUser
                session.user.id = sessionUser._id.toString()
                
                console.log('session return avec succès : ', session.user)
                return session;
            } else {
                console.log('erreur lors de l\'ouverture de la session .')
                return null
            }
        },
        async redirect({ url, baseUrl }) {
            return (baseUrl, '/dashboard')
        }
    }
}
const handler = nextAuth(authOptions)
export { handler as GET, handler as POST }