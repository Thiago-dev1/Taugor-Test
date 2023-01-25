
import { Input } from '../Input'
import styles from './styles.module.scss'

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string,
    onPage: number
}

function FormEmployee({handleChange, error, onPage}: Props) {
    return (
        <div className={`${onPage == 3 ? styles.onPage : styles.offPage}`}>
            <p className={`${styles.formTitle} ${onPage != 3 ? styles.onPage : ''}`}>Informações sobre o funcionário</p>
                <Input type='text' title='Cargo' example='Chefe' name='office' handleOnChange={handleChange} errorForm={error} />
                <Input type='date' title='Data de admissão' example='24/01/2023' name='admissionDate' handleOnChange={handleChange} errorForm={error} />

                <Input type='text' title='Setor' example='Vendas' name='sector' handleOnChange={handleChange} errorForm={error} />
                <Input type='number' title='Salário' example='2000 R$' name='salary' handleOnChange={handleChange} errorForm={error} />
        </div>
    )
}

export { FormEmployee }