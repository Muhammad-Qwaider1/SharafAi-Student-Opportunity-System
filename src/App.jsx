import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import Pathways from './pages/Pathways'
import Navbar from './components/Navbar'
import './App.css'

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* صفحات فيها Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pathways" element={<Pathways />} />
        </Route>
        {/* صفحات بدون Navbar */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App