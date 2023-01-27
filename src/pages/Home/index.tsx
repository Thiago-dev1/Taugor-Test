import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { api } from '../../services/api'
import { Employee } from '../../types/Employee'
import { EmployeeApi } from '../../types/EmployeeApi'
import { execGenerate } from '../../utils/generatePDF'

import { db } from '../../firebase/config'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'

import styles from './styles.module.scss'

function Home() {
    const [employees, setEmployees] = useState<EmployeeApi[]>([])
    const [loading, setLoading] = useState(true)



    async function getAllEmployess() {

        setLoading(true)
        const collectionRef = collection(db, 'employees')
        onSnapshot(collectionRef, (querysnapshot) => {
            // @ts-ignore
            setEmployees(querysnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })))
    })
    // setEmployees(response.data)
    setLoading(false)

}

async function onGeneratePDF(employee: Employee | EmployeeApi) {
    await execGenerate(employee)
}

useEffect(() => {
    getAllEmployess()
}, [])


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
                                <button>Demitir</button>
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