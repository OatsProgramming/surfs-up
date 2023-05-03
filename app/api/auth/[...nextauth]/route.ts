import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prismadb from '@/lib/prismadb'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
// import Google from 'next-auth/providers/google'
// import Github from 'next-auth/providers/github'
import NextAuth from 'next-auth/next'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt'
    },
    providers: [
        // Other providers not supported yet apparently with Route Handlers
        // Google({
        //     clientId: process.env.GOOGLE_CLIENT_ID!,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // }),
        // Github({
        //     clientId: process.env.GITHUB_CLIENT_ID!,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET!
        // }),
        Credentials({
            // form ( used as default )
            name: 'Sign In',
            // form elements
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Mr.Sandman'
                },
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'adam@email.com'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            authorize: async (credentials) => {
                console.log(credentials)
                // When signing in, check for any missing inputs
                if (!(credentials?.email && credentials.username) || !credentials.password) return null

                // Check db to see info exists and pw matches
                const user = await prismadb.user.findFirst({
                    where: { 
                        OR: [{
                            email: credentials.email
                        }, {
                            username: credentials.username
                        }]
                     }
                })

                // Type narrowing
                if (!user) return null
                else if (!await compare(credentials.password, user.hashedPassword)) return null

                return user
            }
        }),
    ],
    // Used if want to have customized auth pages (e.g signIn page)
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                return {
                    ...token, 
                    id: user.id
                }
            }
            return token
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }