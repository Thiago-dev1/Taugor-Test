import { useState } from 'react'
import { Input } from '../Input'

import styles from './styles.module.scss'


interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string,
    onPage: number
}

function FormContact({handleChange, error, onPage}: Props) {
    
    const [imgRoudend, setImgRoudend] = useState(false)
    return (
        <div className={`${onPage == 1 ? styles.onPage : styles.offPage}`}> 
            <p className={styles.formTitle}>Informações de contato do funcionário</p>
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
        </div>
    )
}

export { FormContact }