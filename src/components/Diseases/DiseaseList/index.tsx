import React, { useState, useMemo } from 'react'
import { Patologia } from '../../../models/Clinic'
import { Link } from 'react-router-dom'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box
} from '@chakra-ui/react'

import {
  Button,
  Container,
  CustomAccordionItem,
  CustomAccordionPanel,
  Descricao,
  SubTitulo,
  Titulo
} from './styles'

interface DiseaseListProps {
  patologias: Patologia[]
  filterText: string
}

const DiseaseList: React.FC<DiseaseListProps> = ({
  patologias,
  filterText
}) => {
  const filteredAndSortedPatologias = useMemo(() => {
    return patologias.filter((patologia) =>
      patologia.nomePatologia.toLowerCase().includes(filterText.toLowerCase())
    )
  }, [patologias, filterText])

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
                </Box>
                <AccordionIcon alignSelf={'right'} />
              </AccordionButton>
              <CustomAccordionPanel>
                <Descricao>{patologia.descricao}</Descricao>
                <Button to={`/disease/${patologia.chave}`}>Ler mais</Button>
              </CustomAccordionPanel>
            </CustomAccordionItem>
          </Accordion>
        </div>
      ))}
    </Container>
  )
}

export default DiseaseList
