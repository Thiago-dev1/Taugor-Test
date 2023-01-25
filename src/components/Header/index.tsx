import { useContext } from 'react'
import SvgIcon from '@mui/material/SvgIcon'
import HomeIcon from '@mui/icons-material/Home'

import styles from './styles.module.scss'
import { AuthContext } from '../../contexts/AuthContext'

interface Props {
    currentStep: number
}

function Header({currentStep}: Props) {
    const { logout } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logo}>
                <h1>
                    <img src="http://www.taugor.com.br/wp-content/uploads/2018/11/marca-taugor.png" alt="taugor Logo" />
                </h1>
                <div className={styles.pass}>
                    <p>Passo {currentStep} de 2</p>
                    <p className={styles.titlePass}>Informações para cadastrar</p>
                </div>
            </div>
            <nav> 
                <svg onClick={logout}><HomeIcon /></svg>
            </nav>
        </header>
    )
}

export { Header }