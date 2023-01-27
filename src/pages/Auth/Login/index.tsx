
import { useState, useEffect } from 'react'
import { Input } from '../../../components/Form/Input'
import Button from '@mui/material/Button'

import { useAuthentication } from '../../../hooks/useAuthentication'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

interface UserProps {
    email: string,
    password: string
}

function Login() {
    const [user, setUser] = useState<UserProps>({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [message, setMessage] = useState<string | true>('')
    const { login, error: authError, loading } = useAuthentication()

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

        setError("");

        const res = await login(user);
    }
    
    useEffect(() => {
        console.log(authError);
        if (authError) {
            setMessage(authError);
        }
      }, [authError]);

    //   useEffect(() => {
    //     api.get('http://localhost:3333/test').then((response) => {
    //         setTest(response.data)
    //         console.log(test)
    //     })
    //   }, [])

    return (
        <div className={styles.loginContainer}>
            <form className={styles.formLogin} onSubmit={handleSubmit} >
                <Input type='email' title='E-mail' example='tiago.souza@email.com' name='email' onChange={handleChange} error_form={error} />
                <Input type='password' title='Senha' example='******' name='password'  onChange={handleChange} error_form={error} />
                <div className={styles.actions}>
                    <Button variant="contained" size='large' type='submit'>
                        Entrar
                    </Button>
                    <Link to='/cadastrar'>Cadastrar</Link>
                </div>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default Login