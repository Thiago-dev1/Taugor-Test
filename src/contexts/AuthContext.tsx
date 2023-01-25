import { createContext, ReactNode, useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { api } from '../services/api';

interface AuthContextData {
    signIn(email: string, password: string): Promise<void>,
    isAuthenticated: boolean,
    auth: Auth,
    verify: () => void,
    logout: () => void,
    firebaseError: string
}

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext({} as AuthContextData)


export function AuthProvaider({ children }: AuthProviderProps) {
    

    const auth = getAuth()

    const [isAuthenticated, setIsAuthenticated] = useState(false ||  localStorage.getItem('auth') == 'true')
    const [token, setToken] = useState('')
    const [firebaseError, setFirebaseError] = useState('')


    function verify() {
        onAuthStateChanged(auth, (user) => {
            if(user) {  
                console.log('aqui')
                localStorage.setItem('auth', 'true')
                setIsAuthenticated(true)
                console.log(user)
                user.getIdToken().then((token) => {
                    setToken(token)
                    localStorage.setItem('token', JSON.parse(JSON.stringify(token)))
                    api.defaults.headers.Authorization = `Bearer ${token}`
                }   
                )  
            }
          })
    }

    async function signIn(email: string, password: string) {
        try {

            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            setIsAuthenticated(true)

            localStorage.setItem('auth', 'true')
            response.user.getIdToken().then((token) => setToken(token))
            api.defaults.headers.Authorization = `Bearer ${token}`
            
      
          } catch (error) {
            let systemErrorMessage = ''

            // @ts-ignore
            if(error.message.includes('user-not-found') || error.message.includes('wrong-password')){
                systemErrorMessage = 'Senha ou email inválidos'
            } else {
                systemErrorMessage = 'Ocorreu um erro, tente mais tarde!'
            }

            setFirebaseError(systemErrorMessage)

            setTimeout(() => {
                setFirebaseError('')
            }, 1500)
          }
    }

    async function logout() {
        await signOut(auth).then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            setToken('')
            setIsAuthenticated(false)
            api.defaults.headers.Authorization = null
        })
    }

    return (
        <AuthContext.Provider value={{signIn, isAuthenticated, auth, verify, logout, firebaseError}}>{children}</AuthContext.Provider>
    )
}