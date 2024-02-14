import React, { useState } from 'react'
import { PiCatLight, PiDogLight } from 'react-icons/pi'
import { cores } from '../../../styles'
import { CustomBox } from './styles'

interface ToggleButtonProps {
  isOn: boolean
  onChange: (isOn: boolean) => void
}

const SetMode: React.FC<ToggleButtonProps> = ({ isOn, onChange }) => {
  const [catMode, setCatMode] = useState(false)
  const [transition, setTransition] = useState(false)

  const toggleCatMode = () => {
    setCatMode((prevCatMode) => !prevCatMode)
    setTransition(true)
    setTimeout(() => {
      setTransition(false)
    }, 250)
  }

  return (
    <CustomBox onClick={() => onChange(!isOn)}>
      <PiDogLight
        size={'2rem'}
        color="white"
        opacity={catMode ? 0 : 1}
        onClick={toggleCatMode}
        cursor={'pointer'}
        className={transition ? 'transition2s' : ''}
      />
      <PiCatLight
        size={'2rem'}
        opacity={catMode ? 1 : 0}
        onClick={toggleCatMode}
        cursor={'pointer'}
        className={transition ? 'transition2s' : ''}
      />
    </CustomBox>
  )
}

export default SetMode
