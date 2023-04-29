import { FormEvent, useState } from "react";
import TextField from "./TextField/TextField";
import styles from './form.module.css'

export default function Form() {
    const [user, setUser] = useState({} as User)
    const [newInfo, setNewInfo] = useState({} as User)
    const [isUpdating, setIsUpdating] = useState(false)

    function handleChange(mutateUser: UserPartial) {
        setUser({
            ...user,
            ...mutateUser
        })
    }

    // For PATCH
    function handleNewInfo(mutateNewInfo: UserPartial) {
        setNewInfo({
            ...newInfo, 
            ...mutateNewInfo
        })
    }

    async function createUser(e: FormEvent) {
        e.preventDefault()
        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if (!res.ok) {
                console.log(await res.text())
            }

            console.log(await res.json())

        } catch (error) {
            console.log(error)
        }
    }

    async function updateUser(e: FormEvent) {
        e.preventDefault()
        try {
            const res = await fetch('/api/user', {
                method: 'PATCH',
                body: JSON.stringify({
                    ...user,
                    newEmail: newInfo.email,
                    newUsername: newInfo.username,
                    newPassword: newInfo.password,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if (!res.ok) {
                console.log(await res.text())
            }
            
            console.log(await res.json())
            
        } catch (error) {
            const err = error as Error
            console.log(err.message)
        }
    }

    async function deleteUser(e: FormEvent) {
        e.preventDefault()

        try {
            const res = await fetch('/api/user', {
                method: 'DELETE',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if (!res.ok) {
                console.log(await res.text())
            }
            
            console.log(await res.json())
            
        } catch (error) {
            const err = error as Error
            console.log(err.message)
        }
    }


    return (
        <form className={styles['container']} onSubmit={
            isUpdating ? updateUser : deleteUser
        }>
            <TextField
                onChange={handleChange}
                value={user}
                label={'Username'}
                id={'username'}
                type={'text'}
            />
            <TextField
                onChange={handleChange}
                value={user}
                label={'Email'}
                id={'email'}
                type={'text'}
            />
            <TextField
                onChange={handleChange}
                value={user}
                label={'Password'}
                id={'password'}
                type={'password'}
            />
            {isUpdating && (
                <>
                    <TextField
                        onChange={handleNewInfo}
                        value={newInfo}
                        label={'New Username?'}
                        id={'username'}
                        type={'text'}
                    />
                    <TextField
                        onChange={handleNewInfo}
                        value={newInfo}
                        label={'New Email?'}
                        id={'email'}
                        type={'text'}
                    />
                    <TextField
                        onChange={handleNewInfo}
                        value={newInfo}
                        label={'New Password?'}
                        id={'password'}
                        type={'password'}
                    />
                </>
            )}
            <div onClick={() => setIsUpdating(!isUpdating)}>
                Click to change
            </div>
            <button>
                {isUpdating ? 'Update' : 'Create'}
            </button>
        </form>
    )
}