import { useState, useEffect, useMemo } from 'react'
import * as db from '../../../services/firebase'
import { Patologia, Sintoma } from '../../../models/Clinic'
import { PageContainer } from '../../../styles'
import {
  Container,
  HeaderContainer,
  LoadingContainer,
  TextLoading
} from './styles'
import ReturnButton from '../../returnButton'
import { CircularProgress } from '@chakra-ui/react'
import { Categoria, Farmaco } from '../../../models/Drug'
import TableFarmacos from '../TableFarmacos'
import TableFarmacosVDois from '../TableFarmacosV2'

const MainPage = () => {
  const [selectedCategorias, setSelectedCategorias] = useState<Categoria[]>([])

  const [isLoading, setIsLoading] = useState(true)

  // Database logic Snapshot db
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [farmacos, setFarmacos] = useState<Farmaco[]>([])

  useEffect(() => {
    const refCategorias = db.ref(db.database, 'categoriaFarmaco')
    const refFarmacos = db.ref(db.database, 'farmacos')
    setIsLoading(true)

    db.onValue(refCategorias, (snapshot) => {
      const data = snapshot.val()
      const resultadoCategorias = Object.entries<Categoria>(data ?? {}).map(
        ([chave, valor]) => {
          return {
            chave: chave,
            id: valor.id,
            nomeCategoria: valor.nomeCategoria
          }
        }
      )
      setCategoriasNomesKeys(data)
      setCategorias(resultadoCategorias)
    })

    db.onValue(refFarmacos, (snapshot) => {
      const data = snapshot.val()
      const resultadoFarmacos = Object.entries<Farmaco>(data ?? {}).map(
        ([chave, valor]) => {
          return {
            chave: chave,
            nomeFarmaco: valor.nomeFarmaco,
            tipo: valor.tipo,
            categoria: valor.categoria
          }
        }
      )
      setFarmacos(resultadoFarmacos)
    })
    handleLoading()
  }, [])

  function handleLoading() {
    setTimeout(() => {
      setIsLoading(!isLoading)
    }, 1000)
  }
  // Inicializando uma relação de chave:valor com os sintomas para serem filtrados
  const [categoriasNomesKeys, setCategoriasNomesKeys] = useState<{
    [key: string]: Categoria
  }>({})

  return (
    <Container>
      <HeaderContainer>
        <ReturnButton customRoute="tools" />
      </HeaderContainer>
      {isLoading === true ? (
        <PageContainer>
          <LoadingContainer>
            <CircularProgress isIndeterminate color="blue.400" />
            <TextLoading>Carregando...</TextLoading>
          </LoadingContainer>
        </PageContainer>
      ) : (
        <PageContainer>
          {/* <TableFarmacos farmacos={farmacos} categorias={categorias} /> */}
          <TableFarmacosVDois farmacos={farmacos} categorias={categorias} />
        </PageContainer>
      )}
    </Container>
  )
}

export default MainPage
