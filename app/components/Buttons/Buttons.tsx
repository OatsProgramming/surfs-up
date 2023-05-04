'use client'
import { signOut } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"

export function SignOut() {
    const router = useRouter()

    async function handleClick() {
        // Not a promise but
        // Need to move user out to login page then signOut to prevent errors
        router.push('/')
        await signOut()
        // callbackUrl option does not work properly: doesn't remove the session when set
    }
    return (
        <button onPointerDown={handleClick}>
            Sign out
        </button>
    )
}