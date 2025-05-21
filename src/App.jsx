import { useState } from 'react'
import AppRoutes from './routes'
import Header from './components/Header'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />
        <AppRoutes />
      </div>
    </>
  )
}

export default App
