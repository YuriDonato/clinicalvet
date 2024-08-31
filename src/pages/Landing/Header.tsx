import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Header = () => (
  <Flex
    as={motion.header}
    bg="#69c1c4"
    color="white"
    p={4}
    align="center"
    justify="space-between"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 } as any}
  >
    <Flex align="center">
      <motion.div
        style={{ width: '100%', height: '3rem' }} // Ajuste o tamanho conforme necessário
      >
        <motion.svg
          viewBox="0 0 480 480"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <motion.path
            d="m281.78 0c-0.88264 0.011256-1.788 0.054519-2.6875 0.125-35.824 6.1835-55.521 44.064-58.375 77.469-4.1707 30.311 9.187 69.27 42.469 76.062 4.8275 0.9191 9.8436 0.49905 14.562-0.78125 40.077-13.438 58.012-60.903 52.219-100.22-1.684-25.392-20.826-53.005-48.188-52.656zm-151.88 1.625c-22.275 0.54678-39.627 23.138-43.156 44.375-7.4409 42.074 11.698 94.352 55.531 107.66 4.1057 0.8929 8.3525 0.98485 12.5 0.34375 29.626-4.9375 42.177-38.154 40.938-64.969-0.8917-35.372-19.266-76.273-56-86.219-3.3578-0.89041-6.6304-1.2656-9.8125-1.1875zm248.94 119.5c-38.534 2.3054-64.953 40.754-68.719 76.656-5.0996 25.894 8.7049 60.527 38.25 62.594 41.197-0.5078 69.301-44.529 70.469-82.406 2.6058-25.051-12.151-55.461-40-56.844zm-337.28 8.5312c-16.394-0.14105-32.518 9.6788-37.875 26.344-14.293 44.579 14.409 101.04 61.625 110.41 19.706 3.3721 37.02-11.761 41.906-29.969 10.355-38.945-10.913-84.165-46.906-101.84-5.8639-3.2909-12.335-4.8823-18.75-4.9375zm172.75 79.938c-32.139 0.06854-64.783 16.378-85.594 40.656-22.477 28.297-40.89 61.226-48.094 96.938-8.7514 25.706 11.083 55.29 38.562 55.469 33.059 0.9183 61.471-21.783 94.344-23.469 27.89-4.2517 52.863 10.255 77.938 19.75 21.349 9.1313 50.85 5.632 61.75-17.344 8.5736-23.419-4.0459-48.39-14.5-69.188-21.322-33.757-44.165-69.236-79.125-90.312-14.013-8.6857-29.585-12.533-45.281-12.5z"
            strokeWidth={10}
            stroke="white"
            fill="none"
            initial={{ pathLength: 1 }}
            animate={{ pathLength: [0, 1, 0, 1] }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
              times: [0, 0.5, 1, 1.5] // Ajuste os tempos para suavizar a animação
            }}
          />
        </motion.svg>
      </motion.div>
      <Text fontSize="xl" fontWeight="bold" ml={2}>
        ClinicalVet
      </Text>
    </Flex>
    <Button bg="white" color="#69c1c4" _hover={{ bg: '#e0e0e0' }}>
      Login
    </Button>
  </Flex>
)

export default Header
