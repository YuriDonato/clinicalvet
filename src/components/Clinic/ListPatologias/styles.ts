import styled from 'styled-components'
import { cores } from '../../../styles'
import { AccordionItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem /* 12px */;
  padding: 2.5rem 2.5rem 0px 2.5rem;

  @media (max-width: 1279px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 950px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

export const Titulo = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

export const Descricao = styled.p`
  color: ${cores.cinzaTexto};
  margin-bottom: 1rem;
`

export const SubTitulo = styled(Titulo)`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`

export const ListaSintomas = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 1rem;
`

export const CustomAccordionItem = styled(AccordionItem)`
  background-color: ${cores.branca};
  color: ${cores.preta};
  border-radius: 0.5rem /* 8px */;

  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`

export const Button = styled(Link)`
  background-color: ${cores.azulEscuro};
  padding: 0.5rem;
  border-radius: 1rem;
  color: ${cores.branca};
`
