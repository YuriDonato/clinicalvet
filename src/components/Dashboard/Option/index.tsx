import { Link } from 'react-router-dom'
import * as S from '../styles'
import PropDashboardOption from '../../../models/Dashboard'

const Option = ({ to, img, text }: PropDashboardOption) => {
  return (
    <S.Option>
      <Link to={to}>
        <S.OptionImg src={img} alt="" />
        <S.OptionText>{text}</S.OptionText>
      </Link>
    </S.Option>
  )
}

export default Option
