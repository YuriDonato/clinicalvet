import { useState, useEffect, useMemo } from 'react'

import * as db from '../../../services/firebase'

import { Patologia, Sintoma } from '../../../models/Clinic'

import { PageContainer } from '../../../styles'
import {
  Container,
  HeaderContainer,
  LoadingContainer,
  TextLoading
} from './styles'

import ReturnButton from '../../returnButton'
import SetMode from '../setMode'
import SymptomTab from '../SymptomTab'
import ListPatologias from '../ListPatologias'

import { CircularProgress } from '@chakra-ui/react'

const MainPage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Sintoma[]>([])

  const [isLoading, setIsLoading] = useState(true)

  // Dog and Cat Mode
  const [catMode, setCatMode] = useState(false)

  const toggleCatMode = () => {
    setCatMode((prevCatMode) => !prevCatMode)
  }

  // Database logic Snapshot db
  const [symptoms, setSymptoms] = useState<Sintoma[]>([])
  const [patologias, setPatologias] = useState<Patologia[]>([])

  useEffect(() => {
    const refSintomas = db.ref(db.database, 'sintomas')
    const refPatologias = db.ref(db.database, 'patologias')
    setIsLoading(true)

    db.onValue(refSintomas, (snapshot) => {
      const data = snapshot.val()
      const resultadoSintomas = Object.entries<Sintoma>(data ?? {}).map(
        ([chave, valor]) => {
          return {
            chave: chave,
            nomeSintoma: valor.nomeSintoma
          }
        }
      )
      setSintomasNomesKeys(data)
      setSymptoms(resultadoSintomas)
    })

    db.onValue(refPatologias, (snapshot) => {
      const data = snapshot.val()
      const resultadoPatologia = Object.entries<Patologia>(data ?? {}).map(
        ([chave, valor]) => {
          return {
            chave: chave,
            nomePatologia: valor.nomePatologia,
            causador: {
              bacteria: valor.causador.bacteria,
              fungo: valor.causador.fungo,
              virus: valor.causador.virus
            },
            descricao: valor.descricao,
            diagnostico: valor.diagnostico,
            prevalencia: {
              animal: {
                cachorro: valor.prevalencia.animal.cachorro,
                gato: valor.prevalencia.animal.gato
              },
              regiao: {
                norte: valor.prevalencia.regiao.norte,
                nordeste: valor.prevalencia.regiao.nordeste,
                centrooeste: valor.prevalencia.regiao.centrooeste,
                sudeste: valor.prevalencia.regiao.sudeste,
                sul: valor.prevalencia.regiao.sul
              }
            },
            tratamento: valor.tratamento,
            prevencao: valor.prevencao,
            prognostico: valor.prognostico,
            sintomas: valor.sintomas
          }
        }
      )
      setPatologias(resultadoPatologia)
    })
    handleLoading()
  }, [])

  function handleLoading() {
    setTimeout(() => {
      setIsLoading(!isLoading)
    }, 1000)
  }
  // Inicializando uma relação de chave:valor com os sintomas para serem filtrados
  const [sintomasNomesKeys, setSintomasNomesKeys] = useState<{
    [key: string]: Sintoma
  }>({})

  return (
    <Container>
      <HeaderContainer>
        <ReturnButton />
        <SetMode isOn onChange={toggleCatMode} />
      </HeaderContainer>
      {isLoading === true ? (
        <PageContainer>
          <LoadingContainer>
            <CircularProgress isIndeterminate color="blue.400" />
            <TextLoading>Carregando...</TextLoading>
          </LoadingContainer>
        </PageContainer>
      ) : (
        <PageContainer>
          <SymptomTab
            onSymptomSelect={(s) => setSelectedSymptoms(s)}
            symptoms={symptoms}
          />
          <ListPatologias
            catMode={catMode}
            patologias={patologias}
            selectedSymptoms={selectedSymptoms}
            sintomasNomesKeys={sintomasNomesKeys}
          />
        </PageContainer>
      )}
    </Container>
  )
}

export default MainPage
