import React, { useState, useEffect } from 'react'
import { Sintoma } from '../../../../models/Clinic'
import * as db from '../../../../services/firebase'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Stack,
  Flex,
  useToast
} from '@chakra-ui/react'

const EditSymptomTab = () => {
  const [symptoms, setSymptoms] = useState<Sintoma[]>([])
  const [filteredSymptoms, setFilteredSymptoms] = useState<Sintoma[]>([])
  const [selectedSymptom, setSelectedSymptom] = useState<Sintoma | null>(null)
  const [newSymptomName, setNewSymptomName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const toast = useToast()

  useEffect(() => {
    const fetchSymptoms = async () => {
      const refSymptoms = db.ref(db.database, 'sintomas')
      db.onValue(refSymptoms, (snapshot) => {
        const data = snapshot.val()
        const resultSymptoms = Object.entries<Sintoma>(data ?? {}).map(
          ([chave, valor]) => {
            return {
              chave,
              nomeSintoma: valor.nomeSintoma
            }
          }
        )
        setSymptoms(resultSymptoms)
        setFilteredSymptoms(resultSymptoms)
      })
    }

    fetchSymptoms()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSymptoms(symptoms)
    } else {
      const filtered = symptoms.filter((sintoma) =>
        sintoma.nomeSintoma.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredSymptoms(filtered)
    }
  }, [searchQuery, symptoms])

  const handleEdit = async () => {
    if (!selectedSymptom || !newSymptomName.trim()) return

    try {
      await db.update(
        db.ref(db.database, `sintomas/${selectedSymptom.chave}`),
        { nomeSintoma: newSymptomName }
      )
      setSelectedSymptom(null)
      setNewSymptomName('')
      toast({
        title: 'Sintoma editado com sucesso!',
        status: 'success',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      console.error('Erro ao editar o sintoma:', error)
      toast({
        title: 'Erro ao editar Sintoma!',
        description:
          'Fale pro desenvolvedor que houve um erro ao editar o sintoma',
        status: 'error',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleDelete = async () => {
    if (!selectedSymptom) return

    try {
      await db.remove(db.ref(db.database, `sintomas/${selectedSymptom.chave}`))
      setSymptoms(
        symptoms.filter((sintoma) => sintoma.chave !== selectedSymptom.chave)
      )
      setSelectedSymptom(null)
      toast({
        title: 'Sintoma deletado com sucesso!',
        status: 'success',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Erro ao deletar Sintoma!',
        description:
          'Fale pro desenvolvedor que houve um erro ao deletar o sintoma',
        status: 'error',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
      console.error('Erro ao excluir o sintoma:', error)
    }
  }

  const handleClick = (sintoma: Sintoma) => {
    setSelectedSymptom(sintoma)
    setNewSymptomName(sintoma.nomeSintoma)
  }

  return (
    <Flex>
      <Box flex="1">
        <Box mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            Lista de Sintomas
          </Text>
          <Input
            placeholder="Pesquisar sintoma..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mt={2}
          />
        </Box>
        <Stack flexDirection={'row'} flexWrap={'wrap'} spacing={2}>
          {filteredSymptoms.map((sintoma, index) => (
            <Button
              key={sintoma.chave}
              onClick={() => handleClick(sintoma)}
              colorScheme={
                selectedSymptom?.chave === sintoma.chave ? 'teal' : 'gray'
              }
              variant="outline"
              w="auto"
            >
              {sintoma.nomeSintoma}
            </Button>
          ))}
        </Stack>
      </Box>
      {selectedSymptom && (
        <Box ml={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Editar Sintoma
          </Text>
          <FormControl>
            <FormLabel>Nome do Sintoma</FormLabel>
            <Input
              value={newSymptomName}
              onChange={(e) => setNewSymptomName(e.target.value)}
            />
            <Button mt={4} colorScheme="teal" onClick={handleEdit}>
              Salvar
            </Button>
            <Button mt={4} colorScheme="red" onClick={handleDelete}>
              Excluir
            </Button>
          </FormControl>
        </Box>
      )}
    </Flex>
  )
}

export default EditSymptomTab
