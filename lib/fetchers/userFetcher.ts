import isEmail from "@/lib/isEmail";
import { FormEvent } from "react";
import notify from "../toasts/notify";

export default async function userFetcher(e: FormEvent, method: UserHTTP, data: User | NewInfo, patchData?: User) {
    e.preventDefault()

    // Check for email validity
    if (!isEmail(data.email)) {
        return notify("Please enter a valid email", 'warn')
    }

    // For PATCH
    if ((patchData?.email || patchData?.password || patchData?.username) && method === 'PATCH') {
        // Ditto here if updating with new email
        if (patchData.email && !isEmail(patchData.email)) {
            return notify("Please enter a valid email if updating the current one", 'warn')
        }
        // combine if method is PATCH and have at least one parameter to change
        data = {
            ...data,
            newEmail: patchData.email,
            newUsername: patchData.username,
            newPassword: patchData.password,
        }
    }

    try {
        const res = await fetch('api/user', {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            return notify(await res.text(), 'error')
        }

        return notify("Task complete", 'success')

    } catch (error) {
        const err = error as Error
        return notify(err.message, 'error')
    }
}