import React, { useEffect, useState } from 'react'
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner } from '@chakra-ui/react'
import { ReadNeo, ReadPreg } from '../../../utils/farmacoNeonato/CRUD'

interface FarmacoData {
  [key: string]: {
    [key: string]: string[]
  }
}

const DataTable = ({ paciente }: { paciente: string }) => {
  const [neoData, setNeoData] = useState<FarmacoData | null>(null)
  const [pregData, setPregData] = useState<FarmacoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      ReadNeo(
        (neoResponse) => {
          setNeoData(neoResponse)
          ReadPreg(
            (pregResponse) => {
              setPregData(pregResponse)
              setLoading(false)
            },
            (error) => {
              console.error('Error fetching preg data:', error)
              setLoading(false)
            }
          )
        },
        (error) => {
          console.error('Error fetching neo data:', error)
          setLoading(false)
        }
      )
    }

    fetchData()
  }, [])

  const renderRows = (data: FarmacoData | null, farmacoKey: string) => {
    if (!data) return null
    return Object.keys(data).map((classeKey) => {
      const classeData = data[classeKey]
      return Object.keys(classeData).map((tipoKey) => {
        const tipoData = classeData[tipoKey]
        return tipoData.map((nome: string, index: number) => (
          <Tr key={`${farmacoKey}-${classeKey}-${tipoKey}-${index}`}>
            <Td>{farmacoKey}</Td>
            <Td>{classeKey}</Td>
            <Td>{tipoKey}</Td>
            <Td>{nome}</Td>
          </Tr>
        ))
      })
    })
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Categoria</Th>
            <Th>Tipo</Th>
            <Th>Classe</Th>
            <Th>Nome</Th>
          </Tr>
        </Thead>
        <Tbody>
          {renderRows(neoData, 'neo')}
          {renderRows(pregData, 'preg')}
        </Tbody>
      </Table>
    </Box>
  )
}

export default DataTable
