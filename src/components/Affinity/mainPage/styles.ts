import styled from 'styled-components'
import { cores } from '../../../styles'

export const Container = styled.div`
  padding: 2.5rem;
  user-select: none;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const LoadingContainer = styled.div`
  background-color: ${cores.azulClaro};
  width: fit-content;
  border-radius: 2rem;
  padding: 1rem;
  margin: 0 auto;
  transform: scale(1.5);

  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`
export const TextLoading = styled.h1`
  color: ${cores.branca};
`
