import React, { useState } from 'react'
import { Categoria, Farmaco } from '../../../models/Drug'
import FarmacoCard from '../FarmacoCard'
import * as S from '../styles'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface Props {
  farmacos: Farmaco[]
  categorias: Categoria[]
}

const TableFarmacos: React.FC<Props> = ({ farmacos, categorias }) => {
  const [bottomFarmacos, setBottomFarmacos] = useState<Farmaco[]>(farmacos)
  const [topLeftFarmacos, setTopLeftFarmacos] = useState<Farmaco[]>([])
  const [topRightFarmacos, setTopRightFarmacos] = useState<Farmaco[]>([])

  const handleDragEnd = (result: any) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    const draggedFarmaco = bottomFarmacos[source.index]

    if (destination.droppableId === 'top-left') {
      setTopLeftFarmacos([draggedFarmaco])
    } else if (destination.droppableId === 'top-right') {
      setTopRightFarmacos([draggedFarmaco])
    } else if (destination.droppableId === 'bottom') {
      const newFarmacos = bottomFarmacos.filter(
        (farmaco, index) => index !== source.index
      )
      setBottomFarmacos(newFarmacos)
    }
  }

  const handleDragEndTop = (result: any, cardType: string) => {
    if (cardType === 'top-left') {
      setTopLeftFarmacos([])
    } else if (cardType === 'top-right') {
      setTopRightFarmacos([])
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '1rem'
        }}
      >
        <Droppable droppableId="top-left">
          {(provided) => (
            <div
              id="top-left"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ width: 200, height: 100, border: '1px dashed gray' }}
            >
              {topLeftFarmacos.map((farmaco, index) => (
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
            </div>
          )}
        </Droppable>

        <Droppable droppableId="top-right">
          {(provided) => (
            <div
              id="top-right"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ width: 200, height: 100, border: '1px dashed gray' }}
            >
              {topRightFarmacos.map((farmaco, index) => (
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
            </div>
          )}
        </Droppable>
      </div>

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
                    style={{
                      margin: 8,
                      ...provided.draggableProps.style
                    }}
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
