import { Metadata } from "next"
import { getServerSession } from "next-auth"

export async function generateMetadata(): Promise<Metadata> {
    const session = await getServerSession()
    if (!session) return {}

    return {
        title: session.user?.email
    }
}

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    const session = await getServerSession()
    if (!session) throw new Error("Seems like you're not signed in.")

    return (
        <div>
            {children}
        </div>
    )
}