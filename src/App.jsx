import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/home/About'
import Features from './pages/home/Features'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App