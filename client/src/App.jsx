import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import CarsPage from './pages/CarsPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

function App() {

  return (
<div>
      <header>
      <nav>
      <NavLink to="/">Home Page</NavLink>
        <NavLink to="/cars">Cars</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
      </header>
      <main>
        <Routes>
        <Route path="/" element={<HomePage />} />
           <Route path="/cars" element={<CarsPage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/register" element={<RegisterPage />} />
           <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
