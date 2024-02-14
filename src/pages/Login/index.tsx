import {
  Input,
  FormControl,
  Button,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import * as db from '../../services/firebase'
import { useEffect, useState } from 'react'
import {
  Container,
  CustomPageContainer
} from '../../components/Admin/Login/styles'
import ReturnButton from '../../components/returnButton'

type User = {
  login: string
  password: string
}
const Login = () => {
  const [name, setName] = useState('')
  const [senha, setSenha] = useState('')

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()

  const navigate = useNavigate()

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const refUsers = db.ref(db.database, 'users')

    db.onValue(refUsers, (snapshot) => {
      const resultUser = Object.entries<User>(snapshot.val() ?? {}).map(
        ([chave, valor]) => {
          return {
            chave: chave,
            login: valor.login,
            password: valor.password
          }
        }
      )
      setUsers(resultUser)
    })
  }, [])

  function login() {
    const userFound = users.find(
      (user) => user.login === name && user.password === senha
    )

    if (userFound) {
      navigate('/admin')
    } else {
      toast({
        title: 'Nome ou Senha incorretos',
        description: 'Por favor tente novamente',
        status: 'error',
        duration: 4000,
        isClosable: true
      })
    }
  }

  return (
    <Container>
      <ReturnButton />
      <CustomPageContainer>
        <FormControl
          borderRadius={'25px'}
          className="bg-azulclaro"
          w={'300px'}
          marginTop={'15%'}
          padding={'20px'}
        >
          <Input
            bg={'white'}
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputGroup marginTop={'15px'} marginBottom={'15px'}>
            <Input
              bg={'white'}
              placeholder="Senha"
              type={show ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                padding={'5px'}
                h="1.75rem"
                size="sm"
                onClick={handleClick}
              >
                {show ? 'Esconder' : 'Mostrar'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button onClick={login}>Entrar</Button>
        </FormControl>
      </CustomPageContainer>
    </Container>
  )
}

export default Login
