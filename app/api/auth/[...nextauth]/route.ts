//NextAuth
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
//Interface
import NextAuth, { AuthOptions } from "next-auth";
//PrismaDB
import prismaDB from '@/lib/prismaDB'
//Bcrypt
import { compare } from 'bcrypt'

//NextAuth options object
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: "Password",
          type: 'password'
        }
      },
      async authorize(credentials) {

        if(!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        //find user unique email
        const user = await prismaDB.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user || !user.hashPassword) {
          throw new Error('Email does not exist')
        }

        const isCorrectPassword = await compare(credentials.password, user.hashPassword)

        if(!isCorrectPassword) {
          throw new Error('Incorrect password')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  // debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismaDB),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET
}

//NextAuth
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }