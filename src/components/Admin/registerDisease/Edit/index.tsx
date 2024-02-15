import React, { useState, useEffect } from 'react'
import { Patologia, Sintoma } from '../../../../models/Clinic'
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
  GridItem
} from '@chakra-ui/react'

const EditDiseaseTab: React.FC = () => {
  const [patologias, setPatologias] = useState<Patologia[]>([])
  const [selectedDisease, setSelectedDisease] = useState<Patologia | null>(null)
  const [causadorData, setCausadorData] = useState('')
  const [symptoms, setSymptoms] = useState<Sintoma[]>([])
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fetchPatologias = async () => {
      const refPatologias = db.ref(db.database, 'patologias')
      db.onValue(refPatologias, (snapshot) => {
        const data = snapshot.val()
        const resultadoPatologia = Object.entries<Patologia>(data ?? {}).map(
          ([chave, valor]) => {
            return {
              chave: chave,
              nomePatologia: valor.nomePatologia,
              causador: valor.causador,
              descricao: valor.descricao,
              diagnostico: valor.diagnostico,
              prevalencia: {
                animal: {
                  cachorro: valor.prevalencia.animal.cachorro,
                  gato: valor.prevalencia.animal.gato
                },
                regiao: {
                  norte: valor.prevalencia.regiao.norte,
                  nordeste: valor.prevalencia.regiao.nordeste,
                  centrooeste: valor.prevalencia.regiao.centrooeste,
                  sudeste: valor.prevalencia.regiao.sudeste,
                  sul: valor.prevalencia.regiao.sul
                }
              },
              tratamento: valor.tratamento,
              prevencao: valor.prevencao,
              prognostico: valor.prognostico,
              sintomas: valor.sintomas
            }
          }
        )
        setPatologias(resultadoPatologia)
      })
    }

    fetchPatologias()

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

  useEffect(() => {
    if (selectedDisease) {
      const initialSymptoms = selectedDisease.sintomas ?? []
      setSelectedSymptoms(initialSymptoms)
    }
  }, [selectedDisease])

  function teste() {
    setSelectedDisease((prev) => ({
      ...prev!,
      sintomas: ['']
    }))
  }
  // Handler do causador
  useEffect(() => {
    if (selectedDisease && causadorData) {
      teste()
      if (causadorData === 'bacteria') {
        setSelectedDisease((prevSelectedDisease) => ({
          ...prevSelectedDisease!,
          causador: {
            bacteria: true,
            fungo: false,
            virus: false
          }
        }))
      } else if (causadorData === 'fungo') {
        setSelectedDisease((prevSelectedDisease) => ({
          ...prevSelectedDisease!,
          causador: {
            bacteria: false,
            fungo: true,
            virus: false
          }
        }))
      } else if (causadorData === 'virus') {
        setSelectedDisease((prevSelectedDisease) => ({
          ...prevSelectedDisease!,
          causador: {
            bacteria: false,
            fungo: false,
            virus: true
          }
        }))
      }
    }
  }, [causadorData])

  // popular o causador data
  useEffect(() => {
    if (selectedDisease?.causador.bacteria) {
      setCausadorData('bacteria')
    } else if (selectedDisease?.causador.fungo) {
      setCausadorData('fungo')
    } else if (selectedDisease?.causador.virus) {
      setCausadorData('virus')
    } else {
      setCausadorData('')
    }
  }, [selectedDisease])

  const handleDelete = async () => {
    if (!selectedDisease) return

    try {
      await db.remove(
        db.ref(db.database, `patologias/${selectedDisease.chave}`)
      )
      setPatologias(patologias.filter((p) => p.chave !== selectedDisease.chave))
      setSelectedDisease(null)
    } catch (error) {
      console.error('Erro ao excluir a doença:', error)
    }
  }

  const handleSelectDisease = (patologia: Patologia) => {
    setSelectedDisease(patologia)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedDisease) return
    const { name, value } = event.target
    setSelectedDisease({
      ...selectedDisease,
      [name]: value
    })
  }

  const handleSymptomChange = (sintomaChave: string) => {
    if (!selectedSymptoms.includes(sintomaChave)) {
      setSelectedSymptoms((prev) => [...prev, sintomaChave])
    } else {
      setSelectedSymptoms((prev) =>
        prev.filter((item) => item !== sintomaChave)
      )
    }
  }

  const handleUpdate = async () => {
    if (!selectedDisease) return

    try {
      await db.set(db.ref(db.database, `patologias/${selectedDisease.chave}`), {
        ...selectedDisease,
        sintomas: selectedSymptoms
      })
    } catch (error) {
      console.error('Erro ao atualizar a doença:', error)
    }
  }

  const filteredSymptoms = symptoms.filter((sintoma) =>
    sintoma.nomeSintoma.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Lista de Doenças
        </Text>
        {patologias.map((patologia) => (
          <Button
            key={patologia.chave}
            onClick={() => handleSelectDisease(patologia)}
            colorScheme={
              selectedDisease?.chave === patologia.chave ? 'teal' : 'gray'
            }
            variant="outline"
            mr={2}
            mb={2}
          >
            {patologia.nomePatologia}
          </Button>
        ))}
      </Box>
      {selectedDisease && (
        <Box mt={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Formulário de Edição
          </Text>
          <FormControl>
            <FormLabel>Nome da Patologia</FormLabel>
            <Input
              name="nomePatologia"
              value={selectedDisease.nomePatologia}
              onChange={handleInputChange}
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
              name="descricao"
              value={selectedDisease.descricao}
              onChange={handleInputChange}
            />
            <FormLabel>Diagnóstico</FormLabel>
            <Input
              name="diagnostico"
              value={selectedDisease.diagnostico}
              onChange={handleInputChange}
            />
            <FormLabel>Prevalência Animal</FormLabel>
            <Stack spacing={5} direction={'row'}>
              <Checkbox
                isChecked={selectedDisease.prevalencia.animal.cachorro}
                onChange={(e) =>
                  setSelectedDisease({
                    ...selectedDisease,
                    prevalencia: {
                      ...selectedDisease.prevalencia,
                      animal: {
                        ...selectedDisease.prevalencia.animal,
                        cachorro: e.target.checked
                      }
                    }
                  })
                }
              >
                Cachorro
              </Checkbox>
              <Checkbox
                isChecked={selectedDisease.prevalencia.animal.gato}
                onChange={(e) =>
                  setSelectedDisease({
                    ...selectedDisease,
                    prevalencia: {
                      ...selectedDisease.prevalencia,
                      animal: {
                        ...selectedDisease.prevalencia.animal,
                        gato: e.target.checked
                      }
                    }
                  })
                }
              >
                Gato
              </Checkbox>
            </Stack>
            <FormLabel>Prevalência Regional</FormLabel>
            <Stack spacing={5} direction={'row'}>
              <Checkbox
                isChecked={selectedDisease.prevalencia.regiao.norte}
                onChange={(e) =>
                  setSelectedDisease({
                    ...selectedDisease,
                    prevalencia: {
                      ...selectedDisease.prevalencia,
                      regiao: {
                        ...selectedDisease.prevalencia.regiao,
                        norte: e.target.checked
                      }
                    }
                  })
                }
              >
                Norte
              </Checkbox>
              <Checkbox
                isChecked={selectedDisease.prevalencia.regiao.nordeste}
                onChange={(e) =>
                  setSelectedDisease({
                    ...selectedDisease,
                    prevalencia: {
                      ...selectedDisease.prevalencia,
                      regiao: {
                        ...selectedDisease.prevalencia.regiao,
                        nordeste: e.target.checked
                      }
                    }
                  })
                }
              >
                Nordeste
              </Checkbox>
              <Checkbox
                isChecked={selectedDisease.prevalencia.regiao.centrooeste}
                onChange={(e) =>
                  setSelectedDisease({
                    ...selectedDisease,
                    prevalencia: {
                      ...selectedDisease.prevalencia,
                      regiao: {
                        ...selectedDisease.prevalencia.regiao,
                        centrooeste: e.target.checked
                      }
                    }
                  })
                }
              >
                Centro-Oeste
              </Checkbox>
              <Checkbox
                isChecked={selectedDisease.prevalencia.regiao.sudeste}
                onChange={(e) =>
                  setSelectedDisease({
                    ...selectedDisease,
                    prevalencia: {
                      ...selectedDisease.prevalencia,
                      regiao: {
                        ...selectedDisease.prevalencia.regiao,
                        sudeste: e.target.checked
                      }
                    }
                  })
                }
              >
                Sudeste
              </Checkbox>
              <Checkbox
                isChecked={selectedDisease.prevalencia.regiao.sul}
                onChange={(e) =>
                  setSelectedDisease({
                    ...selectedDisease,
                    prevalencia: {
                      ...selectedDisease.prevalencia,
                      regiao: {
                        ...selectedDisease.prevalencia.regiao,
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
              name="tratamento"
              value={selectedDisease.tratamento}
              onChange={handleInputChange}
            />
            <FormLabel>Prevenção</FormLabel>
            <Input
              name="prevencao"
              value={selectedDisease.prevencao}
              onChange={handleInputChange}
            />
            <FormLabel>Prognóstico</FormLabel>
            <Input
              name="prognostico"
              value={selectedDisease.prognostico}
              onChange={handleInputChange}
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
              {filteredSymptoms.map((sintoma) => (
                <Checkbox
                  key={sintoma.chave}
                  isChecked={selectedSymptoms.includes(sintoma.chave)}
                  onChange={() => handleSymptomChange(sintoma.chave)}
                >
                  {sintoma.nomeSintoma}
                </Checkbox>
              ))}
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
    </>
  )
}

export default EditDiseaseTab
