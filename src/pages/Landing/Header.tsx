import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { motion, Transition } from 'framer-motion'

const transition: Transition = { duration: 0.5 }

const Header = () => (
  <Flex
    as={motion.header}
    bg="#69c1c4"
    color="white"
    p={4}
    align="center"
    justify="space-between"
    initial={{ y: 0, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={transition as any}
    viewport={{ once: true }}
  >
    <Text fontSize="xl" fontWeight="bold">
      ClinicalVet
    </Text>
    <Button bg="white" color="#69c1c4" _hover={{ bg: '#e0e0e0' }}>
      Login
    </Button>
  </Flex>
)
export default Header
