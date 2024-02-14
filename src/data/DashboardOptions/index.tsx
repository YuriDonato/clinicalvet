import PropDashboardOption from '../../models/Dashboard'

import hemograma from '../../assets/images/homepagehemograma.png'
import homepageclinica from '../../assets/images/homepageclinica.png'
import homepagedoenca from '../../assets/images/homepagedoenca.png'
import test from '../../assets/images/test.jpg'

const DashboardOptions: PropDashboardOption[] = [
  {
    to: '/hemo',
    img: hemograma,
    text: 'Leitor de Hemograma'
  },
  {
    to: '/clinic',
    img: homepageclinica,
    text: 'Clinica'
  },
  {
    to: '/disease',
    img: homepagedoenca,
    text: 'Doenças'
  },
  {
    to: '/login',
    img: test,
    text: 'AMBIENTE DE TESTES'
  },
  {
    to: '/landingPage',
    img: test,
    text: 'LANDING PAGE'
  }
]

export default DashboardOptions
