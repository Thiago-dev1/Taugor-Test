import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout';

import styles from './styles.module.scss'
import { useAuthentication } from '../../hooks/useAuthentication'


interface Props {
    currentStep?: number
}

function Header({ currentStep }: Props) {
    // const { logout } = useContext(AuthContext)
    const { logout } = useAuthentication()

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logo}>
                <h1>
                    <img src="http://www.taugor.com.br/wp-content/uploads/2018/11/marca-taugor.png" alt="taugor Logo" />
                </h1>
                <div className={styles.pass}>

                    {currentStep != undefined && (
                        <p>Passo {currentStep} de 2</p>
                    )}
                    {currentStep != undefined 
                        ?
                            <p className={styles.titlePass}>Informações para cadastrar</p>
                        :
                            <p className={styles.titlePass}>Sistema teste</p>
                    }
                    
                </div>
            </div>
            <nav>
                <ul>
                    <li><Link to={'/'}><HomeIcon fontSize='large' /></Link></li>
                    <li><button onClick={logout}><LogoutIcon fontSize='large' /></button></li>
                </ul>
            </nav>
        </header>
    )
}

export { Header }