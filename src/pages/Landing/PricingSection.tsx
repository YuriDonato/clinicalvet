import { Box, Heading, SimpleGrid, Text, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type Props = {
  plan: string
  price: string
  originalPrice: string // Adiciona uma nova prop para o preço original
  description: string
}

const PricingCard = ({ plan, price, originalPrice, description }: Props) => (
  <Box
    as={motion.div}
    p={4}
    bg="white"
    shadow="md"
    borderRadius="md"
    textAlign="center"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 } as any}
    viewport={{ once: true }}
  >
    <Heading size="md" mb={4}>
      {plan}
    </Heading>
    <Flex justify="center" direction="column" align="center" mb={4}>
      <Text fontSize="lg" color="gray.500" textDecoration="line-through">
        {originalPrice}
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        {price}
      </Text>
    </Flex>
    <Text>{description}</Text>
    {/* Adicione um botão ou link para compra */}
  </Box>
)

const PricingSection = () => (
  <Box as={motion.section} p={8} bg="#fff" borderBottomRadius={'xl' as any}>
    <Heading textAlign="center" mb={6}>
      Planos e Preços
    </Heading>
    <Flex justify="center">
      <PricingCard
        plan="Plano Único"
        price="R$ 99,99"
        originalPrice="R$ 200,00"
        description="Pagamento único. Acesso completo a todas as ferramentas."
      />
    </Flex>
  </Box>
)

export default PricingSection
