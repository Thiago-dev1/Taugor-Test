import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { Input } from '../../components/Form/Input'
import EditIcon from '@mui/icons-material/Edit'

import styles from './styles.module.scss'
import { execGenerate } from '../../utils/generatePDF'
import { FormContact } from '../../components/Form/FormContact'
import { FormEmployee } from '../../components/Form/FormEmployee'
import { Header } from '../../components/Header'
import { api } from '../../services/api'
import { viewTest } from '../../utils/viewPDF'
import { Employee } from '../../types/Employee'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useAuthValue } from '../../contexts/AuthContext'



function Create() {
    const navigate = useNavigate()
    const { user } = useAuthValue()
    const uid = user!.uid
    const {insertDocument, errorFirebase, loading} = useInsertDocument('employees', uid)

    const [employee, setEmployee] = useState<Employee>({
        address: '',
        birthDate: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        admissionDate: '',
        office: 'Auxiliar',
        salary: 0,
        sector: 'RH', 
        gender: 'M'
    })

    let domContainer = document.getElementById('container') as HTMLElement

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [currentStep, setCurrentStep] = useState(1)


    // falta pegar a imagem
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setError('')
        setEmployee({ ...employee, [e.target.name]: e.target.value })
        console.log(employee)
    }

    function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }

    function verifySetp2() {
        if (!employee.firstName) {
            setError('firstName')
            setMessage('Informe seu primeiro nome')
            console.log(employee)
            return false
        }

        if (!employee.lastName) {
            setError('lastName')
            setMessage('Informe um sobrenome')
            return false
        }

        if (!employee.address) {
            setError('address')
            setMessage('Informe o endere??o')
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
            setMessage('Informe a data de admiss??o')
            return false
        }

        if (!employee.office) {
            setError('office')
            setMessage('Informe o cargo')
            return false
        }

        if (!employee.salary) {
            setError('salary')
            setMessage('Informe o salario')
            return false
        }

        if (!employee.sector) {
            setError('sector')
            setMessage('Informe o setor')
            return false
        }

        setMessage('')
        return true
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        let res = false

        res =  verifySetp2()

        res = verifySetp3()

        if(res) {
            // console.log(message)
            // api.post('/employees', employee).then((response) => {
            //     navigate('/')
            // })

           const response = await insertDocument(employee)
           console.log(response)
           if (response == 'Cadastrado com sucesso') {
            navigate('/')
           } else {
            setError(response)
           }
        }
    }

    function nextSet() {
        if (currentStep == 1) {
            const res = verifySetp2()

            if (res) {
                setCurrentStep(currentStep + 1)
            }
        }

    }

    useEffect(() => {
        if (domContainer == null) {
            domContainer = document.getElementById('container') as HTMLElement
            viewTest(domContainer, employee)
        } else {
            viewTest(domContainer, employee)
        }
    }, [employee])

    return (
        <>
            <Header currentStep={currentStep} />
            <div className={styles.container}>
                <div className={styles.createContainer}>
                    <div className={styles.details}>
                        <p>Fale-nos um pouco sobre voc?? <EditIcon /> </p>
                        <span>Diga quem voc?? ??, como os empregadores podem entrar em contato com voc?? e qual a sua profiss??o</span>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <FormContact handleChange={handleChange} handleChangeSelect={handleChangeSelect} error={error} onPage={currentStep} employee={employee} page='create' />

                        <FormEmployee handleChange={handleChange} handleChangeSelect={handleChangeSelect} error={error} onPage={currentStep} employee={employee} page='create' />
                        <div className={styles.actions}>
                            <button
                                className={styles.back}
                                type='button'
                                onClick={() => setCurrentStep(currentStep - 1)}
                                disabled={currentStep == 1 ? true : false}
                            >
                                Anterior
                            </button>

                            <button
                                className={`${styles.next} ${currentStep == 2 ? styles.nextNone : ''}`}
                                type='button'
                                onClick={nextSet}
                            >
                                Proximo
                            </button>

                            <button
                                className={`${styles.buttonRegister} ${currentStep == 2 ? styles.nextOn : ''}`}
                                type='submit'
                                disabled={loading ? true : false}
                            >
                                {loading ? 'Carregando' : 'Cadastrar'}
                            </button>
                        </div>
                        {message && (
                            <p>{message}</p>
                        )}
                    </form>
                </div>
                <div id='container'></div>
            </div>
        </>
    )
}

export default Create