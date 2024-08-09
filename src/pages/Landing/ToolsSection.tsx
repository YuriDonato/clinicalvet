import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { motion, Transition } from 'framer-motion'

const transition: Transition = { duration: 0.8 }
type Props = {
  title: string
  description: string
}

const ToolItem = ({ title, description }: Props) => (
  <Box
    as={motion.div}
    textAlign="center"
    p={4}
    bg="white"
    shadow="md"
    borderRadius="md"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={transition as any}
    viewport={{ once: true }}
  >
    <Text fontSize="lg" mb={2}>
      {title}
    </Text>
    <Text>{description}</Text>
  </Box>
)
const ferramentas = [
  {
    title: 'Leitor de hemograma',
    description:
      'Analisa e interpreta os resultados do hemograma de forma rápida e precisa.'
  },
  {
    title: 'Calculadora de Fluidoterapia',
    description:
      'Calcula a quantidade de fluidos necessários para a reidratação de pacientes com precisão.'
  },
  {
    title: 'Tabela de Afinidade de Antibioticos',
    description:
      'Oferece uma tabela de afinidade para ajudar na escolha do antibiótico adequado para diferentes infecções.'
  }
]

const ToolsSection = () => (
  <Box as={motion.section} p={8} bg="#fff">
    <Heading textAlign="center" mb={6}>
      Nossas Ferramentas
    </Heading>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
      {ferramentas.map((tool) => (
        <ToolItem key={tool.title} {...tool} />
      ))}
      {/* Adicione mais ferramentas conforme necessário */}
    </SimpleGrid>
  </Box>
)

export default ToolsSection
