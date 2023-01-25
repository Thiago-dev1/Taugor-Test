import { useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

import styles from './styles.module.scss'

interface Props {
    type: string,
    title: string,
    example: string,
    name: string,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errorForm?: string
}

function Input({ example, title, type, name, handleOnChange, errorForm }: Props) {
    
    const [value, setValue] = useState(false)

    return (
        <>
            {type == 'file' &&
                <>
                    <label htmlFor="img">
                        <p>Foto do Perfil</p>
                        <p className={styles.fakeButton}><ArrowUpwardIcon /> <span>Adcionar Foto</span></p>
                    </label>
                    <input type="file" id='img' name={name} required/>
                </>
            }


            {type != 'file' &&
                <>
                    <div className={`${styles.inputContainer} ${errorForm == name ? styles.error : ''}`}>
                        <p className={`${value ? styles.value : ''}`}>{title}</p>
                        <input type={type} placeholder={title} name={name} onChange={(e) => [handleOnChange(e), e.target.value ? setValue(true) : setValue(false)]} />
                    </div>
                    <span className={styles.example}>ex: {example}</span>

                </>
            }

        </>
    )
}

export { Input }