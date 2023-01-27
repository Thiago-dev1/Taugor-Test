import { useState } from 'react'
import { Employee } from '../../../pages/Edit'
import { Input } from '../Input'

import styles from './styles.module.scss'


interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string,
    onPage: number,
    employee?: Employee
}

function FormContact({handleChange, error, onPage, employee}: Props) {
    
    const [imgRoudend, setImgRoudend] = useState(false)
    return (
        <div className={`${onPage == 1 ? styles.onPage : styles.offPage}`}> 
            <p className={styles.formTitle}>Informações de contato do funcionário</p>
                <div className={styles.content}>
                    <div>
                        <Input type='text' title='Nome' example='Thiago' placeholder='Nome'  name='firstName' handleOnChange={handleChange} errorForm={error} value={employee?.firstName} />
                        <Input type='text' title='Sobrenome' example='Souza' placeholder='Sobrenome' name='lastName' handleOnChange={handleChange} errorForm={error} value={employee?.lastName} />
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
                <Input type='text' title='Emprego'  name='job' example='Vendedor' placeholder='Emprego' handleOnChange={handleChange} errorForm={error} value={employee?.job} />
                <Input type='text' title='Endereço' name='address' example='Rua 6 Q M Lt 32' placeholder='Endereço' handleOnChange={handleChange} errorForm={error} value={employee?.address} />

                <div className={styles.contact}>
                    <div>
                        <Input type='number' title='Telefone' name='phone' example='6299559988' placeholder='Telefone' handleOnChange={handleChange} errorForm={error} value={employee?.phone} />
                        <Input type='email' title='E-mail' example='thiago@gmail.com' name='email' placeholder='Email' handleOnChange={handleChange} errorForm={error} value={employee?.email} />
                    </div>
                    <div>
                        <Input type='text' title='Nacionalidade' example='Brasileira' name='nationality' placeholder='Nacionalidade' handleOnChange={handleChange} errorForm={error} value={employee?.nationality} />
                        <Input type='date' title='Data de nascimento' example='02-02-2000' name='birthDate' placeholder='Data de nascimento' handleOnChange={handleChange} errorForm={error} value={employee?.birthDate} disabled={employee?.birthDate ? true : false} />
                    </div>
                </div>
        </div>
    )
}

export { FormContact }