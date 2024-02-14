import { Route, Routes } from 'react-router-dom'
import Clinic from './pages/Clinic'
import Dashboard from './pages/Dashboard'
import Disease from './pages/Disease'
import Hemo from './pages/Hemo'
import Landing from './pages/Landing'
import Login from './pages/Login'
import RegisterAdmin from './pages/registerAdmin'
import RegisterDisease from './pages/registerDisease'
import Admin from './pages/Admin'
import DiseaseDetails from './pages/DiseaseDetails'

const Rotas = () => {
  return (
    <Routes>
      <Route path="/clinic" element={<Clinic />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/disease" element={<Disease />} />
      <Route path="/hemo" element={<Hemo />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/landingPage" element={<Landing />} />
      <Route path="/admin/registerAdmin" element={<RegisterAdmin />} />
      <Route path="/admin/registerDisease" element={<RegisterDisease />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/disease/:key" element={<DiseaseDetails />} />
    </Routes>
  )
}

export default Rotas
