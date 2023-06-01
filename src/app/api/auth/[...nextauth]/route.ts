import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            // @ts-ignore
            clientId: process.env.GOOGLE_ID,
            // @ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        signIn: async (props) => {
            try {
                await connectToDB()

                const userExists = await User.findOne({email: props.profile?.email})

                if(!userExists){
                    await User.create({
                        email: props.profile?.email,
                        username: props.profile?.name?.replace(" ","").toLowerCase(),
                        //@ts-ignore
                        image: props.profile?.picture
                    })
                }

                return true
            } catch (error) {
                return false
            }
        },
        session: async (props) => {
            const sessionUser = await User.findOne({email: props.session.user?.email})

            if(props.session.user){
                //@ts-ignore
                props.session.user.id = sessionUser._id.toString()
            }

            return props.session
        }
    }
    
})

export {
    handler as GET,
    handler as POST
}