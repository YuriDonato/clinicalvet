import {
  Checkbox,
  FormLabel,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Container } from '../../styles'
import ReturnButton from '../../components/returnButton'
import useBreakpoint from '../../utils/Breakpoints'

const PharmacoCalculator = () => {
  const [volume, setVolume] = useState('')
  const [peso, setPeso] = useState('')
  const [dose, setDose] = useState('')
  const [concentracao, setConcentracao] = useState('')

  const [resultadoCalculo, setResultadoCalculo] = useState('')
  const isMobile = useBreakpoint()

  const Calcular = () => {
    const tempVolume = parseInt(volume)
    const tempPeso = parseInt(peso)
    const tempDose = parseInt(dose)
    const tempConcentracao = parseInt(concentracao)

    const tempResultado = (tempPeso * tempDose) / tempConcentracao
    setResultadoCalculo(tempResultado.toString())
  }

  useEffect(() => {
    Calcular()
  }, [volume, peso, dose, concentracao])
  return (
    <>
      <Container>
        <h1>Calculadora</h1>

        {/* Peso do animal */}
        <FormLabel>Peso</FormLabel>
        <Input
          placeholder="Insira o peso do animal"
          value={peso}
          onChange={(e) => {
            setPeso(e.target.value)
          }}
        ></Input>

        {/* Dose */}
        <FormLabel>Dose</FormLabel>
        <Input
          placeholder="Insira a dose"
          value={dose}
          onChange={(e) => {
            setDose(e.target.value)
          }}
        ></Input>

        {/* Concentracao */}
        <FormLabel>Concentração</FormLabel>
        <Input
          placeholder="Insira a concentração"
          value={concentracao}
          onChange={(e) => {
            setConcentracao(e.target.value)
          }}
        ></Input>

        {/* somar tudo e mostrar */}
        <h1>Volume: {resultadoCalculo}ml</h1>
        {/* <h1>Velocidade de Infusão: {taxaInfusao}ml/hora</h1> */}
      </Container>
    </>
  )
}

export default PharmacoCalculator
