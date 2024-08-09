import { useState } from 'react'
import { CreateNeo, CreatePreg } from '../../../utils/farmacoNeonato/CRUD'
import {
  Box,
  Button,
  Grid,
  Input,
  Select,
  Text,
  VStack
} from '@chakra-ui/react'

const Farmaco = ({ paciente }: { paciente: string }) => {
  const [tipo, setTipo] = useState('')
  const [classe, setClasse] = useState('')
  const [nome, setNome] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (paciente === 'preg') {
      CreatePreg(nome, tipo, classe)
    } else {
      CreateNeo(nome, tipo, classe)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <Text fontSize="2xl" mb={4}>
        Teste de insercao de farmacos{' '}
        {paciente === 'preg' ? 'gestante' : 'neonato'}
      </Text>
      <VStack spacing={4} align="stretch">
        <Select placeholder="Tipo" onChange={(e) => setTipo(e.target.value)}>
          <option value="antibiotico">Antibiotico</option>
          <option value="antiinflamatorio">Antiinflamatorio</option>
          <option value="analgesico">Analgesico</option>
          <option value="endoparasiticida">Endoparasiticida</option>
          <option value="ectoparasiticida">Ectoparasiticida</option>
          <option value="acaogastrointestinal">Acaogastrointestinal</option>
          <option value="antifungico">Antifungico</option>
          <option value="anticonvulsivante">Anticonvulsivante</option>
          <option value="acaocardiovascular">Acaocardiovascular</option>
          <option value="quimioterapico">Quimioterapico</option>
        </Select>
        <Select
          placeholder="Classe"
          onChange={(e) => setClasse(e.target.value)}
        >
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
        </Select>
        <Input
          placeholder="Nome"
          name="nome"
          variant="outline"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Button type="submit" colorScheme="teal" mt={4}>
          Enviar
        </Button>
      </VStack>
    </Box>
  )
}

export default Farmaco
