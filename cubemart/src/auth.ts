import NextAuth from "next-auth"
import Credential from "next-auth/providers/credentials"
import connectDb from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { image } from "motion/react-client";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
     Credential({
         credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
        async authorize(credentials, request) {
            
                await connectDb();
               const email= credentials.email;
               const password= credentials.password as string;
               const user= await User.findOne({email})
              
               if(!user){
                throw new Error("No user found with this email");
               }
            const ismatch = await bcrypt.compare(password, user.password);
            if(!ismatch){
                throw new Error("Incorrect password");
            }
               return {
                id:user._id.toString(),
                name:user.name,
                email:user.email,
                role:user.role
               }
        },
     }),
     Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     }),
  ],
  callbacks: {
    //token ke ander user ka data store krta hai
    async signIn({user,account}){
        if(account?.provider==="google"){
            if(!user.email) return false;
            try {
                await connectDb();
                let dbUser= await User.findOne({email:user.email});
                if(!dbUser){
                    dbUser= await User.create({
                        name:user.name || "Google User",
                        email:user.email,
                        image:user.image,
                        role:"user"
                    })
                }
                user.id= dbUser._id.toString();
                user.role= dbUser.role;
            } catch (error) {
                console.error("Google sign-in database error:", error);
                return false;
            }
        }
        return true;
    },
    async redirect({url, baseUrl}) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {}
      return baseUrl;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id,
        token.name = user.name,
        token.email = user.email,
        token.role = user.role;
      }
    if(trigger=="update"){
      token.role=session.role
    }

      return token;

    },
    session({ session, token }) {
        if(session.user){
            session.user.id= token.id as string,
            session.user.name= token.name as string,
            session.user.email= token.email as string,
            session.user.role= token.role as string;
        }
        return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },
  secret: process.env.AUTH_SECRET,  
})