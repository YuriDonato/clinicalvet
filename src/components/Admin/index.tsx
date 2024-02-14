import { PageContainer } from '../../styles'
import { Link } from 'react-router-dom'
import { StyledLink } from './styles'

const AdminComponent = () => {
  return (
    <PageContainer>
      <StyledLink to="/admin/registerDisease">Ir registrar doenças</StyledLink>
      <StyledLink to="/admin/registerAdmin">Ir registrar Admin</StyledLink>
    </PageContainer>
  )
}

export default AdminComponent
