import { useNavigate, useParams } from 'react-router-dom'
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
import { AxiosError } from 'axios'
import { Employee } from '../../types/Employee'



function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [employee, setEmployee] = useState<Employee>({
        address: '',
        birthDate: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        admissionDate: '',
        office: '',
        salary: 0,
        sector: '',
        gender: ''
    })
    let domContainer = document.getElementById('container') as HTMLElement

    async function onGeneratePDF() {
        await execGenerate(employee)
    }

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(true)

    // falta pegar a imagem
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setError('')
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }

    function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        
        setEmployee({ ...employee, [e.target.name]: e.target.value })
        console.log(employee)
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

        res = verifySetp2()



        res = verifySetp3()

        if (res) {
            console.log(message)
            api.put(`/employees/edit/${id}`, employee).then((response) => {
                navigate('/')
            })
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

    async function getEmployee() {
       try {
            await api.get(`/employees/${id}`)
                .then(response => {
                    setLoading(true)
                    setEmployee(response.data)
                    setLoading(false)
                }).catch((error: AxiosError) => {
                    console.log(error.response?.data)
                    // @ts-ignore
                    if(error.response?.data.message == 'Não encontrado') {
                        navigate('/*')
                    }
                })
            
       } catch (error) {
        // @ts-ignore
            console.log(error)
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

    useEffect(() => {
        getEmployee()
    }, [])

    return (
        <>
            {loading
                ?
                <p>carregando</p>
                :
                <>
                    <Header currentStep={currentStep} />
                    <div className={styles.container}>
                        <div className={styles.createContainer}>
                            <div className={styles.details}>
                                <p>Fale-nos um pouco sobre você <EditIcon /> </p>
                                <span>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão</span>
                            </div>
                            <form onSubmit={handleSubmit}>

                                <FormContact handleChange={handleChange} handleChangeSelect={handleChangeSelect} error={error} onPage={currentStep} employee={employee} />

                                <FormEmployee handleChange={handleChange} handleChangeSelect={handleChangeSelect} error={error} onPage={currentStep} employee={employee} />
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
                                    >
                                        Atualizar
                                    </button>
                                </div>
                                {message && (
                                    <p>{message}</p>
                                )}
                            </form>
                            <button type='button' onClick={onGeneratePDF}>test</button>
                        </div>
                        <div id='container' className={styles.PDF}>

                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Edit