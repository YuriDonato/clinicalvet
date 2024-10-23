import Header from './Header'
import HeroSection from './HeroSection'
import ToolsSection from './ToolsSection'
import TestimonialsSection from './TestimonialsSection'
import PricingSection from './PricingSection'
import Footer from './Footer'
import { Box, Container } from '@chakra-ui/react'
import AnimatedBackground from './AnimatedBackground'
import useBreakpoint from '../../utils/Breakpoints'
import * as S from './styles'

import HeartImg from '../../assets/images/icon-heart.png'
import FluidIcon from '../../assets/images/fluid-icon.png'
import PharmaIcon from '../../assets/images/pharma-icon.png'
import HemoIcon from '../../assets/images/hemo-icon.png'
import FooterImg from '../../assets/images/landing-footer-image.png'
import { Link } from 'react-router-dom'
const Landing = () => {
  const isMobile = useBreakpoint()

  function onClick(buttonName: string) {
    //teste
  }

  if (isMobile) {
    return (
      <>
        <S.Header>
          {/* <S.CustomReturnButton customRoute="tools" /> */}
          <div>
            <h1>ClinicalVet</h1>
            <h2>Faclitando a rotina do Médico Veterinário</h2>
            <img src={HeartImg}></img>
          </div>
        </S.Header>
        <S.MainContainer>
          <S.ButtonList>
            <Link to="/tools/fluid" style={{ width: '100%' }}>
              <S.ButtonContainer>
                <span>FluidVet</span>
                <S.FluidIcon src={FluidIcon}></S.FluidIcon>
              </S.ButtonContainer>
            </Link>
            <Link to="/tools/fluid" style={{ width: '100%' }}>
              <S.ButtonContainer>
                <span>PharmaVet</span>
                <img src={PharmaIcon}></img>
              </S.ButtonContainer>
            </Link>
            <Link to="/tools/f  'luid" style={{ width: '100%' }}>
              <S.ButtonContainer>
                <span>HemoVet</span>
                <img src={HemoIcon}></img>
              </S.ButtonContainer>
            </Link>
          </S.ButtonList>
          <S.MainText>
            Três Ferramentas Essenciais em <br />
            Uma Só Plataforma.
          </S.MainText>
          <S.Image src={FooterImg}></S.Image>
        </S.MainContainer>
        <S.Footer>
          <S.FooterText>Facilite sua rotina, otimize seu tempo</S.FooterText>
        </S.Footer>
      </>
    )
  }
  return (
    <div>
      <Header />
      <Box position="relative" minHeight="100vh" overflow="hidden">
        <AnimatedBackground />
        <Box p={8} zIndex="1" position="relative">
          <HeroSection />
          <ToolsSection />
          <TestimonialsSection />
          <PricingSection />
        </Box>
      </Box>
      <Footer />
    </div>
  )
}

export default Landing
