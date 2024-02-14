import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { cores } from '../../styles'

export const StyledLink = styled(Link)`
  margin: 1rem;
  width: 100%;
  height: 100%;
  background-color: ${cores.azulClaro};
  padding: 1rem;
  border-radius: 2rem;
  transition: 0.5s ease;
  transform: scale(1.1);
  &:hover {
    color: white;
    transform: scale(1.5);
    transition: 0.5s ease;
  }
`
