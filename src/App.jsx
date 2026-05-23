import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Pathways from './pages/Pathways'
import Navbar from './components/Navbar'
import './App.css'
import SignUp from './pages/Auth/Signup'
import Profile from './pages/Profile'
import Dashboard from "./pages/Dashboard";

// 🔐 الـ Layout العادي والآمن للتنقل الداخلي
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
        <Route path="/" element={<Welcome />} />
        
        {/* المسارات المحمية أو التي تتطلب Navbar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pathways" element={<Pathways />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* مسارات المصادقة */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* إعادة توجيه لأي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
