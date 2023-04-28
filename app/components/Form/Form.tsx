import { useState } from "react";
import TextField from "./TextField/TextField";
import styles from './form.module.css'

export default function Form() {
    const [user, setUser] = useState({} as User)

    function handleChange(newInfo: UserPartial) {
        setUser({
            ...user,
            ...newInfo
        })
    }

    return (
        <form className={styles['container']}>
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
        </form>
    )
}