import { Container } from '@chakra-ui/react'
import MainPage from '../../components/Affinity/mainPage'
import ReturnButton from '../../components/returnButton'

import * as S from './styles'

const DrugAffinity = () => {
  return (
    <>
      <S.Header>
        <S.CustomReturnButton customRoute="tools" />
        <div>
          <h1>PharmaVet</h1>
          <h2>Interação Entre Antibioticos</h2>
        </div>
      </S.Header>
      <Container style={{ backgroundColor: 'white' }}>
        <MainPage />
      </Container>
      <S.Footer></S.Footer>
    </>
  )
}

export default DrugAffinity
