import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import nextAuth from "next-auth";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

import User from '@models/user';
import { connectToDB } from "@utils/connectToDB";

export const authOptions = {
    pages: {
        error: '/connexion',
        signIn: '/connexion'
    },
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

                    function genererNumeroUnique() {
                        return Math.floor(Math.random() * 10000); // Génère un numéro aléatoire entre 0 et 9999
                    }

                    // si l'utilisateur existe pas
                    if (!userExisting && credentials.mdpv == credentials.mdp) {
                        let pseudo = credentials.pseudo;
                        let hashtag = genererNumeroUnique();

                        let pseudoExistsWithHashtag = await User.findOne({ pseudo: pseudo, hashtag: hashtag });
                        while (pseudoExistsWithHashtag) {
                            // Si le pseudo avec ce hashtag existe déjà, génère un nouveau hashtag
                            hashtag = genererNumeroUnique();
                            pseudoExistsWithHashtag = await User.findOne({ pseudo: pseudo, hashtag: hashtag });
                            console.log(pseudoExistsWithHashtag)
                        }

                        const newUser = new User({
                            email: credentials.email,
                            pseudo: pseudo,
                            image: credentials.image,
                            mdp: credentials.mdp,
                            admin: credentials.email === process.env.MAILADMIN, // Vérifie si l'utilisateur a l'email de l'admin
                            hashtag: hashtag
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
                    function genererNumeroUnique() {
                        return Math.floor(Math.random() * 10000); // Génère un numéro aléatoire entre 0 et 9999
                    }

                    // check if user already exists
                    const userExists = await User.findOne({ email: profile.email });

                    // if not, create a new document and save user in MongoDB
                    if (!userExists) {
                        let pseudo = profile.name;
                        let hashtag = genererNumeroUnique();

                        console.log(pseudo)
                        // Vérifie si le pseudo avec ce hashtag existe déjà
                        let pseudoExistsWithHashtag = await User.findOne({ pseudo: pseudo, hashtag: hashtag });
                        while (pseudoExistsWithHashtag) {
                            // Si le pseudo avec ce hashtag existe déjà, génère un nouveau hashtag
                            hashtag = genererNumeroUnique();
                            pseudoExistsWithHashtag = await User.findOne({ pseudo: pseudo, hashtag: hashtag });
                            console.log(pseudoExistsWithHashtag)
                        }

                        // Crée un nouvel utilisateur avec le pseudo et le hashtag uniques
                        const newUser = new User({
                            email: profile.email,
                            pseudo: pseudo,
                            image: profile.picture,
                            admin: profile.email === process.env.MAILADMIN,
                            hashtag: hashtag
                        });

                        // Enregistre le nouvel utilisateur dans la base de données
                        await newUser.save();
                        console.log("Utilisateur créé avec succès !");
                        return true;
                    }
                    if (userExists) return true

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
        async jwt({ token, user, trigger, session }) {
            await connectToDB()
            const userReturn = await User.findOne({ email: token.email })
            if (userReturn) { token.user = userReturn; }
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token.user
            return session;
        },
    }
}
const handler = nextAuth(authOptions)
export { handler as GET, handler as POST }