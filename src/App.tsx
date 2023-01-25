import { useState } from 'react'

import { Header } from './components/Header'
import Create from './pages/Create'

import styles from './styles.module.scss'

function App() {

  const [currentStep, setCurrentStep] = useState(1)

  return (
    <>
      <Header currentStep={currentStep} />
      <Create currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </>
  )
}

export default App
