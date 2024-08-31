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
  background-color: #3a8dab;
  color: white;
  font-size: 1.25rem;
  flex-direction: row;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 100%;
    h1 {
      font-weight: 700;
      font-size: 3rem;
      font-family: 'Lato', sans-serif;
      text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    }

    h2 {
      margin-top: 1rem;
      font-weight: 400;
      font-size: 1.5rem;
      font-family: 'Lora', serif;
    }
    img {
      width: 5rem;
      height: 4rem;
      position: absolute;
      top: 3.5%;
      right: 10%;
    }
  }
`

export const MainContainer = styled.div`
  width: 100%;
  background-color: #c7c7c7;
  font-family: 'Lato', sans-serif;
`

export const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 2.5rem 2.5rem 2.5rem;
  background-color: #3a8dab;
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

export const ButtonList = styled.div`
  display: flex;
  padding-top: 10%;
  flex-direction: column;
  align-items: flex-start;
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  margin-bottom: 4%;

  span {
    background-color: #3a8dab;
    color: white;
    font-size: 1.9rem;
    flex-direction: row;
    padding: 1rem 0 0.5rem 0;
    width: 35%;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 4rem;
    height: 4rem;
    margin-left: 1rem;
  }
`

export const FluidIcon = styled.img`
  width: 3rem !important;
  height: 4rem !important;
  margin-left: 1.5rem !important;
`

export const MainText = styled.h1`
  color: white;
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  font-weight: 400;
  font-size: 2rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
`

export const Image = styled.img`
  width: 100%;
`

export const FooterText = styled.h1`
  color: white;
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  font-weight: 400;
  font-size: 2rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
`
