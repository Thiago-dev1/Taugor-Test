import { useState, useContext, useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'

import Create from './pages/Create'
import { api } from './services/api'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import styles from './styles.module.scss'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthentication } from './hooks/useAuthentication'
import { User } from 'firebase/auth'
import Register from './pages/Auth/Register'
import Edit from './pages/Edit'
import NotFound from './pages/NotFound'
import EmployeeInfos from './pages/EmployeeInfos'


function App() {


  const [currentStep, setCurrentStep] = useState(1)


  const { auth } = useAuthentication();

  const [user, setUser] = useState<User | undefined | null>(undefined)

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      user?.getIdToken().then(token => {
        api.defaults.headers.Authorization = `Bearer ${token}`
      })
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

 
  return (
    <>
      {/* <Header currentStep={currentStep} /> */}
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Routes>
            <Route path='/entrar' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/cadastrar' element={!user ? <Register /> : <Navigate to='/' />} />
            <Route path='/funcionairos/cadastrar' element={user ? <Create /> : <Navigate to='/entrar'/>} />
            <Route path='/funcionairos/editar/:id' element={user ? <Edit /> : <Navigate to='/entrar'/>} />
            <Route path='/funcionairos/info/:id' element={user ? <EmployeeInfos /> : <Navigate to='/entrar'/>} />
            <Route path='/' element={user ? <Home /> : <Navigate to='/entrar'/>} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  )
}

export default App
