
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

function FormEmployee({ handleChange, error, onPage, employee, handleChangeSelect, page }: Props) {

    const [wasChanged, setWasChanged] = useState(false || employee ? true : false)

    return (
        <div className={`${onPage == 2 ? styles.onPage : styles.offPage}`}>
            <p className={`${styles.formTitle} ${onPage != 3 ? styles.onPage : ''}`}>Informações sobre o funcionário</p>
            {/* <Input type='text' title='Cargo' example='Chefe' name='office' placeholder='Cargo' onChange={(e) => handleChange(e)} error_form={error} value={employee?.office} /> */}
            <div className={styles.select}>
                <p>Cargo</p>
                <select name='office' defaultValue={page == 'create' ? 'Auxiliar' : employee?.office} onChange={(e) => handleChangeSelect(e)}>
                    <option value='Auxiliar'>Auxiliar</option>
                    <option value='Assistente'>Assistente</option>
                    <option value='Gerente'>Gerente</option>
                    <option value='Diretor'>Diretor</option>
                </select>
            </div>
            <Input type='date' title='Data de admissão' example='24/01/2023' name='admissionDate' placeholder='Data de admissão' onChange={(e) => handleChange(e)} error_form={error} value={employee?.admissionDate} disabled={page == 'create' ? false : employee?.admissionDate ? true : false} test={'true'} />

            <div className={styles.select}>
                <p>Setor</p>
                <select name='sector' defaultValue={page == 'create' ? 'RH' : employee?.sector} onChange={(e) => handleChangeSelect(e)} disabled={page == 'create' ? false : employee?.sector ? true : false}>
                    <option value='Administrativo'>Administrativo</option>
                    <option value='Financeiro'>Financeiro</option>
                    <option value='Comercial'>Comercial</option>
                    <option value='RH'>RH</option>
                </select>
            </div>
            <Input type='number' title='Salário' example='2000 R$' name='salary' placeholder='Salário' onChange={(e) => handleChange(e)} error_form={error} value={employee?.salary} className={`${employee?.salary ? 'salary' : ''}`} min={1} />
        </div>
    )
}

export { FormEmployee }