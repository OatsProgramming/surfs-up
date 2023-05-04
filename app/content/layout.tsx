import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { SignOut } from "../components/Buttons/Buttons"

export async function generateMetadata(): Promise<Metadata> {
    const session = await getServerSession(authOptions)
    if (!session) return {}

    return {
        title: session.user?.email
    }
}

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("Seems like you're not signed in.")

    return (
        <div>
            {children}
            <SignOut />
        </div>
    )
}