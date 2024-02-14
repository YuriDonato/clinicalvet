import styled from 'styled-components'
import { cores } from '../../styles'

export const ImgPaws = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 0;
  overflow: hidden;
  @media (max-width: 767px) {
    top: 5rem;
  }
`

export const HeaderText = styled.h1`
  color: ${cores.branca};
  margin-bottom: 2rem;
  font-size: 3rem;
  line-height: 1;
  font-weight: bold;
  text-shadow: 1px 1px black;
`

export const HeaderImg = styled.img`
  max-width: 50%;
  margin: 0 auto;
`

export const HorizontalLine = styled.hr`
  border: 0;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.309),
    #69c1c4,
    rgba(255, 255, 255, 0.309)
  );
  height: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
export const OptionsContainer = styled.section`
  padding-top: 1em;
  display: grid;
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  grid-template-columns: repeat(3, minmax(0, 1fr));  .content-between {
  align-content: space-between;
  gap: 1.25rem /* 20px */;

`

export const Option = styled.div`
  z-index: 3;
`

export const OptionImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  transition: 0.5s;
  cursor: pointer;
  margin: 0 auto;

  &:hover {
    transform: scale(1.1);
  }
`

export const OptionText = styled.h2`
  text-transform: uppercase;
  padding-top: 1.4rem;
  padding-bottom: 1.5rem;
  transition: 0.75s ease;
  color: white;
  &:hover {
    color: black;
  }
`
