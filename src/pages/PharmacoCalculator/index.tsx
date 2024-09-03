import {
  Checkbox,
  FormLabel,
  Input,
  Select,
  Switch,
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

  const [isComprimido, setIsComprimido] = useState(false)
  const isMobile = useBreakpoint()

  const Calcular = () => {
    const tempVolume = parseFloat(volume.replace(',', '.'))
    const tempPeso = parseFloat(peso.replace(',', '.'))
    const tempDose = parseFloat(dose.replace(',', '.'))
    const tempConcentracao = parseFloat(concentracao.replace(',', '.'))
    let tempResultado = 0
    console.log(tempDose, tempPeso)
    if (isComprimido) {
      tempResultado = tempPeso * tempDose
    } else {
      tempResultado = (tempPeso * tempDose) / tempConcentracao
    }

    setResultadoCalculo(tempResultado.toString())
  }

  const ClearValues = () => {
    setVolume('')
    setPeso('')
    setDose('')
    setConcentracao('')
    setResultadoCalculo('')
  }

  useEffect(() => {
    ClearValues()
  }, [isComprimido])

  useEffect(() => {
    Calcular()
  }, [volume, peso, dose, concentracao])
  return (
    <>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <h1>Calculadora</h1>
          <div
            style={{
              display: 'flex'
            }}
          >
            <h2>{isComprimido ? 'Comprimido' : 'Solução'}</h2>
            <Switch onChange={() => setIsComprimido(!isComprimido)}></Switch>
          </div>
        </div>
        {isComprimido ? (
          <>
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
            {/* somar tudo e mostrar */}
            <h1>
              {isComprimido ? 'Miligramas' : 'Volume'}: {resultadoCalculo}
            </h1>{' '}
          </>
        ) : (
          <>
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
            <h1>
              {isComprimido ? 'Miligramas' : 'Volume'}: {resultadoCalculo}
            </h1>
          </>
        )}
      </Container>
    </>
  )
}

export default PharmacoCalculator
