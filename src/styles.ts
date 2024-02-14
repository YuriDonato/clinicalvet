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
