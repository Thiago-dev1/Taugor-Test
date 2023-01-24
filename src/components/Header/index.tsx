import SvgIcon from '@mui/material/SvgIcon'
import HomeIcon from '@mui/icons-material/Home'

import styles from './styles.module.scss'

function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.logo}>
                <h1>
                    <img src="http://www.taugor.com.br/wp-content/uploads/2018/11/marca-taugor.png" alt="taugor Logo" />
                </h1>
                <div className={styles.pass}>
                    <p>Passo 2 de 6</p>
                    <p className={styles.titlePass}>Informações de contato</p>
                </div>
            </div>
            <nav> 
                <svg><HomeIcon /></svg>
            </nav>
        </header>
    )
}

export { Header }