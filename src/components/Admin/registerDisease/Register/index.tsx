import React, { useState, FormEvent, useEffect } from 'react'
import { Patologia } from '../../../../models/Clinic'
import * as db from '../../../../services/firebase'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  RadioGroup,
  HStack,
  Radio,
  Checkbox,
  Stack
} from '@chakra-ui/react'

const RegisterDiseaseTab = () => {
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

  const [patologiaData, setPatologiaData] =
    useState<Patologia>(emptyPatologiaData)

  const [causadorData, setCausadorData] = useState('')

  const createPathologyData = async (event: FormEvent) => {
    event.preventDefault()
    const newKey = db.push(db.child(db.ref(db.database), 'patologias')).key
    patologiaData.chave = newKey!
    db.set(db.ref(db.database, `patologias/${newKey}`), patologiaData)
    setPatologiaData(emptyPatologiaData)
    setCausadorData('')
  }

  useEffect(() => {
    if (causadorData === 'bacteria') {
      setPatologiaData({
        ...patologiaData,
        causador: {
          ...patologiaData.causador,
          bacteria: true,
          fungo: false,
          virus: false
        }
      })
    } else if (causadorData === 'fungo') {
      setPatologiaData({
        ...patologiaData,
        causador: {
          ...patologiaData.causador,
          bacteria: false,
          fungo: true,
          virus: false
        }
      })
    } else if (causadorData === 'virus') {
      setPatologiaData({
        ...patologiaData,
        causador: {
          ...patologiaData.causador,
          bacteria: false,
          fungo: false,
          virus: true
        }
      })
    }
  }, [causadorData])

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
        </FormControl>
        <Button marginTop={'1rem'} type="submit">
          Criar Patologia
        </Button>
      </form>
    </>
  )
}

export default RegisterDiseaseTab
