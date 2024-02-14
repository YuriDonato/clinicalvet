import DashboardOptions from '../../../data/DashboardOptions'
import Option from '../Option'
import { OptionsContainer } from '../styles'

const OptionContainer = () => {
  const options = DashboardOptions
  return (
    <OptionsContainer>
      {options.map((o) => (
        <Option key={o.to} to={o.to} img={o.img} text={o.text} />
      ))}
    </OptionsContainer>
  )
}

export default OptionContainer
