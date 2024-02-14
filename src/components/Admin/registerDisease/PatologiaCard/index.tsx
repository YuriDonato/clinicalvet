import { useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import PatologiaDrawer from '../PageDrawer'
import { Patologia } from '../../../../models/Clinic'

interface PatologiaCardProps {
  patologia: Patologia
}

const PatologiaCard: React.FC<PatologiaCardProps> = ({ patologia }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleSearchIconClick = () => {
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <SearchIcon cursor={'pointer'} onClick={handleSearchIconClick} />
      {isDrawerOpen && (
        <PatologiaDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          patologia={patologia}
        />
      )}
    </>
  )
}

export default PatologiaCard
