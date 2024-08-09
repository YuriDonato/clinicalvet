import Header from './Header'
import HeroSection from './HeroSection'
import ToolsSection from './ToolsSection'
import TestimonialsSection from './TestimonialsSection'
import PricingSection from './PricingSection'
import Footer from './Footer'
import { Box } from '@chakra-ui/react'
import AnimatedBackground from './AnimatedBackground'

const Landing = () => {
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
