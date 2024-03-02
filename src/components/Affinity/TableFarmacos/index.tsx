import React, { useEffect, useState } from 'react'
import { Categoria, Farmaco } from '../../../models/Drug'
import FarmacoCard from '../FarmacoCard'
import * as S from './styles'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface Props {
  farmacos: Farmaco[]
  categorias: Categoria[]
}

const TableFarmacos: React.FC<Props> = ({ farmacos, categorias }) => {
  const [bottomFarmacos, setBottomFarmacos] = useState<Farmaco[]>(farmacos)
  const [topLeftFarmaco, setTopLeftFarmaco] = useState<Farmaco>()
  const [topRightFarmaco, setTopRightFarmaco] = useState<Farmaco>()

  const [selectedCategoria, setSelectedCategoria] = useState<Categoria>()

  function handleOnDragEnd(result: any) {
    console.log(result)
    if (!result.destination) return

    addOnArea(result, result.source.droppableId, result.destination.droppableId)
  }

  function addOnArea(result: any, source?: string, destination?: string) {
    switch (source) {
      case 'bottom':
        if (destination == 'top-left') {
          setTopLeftFarmaco(bottomFarmacos[result.source.index])
          const items = Array.from(bottomFarmacos)
          items.splice(result.source.index, 1)
          setBottomFarmacos(items)
        }
        if (destination == 'top-right') {
          setTopRightFarmaco(bottomFarmacos[result.source.index])
          const items = Array.from(bottomFarmacos)
          items.splice(result.source.index, 1)
          setBottomFarmacos(items)
        }
        if (destination == 'bottom') {
          const items = Array.from(bottomFarmacos)
          const [reorderedBottom] = items.splice(result.source.index, 1)
          items.splice(result.destination.index, 0, reorderedBottom)
          setBottomFarmacos(items)
        }
        break
      case 'top-left':
        if (destination == 'top-left') {
          return
        }
        if (destination == 'top-right') {
          const tempItem = topLeftFarmaco
          if (topRightFarmaco) {
            setTopLeftFarmaco(topRightFarmaco)
            setTopRightFarmaco(tempItem)
          } else {
            setTopLeftFarmaco(undefined)
            setTopRightFarmaco(tempItem)
          }
        }
        if (destination == 'bottom') {
          const items = Array.from(bottomFarmacos)
          items.splice(result.destination.index, 0, topLeftFarmaco!)
          setTopLeftFarmaco(undefined)
          setBottomFarmacos(items)
        }
        break
      case 'top-right':
        if (destination == 'top-right') {
          return
        }
        if (destination == 'top-left') {
          const tempItem = topRightFarmaco
          if (topLeftFarmaco) {
            setTopRightFarmaco(topLeftFarmaco)
            setTopLeftFarmaco(tempItem)
          } else {
            setTopRightFarmaco(undefined)
            setTopLeftFarmaco(tempItem)
          }
        }
        if (destination == 'bottom') {
          const items = Array.from(bottomFarmacos)
          items.splice(result.destination.index, 0, topRightFarmaco!)
          setTopRightFarmaco(undefined)
          setBottomFarmacos(items)
        }
        break
    }
  }

  function handleFilterTopChange(selectedFarmaco: Farmaco) {
    // Encontrar categoria do farmaco selecionado
    const selectedCategoriaId = selectedFarmaco.tipo
    const selectedCategoria = categorias.find(
      (cat) => cat.id === selectedCategoriaId
    )
    if (!selectedCategoria) return
    const filteredFarmacos = farmacos.filter((farmaco) => {
      return (
        farmaco.categoria.includes(selectedCategoria.chave) &&
        farmaco.chave !== selectedFarmaco.chave
      )
    })
    setBottomFarmacos(filteredFarmacos)
  }

  useEffect(() => {
    if (!topLeftFarmaco && !topRightFarmaco) {
      setBottomFarmacos(farmacos)
      return
    }
    if (!topLeftFarmaco && topRightFarmaco) {
      handleFilterTopChange(topRightFarmaco)
    }
    if (topLeftFarmaco && !topRightFarmaco) {
      handleFilterTopChange(topLeftFarmaco)
    }
  }, [topLeftFarmaco, topRightFarmaco])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <S.SelectedsContainer>
        <Droppable droppableId="top-left">
          {(provided) => (
            <S.SelectedContainer
              id="top-left"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {topLeftFarmaco ? (
                <>
                  <Draggable
                    key={topLeftFarmaco?.chave}
                    draggableId={topLeftFarmaco?.chave}
                    index={1}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FarmacoCard
                          farmacoName={topLeftFarmaco?.nomeFarmaco}
                          farmacoType={topLeftFarmaco?.tipo}
                        />
                      </div>
                    )}
                  </Draggable>
                </>
              ) : (
                <>
                  <h1>Ponha o farmaco aqui</h1>
                </>
              )}
              {provided.placeholder}
            </S.SelectedContainer>
          )}
        </Droppable>
        <S.PlusSignal></S.PlusSignal>

        <Droppable droppableId="top-right">
          {(provided) => (
            <S.SelectedContainer
              id="top-right"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {topRightFarmaco ? (
                <>
                  <Draggable
                    key={topRightFarmaco.chave}
                    draggableId={topRightFarmaco.chave}
                    index={1}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FarmacoCard
                          farmacoName={topRightFarmaco.nomeFarmaco}
                          farmacoType={topRightFarmaco.tipo}
                        />
                      </div>
                    )}
                  </Draggable>
                </>
              ) : (
                <>
                  <h1>Ponha o farmaco aqui</h1>
                </>
              )}
              {provided.placeholder}
            </S.SelectedContainer>
          )}
        </Droppable>
      </S.SelectedsContainer>

      <Droppable droppableId="bottom" direction="horizontal">
        {(provided) => (
          <S.Container {...provided.droppableProps} ref={provided.innerRef}>
            {bottomFarmacos.map((farmaco, index) => (
              <Draggable
                key={farmaco.chave}
                draggableId={farmaco.chave}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <FarmacoCard
                      farmacoName={farmaco.nomeFarmaco}
                      farmacoType={farmaco.tipo}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </S.Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TableFarmacos
