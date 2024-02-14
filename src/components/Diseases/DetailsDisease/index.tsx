import { Patologia } from '../../../models/Clinic'
import ReturnButton from '../../returnButton'

interface DiseaseDetailsProps {
  patologia: Patologia
}

const DetailsDisease: React.FC<DiseaseDetailsProps> = ({ patologia }) => {
  return (
    <>
      <ReturnButton customRoute="disease" />
      <h1>{patologia.nomePatologia}</h1>
      <p>{patologia.descricao}</p>
    </>
  )
}

export default DetailsDisease
