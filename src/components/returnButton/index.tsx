import { Link } from 'react-router-dom'
import * as S from './styles'

import arrowright from '../../assets/images/arrow-right.svg'

type Props = {
  customRoute?: string
}

const ReturnButton = ({ customRoute = '' }: Props) => {
  return (
    <Link to={customRoute?.length > 0 ? '/admin' : '/'}>
      <S.Button>
        <S.Img src={arrowright} alt="" />
      </S.Button>
    </Link>
  )
}

export default ReturnButton
