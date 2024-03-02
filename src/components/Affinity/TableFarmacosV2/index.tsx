import React, { useEffect, useState } from 'react'
import { Categoria, Farmaco } from '../../../models/Drug'
import FarmacoCard from '../FarmacoCard'
import * as S from './styles'
import { Input } from '@chakra-ui/react'

interface Props {
  farmacos: Farmaco[]
  categorias: Categoria[]
}

const TableFarmacosVDois: React.FC<Props> = ({ farmacos, categorias }) => {
  const [originalFarmacos, setOriginalFarmacos] = useState<Farmaco[]>(farmacos)
  const [listFarmacos, setListFarmacos] = useState<Farmaco[]>(farmacos)
  const [selectedFarmaco, setSelectedFarmaco] = useState<Farmaco>()
  const [searchTerm, setSearchTerm] = useState<string>('')

  function handleClick(clickedFarmaco: Farmaco) {
    console.log(clickedFarmaco)
    setListFarmacos((prevFarmacos) =>
      prevFarmacos.filter((f) => f !== clickedFarmaco)
    )
    setSelectedFarmaco(clickedFarmaco)
    console.log(selectedFarmaco)
  }

  function removeSelectedFarmaco() {
    setSelectedFarmaco(undefined)
    setListFarmacos(originalFarmacos)
  }

  const sortFarmacosByName = () => {
    const sortedFarmacos = [...listFarmacos].sort((a, b) => {
      if (a.nomeFarmaco < b.nomeFarmaco) return -1
      if (a.nomeFarmaco > b.nomeFarmaco) return 1
      return 0
    })
    setListFarmacos(sortedFarmacos)
  }

  function handleFilterFarmaco(selectedFarmaco: Farmaco) {
    const selectedCategoriaId = selectedFarmaco.tipo
    const selectedCategoria = categorias.find(
      (cat) => cat.id === selectedCategoriaId
    )
    if (!selectedCategoria) return
    const filteredFarmacos = originalFarmacos.filter((farmaco) => {
      return (
        farmaco.categoria.includes(selectedCategoria.chave) &&
        farmaco.chave !== selectedFarmaco.chave
      )
    })
    setListFarmacos(filteredFarmacos)
  }

  useEffect(() => {
    if (!selectedFarmaco) {
      sortFarmacosByName()
    } else {
      handleFilterFarmaco(selectedFarmaco)
    }
  }, [listFarmacos])

  useEffect(() => {
    const filteredFarmacos = originalFarmacos.filter((farmaco) =>
      farmaco.nomeFarmaco.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setListFarmacos(filteredFarmacos)
  }, [searchTerm])

  return (
    <>
      {selectedFarmaco ? (
        <>
          <FarmacoCard
            farmacoName={selectedFarmaco.nomeFarmaco}
            farmacoType={selectedFarmaco.tipo}
          />
          <S.Button onClick={removeSelectedFarmaco}>Remover Farmaco</S.Button>
          <h1>Lista de Farmacos que podem se relacionar:</h1>
        </>
      ) : (
        <>
          <FarmacoCard
            farmacoName="Selecione um Farmaco Abaixo"
            farmacoType=""
          />
          <Input
            placeholder="Digite para filtrar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </>
      )}

      <S.Container>
        {listFarmacos.map((farmaco, index) => (
          <S.Button key={index} onClick={() => handleClick(farmaco)}>
            <FarmacoCard
              farmacoName={farmaco.nomeFarmaco}
              farmacoType={farmaco.tipo}
            />
          </S.Button>
        ))}
      </S.Container>
    </>
  )
}

export default TableFarmacosVDois
