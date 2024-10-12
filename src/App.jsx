import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Show from './components/Show'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Soy App.jsx</h1>
      <Show />
    </>
  )
}

export default App
