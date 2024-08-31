import { Container } from '@chakra-ui/react'
import ReturnButton from '../../components/returnButton'

import * as S from './styles'
const Hemo = () => {
  return (
    <>
      <S.Header>
        <S.CustomReturnButton customRoute="tools" />
        <div>
          <h1>HemoVet</h1>
          <h2>Leitor de Hemograma</h2>
        </div>
      </S.Header>
      <Container style={{ backgroundColor: 'white' }}>
        <p>logica do site aqui</p>
      </Container>
      <S.Footer></S.Footer>
    </>
  )
}

export default Hemo
