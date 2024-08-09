import { Box, Heading, Text } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

// Lista de depoimentos
const testimonials = [
  {
    text: 'A plataforma ClinicalVet revolucionou a forma como gerenciamos nossos pacientes. Simples e eficiente!',
    author: 'Dr. João Silva'
  },
  {
    text: 'O melhor sistema que já usei! A interface é intuitiva e as ferramentas são incríveis.',
    author: 'Dra. Maria Oliveira'
  }
  // Adicione mais depoimentos conforme necessário
]

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimation() // Controle de animações

  useEffect(() => {
    // Iniciar a animação do primeiro depoimento
    controls.set({ opacity: 1 })

    const interval = setInterval(() => {
      // Animar desvanecimento para fora e depois troca de depoimento
      controls
        .start({
          opacity: 0,
          transition: { duration: 0.5 }
        })
        .then(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
          controls.start({
            opacity: 1,
            transition: { duration: 0.5 }
          })
        })
    }, 5000)

    return () => clearInterval(interval)
  }, [controls])

  return (
    <Box as={motion.section} p={8} bg="#f7f7f7" position="relative">
      <Heading textAlign="center" mb={6}>
        Depoimentos
      </Heading>
      <Box
        as={motion.div}
        p={4}
        bg="white"
        shadow="md"
        borderRadius="md"
        textAlign="center"
        position="relative"
        animate={controls}
        initial={{ opacity: 1 }}
      >
        <Text>&quot;{testimonials[currentIndex].text}&quot;</Text>
        <Text fontWeight="bold" mt={2}>
          {testimonials[currentIndex].author}
        </Text>
      </Box>
    </Box>
  )
}

export default TestimonialsSection
