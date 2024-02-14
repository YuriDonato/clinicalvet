import styled from 'styled-components'
import { Box } from '@chakra-ui/react'
import { cores } from '../../../styles'

export const CustomBox = styled(Box)`
  background-color: ${cores.azulClaro};
  border-radius: 25px;
  height: fit-content;
  width: fit-content;
  display: flex;
  padding: 0 0.1rem;

  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`
