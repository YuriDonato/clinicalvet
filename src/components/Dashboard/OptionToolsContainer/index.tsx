import { DashboardToolsOptions } from '../../../data/DashboardOptions'
import Option from '../Option'
import { OptionsContainer } from '../styles'

const OptionToolsContainer = () => {
  const options = DashboardToolsOptions
  return (
    <OptionsContainer>
      {options.map((o) => (
        <Option key={o.to} to={o.to} img={o.img} text={o.text} />
      ))}
    </OptionsContainer>
  )
}

export default OptionToolsContainer
