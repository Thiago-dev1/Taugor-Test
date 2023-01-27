import { forwardRef, ForwardRefRenderFunction, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

import styles from './styles.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string,
    title: string,
    example: string,
    name: string,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errorForm?: string,
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
    
    const [wasChanged, setWasChanged] = useState(false || props.value ? true : false)

    return (
        <>
            {props.type == 'file' &&
                <>
                    <label htmlFor="img">
                        <p>Foto do Perfil</p>
                        <p className={styles.fakeButton}><ArrowUpwardIcon /> <span>Adcionar Foto</span></p>
                    </label>
                    {/* <input type="file" id='img' name={name} required/> */}
                </>
            }


            {props.type != 'file' &&
                <div>
                    <div className={`${styles.inputContainer} ${props.errorForm == props.name ? styles.error : ''}`}>
                        <p className={`${wasChanged ? styles.value : ''}`}>{props.title}</p>
                        <input {...props}  onChange={(e) => [props.handleOnChange(e), e.target.value ? setWasChanged(true) : setWasChanged(false)]} />
                    </div>
                    <span className={styles.example}>ex: {props.example}</span>
                </div>
            }

        </>
    )
}

export const Input = forwardRef(InputBase)