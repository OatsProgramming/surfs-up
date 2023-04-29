'use client'

import { useState } from "react";
import TextField from "./TextField/TextField";
import styles from './form.module.css'
import ToastContainer from '@/lib/toasts/ToastContainer'
import userFetcher from "@/lib/fetchers/userFetcher";
import { signIn, signOut } from 'next-auth/react'

export default function Form({ method }: {
    method: UserHTTP
}) {
    const [user, setUser] = useState({} as User)
    const [newInfo, setNewInfo] = useState({} as User)

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

    return (
        <>
            <form className={styles['container']} onSubmit={(e) => {
                if (method === 'GET') {
                    e.preventDefault()
                    signIn('credentials', user)
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                }
                else {
                    userFetcher(e, method, user, newInfo)
                }
            }}>
                {(method === 'POST' || method === 'GET') && (
                    <TextField
                        onChange={handleChange}
                        value={user}
                        label={'Username'}
                        id={'username'}
                        type={'text'}
                        required
                    />
                )}
                <TextField
                    onChange={handleChange}
                    value={user}
                    label={'Email'}
                    id={'email'}
                    type={'text'}
                    required
                />
                <TextField
                    onChange={handleChange}
                    value={user}
                    label={'Password'}
                    id={'password'}
                    type={'password'}
                    required
                />
                {method === 'PATCH' && (
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
                <button>
                    {
                        method === 'GET' ? 'Sign In' :
                        method === 'POST' ? 'Create User' :
                        method === 'PATCH' ? 'Update User' :
                        'Delete User'
                    }
                </button>
            </form>
            <button onPointerDown={() => signOut()}>
                Sign out
            </button>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}