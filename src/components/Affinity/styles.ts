import styled from 'styled-components'

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
