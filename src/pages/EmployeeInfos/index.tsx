import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../services/api'
import { Employee } from '../../types/Employee'
import { EmployeeApi } from '../../types/EmployeeApi'

import styles from './styles.module.scss'

function EmployeeInfos() {
    const { id } = useParams()

    const [employee, setEmployee] = useState<EmployeeApi>({
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
        gender: '',
        id: '',
        userId: ''
    })
    const [historico, setHistorico] = useState([])
    const [loading, setLoading] = useState(true)

    async function getHistorico() {
        try {
            api.get(`/employees/updateHistory/${id}`)
                .then(response => {
                    setLoading(true)
                    setHistorico(response.data)
                    setLoading(false)
                }).catch((error: AxiosError) => {
                    console.log(error.response?.data)
                })

        } catch (error) {
            // @ts-ignore
            console.log(error)
        }

    }

    async function getEmployee() {
        try {
            api.get(`/employees/${id}`)
                .then(response => {
                    setLoading(true)
                    setEmployee(response.data)
                    console.log(response.data)
                    setLoading(false)
                }).catch((error: AxiosError) => {
                    console.log(error.response?.data)
                })

        } catch (error) {
            // @ts-ignore
            console.log(error)
        }

    }

    useEffect(() => {
        getEmployee()
        getHistorico()
    }, [])

    return (
        <div>
            {loading && <p>Carregando</p>}
            {!loading && employee && (
                <div className={styles.currentInfo}>
                    <h1>Informações atuais</h1>
                    <div>
                        <p>{employee.firstName} {employee.lastName}</p>
                    </div>

                    <div>
                        <p>{employee.birthDate}</p>
                        <p>{employee.gender == 'M' ? 'Masculino' : 'Feminino'}</p>
                    </div>

                    <div>
                        <p>{employee.phone}</p>
                        <p>{employee.email}</p>
                        <p>{employee.address}</p>
                    </div>
                    <div>
                        <p>{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(employee.salary)}</p>
                        <p>{employee.sector}</p>
                        <p>{employee.office}</p>
                        <p>{employee.admissionDate}</p>
                    </div>
                </div>
            )}
            {!loading && historico.length != 0 && (
                <div>
                    {/* {historico.map(i => {
                        // const date = new Date(i.createdAt._seconds * 1000)


                        return (
                            <p>{date.toLocaleString()}</p>
                        )
                    })} */}
                    <p>a</p>
                </div>
            )}
        </div>
    )
}

export default EmployeeInfos