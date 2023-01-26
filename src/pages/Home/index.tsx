import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { api } from '../../services/api'
import { EmployeeApi } from '../../types/EmployeeApi'

import styles from './styles.module.scss'

function Home() {
    const [employees, setEmployees] = useState<EmployeeApi[]>([])
    const [loading, setLoading] = useState(true)



    async function getAllEmployess() { 
        await api.get('/employees').then(response => {
            setLoading(true)
            
            setEmployees(response.data)
            setLoading(false)
            }).catch((error) => console.log(error)) 
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
                                    <a href="#">Editar</a>
                                    <button>Excluir</button>
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