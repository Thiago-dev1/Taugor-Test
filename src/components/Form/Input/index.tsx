import { forwardRef, ForwardRefRenderFunction, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

import styles from './styles.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string,
    title: string,
    example: string,
    name: string,
    // handle: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error_form?: string,
    test?: any
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
    
    const [wasChanged, setWasChanged] = useState(false || props.value ? true : false)

    console.log(props.className)

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
                    <div className={`${styles.inputContainer} ${props.error_form == props.name ? styles.error : ''}`}>
                        <p className={`${props.className == props.name ? styles.value : ''}`}>{props.title}</p>
                        <input {...props} />
                    </div>
                    <span className={styles.example}>ex: {props.example}</span>
                </div>
            }

        </>
    )
}

export const Input = forwardRef(InputBase)