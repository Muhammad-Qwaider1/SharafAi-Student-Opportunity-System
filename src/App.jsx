import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import Welcome from './pages/Welcome'
import Pathways from './pages/Pathways'
import Navbar from './components/Navbar'
import './App.css'
import SignUp from './pages/Auth/Signup'
import Profile from './pages/Profile'

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
        {/* 1. أول ما يفتح المشروع: تظهر الواجهة الترحيبية دائماً بشكل طبيعي */}
        <Route path="/" element={<Welcome />} />

        {/* 2. صفحات المشروع الداخلية بداخل الـ Layout (يظهر فيها الـ Navbar تلقائياً) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/pathways" element={<Pathways />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* 🛠️ الحل السحري هنا: لو ضغطت على اللوغو أو أي رابط يوجه لـ "/" بالخطأ وأنت داخل المشروع، الـ Layout سيجبره يتحول فوراً لـ /dashboard وبذلك مستحيل يقلعك لبرا طالما أنت بالداخل */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* 3. صفحة الـ Auth (بدون Navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* 👈 أضف هذا السطر هنا */}
      </Routes>
    </Router>
  )
}

export default App