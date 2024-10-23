import {
  Checkbox,
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
import * as S from './styles'

interface repoDesidratacao {
  '4%': boolean
  '5-6%': boolean
  '8%': boolean
  '10-12%': boolean
  '12-15%': boolean
}

const FluidTherapy = () => {
  const repoEmpty: repoDesidratacao = {
    '4%': false,
    '5-6%': false,
    '8%': false,
    '10-12%': false,
    '12-15%': false
  }
  const [necessidadeBasal, setNecessidadeBasal] = useState('')
  const [necessidadeBasalAdicional, setNecessidadeBasalAdicional] = useState('')
  const [reposicaoDesidratacao, setReposicaoDesidratacao] =
    useState<repoDesidratacao>(repoEmpty)
  const [perdaHidrica, setPerdaHidrica] = useState('')
  const [peso, setPeso] = useState('')
  const [volumeFinal, setVolumeFinal] = useState(0)
  const [limiteInfusao, setLimiteInfusao] = useState(0)
  const [categoriaLimiteInfusao, setCategoriaLimiteInfusao] = useState('')
  const [taxaInfusao, setTaxaInfusao] = useState(0)
  const isMobile = useBreakpoint()

  const Calcular = () => {
    let tempNecessidade = 0
    let tempDesidratacao = 0
    let tempPerdaHidrica = 0
    let tempLimiteInfusao = 0
    switch (necessidadeBasal) {
      case 'carnivoros':
        switch (necessidadeBasalAdicional) {
          case 'adulto':
            tempNecessidade = 40
            break
          case 'filhote':
            tempNecessidade = 70
            break
        }
        break
      case 'equideos':
        tempNecessidade = 30
        break
      case 'ruminantes':
        tempNecessidade = 40
        break
    }

    if (reposicaoDesidratacao['4%']) {
      tempDesidratacao += 4
    }
    if (reposicaoDesidratacao['5-6%']) {
      tempDesidratacao += 5
    }
    if (reposicaoDesidratacao['8%']) {
      tempDesidratacao += 8
    }
    if (reposicaoDesidratacao['10-12%']) {
      tempDesidratacao += 10
    }
    if (reposicaoDesidratacao['12-15%']) {
      tempDesidratacao += 12
    }

    switch (perdaHidrica) {
      case 'diarreia':
        tempPerdaHidrica = 40
        break
      case 'vomito':
        tempPerdaHidrica = 50
        break
      case 'ambos':
        tempPerdaHidrica = 60
        break
    }

    switch (categoriaLimiteInfusao) {
      case 'canino':
        setLimiteInfusao(60)
        break
      case 'felino':
        setLimiteInfusao(50)
        break
      case 'bovino':
        setLimiteInfusao(10)
        break
      case 'bezerro':
        setLimiteInfusao(40)
        break
      case 'equideo':
        setLimiteInfusao(10)
        break
    }

    tempNecessidade = parseInt(peso) * tempNecessidade
    tempDesidratacao = parseInt(peso) * tempDesidratacao * 10
    tempPerdaHidrica = parseInt(peso) * tempPerdaHidrica
    tempLimiteInfusao = limiteInfusao * parseInt(peso)
    setTaxaInfusao(tempLimiteInfusao)
    setVolumeFinal(tempNecessidade + tempDesidratacao + tempPerdaHidrica)
  }

  useEffect(() => {
    Calcular()
  }, [necessidadeBasal, reposicaoDesidratacao, perdaHidrica])

  if (isMobile) {
    return (
      <>
        <S.Header>
          <S.CustomReturnButton customRoute="tools" />
          <div>
            <h1>FluidVet</h1>
            <h2>Calculadora de Fluidoterapia</h2>
          </div>
        </S.Header>
        <S.MainContainer>
          <Container>
            <Select
              placeholder="Determine a necessidade basal de líquidos"
              marginTop={'1rem'}
              onChange={(e) => {
                setNecessidadeBasal(e.currentTarget.value)
              }}
            >
              <option defaultChecked value="carnivoros">
                Carnivoros
              </option>
              <option value="equideos">Eqüideos</option>
              <option value="ruminantes">Ruminantes</option>
            </Select>

            {necessidadeBasal == 'carnivoros' ? (
              <>
                <Select
                  placeholder="Selecione a categoria de idade"
                  marginTop={'1rem'}
                  onChange={(e) => {
                    setNecessidadeBasalAdicional(e.currentTarget.value)
                  }}
                >
                  <option defaultChecked value="adulto">
                    Adulto
                  </option>
                  <option value="filhote">Filhote</option>
                </Select>
                <Select
                  placeholder="Selecione a categoria de especie"
                  marginTop={'1rem'}
                  onChange={(e) => {
                    setCategoriaLimiteInfusao(e.currentTarget.value)
                  }}
                >
                  <option value="felino">Felino</option>
                  <option value="canino">Canino</option>
                </Select>
              </>
            ) : (
              <></>
            )}

            {/* Peso do animal */}
            <Input
              placeholder="Insira o peso do animal"
              value={peso}
              onChange={(e) => {
                setPeso(e.target.value)
              }}
            ></Input>

            {/* % de Desidratação */}
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Marcar</Th>
                    <Th>% de desidratação</Th>
                    <Th>Sinais clinicos associados</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr backgroundColor={'#7ee4e1'}>
                    <Td>
                      <Checkbox
                        onChange={(e) => {
                          setReposicaoDesidratacao({
                            ...reposicaoDesidratacao,
                            '4%': !reposicaoDesidratacao['4%']
                          })
                        }}
                        iconColor="white"
                        colorScheme="green"
                      ></Checkbox>
                    </Td>
                    <Td>4%</Td>
                    <Td>Apenas histórico de adipsia</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Checkbox
                        onChange={(e) => {
                          setReposicaoDesidratacao({
                            ...reposicaoDesidratacao,
                            '5-6%': !reposicaoDesidratacao['5-6%']
                          })
                        }}
                        iconColor="white"
                        colorScheme="green"
                      ></Checkbox>
                    </Td>
                    <Td>5-6%</Td>
                    <Td>
                      Urina concentrada, apatia, redução da elasticidade cutânea
                      e mucosas parcialmente ressecadas
                    </Td>
                  </Tr>
                  <Tr backgroundColor={'#7ee4e1'}>
                    <Td>
                      <Checkbox
                        onChange={(e) => {
                          setReposicaoDesidratacao({
                            ...reposicaoDesidratacao,
                            '8%': !reposicaoDesidratacao['8%']
                          })
                        }}
                        iconColor="white"
                        colorScheme="green"
                      ></Checkbox>
                    </Td>
                    <Td>8%</Td>
                    <Td>
                      Redução da elasticidade cutânea, mucosas secas e viscosas,
                      retração do bulbo ocular, oligúria e TRC {'>'} 3
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Checkbox
                        onChange={(e) => {
                          setReposicaoDesidratacao({
                            ...reposicaoDesidratacao,
                            '10-12%': !reposicaoDesidratacao['10-12%']
                          })
                        }}
                        iconColor="white"
                        colorScheme="green"
                      ></Checkbox>
                    </Td>
                    <Td>10-12%</Td>
                    <Td>
                      Todos os sinais anteriores acrescidos de pulso fraco e
                      contrações involuntarias
                    </Td>
                  </Tr>
                  <Tr backgroundColor={'#7ee4e1'}>
                    <Td>
                      <Checkbox
                        onChange={(e) => {
                          setReposicaoDesidratacao({
                            ...reposicaoDesidratacao,
                            '12-15%': !reposicaoDesidratacao['12-15%']
                          })
                        }}
                        iconColor="white"
                        colorScheme="green"
                      ></Checkbox>
                    </Td>
                    <Td>12-15%</Td>
                    <Td>Choque e óbito</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Marcar</Th>
                    <Th>% de desidratação</Th>
                    <Th>Sinais clinicos associados</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>

            {/* Perdas Hídricas Contínuas */}
            <Select
              placeholder="Determine as perdas hídricas contínuas"
              marginTop={'1rem'}
              onChange={(e) => {
                setPerdaHidrica(e.currentTarget.value)
              }}
            >
              <option defaultChecked value="vomito">
                Vômito
              </option>
              <option value="diarreia">Diarréia</option>
              <option value="ambos">Ambos</option>
            </Select>

            {/* somar tudo e mostrar */}
            <h1>
              Volume Total:{' '}
              {volumeFinal.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
              ml/dia
            </h1>
            {/* <h1>Velocidade de Infusão: {taxaInfusao}ml/hora</h1> */}
          </Container>
        </S.MainContainer>
        <S.Footer></S.Footer>
      </>
    )
  }

  return (
    <>
      <ReturnButton customRoute="tools" />
      <Container>
        <h1>Calculadora</h1>

        {/* Necessidade basal de liquidos */}
        <Select
          placeholder="Determine a necessidade basal de líquidos"
          marginTop={'1rem'}
          onChange={(e) => {
            setNecessidadeBasal(e.currentTarget.value)
          }}
        >
          <option defaultChecked value="carnivoros">
            Carnivoros
          </option>
          <option value="equideos">Eqüideos</option>
          <option value="ruminantes">Ruminantes</option>
        </Select>

        {necessidadeBasal == 'carnivoros' ? (
          <>
            <Select
              placeholder="Selecione a categoria de idade"
              marginTop={'1rem'}
              onChange={(e) => {
                setNecessidadeBasalAdicional(e.currentTarget.value)
              }}
            >
              <option defaultChecked value="adulto">
                Adulto
              </option>
              <option value="filhote">Filhote</option>
            </Select>
            <Select
              placeholder="Selecione a categoria de especie"
              marginTop={'1rem'}
              onChange={(e) => {
                setCategoriaLimiteInfusao(e.currentTarget.value)
              }}
            >
              <option value="felino">Felino</option>
              <option value="canino">Canino</option>
            </Select>
          </>
        ) : (
          <></>
        )}

        {/* Peso do animal */}
        <Input
          placeholder="Insira o peso do animal"
          value={peso}
          onChange={(e) => {
            setPeso(e.target.value)
          }}
        ></Input>

        {/* % de Desidratação */}
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Marcar</Th>
                <Th>% de desidratação</Th>
                <Th>Sinais clinicos associados</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Checkbox
                    onChange={(e) => {
                      setReposicaoDesidratacao({
                        ...reposicaoDesidratacao,
                        '4%': !reposicaoDesidratacao['4%']
                      })
                    }}
                    iconColor="red"
                    colorScheme="red"
                  ></Checkbox>
                </Td>
                <Td>4%</Td>
                <Td>Apenas histórico de adipsia</Td>
              </Tr>
              <Tr>
                <Td>
                  <Checkbox
                    onChange={(e) => {
                      setReposicaoDesidratacao({
                        ...reposicaoDesidratacao,
                        '5-6%': !reposicaoDesidratacao['5-6%']
                      })
                    }}
                    iconColor="red"
                    colorScheme="red"
                  ></Checkbox>
                </Td>
                <Td>5-6%</Td>
                <Td>
                  Urina concentrada, apatia, redução da elasticidade cutânea e
                  mucosas parcialmente ressecadas
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Checkbox
                    onChange={(e) => {
                      setReposicaoDesidratacao({
                        ...reposicaoDesidratacao,
                        '8%': !reposicaoDesidratacao['8%']
                      })
                    }}
                    iconColor="red"
                    colorScheme="red"
                  ></Checkbox>
                </Td>
                <Td>8%</Td>
                <Td>
                  Redução da elasticidade cutânea, mucosas secas e viscosas,
                  retração do bulbo ocular, oligúria e TRC {'>'} 3
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Checkbox
                    onChange={(e) => {
                      setReposicaoDesidratacao({
                        ...reposicaoDesidratacao,
                        '10-12%': !reposicaoDesidratacao['10-12%']
                      })
                    }}
                    iconColor="red"
                    colorScheme="red"
                  ></Checkbox>
                </Td>
                <Td>10-12%</Td>
                <Td>
                  Todos os sinais anteriores acrescidos de pulso fraco e
                  contrações involuntarias
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Checkbox
                    onChange={(e) => {
                      setReposicaoDesidratacao({
                        ...reposicaoDesidratacao,
                        '12-15%': !reposicaoDesidratacao['12-15%']
                      })
                    }}
                    iconColor="red"
                    colorScheme="red"
                  ></Checkbox>
                </Td>
                <Td>12-15%</Td>
                <Td>Choque e óbito</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Marcar</Th>
                <Th>% de desidratação</Th>
                <Th>Sinais clinicos associados</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>

        {/* Perdas Hídricas Contínuas */}
        <Select
          placeholder="Determine as perdas hídricas contínuas"
          marginTop={'1rem'}
          onChange={(e) => {
            setPerdaHidrica(e.currentTarget.value)
          }}
        >
          <option defaultChecked value="vomito">
            Vômito
          </option>
          <option value="diarreia">Diarréia</option>
          <option value="ambos">Ambos</option>
        </Select>

        {/* somar tudo e mostrar */}
        <h1>Volume Total: {volumeFinal}ml/dia</h1>
        {/* <h1>Velocidade de Infusão: {taxaInfusao}ml/hora</h1> */}
      </Container>
    </>
  )
}

export default FluidTherapy
