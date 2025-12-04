import { useState } from 'react'
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Home from './pages/home'
import Rounds from './pages/rounds'

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/round' element={<Rounds/>} />
      </Routes>
     </Router>
    </>
  )
}

export default App
