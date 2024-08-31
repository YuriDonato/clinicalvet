import styled from 'styled-components'
import ReturnButton from '../../components/returnButton'

export const CustomReturnButton = styled(ReturnButton)`
  position: absolute;
  left: 2.5rem;
  top: 2.5rem;
`

export const Header = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 2.5rem 2.5rem 1rem 2.5rem;
  background-color: #67b99a;
  color: white;
  font-size: 1.25rem;
  flex-direction: row;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    h1 {
      font-weight: 700;
      font-size: 3rem;
      font-family: 'Lato', sans-serif;
      text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    }

    h2 {
      font-weight: 400;
      font-size: 1rem;
      font-family: 'Lora', serif;
    }
  }
`

export const MainContainer = styled.div`
  background-color: #fffcfc;
  width: 100%;
  height: fit-content;
  padding: 1rem;
`

export const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 2.5rem 2.5rem 2.5rem;
  background-color: #67b99a;
  color: white;
  font-size: 1.25rem;
  flex-direction: row;
  height: 13vh;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 15%;
    h1 {
      font-weight: 700;
      font-size: 3rem;
    }

    h2 {
      font-weight: 400;
      font-size: 2rem;
    }
  }
`
