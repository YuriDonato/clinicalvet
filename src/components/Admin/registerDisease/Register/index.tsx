import React, { useState, FormEvent, useEffect } from 'react'
import { Patologia, Sintoma } from '../../../../models/Clinic'
import * as db from '../../../../services/firebase'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Checkbox,
  Stack,
  RadioGroup,
  Radio,
  HStack,
  Box,
  Grid,
  GridItem,
  useToast
} from '@chakra-ui/react'

const RegisterDiseaseTab: React.FC = () => {
  const emptyPatologiaData: Patologia = {
    chave: '',
    nomePatologia: '',
    causador: {
      bacteria: false,
      fungo: false,
      virus: false
    },
    descricao: '',
    diagnostico: '',
    prevalencia: {
      animal: {
        cachorro: false,
        gato: false
      },
      regiao: {
        norte: false,
        nordeste: false,
        centrooeste: false,
        sudeste: false,
        sul: false
      }
    },
    tratamento: '',
    prevencao: '',
    prognostico: '',
    sintomas: []
  }

  const toast = useToast()

  const [patologiaData, setPatologiaData] =
    useState<Patologia>(emptyPatologiaData)

  const [causadorData, setCausadorData] = useState('')
  const [symptoms, setSymptoms] = useState<Sintoma[]>([])
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fetchSymptoms = async () => {
      const refSintomas = db.ref(db.database, 'sintomas')
      db.onValue(refSintomas, (snapshot) => {
        const data = snapshot.val()
        const resultadoSintomas = Object.entries<Sintoma>(data ?? {}).map(
          ([chave, valor]) => {
            return {
              chave: chave,
              nomeSintoma: valor.nomeSintoma
            }
          }
        )
        setSymptoms(resultadoSintomas)
      })
    }

    fetchSymptoms()
  }, [])

  const createPathologyData = async (event: FormEvent) => {
    event.preventDefault()
    // Adicione os sintomas selecionados aos dados da patologia
    const newData = { ...patologiaData, sintomas: selectedSymptoms }
    const newKey = db.push(db.child(db.ref(db.database), 'patologias')).key
    newData.chave = newKey!
    db.set(db.ref(db.database, `patologias/${newKey}`), newData)
    setPatologiaData(emptyPatologiaData)
    setCausadorData('')
    setSelectedSymptoms([])
    toast({
      title: 'Doença criada com sucesso!',
      status: 'success',
      position: 'bottom',
      duration: 9000,
      isClosable: true
    })
  }

  const handleSymptomChange = (chave: string) => {
    // Verifique se o sintoma já está selecionado
    const isSelected = selectedSymptoms.includes(chave)
    if (isSelected) {
      // Se estiver selecionado, remova-o da lista de sintomas selecionados
      setSelectedSymptoms(
        selectedSymptoms.filter((symptom) => symptom !== chave)
      )
    } else {
      // Se não estiver selecionado, adicione-o à lista de sintomas selecionados
      setSelectedSymptoms([...selectedSymptoms, chave])
    }
  }

  const filteredSymptoms = symptoms.filter((sintoma) =>
    sintoma.nomeSintoma.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <form onSubmit={createPathologyData}>
        <FormControl>
          <FormLabel>Nome da Patologia</FormLabel>
          <Input
            value={patologiaData.nomePatologia}
            onChange={(e) =>
              setPatologiaData({
                ...patologiaData,
                nomePatologia: e.target.value
              })
            }
            type="text"
          />
          <FormLabel>Causador</FormLabel>
          <RadioGroup
            value={causadorData}
            onChange={(value) => setCausadorData(value)}
          >
            <HStack spacing="24px">
              <Radio value="bacteria">Bacterias</Radio>
              <Radio value="fungo">Fungos</Radio>
              <Radio value="virus">Virus</Radio>
            </HStack>
          </RadioGroup>
          <FormLabel>Descrição</FormLabel>
          <Input
            value={patologiaData.descricao}
            onChange={(e) =>
              setPatologiaData({
                ...patologiaData,
                descricao: e.target.value
              })
            }
            type="text"
          />
          <FormLabel>Diagnostico</FormLabel>
          <Input
            value={patologiaData.diagnostico}
            onChange={(e) =>
              setPatologiaData({
                ...patologiaData,
                diagnostico: e.target.value
              })
            }
            type="text"
          />
          <FormLabel>Prevalencia Animal</FormLabel>
          <Stack spacing={5} direction={'row'}>
            <Checkbox
              isChecked={patologiaData.prevalencia.animal.cachorro}
              onChange={(e) =>
                setPatologiaData({
                  ...patologiaData,
                  prevalencia: {
                    ...patologiaData.prevalencia,
                    animal: {
                      ...patologiaData.prevalencia.animal,
                      cachorro: e.target.checked
                    }
                  }
                })
              }
            >
              Cachorro
            </Checkbox>
            <Checkbox
              isChecked={patologiaData.prevalencia.animal.gato}
              onChange={(e) =>
                setPatologiaData({
                  ...patologiaData,
                  prevalencia: {
                    ...patologiaData.prevalencia,
                    animal: {
                      ...patologiaData.prevalencia.animal,
                      gato: e.target.checked
                    }
                  }
                })
              }
            >
              Gato
            </Checkbox>
          </Stack>
          <FormLabel>Prevalencia Regional</FormLabel>
          <Stack spacing={5} direction={'row'}>
            <Checkbox
              isChecked={patologiaData.prevalencia.regiao.norte}
              onChange={(e) =>
                setPatologiaData({
                  ...patologiaData,
                  prevalencia: {
                    ...patologiaData.prevalencia,
                    regiao: {
                      ...patologiaData.prevalencia.regiao,
                      norte: e.target.checked
                    }
                  }
                })
              }
            >
              Norte
            </Checkbox>
            <Checkbox
              isChecked={patologiaData.prevalencia.regiao.nordeste}
              onChange={(e) =>
                setPatologiaData({
                  ...patologiaData,
                  prevalencia: {
                    ...patologiaData.prevalencia,
                    regiao: {
                      ...patologiaData.prevalencia.regiao,
                      nordeste: e.target.checked
                    }
                  }
                })
              }
            >
              Nordeste
            </Checkbox>
            <Checkbox
              isChecked={patologiaData.prevalencia.regiao.centrooeste}
              onChange={(e) =>
                setPatologiaData({
                  ...patologiaData,
                  prevalencia: {
                    ...patologiaData.prevalencia,
                    regiao: {
                      ...patologiaData.prevalencia.regiao,
                      centrooeste: e.target.checked
                    }
                  }
                })
              }
            >
              Centro-Oeste
            </Checkbox>
            <Checkbox
              isChecked={patologiaData.prevalencia.regiao.sudeste}
              onChange={(e) =>
                setPatologiaData({
                  ...patologiaData,
                  prevalencia: {
                    ...patologiaData.prevalencia,
                    regiao: {
                      ...patologiaData.prevalencia.regiao,
                      sudeste: e.target.checked
                    }
                  }
                })
              }
            >
              Sudeste
            </Checkbox>
            <Checkbox
              isChecked={patologiaData.prevalencia.regiao.sul}
              onChange={(e) =>
                setPatologiaData({
                  ...patologiaData,
                  prevalencia: {
                    ...patologiaData.prevalencia,
                    regiao: {
                      ...patologiaData.prevalencia.regiao,
                      sul: e.target.checked
                    }
                  }
                })
              }
            >
              Sul
            </Checkbox>
          </Stack>

          <FormLabel>Tratamento</FormLabel>
          <Input
            value={patologiaData.tratamento}
            onChange={(e) =>
              setPatologiaData({
                ...patologiaData,
                tratamento: e.target.value
              })
            }
            type="text"
          />
          <FormLabel>Prevenção</FormLabel>
          <Input
            value={patologiaData.prevencao}
            onChange={(e) =>
              setPatologiaData({
                ...patologiaData,
                prevencao: e.target.value
              })
            }
            type="text"
          />
          <FormLabel>Prognostico</FormLabel>
          <Input
            value={patologiaData.prognostico}
            onChange={(e) =>
              setPatologiaData({
                ...patologiaData,
                prognostico: e.target.value
              })
            }
            type="text"
          />
          <FormLabel>Sintomas</FormLabel>
          <Box>
            <Input
              placeholder="Pesquisar sintoma..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Stack spacing={3} mt={4} maxH="200px" overflowY="auto">
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              {filteredSymptoms.map((sintoma) => (
                <GridItem key={sintoma.chave}>
                  <Checkbox
                    isChecked={selectedSymptoms.includes(sintoma.chave)}
                    onChange={() => handleSymptomChange(sintoma.chave)}
                  >
                    {sintoma.nomeSintoma}
                  </Checkbox>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        </FormControl>
        <Button marginTop={'1rem'} type="submit">
          Criar Patologia
        </Button>
      </form>
    </>
  )
}

export default RegisterDiseaseTab
