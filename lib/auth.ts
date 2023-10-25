import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/signin',
    },
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        updateAge: 24 * 60 * 60,
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!existingUser) return null;

                const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password!)

                if (!isPasswordValid) return null;

                return {
                    id: existingUser.id.toString(),
                    email: existingUser.email,
                    name: existingUser.name,
                }

            }
        })
    ],
    

}