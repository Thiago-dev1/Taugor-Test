
import { useState, useContext } from 'react'
import { Input } from '../../../components/Form/Input'
import { AuthContext } from '../../../contexts/AuthContext'
import Button from '@mui/material/Button'

import styles from './styles.module.scss'

interface UserProps {
    email: string,
    password: string
}

function Login() {
    const { signIn, logout, firebaseError } = useContext(AuthContext)

    const [user, setUser] = useState<UserProps>({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setError('')
        setMessage('')
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function verifySetp() {
        if (!user.email) {
            setError('email')
            setMessage('Informe seu email')
            return false
        }

        if (!user.password) {
            setError('email')
            setMessage('Informe a senha')
            return false
        }


        setMessage('')
        return true
    }



    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const verify = verifySetp()

        if (!verify) {
            return
        }

        await signIn(user.email, user.password)
        // logout()
    }

    return (
        <div className={styles.loginContainer}>
            <form className={styles.formLogin} onSubmit={handleSubmit} >
                <Input type='email' title='E-mail' example='tiago.souza@email.com' name='email' handleOnChange={handleChange} errorForm={error} />
                <Input type='password' title='Senha' example='******' name='password' handleOnChange={handleChange} errorForm={error} />
                <Button variant="contained" size='large' type='submit'>
                    Entrar
                </Button>
                {firebaseError && <p>{firebaseError}</p>}
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default Login