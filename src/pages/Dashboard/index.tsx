import {
  HeaderImg,
  HeaderText,
  HorizontalLine,
  ImgPaws
} from '../../components/Dashboard/styles'
import { PageContainer } from '../../styles'

import imagePaws from '../../assets/images/dogPaws.png'
import imageHeader from '../../assets/images/dogcatHomePage.png'

import OptionContainer from '../../components/Dashboard/OptionContainer'

const Dashboard = () => {
  return (
    <PageContainer>
      <ImgPaws src={imagePaws} alt="Dog Paws crossing the screen" />
      <PageContainer>
        <HeaderText>Clinical.vet</HeaderText>
        <HeaderImg src={imageHeader} alt="Dog and Cat" />
      </PageContainer>

      <HorizontalLine />

      <OptionContainer />
    </PageContainer>
  )
}

export default Dashboard
