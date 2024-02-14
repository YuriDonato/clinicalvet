import styled from 'styled-components'
import { cores } from '../../styles'

export const ClinicContainer = styled.div`
  padding: 2.5rem;
  user-select: none;
`

export const ClinicHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ClinicButton = styled.button``

//! pra fazer girar receber um prop e por no rotate ali
export const ClinicImg = styled.img`
  max-width: 100%;
  width: 60px;
  transform: rotate(180deg);
`

export const ClinicUnSymptomContainer = styled.div`
  display: grid;
  gap: 1.25rem /* 20px */;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

export const ClinicSymptomContainerButton = styled.button`
  align-items: center;
  display: flex;
  background-color: ${cores.azulClaro};
  color: ${cores.branca};
  font-weigt: 700;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`

export const ClinicSymptomSearchContainer = styled.div`
  background-color: ${cores.azulClaro};

  border-radius: 0.5rem /* 8px */;
  margin-top: 1rem /* 16px */;

  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  .input {
    margin-top: 1rem /* 16px */;
    padding: 0.5rem /* 8px */;
    border-radius: 0.25rem /* 4px */;
    --tw-border-opacity: 1;
    border-color: rgb(156 163 175 / var(--tw-border-opacity));
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-border-opacity: 1;
    border-color: rgb(59 130 246 / var(--tw-border-opacity));
  }
`

export const ClinicSymptomSearchSymptomContainer = styled.div`
  margin-top: 1rem /* 16px */;
  padding-bottom: 1rem /* 16px */;

  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.5rem /* 8px */;

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media (max-width: 1279px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const ClinicUncheckButton = styled(ClinicSymptomContainerButton)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export const ClinicListaPatologias = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem /* 12px */;
  padding: 2.5rem 2.5rem 0px 2.5rem;

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media (max-width: 1279px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const ClinicListaTexto = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

export const ClinicListaDescricao = styled.p`
  color: ${cores.cinzaTexto};
  margin-bottom: 1rem;
`

export const ClinicHtres = styled.h3`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

export const ClinicUl = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
`
