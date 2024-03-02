import React, { useState, useEffect } from 'react'
import * as db from '../../../../services/firebase'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Box,
  Text,
  Stack,
  RadioGroup,
  Radio,
  HStack,
  Grid,
  GridItem,
  Flex,
  useToast,
  Select
} from '@chakra-ui/react'
import { Categoria, Farmaco } from '../../../../models/Drug'

const EditDrugTab: React.FC = () => {
  const [farmacos, setFarmacos] = useState<Farmaco[]>([])
  const [selectedFarmaco, setSelectedFarmaco] = useState<Farmaco | null>(null)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const toast = useToast()

  useEffect(() => {
    const fetchFarmacos = async () => {
      const refFarmacos = db.ref(db.database, 'farmacos')
      db.onValue(refFarmacos, (snapshot) => {
        const data = snapshot.val()
        const resultadoFarmaco = Object.entries<Farmaco>(data ?? {}).map(
          ([chave, valor]) => {
            return {
              chave: chave,
              nomeFarmaco: valor.nomeFarmaco,
              tipo: valor.tipo,
              categoria: valor.categoria
            }
          }
        )
        setFarmacos(resultadoFarmaco)
      })
    }

    fetchFarmacos()

    const fetchCategorias = async () => {
      const refCategorias = db.ref(db.database, 'categoriaFarmaco')
      db.onValue(refCategorias, (snapshot) => {
        const data = snapshot.val()
        const resultadoCategorias = Object.entries<Categoria>(data ?? {}).map(
          ([chave, valor]) => {
            return {
              chave: chave,
              id: valor.id,
              nomeCategoria: valor.nomeCategoria
            }
          }
        )
        setCategorias(resultadoCategorias)
      })
    }

    fetchCategorias()
  }, [])

  useEffect(() => {
    if (selectedFarmaco) {
      const initialCategorias = selectedFarmaco.categoria ?? []
      setSelectedCategorias(initialCategorias)
    }
  }, [selectedFarmaco])

  const handleDelete = async () => {
    if (!selectedFarmaco) return

    try {
      await db.remove(db.ref(db.database, `farmacos/${selectedFarmaco.chave}`))
      setFarmacos(farmacos.filter((f) => f.chave !== selectedFarmaco.chave))
      setSelectedFarmaco(null)
      toast({
        title: 'Farmaco excluido com sucesso!',
        status: 'success',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      console.error('Erro ao excluir o farmaco:', error)
      toast({
        title: 'Erro ao excluir o farmaco',
        description:
          'Fale pro desenvolvedor que houve um erro ao excluir o farmaco',
        status: 'error',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleSelectFarmaco = (farmaco: Farmaco) => {
    setSelectedFarmaco(farmaco)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedFarmaco) return
    const { name, value } = event.target
    setSelectedFarmaco({
      ...selectedFarmaco,
      [name]: value
    })
  }

  const handleCategoriaChange = (categoriaChave: string) => {
    if (!selectedCategorias.includes(categoriaChave)) {
      setSelectedCategorias((prev) => [...prev, categoriaChave])
    } else {
      setSelectedCategorias((prev) =>
        prev.filter((item) => item !== categoriaChave)
      )
    }
  }

  const handleUpdate = async () => {
    if (!selectedFarmaco) return

    try {
      await db.set(db.ref(db.database, `farmacos/${selectedFarmaco.chave}`), {
        ...selectedFarmaco,
        categoria: selectedCategorias
      })
      toast({
        title: 'Farmaco atualizado com sucesso!',
        status: 'success',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      console.error('Erro ao atualizar o farmaco:', error)
      toast({
        title: 'Erro ao atualizar o farmaco',
        description:
          'Fale pro desenvolvedor que houve um erro ao atualizar o farmaco',
        status: 'error',
        position: 'bottom',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nomeCategoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredFarmacos = farmacos.filter((farmaco) =>
    farmaco.nomeFarmaco.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Flex gap="1rem">
      <Box flex="1">
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Lista de Farmacos
          </Text>
          <Input
            placeholder="Pesquisar farmaco..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          {filteredFarmacos.map((farmaco) => (
            <Button
              key={farmaco.chave}
              onClick={() => handleSelectFarmaco(farmaco)}
              colorScheme={
                selectedFarmaco?.chave === farmaco.chave ? 'teal' : 'gray'
              }
              variant="outline"
              mr={2}
              mb={2}
            >
              {farmaco.nomeFarmaco}
            </Button>
          ))}
        </Box>
      </Box>
      {selectedFarmaco && (
        <Box mt={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Formulário de Edição
          </Text>
          <FormControl>
            <FormLabel>Nome do Farmaco</FormLabel>
            <Input
              name="nomeFarmaco"
              value={selectedFarmaco.nomeFarmaco}
              onChange={handleInputChange}
            />
            <FormLabel>Tipo do Farmaco</FormLabel>
            <Select
              value={selectedFarmaco.tipo}
              onChange={(e) =>
                setSelectedFarmaco({
                  ...selectedFarmaco,
                  tipo: e.target.value
                })
              }
            >
              {/* Depois fazer uma conexão disso com a lista de categorias tá */}
              <option value="aminoglicosideos">Aminoglicosídeos</option>
              <option value="quinolomas">Quinolomas</option>
              <option value="penicilinas">Penicilinas</option>
              <option value="cefalosporinas">Cefalosporinas</option>
              <option value="nitroimidazolicos">Nitroimidazólicos</option>
              <option value="aminopenicilinas-potencializadas">
                Aminopenicilínas Potencializadas
              </option>
              <option value="tetraciclinas">Tetraciclinas</option>
              <option value="sulfonamidas">Sulfonamidas</option>
              <option value="macrolideos">Macrolídeos</option>
              <option value="lincosamidas">Lincosamidas</option>
              <option value="penicilinas">Penicilinas</option>
            </Select>

            <FormLabel>Categoria</FormLabel>
            <Box>
              <Input
                placeholder="Pesquisar categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
            <Stack spacing={3} mt={4} maxH="200px" overflowY="auto">
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                {filteredCategorias.map((categoria) => (
                  <GridItem key={categoria.chave}>
                    <Checkbox
                      isChecked={selectedCategorias.includes(categoria.chave)}
                      onChange={() => handleCategoriaChange(categoria.chave)}
                    >
                      {categoria.nomeCategoria}
                    </Checkbox>
                  </GridItem>
                ))}
              </Grid>
            </Stack>
            <Button mt={4} colorScheme="red" onClick={handleDelete}>
              Excluir
            </Button>
            <Button mt={4} colorScheme="teal" onClick={handleUpdate}>
              Atualizar
            </Button>
          </FormControl>
        </Box>
      )}
    </Flex>
  )
}

export default EditDrugTab
