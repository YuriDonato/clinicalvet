import PropDashboardOption from '../../models/Dashboard'

import hemograma from '../../assets/images/homepagehemograma.png'
import homepageclinica from '../../assets/images/homepageclinica.png'
import homepagedoenca from '../../assets/images/homepagedoenca.png'
import homepageferramentas from '../../assets/images/homepageferramentas.jpg'
import homepagefluidos from '../../assets/images/homepagefluidos.jpg'
import test from '../../assets/images/test.jpg'

const DashboardOptions: PropDashboardOption[] = [
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
    to: '/tools',
    img: homepageferramentas,
    text: 'Ferramentas'
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

const DashboardToolsOptions: PropDashboardOption[] = [
  {
    to: '/tools/hemo',
    img: hemograma,
    text: 'Leitor de Hemograma'
  },
  {
    to: '/tools/fluid',
    img: homepagefluidos,
    text: 'Calculadora de Fluidoterapia'
  },
  {
    to: '/tools/affinity',
    img: test,
    text: 'Tabela de Afinidade de Antibioticos'
  },
  {
    to: '/tools/teste',
    img: test,
    text: 'Teste'
  }
]

export { DashboardOptions, DashboardToolsOptions }
