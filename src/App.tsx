import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'
import { GlobalCss } from './styles'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: ''
      }
    })
  }
})

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <GlobalCss />
        <Rotas />
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
