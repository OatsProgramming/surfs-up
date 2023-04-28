import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prismadb from '@/lib/prismadb'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            // form
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
                // When signing in, check for any missing inputs

                if (!(credentials?.email && credentials.username) || credentials.password) return null

                // Check db to see info exists and pw matches
                const user = await prismadb.user.findUnique({
                    where: { email: credentials.email }
                })

                // Type narrowing
                if (!user) return null
                else if (!await compare(credentials.password, user.hashedPassword)) return null

                return user
            }
        })
    ]
}