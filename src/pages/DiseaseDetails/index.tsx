import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as db from '../../services/firebase'
import { Patologia } from '../../models/Clinic'
import { Container } from '../../components/Clinic/mainPage/styles'
import DetailsDisease from '../../components/Diseases/DetailsDisease'

const DiseaseDetails = () => {
  const { key } = useParams<{ key?: string }>()
  const [patologia, setPatologia] = useState<Patologia | null>(null)

  useEffect(() => {
    const patologiaKey = key ?? ''
    const refPatologia = db.ref(db.database, `patologias/${key}`)

    db.onValue(refPatologia, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const resultadoPatologia: Patologia = {
          chave: patologiaKey,
          nomePatologia: data.nomePatologia,
          causador: data.causador,
          descricao: data.descricao,
          diagnostico: data.diagnostico,
          prevalencia: {
            animal: {
              cachorro: data.prevalencia.animal.cachorro,
              gato: data.prevalencia.animal.gato
            },
            regiao: {
              norte: data.prevalencia.regiao.norte,
              nordeste: data.prevalencia.regiao.nordeste,
              centrooeste: data.prevalencia.regiao.centrooeste,
              sudeste: data.prevalencia.regiao.sudeste,
              sul: data.prevalencia.regiao.sul
            }
          },
          tratamento: data.tratamento,
          prevencao: data.prevencao,
          prognostico: data.prognostico,
          sintomas: data.sintomas
        }
        setPatologia(resultadoPatologia)
      }
    })
  }, [key])

  if (!patologia) {
    return <div>Carregando...</div>
  }

  return (
    <Container>
      <DetailsDisease patologia={patologia} />
    </Container>
  )
}

export default DiseaseDetails
