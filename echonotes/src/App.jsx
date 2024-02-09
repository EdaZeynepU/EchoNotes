import { Route, Routes } from 'react-router-dom'
import './css/main.css'
import './css/index.css'
import Home from './pages/Home'
import JarPage from './pages/JarPage'
import NotFound from './pages/NotFound'
import EditNote from './pages/EditNote'
import Settings from './pages/Settings'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/jars/:id' element={<JarPage />}/>
        <Route path='/edit_note' element={<EditNote />}/>
        <Route path='/settings' element={<Settings />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
