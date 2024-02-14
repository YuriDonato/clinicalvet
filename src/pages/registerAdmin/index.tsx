import ReturnButton from '../../components/returnButton'
import * as db from '../../services/firebase'
import { PageContainer } from '../../styles'
import { Textarea, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { RegisterPageContainer } from '../../components/Admin/registerAdmin/styles'

const RegisterAdmin = () => {
  const toast = useToast()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  let Key = ''
  function criarAdmin() {
    const newKey = db.push(db.child(db.ref(db.database), 'users')).key
    Key = newKey!
    db.set(db.ref(db.database, `users/${newKey}`), {
      login: name,
      password: password
    })
    toast({
      title: 'Admin criado',
      description: 'O admin foi criado no banco de dados com sucesso.',
      status: 'success',
      duration: 4000,
      isClosable: true
    })
    setName('')
    setPassword('')
  }
  return (
    <RegisterPageContainer>
      <ReturnButton customRoute="/admin" />
      <Textarea
        display={'block'}
        width={'fit-content'}
        margin-bottom={'1rem'}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Novo Usuario"
      />
      <Textarea
        display={'block'}
        width={'fit-content'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nova Senha"
      />
      <Button onClick={criarAdmin}>Cadastrar</Button>
    </RegisterPageContainer>
  )
}

export default RegisterAdmin
