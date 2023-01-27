import { useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

import styles from './styles.module.scss'

interface Props {
    type: string,
    title: string,
    example: string,
    name: string,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errorForm?: string,
    value?: string | number
}

function Input({ example, title, type, name, handleOnChange, errorForm, value }: Props) {
    
    const [wasChanged, setWasChanged] = useState(false || value ? true : false)

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
                <div>
                    <div className={`${styles.inputContainer} ${errorForm == name ? styles.error : ''}`}>
                        <p className={`${wasChanged ? styles.value : ''}`}>{title}</p>
                        <input type={type} placeholder={title} name={name} onChange={(e) => [handleOnChange(e), e.target.value ? setWasChanged(true) : setWasChanged(false)]} value={value} />
                    </div>
                    <span className={styles.example}>ex: {example}</span>
                </div>
            }

        </>
    )
}

export { Input }