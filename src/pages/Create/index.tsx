import { useState } from 'react'

import { Input } from '../../components/Form/Input'
import EditIcon from '@mui/icons-material/Edit'

import styles from './styles.module.scss'

import { Template, generate, BLANK_PDF } from '@pdfme/generator'
import { Designer } from '@pdfme/ui'
import { base } from '../../data'


interface User {
    address: string,
    birthDate: string,
    email: string,
    firstName: string,
    job: string,
    lastName: string,
    nationality: string,
    phone: string
}

function Create() {
    const template: Template = {
        basePdf: base,
        schemas: [{
            "phone": {
                "type": "text",
                "position": {
                    "x": 41.22,
                    "y": 114.11
                },
                "width": 35,
                "height": 5.68,
                "alignment": "left",
                "fontSize": 10,
                "characterSpacing": 0,
                "lineHeight": 1
            },
            "email": {
                "type": "text",
                "position": {
                    "x": 36.73,
                    "y": 108.01
                },
                "width": 35,
                "height": 5.68,
                "alignment": "left",
                "fontSize": 10,
                "characterSpacing": 0,
                "lineHeight": 1
            },
            "job": {
                "type": "text",
                "position": {
                    "x": 25.4,
                    "y": 75.14
                },
                "width": 35,
                "height": 7,
                "alignment": "left",
                "fontSize": 13,
                "characterSpacing": 0,
                "lineHeight": 1
            },
            "name": {
                "type": "text",
                "position": {
                    "x": 26.72,
                    "y": 24.34
                },
                "width": 35,
                "height": 7,
                "alignment": "left",
                "fontSize": 18,
                "characterSpacing": 0,
                "lineHeight": 1,
                "fontColor": "#7996ec"
            }
        }],
    };

    const [user, setUser] = useState<User>({
        address: '',
        birthDate: '',
        email: '',
        firstName: '',
        job: '',
        lastName: '',
        nationality: '',
        phone: ''
    })


    const inputs = [
        {
            "phone": user.phone,
            "email": user.email,
            "job": user.job,
            "name": user.firstName + ' ' + user.lastName
        }]

    async function onGeneratePDF() {
        await generate({ template, inputs }).then((pdf) => {

            const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
            window.open(URL.createObjectURL(blob));

        });
    }


    const [imgRoudend, setImgRoudend] = useState(false)


    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    // falta pegar a imagem
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setError('')
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!user.firstName) {
            setError('firstName')
            setMessage('Informe seu primeiro nome')
        }

        if (!user.lastName) {
            setError('lastName')
            setMessage('Informe um sobrenome')
        }

        if (!user.address) {
            setError('address')
            setMessage('Informe o endereço')
        }

        if (!user.birthDate) {
            setError('birthDate')
            setMessage('Informe sua data de nascimento')
        }

        if (!user.email) {
            setError('email')
            setMessage('Informe seu email')
        }

        if (!user.job) {
            setError('job')
            setMessage('Informe seu emprego')
        }

        if (!user.nationality) {
            setError('nationality')
            setMessage('Informe sua nacionalidade')
        }

        if (!user.phone) {
            setError('phone')
            setMessage('Informe seu telefone')
        }
    }

    return (
        <div className={styles.createContainer}>
            <div className={styles.details}>
                <p>Fale-nos um pouco sobre você <EditIcon /> </p>
                <span>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão</span>
            </div>
            <form onSubmit={handleSubmit}>
                <p className={styles.formTitle}>Informações de contato</p>
                <div className={styles.content}>
                    <div>
                        <Input type='text' title='Nome' example='Tiago' name='firstName' handleOnChange={handleChange} errorForm={error} />
                        <Input type='text' title='Sobrenome' example='Souza' name='lastName' handleOnChange={handleChange} errorForm={error} />
                    </div>
                    <div className={styles.imgContainer}>
                        <div className={styles.imgTest}></div>
                        <div className={styles.test}>
                            {/* <Input type='file' title='Foto Do perfil' example='' /> */}
                            <div className={styles.box}>
                                <input id="checkbox" type="checkbox" onChange={() => setImgRoudend(!imgRoudend)} checked={imgRoudend} />
                                <label htmlFor="checkbox" className={`${styles.labelCheck} ${imgRoudend ? styles.check : ''}`}></label>
                            </div>
                        </div>
                    </div>
                </div>
                <Input type='text' title='Emprego' example='Vendedor' name='job' handleOnChange={handleChange} errorForm={error} />
                <Input type='text' title='Endereço' example='Avenida Paulista, 1.234' name='address' handleOnChange={handleChange} errorForm={error} />

                <div className={styles.contact}>
                    <div>
                        <Input type='number' title='Telefone' example='(11) 9 9999-9999' name='phone' handleOnChange={handleChange} errorForm={error} />
                        <Input type='email' title='E-mail' example='tiago.souza@email.com' name='email' handleOnChange={handleChange} errorForm={error} />
                    </div>
                    <div>
                        <Input type='text' title='Nacionalidade' example='Brasileira' name='nationality' handleOnChange={handleChange} errorForm={error} />
                        <Input type='date' title='Data de nascimento' example='23 jun 1985' name='birthDate' handleOnChange={handleChange} errorForm={error} />
                    </div>
                </div>
                <button type='submit'>Test</button>
                {message && (
                    <p>{message}</p>
                )}
            </form>
            <div>asa</div>
            <button type='button' onClick={onGeneratePDF}>test</button>
        </div>
    )
}

export default Create