import { useEffect, useState } from 'react'
import ReturnButton from '../../returnButton'
import DiseaseList from '../DiseaseList'
import { Container, HeaderContainer } from './styles'
import { Input } from '@chakra-ui/react'
import { Patologia, Sintoma } from '../../../models/Clinic'
import * as db from '../../../services/firebase'

const MainPage = () => {
  // Database logic Snapshot db
  const [symptoms, setSymptoms] = useState<Sintoma[]>([])
  const [patologias, setPatologias] = useState<Patologia[]>([])
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    const refSintomas = db.ref(db.database, 'sintomas')
    const refPatologias = db.ref(db.database, 'patologias')

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
      setSymptoms(resultadoSintomas)
    })

    db.onValue(refPatologias, (snapshot) => {
      const data = snapshot.val()
      const resultadoPatologia = Object.entries<Patologia>(data ?? {}).map(
        ([chave, valor]) => {
          return {
            chave: chave,
            nomePatologia: valor.nomePatologia,
            causador: valor.causador,
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
  }, [])

  return (
    <Container>
      <HeaderContainer>
        <ReturnButton />
        <Input
          variant={'filled'}
          type="text"
          placeholder="Pesquise Doenças..."
          onChange={(e) => setFilterText(e.target.value)}
          className="input"
          width={'20rem'}
        />
      </HeaderContainer>
      <DiseaseList filterText={filterText} patologias={patologias} />
    </Container>
  )
}

export default MainPage
