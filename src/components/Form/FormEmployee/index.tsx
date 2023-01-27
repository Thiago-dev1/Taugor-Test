
import { Employee } from '../../../pages/Edit'
import { Input } from '../Input'
import styles from './styles.module.scss'

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string,
    onPage: number,
    employee?: Employee
}

function FormEmployee({handleChange, error, onPage, employee}: Props) {
    return (
        <div className={`${onPage == 2 ? styles.onPage : styles.offPage}`}>
            <p className={`${styles.formTitle} ${onPage != 3 ? styles.onPage : ''}`}>Informações sobre o funcionário</p>
                <Input type='text' title='Cargo' example='Chefe' name='office' placeholder='Cargo' handleOnChange={handleChange} errorForm={error} value={employee?.office} />
                <Input type='date' title='Data de admissão' example='24/01/2023' name='admissionDate' placeholder='Data de admissão' handleOnChange={handleChange} errorForm={error} value={employee?.admissionDate}  disabled={employee?.admissionDate ? true : false} />

                <Input type='text' title='Setor' example='Vendas' name='sector' placeholder='Setor' handleOnChange={handleChange} errorForm={error} value={employee?.sector}  disabled={employee?.sector ? true : false} />
                <Input type='number' title='Salário' example='2000 R$' name='salary' placeholder='Salário' handleOnChange={handleChange} errorForm={error} value={employee?.salary} />
        </div>
    )
}

export { FormEmployee }