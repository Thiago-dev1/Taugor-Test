import { useState, useContext, useEffect } from 'react'
import { AuthContext } from './contexts/AuthContext'

import Create from './pages/Create'
import { api } from './services/api'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import styles from './styles.module.scss'
import Login from './pages/Auth/Login'



function App() {

  const { signIn, isAuthenticated, auth, verify, logout } = useContext(AuthContext)

  const [currentStep, setCurrentStep] = useState(1)
  // const [auth, setAuth] = useState(false || localStorage.getItem('auth') === 'true')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const body = {
      email: email,
      password: password
    }

    await signIn(email, password)
    
    // await api.post('/users/login', body).then(response => {
    //   if(response.data.user.stsTokenManager) {
    //     setAuth(true)
    //     localStorage.setItem('auth', 'true')
    //     localStorage.setItem('token', response.data.user.stsTokenManager.accessToken)
    //     api.defaults.headers.Authorization = `Bearer ${response.data.user.stsTokenManager.accessToken}`
    //   }
    // })
  }

  async function test() {
    await api.get('/users/test').then(response => console.log(response.data))
  }

  useEffect(() => {
    verify()
  }, [auth])

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit'>Entraraaaaaaaaaaaaa</button>
      </form>

      <button onClick={test}>Testarrrr</button>

      {isAuthenticated && <h1>SO mostra se tiver logado</h1>} */}

      {/* <Header currentStep={currentStep} /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/entrar' element={!isAuthenticated ? <Login /> : <Navigate to='/' />} />
          <Route path='/' element={isAuthenticated ? <Create /> : <Navigate to='/entrar'/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
