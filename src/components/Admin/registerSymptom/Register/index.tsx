import React, { useState, useEffect } from 'react'
import { Sintoma } from '../../../../models/Clinic'
import * as db from '../../../../services/firebase'
import {
  FormControl,
  Input,
  Button,
  Box,
  Text,
  useToast
} from '@chakra-ui/react'

const RegisterSymptomTab = () => {
  const [symptoms, setSymptoms] = useState<Sintoma[]>([])
  const [newSymptom, setNewSymptom] = useState('')
  const toast = useToast()

  const handleAdd = async () => {
    try {
      const newKey = db.push(db.child(db.ref(db.database), 'sintomas')).key
      await db.set(db.ref(db.database, `sintomas/${newKey}`), {
        nomeSintoma: newSymptom
      })
      setSymptoms((prev) => [
        ...prev,
        { chave: newKey!, nomeSintoma: newSymptom }
      ])
      toast({
        title: 'Sintoma criado com sucesso!',
        status: 'success',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Erro ao criar sintoma',
        description:
          'Fale pro desenvolvedor que houve um erro ao criar o sintoma',
        status: 'error',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
      console.error('Erro ao adicionar o sintoma:', error)
    }
  }

  return (
    <>
      <Box mt={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Adicionar Novo Sintoma
        </Text>
        <FormControl>
          <Input
            placeholder="Nome do Sintoma"
            value={newSymptom}
            onChange={(e) => setNewSymptom(e.target.value)}
          />
          <Button mt={4} colorScheme="teal" onClick={handleAdd}>
            Adicionar
          </Button>
        </FormControl>
      </Box>
    </>
  )
}

export default RegisterSymptomTab
