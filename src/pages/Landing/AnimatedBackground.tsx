import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

// Defina a animação do gradiente
const AnimatedBackground = () => (
  <motion.div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: '-1',
      background: 'linear-gradient(to right, #69c1c4, #a5d9db)'
    }}
    initial={{ backgroundPosition: '0% 0%' }}
    animate={{ backgroundPosition: '100% 100%' }}
    transition={{
      backgroundPosition: {
        duration: 10, // Duração da animação
        repeat: Infinity, // Repetição infinita
        ease: 'linear' // Tipo de easing
      }
    }}
  />
)

export default AnimatedBackground
