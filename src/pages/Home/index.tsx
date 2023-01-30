import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { api } from '../../services/api'
import { Employee } from '../../types/Employee'
import { EmployeeApi } from '../../types/EmployeeApi'
import { execGenerate } from '../../utils/generatePDF'

import { db } from '../../firebase/config'
import { collection, doc, getDoc, onSnapshot, where } from 'firebase/firestore'

import styles from './styles.module.scss'
import { useAuthValue } from '../../contexts/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

function Home() {
    // const [employees, setEmployees] = useState<EmployeeApi[]>([])
    // const [loading, setLoading] = useState(true)

    const { user } = useAuthValue()
    const uid = user!.uid
    console.log(uid)

    const { documents: employees, error, loading,  } = useFetchDocuments('employees', uid)

    const { updateDocument } = useUpdateDocument('employees')

    async function onGeneratePDF(employee: Employee | EmployeeApi) {
        await execGenerate(employee)
    }

    async function handledDsmiss (id: string) {
       const data = {
            active: false
        }

        await updateDocument(data, id)
    }

    useEffect(() => {
        console.log(employees)
    }, [employees])


    return (
        <>
            <Header />
            <div className={styles.HomeContainer}>
                <div className={styles.box}>
                    <h2>Funcionairos Registrados</h2>
                    <Link to='/funcionairos/cadastrar'>Cadastrar</Link>
                </div>
                {!loading && employees.length == 0
                    ?
                    <p>Sem cadastros</p>
                    :
                    employees.map((item) => {
                        return (
                            <div className={styles.employeeCard} key={item.id}>
                                <div>
                                    <p>{item.firstName}</p>
                                </div>
                                <div className={styles.actions}>
                                    <Link to={`/funcionairos/editar/${item.id}`}>Editar</Link>
                                    <Link to={`/funcionairos/info/${item.id}`}>Ver</Link>
                                    <button onClick={() => handledDsmiss(item.id)}>Demitir</button>
                                    <button className={styles.btnPDF} onClick={() => onGeneratePDF(item)}>Gerar PDF</button>
                                </div>
                            </div>
                        )
                    })
                }

                {loading && <p>Carregando</p>}
            </div>
        </>
    )
}

export default Home 