import React, { useState } from 'react'
import { Box, Button, Grid, Input, Text, VStack } from '@chakra-ui/react'

const Teste: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    // Processar os dados do formulário aqui
  }

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <Text fontSize="2xl" mb={4}>
        Parâmetros Hematológicos do Cão Neonato
      </Text>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Hemácias" name="hemacias" variant="outline" />
        <Input placeholder="Hemoglobina" name="hemoglobina" variant="outline" />
        <Input placeholder="Hematócrito" name="hematocrito" variant="outline" />
        <Input placeholder="VCM" name="vcm" variant="outline" />
        <Input placeholder="CHCM" name="chcm" variant="outline" />
        <Input
          placeholder="Reticulócitos"
          name="reticulocitos"
          variant="outline"
        />
        <Input placeholder="Leucócitos" name="leucocitos" variant="outline" />
        <Input placeholder="Neutrófilos" name="neutrofilos" variant="outline" />
        <Input placeholder="Linfócitos" name="linfocitos" variant="outline" />
        <Input placeholder="Monócitos" name="monocitos" variant="outline" />
        <Input placeholder="Eosinófilos" name="eosinofilos" variant="outline" />
        <Input placeholder="Basófilos" name="basofilos" variant="outline" />
        <Input placeholder="Plaquetas" name="plaquetas" variant="outline" />
        <Button type="submit" colorScheme="teal" mt={4}>
          Enviar
        </Button>
      </VStack>
    </Box>
  )
}

export default Teste
