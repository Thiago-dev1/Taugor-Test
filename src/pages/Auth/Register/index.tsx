
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../../../components/Form/Input'
import { useAuthentication } from '../../../hooks/useAuthentication'

import styles from './styles.module.scss'

interface RegisterUserProps {
    name: string,
    email: string,
    password: string
}

function Register() {

    const [user, setUser] = useState<RegisterUserProps>({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [message, setMessage] = useState<string | true>('')
    const { createUser, error: authError, loading } = useAuthentication()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setError('')
        setMessage('')
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function verifySetp() {
        if (!user.name) {
            setError('name')
            setMessage('Informe seu nome')
            return false
        }

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
        setError("");
        const res = await createUser(user);
    }

    useEffect(() => {
        console.log(authError);
        if (authError) {
            setMessage(authError);
        }
    }, [authError]);

    return (
        <div className={styles.registerContainer}>
            <form className={styles.formRegister} onSubmit={handleSubmit} >
                <>
                    <Input type='text' title='Nome' example='tiago' name='name' onChange={handleChange} error_form={error} placeholder='Nome' />
                    <Input type='email' title='E-mail' example='tiago.souza@email.com' name='email' onChange={handleChange} error_form={error} placeholder='E-mail' />
                    <Input type='password' title='Senha' example='******' name='password' onChange={handleChange} error_form={error} placeholder='Senha' />
                    <div className={styles.actions}>
                        <Button variant="contained" size='large' type='submit'>
                            Cadastrar
                        </Button>
                        <Link to='/entrar'>Entrar</Link>
                    </div>
                    {message && <p>{message}</p>}
                </>
            </form>
        </div>
    )
}

export default Register