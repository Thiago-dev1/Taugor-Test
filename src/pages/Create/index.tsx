import { useState } from 'react'

import { Input } from '../../components/Form/Input'
import EditIcon from '@mui/icons-material/Edit'

import styles from './styles.module.scss'
import { execGenerate, insertInput } from '../../components/utils/generatePDF'
import { FormContact } from '../../components/Form/FormContact'
import { FormEmployee } from '../../components/Form/Form'


export interface Employee {
    address: string,
    birthDate: string,
    email: string,
    firstName: string,
    job: string,
    lastName: string,
    nationality: string,
    phone: string,
    office: string,
    admissionDate: string,
    sector: string,
    salary: number
}

function Create() {

    const [employee, setEmployee] = useState<Employee>({
        address: '',
        birthDate: '',
        email: '',
        firstName: '',
        job: '',
        lastName: '',
        nationality: '',
        phone: '',
        admissionDate: '',
        office: '',
        salary: 0,
        sector: ''
    })

    async function onGeneratePDF() {
        insertInput(employee)
        await execGenerate()
    }

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [currentStep, setCurrentStep] = useState(2)

    // falta pegar a imagem
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setError('')
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }

    function verifySetp2() {
        if (!employee.firstName) {
            setError('firstName')
            setMessage('Informe seu primeiro nome')
            return false
        }

        if (!employee.lastName) {
            setError('lastName')
            setMessage('Informe um sobrenome')
            return false
        }

        if (!employee.address) {
            setError('address')
            setMessage('Informe o endereço')
            return false
        }

        if (!employee.birthDate) {
            setError('birthDate')
            setMessage('Informe sua data de nascimento')
            return false
        }

        if (!employee.email) {
            setError('email')
            setMessage('Informe seu email')
            return false
        }

        if (!employee.job) {
            setError('job')
            setMessage('Informe seu emprego')
            return false
        }

        if (!employee.nationality) {
            setError('nationality')
            setMessage('Informe sua nacionalidade')
            return false
        }

        if (!employee.phone) {
            setError('phone')
            setMessage('Informe seu telefone')
            return false
        }

        setMessage('')
        return true
    }

    function verifySetp3() {
        if (!employee.admissionDate) {
            setError('admissionDate')
            setMessage('Informe a data de admissão')
        }

        if (!employee.office) {
            setError('office')
            setMessage('Informe o cargo')
        }

        if (!employee.salary) {
            setError('salary')
            setMessage('Informe o salario')
        }

        if (!employee.sector) {
            setError('sector')
            setMessage('Informe o setor')
        }

        setMessage('')
        return true
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(currentStep == 2) {
            verifySetp2()
        } 
        
        if(currentStep == 3) {
            verifySetp3()
        }

        console.log(employee)
    }

    function nextSet() {
        if (currentStep == 2) {
            const res =  verifySetp2()

            if(res) {
                setCurrentStep(currentStep + 1)
            }
        }
        
    }

    return (
        <div className={styles.createContainer}>
            <div className={styles.details}>
                <p>Fale-nos um pouco sobre você <EditIcon /> </p>
                <span>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão</span>
            </div>
            <form onSubmit={handleSubmit}>

                <FormContact handleChange={handleChange} error={error} onPage={currentStep} />            

                <FormEmployee handleChange={handleChange} error={error} onPage={currentStep} /> 

                {/* <button type='submit'>Test</button> */}
                {message && (
                    <p>{message}</p>
                )}
            </form>
            <div className={styles.actions}>
                <button className={styles.back} onClick={() => setCurrentStep(currentStep - 1)}>Anterior</button>
                <button className={styles.next} onClick={nextSet}>Proximo</button>           
            </div>
            {/* <button type='button' onClick={onGeneratePDF}>test</button> */}
        </div>
    )
}

export default Create