import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

interface FarmacoCardProps {
  farmacoName: string
  farmacoType: string
}

const FarmacoCard: React.FC<FarmacoCardProps> = ({
  farmacoName,
  farmacoType
}) => {
  return (
    <Box
      borderRadius="xl"
      boxShadow="md"
      p={4}
      bg="white"
      width="300px"
      height="150px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="xl">
          {farmacoName}
        </Text>
        <Box
          bg="gray.200"
          borderRadius="md"
          px={2}
          py={1}
          fontSize="sm"
          fontWeight="bold"
        >
          {farmacoType}
        </Box>
      </Flex>
    </Box>
  )
}

export default FarmacoCard
