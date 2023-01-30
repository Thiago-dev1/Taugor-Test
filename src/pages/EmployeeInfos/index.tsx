import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../components/Header'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { api } from '../../services/api'
import { Employee } from '../../types/Employee'
import { EmployeeApi } from '../../types/EmployeeApi'
import { formateValue } from '../../utils/fortmatValue'

import styles from './styles.module.scss'

function EmployeeInfos() {
    const { id } = useParams()

    const { document: employee, error, loading } = useFetchDocument('employees', String(id))

    const { documents: employeeHistory, loading: loading2 } = useFetchDocuments('employeeHistory', String(id))

    return (
        <>
            <Header />
            <div >
                {loading && <p>Carregando</p>}
                {!loading && employee && (
                    <div className={styles.currentInfo}>
                        <h2>Informações atuais</h2>
                        <table className=' '>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Data de nascimento</th>
                                    <th>Endereço</th>
                                    <th>Cargo</th>
                                    <th>Salario</th>
                                    <th>Setor</th>
                                    <th>Email</th>
                                    <th>Contrado em</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                <tr key={employee.id} className="">
                                    <td>{employee.firstName} {employee.lastName}</td>
                                    <td>{employee.birthDate}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.office}</td>
                                    <td>{formateValue(employee.salary)}</td>
                                    <td>{employee.sector}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.admissionDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                )}

                {loading2 && <p>Carregando</p>}

                {!loading && employeeHistory && (
                    <div className={styles.updatedInfo}>
                        <h2>Historico de atualização</h2>
                        <table className=' '>
                            <thead>
                                <tr>
                                    <th>Endereço</th>
                                    <th>Cargo</th>
                                    <th>Salario</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {employeeHistory.map(item => {
                                    return (
                                        <tr key={item.id} className="">
                                            <td className={employee.address == item.address ? styles.equal : styles.notEqual}>{item.address}</td>
                                            <td className={employee.office == item.office ? styles.equal : styles.notEqual}>{item.office}</td>
                                            <td className={employee.salary == item.salary ? styles.equal : styles.notEqual}>{formateValue(item.salary)}</td>
                                            <td className={employee.email == item.email ? styles.equal : styles.notEqual}>{item.email}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default EmployeeInfos