import { Route, Routes } from 'react-router-dom'
import Clinic from './pages/Clinic'
import Dashboard from './pages/Dashboard'
import Disease from './pages/Disease'
import Hemo from './pages/Hemo'
import Landing from './pages/Landing'
import Login from './pages/Login'
import RegisterAdmin from './pages/registerAdmin'
import Admin from './pages/Admin'
import DiseaseDetails from './pages/DiseaseDetails'
import RegisterDisease from './pages/RegisterDisease'
import FluidTherapy from './pages/FluidTherapy'
import DrugAffinity from './pages/DrugAffinity'
import Tools from './pages/Tools'
import Teste from './pages/Teste'
import PharmacoCalculator from './pages/PharmacoCalculator'

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<FluidTherapy />} />
      {/* <Route path="/landingPage" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clinic" element={<Clinic />} />
      <Route path="/disease" element={<Disease />} />
      <Route path="/disease/:key" element={<DiseaseDetails />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/tools/hemo" element={<Hemo />} /> */}
      <Route path="/tools/fluid" element={<FluidTherapy />} />
      {/* <Route path="/tools/affinity" element={<DrugAffinity />} />
      <Route
        path="/tools/pharmacocalculator"
        element={<PharmacoCalculator />}
      />
      <Route path="/tools/teste" element={<Teste />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/registerAdmin" element={<RegisterAdmin />} />
      <Route path="/admin/registerDisease" element={<RegisterDisease />} /> */}
    </Routes>
  )
}

export default Rotas
