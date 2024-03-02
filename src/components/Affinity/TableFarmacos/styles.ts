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
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 767px) {
    gap: 2rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

export const SelectedsContainer = styled(Container)`
  margin-bottom: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`

export const SelectedContainer = styled.div`
  width: 200px;
  height: 100px;
  border: 1px dashed gray;
`

export const PlusSignal = styled.h1`
  font-size: 3rem;
`
