import { useState } from 'react'
import { Employee } from '../../../types/Employee'

import { Input } from '../Input'

import styles from './styles.module.scss'


interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    error?: string,
    onPage: number,
    employee?: Employee,
    page?: 'create'
}

function FormContact({ handleChange, error, onPage, employee, handleChangeSelect, page }: Props) {

    const [imgRoudend, setImgRoudend] = useState(false)
    return (
        <div className={`${onPage == 1 ? styles.onPage : styles.offPage}`}>
            <p className={styles.formTitle}>Informações de contato do funcionário</p>
            <div className={styles.content}>
                <div>
                    <Input type='text' title='Nome' example='Thiago' placeholder='Nome' name='firstName' onChange={(e) => handleChange(e)} error_form={error} value={employee?.firstName} className={`${employee?.firstName ? 'firstName' : ''}`} />
                    <Input type='text' title='Sobrenome' example='Souza' placeholder='Sobrenome' name='lastName' onChange={(e) => handleChange(e)} error_form={error} value={employee?.lastName} className={`${employee?.lastName ? 'lastName' : ''}`} />
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
            <Input type='text' title='Endereço' name='address' example='Rua 6 Q M Lt 32' placeholder='Endereço' onChange={(e) => handleChange(e)} error_form={error} value={employee?.address} className={`${employee?.address ? 'address' : ''}`} />
            <div className={styles.contact}>
                <div>
                    <Input type='number' title='Telefone' name='phone' example='6299559988' placeholder='Telefone' onChange={(e) => handleChange(e)} error_form={error} value={employee?.phone} className={`${employee?.phone ? 'phone' : ''}`} />
                    <Input type='email' title='E-mail' example='thiago@gmail.com' name='email' placeholder='Email' onChange={(e) => handleChange(e)} error_form={error} value={employee?.email} className={`${employee?.email ? 'email' : ''}`} />
                </div>
                <div className={styles.dateContainer}>
                    <div className={styles.select}>
                        <p>Genero</p>
                        <select name="gender" defaultValue='M' onChange={(e) => handleChangeSelect(e)} disabled={page == 'create' ? false : employee?.gender ? true : false}>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <Input type='date' title='Data de nascimento' example='02-02-2000' name='birthDate' placeholder='Data de nascimento' onChange={(e) => handleChange(e)} error_form={error} value={employee?.birthDate} disabled={page == 'create' ? false : employee?.birthDate ? true : false} className={`${employee?.birthDate ? 'birthDate' : ''}`} />
                </div>
            </div>
        </div>
    )
}

export { FormContact }