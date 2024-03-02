import styled, { createGlobalStyle } from 'styled-components'

export const cores = {
  azulEscuro: '#69c1c4',
  azulClaro: '#a5d9db',
  branca: '#fff',
  preta: '#000',
  cinzaTexto: '#4B5563'
}

export const GlobalCss = createGlobalStyle`
*{
  text-decoration: none;
  user-select: none;
}
html,
body {
    background-color: ${cores.azulEscuro};
  font-family: "Montserrat", sans-serif;
  margin: 0;
  justify-content: center;
  align-items: center;
}

.transition2s {
  transition: 0.25s ease all;
}

.bg-azulclaro {
  background-color: ${cores.azulClaro};
}
`

export const PageContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100%;
`
export const MainCard = styled.div`
  margin: 0 auto 0 auto;
  color: black;
  padding: 1rem;
  background-color: white;
  max-width: 600px;
  display: block;
  // border-bottom-right-radius: 2rem;
  // border-bottom-left-radius: 2rem;
`

export const Container = styled(MainCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
