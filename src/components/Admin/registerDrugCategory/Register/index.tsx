import React, { useState, useEffect } from 'react'
import * as db from '../../../../services/firebase'
import {
  FormControl,
  Input,
  Button,
  Box,
  Text,
  useToast
} from '@chakra-ui/react'
import { Categoria } from '../../../../models/Drug'

const RegisterCategoriaTab = () => {
  const [categoria, setCategoria] = useState<Categoria[]>([])
  const [newCategoria, setNewCategoria] = useState('')
  const [newId, setNewId] = useState('')
  const toast = useToast()

  const handleAdd = async () => {
    try {
      const newKey = db.push(
        db.child(db.ref(db.database), 'categoriaFarmaco')
      ).key
      await db.set(db.ref(db.database, `categoriaFarmaco/${newKey}`), {
        id: newId,
        nomeCategoria: newCategoria
      })
      setCategoria((prev) => [
        ...prev,
        { chave: newKey!, id: newId, nomeCategoria: newCategoria }
      ])
      toast({
        title: 'Categoria criada com sucesso!',
        status: 'success',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Erro ao criar categoria',
        description:
          'Fale pro desenvolvedor que houve um erro ao criar o categoria',
        status: 'error',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
      console.error('Erro ao adicionar o categoria:', error)
    }
  }

  return (
    <>
      <Box mt={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Adicionar Novo Categoria
        </Text>
        <FormControl>
          <Input
            placeholder="Id da Categoria"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
          />
          <Input
            placeholder="Nome da Categoria"
            value={newCategoria}
            onChange={(e) => setNewCategoria(e.target.value)}
          />
          <Button mt={4} colorScheme="teal" onClick={handleAdd}>
            Adicionar
          </Button>
        </FormControl>
      </Box>
    </>
  )
}

export default RegisterCategoriaTab
