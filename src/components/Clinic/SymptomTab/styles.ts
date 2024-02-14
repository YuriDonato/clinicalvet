import styled from 'styled-components'
import { cores } from '../../../styles'
import { MdKeyboardArrowDown } from 'react-icons/md'

export const Container = styled.div`
  display: grid;
  gap: 1.25rem /* 20px */;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-items: center;

  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

type TabButtonProps = {
  open: boolean
}

export const TabButton = styled.button<TabButtonProps>`
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

  .arrow {
    transform: ${(p) => (p.open === true ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`

export const SearchContainer = styled.div`
  background-color: ${cores.azulClaro};

  width: fit-content;

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

export const SymptomListContainer = styled.div`
  margin-top: 1rem /* 16px */;
  padding-bottom: 1rem /* 16px */;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.5rem;

  // display: grid;
  // grid-template-columns: repeat(6, minmax(0, 1fr));
  // gap: 0.5rem /* 8px */;

  // @media (max-width: 767px) {
  //   grid-template-columns: repeat(1, minmax(0, 1fr));
  // }

  // @media (max-width: 1279px) {
  //   grid-template-columns: repeat(3, minmax(0, 1fr));
  // }

  .bullet {
    height: fit-content;
    text-decoration: none;
    color: ${cores.preta};
    padding: 8px 20px;
    border-radius: 25px;
    margin: 0 10px;
    background-color: ${cores.branca};
    font-weight: bold;
    width: fit-content;
  }
`
