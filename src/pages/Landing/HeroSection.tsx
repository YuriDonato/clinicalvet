import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { motion, Transition } from 'framer-motion'

const transitionHeading: Transition = { duration: 0.6 }
const transitionText: Transition = { duration: 0.6 }
const transitionButton: Transition = { duration: 0.6 }

const HeroSection = () => (
  <Box
    as={motion.section}
    bg="#f7f7f7"
    p={8}
    textAlign="center"
    minH="fit-content"
    position="relative"
  >
    <Heading
      as={motion.h1}
      fontSize="4xl"
      mb={4}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={transitionHeading as any}
      viewport={{ once: true }}
    >
      Bem-vindo ao ClinicalVet
    </Heading>{' '}
    <Text
      as={motion.p}
      fontSize="lg"
      mb={6}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={transitionText as any}
      viewport={{ once: true }}
    >
      Uma plataforma completa para auxiliar o médico veterinário com ferramentas
      poderosas.
    </Text>
    <Button
      as={motion.button}
      bg="#69c1c4"
      color="white"
      _hover={{ bg: '#4a9e9e' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={transitionButton as any}
      viewport={{ once: true }}
    >
      Saiba Mais
    </Button>
  </Box>
)

export default HeroSection
