import React, { useEffect, useMemo, useState } from 'react'
import { Patologia, Sintoma } from '../../../models/Clinic'
import {
  Container,
  Descricao,
  ListaSintomas,
  SubTitulo,
  CustomAccordionItem,
  Titulo,
  Button
} from './styles'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react'

interface ListPatologiasProps {
  patologias: Patologia[]
  catMode: boolean
  selectedSymptoms: Sintoma[]
  sintomasNomesKeys: {
    [key: string]: Sintoma
  }
}

const ListPatologias: React.FC<ListPatologiasProps> = ({
  patologias,
  catMode,
  selectedSymptoms,
  sintomasNomesKeys
}) => {
  const filteredAndSortedPatologias = useMemo(() => {
    return filterAndSortPatologias(patologias, catMode, selectedSymptoms)
  }, [patologias, catMode, selectedSymptoms])

  // Filter by cat or dog mode and alphabetical order
  function filterAndSortPatologias(
    patologias: Patologia[],
    catMode: boolean,
    selectedSymptoms: Sintoma[]
  ) {
    const filteredPatologias = patologias.filter((patologia) => {
      const containsAllSelectedSymptoms = selectedSymptoms.every((selected) =>
        patologia.sintomas.includes(selected.chave)
      )

      return (
        containsAllSelectedSymptoms &&
        ((catMode && patologia.prevalencia.animal.gato) ||
          (!catMode && patologia.prevalencia.animal.cachorro))
      )
    })

    const sortedPatologias = filteredPatologias.sort((a, b) => {
      const percentageA =
        (selectedSymptoms.length / (a.sintomas.length - 1)) * 100
      const percentageB =
        (selectedSymptoms.length / (b.sintomas.length - 1)) * 100

      return percentageB - percentageA
    })

    return sortedPatologias
  }

  // Populating symptoms for each patologia card
  const [sintomasPorPatologia, setSintomasPorPatologia] = useState<{
    [key: string]: string[]
  }>({})

  useEffect(() => {
    // Function to define symptoms for each patologia
    const definirSintomasPorPatologia = () => {
      const sintomasPorPatologia: { [key: string]: string[] } = {}
      patologias.forEach((patologia) => {
        const sintomasNomesPatologia = definirSintoma(patologia)
        sintomasPorPatologia[patologia.chave] = sintomasNomesPatologia
      })
      return sintomasPorPatologia
    }

    // Define symptoms for each patologia using useMemo to avoid unnecessary calls
    setSintomasPorPatologia(definirSintomasPorPatologia())
  }, [patologias])

  function definirSintoma(patologia: Patologia) {
    const sintomasNomes = patologia.sintomas
      .map((chave) => sintomasNomesKeys[chave]?.nomeSintoma)
      .filter((nomeSintoma) => nomeSintoma !== undefined)
      .reduce<string[]>((acc, nomeSintoma) => {
        if (!acc.includes(nomeSintoma)) {
          acc.push(nomeSintoma)
        }
        return acc
      }, []) // Using reduce to avoid duplicates
    console.log(`Sintomas nomes: ${sintomasNomes}`)
    return sintomasNomes
  }

  // Filter patologias based on selected symptoms
  const [filteredPatologias, setFilteredPatologias] = useState<Patologia[]>([])

  useEffect(() => {
    // Function to check if a patologia contains all selected symptoms
    const containsAllSelectedSymptoms = (patologia: Patologia) => {
      return selectedSymptoms.every((selected) =>
        patologia.sintomas.includes(selected.chave)
      )
    }

    // Filter patologias based on selected symptoms
    const filteredData = patologias.filter(containsAllSelectedSymptoms)
    setFilteredPatologias(filteredData)
  }, [selectedSymptoms, patologias])

  useEffect(() => {
    const filteredData = filterAndSortPatologias(
      patologias,
      catMode,
      selectedSymptoms
    )
    setFilteredPatologias(filteredData)
  }, [selectedSymptoms, patologias, catMode])

  return (
    <Container>
      {filteredAndSortedPatologias.map((patologia) => (
        <div key={patologia.chave} className="">
          <Accordion allowToggle>
            <CustomAccordionItem>
              <AccordionButton
                padding={'1.5rem'}
                _expanded={{
                  bg: '',
                  color: 'black'
                }}
              >
                <Box
                  as="span"
                  flex={'1'}
                  textAlign={'left'}
                  id="header"
                  display={'flex'}
                  alignItems={'center'}
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                >
                  <Titulo>{patologia.nomePatologia}</Titulo>
                  <CircularProgress
                    size={'60px'}
                    top={'0'}
                    left={'0'}
                    value={
                      (selectedSymptoms.length /
                        (patologia.sintomas.length - 1)) *
                      100
                    }
                    color="green.400"
                  >
                    <CircularProgressLabel fontSize={'10px'}>
                      {(
                        (selectedSymptoms.length /
                          (patologia.sintomas.length - 1)) *
                        100
                      ).toFixed(2)}
                      %
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
                <AccordionIcon alignSelf={'right'} />
              </AccordionButton>
              <AccordionPanel>
                <Descricao>{patologia.descricao}</Descricao>
                <SubTitulo>Symptoms:</SubTitulo>
                <ListaSintomas>
                  {sintomasPorPatologia[patologia.chave]?.map((nomeSintoma) => (
                    <li key={nomeSintoma}>{nomeSintoma}</li>
                  ))}
                </ListaSintomas>
                <Button to="/">Ler mais</Button>
              </AccordionPanel>
            </CustomAccordionItem>
          </Accordion>
        </div>
      ))}
    </Container>
  )
}

export default ListPatologias
