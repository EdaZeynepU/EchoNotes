import { Route, Routes } from 'react-router-dom'
import './css/main.css'
import './css/index.css'
import Home from './pages/Home'
import JarPage from './pages/JarPage'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/jars/:id' element={<JarPage />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
