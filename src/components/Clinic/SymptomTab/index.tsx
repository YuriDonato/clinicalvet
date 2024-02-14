import {
  Container,
  SearchContainer,
  SectionContainer,
  SymptomListContainer,
  TabButton
} from './styles'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Input, Box, Text } from '@chakra-ui/react'
import React, { FormEvent, useEffect, useState } from 'react'

import { Sintoma } from '../../../models/Clinic'

interface SymptomTabProps {
  symptoms: Sintoma[]
  onSymptomSelect: (selectedSymptoms: Sintoma[]) => void
}

const SymptomTab: React.FC<SymptomTabProps> = ({
  symptoms,
  onSymptomSelect
}) => {
  // Toggle Symptoms Tab
  const [showSymptoms, setShowSymptoms] = useState(false)
  const [showSelectedSymptoms, setShowSelectedSymptoms] = useState(false)

  const toggleSymptoms = () => {
    setShowSymptoms(!showSymptoms)
  }

  const toggleSelectedSymptoms = () => {
    setShowSelectedSymptoms(!showSelectedSymptoms)
  }

  const [filteredSymptoms, setFilteredSymptoms] = useState<Sintoma[]>([])

  const [isSearching, setIsSearching] = useState(false)

  // Function to filter symptoms based on search
  const [searchedSymptoms, setSearchedSymptoms] = useState<Sintoma[]>([])

  function searchSymptom(event: FormEvent<HTMLInputElement>) {
    const word = event.currentTarget.value.trim().toLowerCase()
    if (word.length > 0) {
      const filteredSymptoms = symptoms.filter(
        (symptom) =>
          symptom.nomeSintoma.toLowerCase().includes(word) &&
          !selectedSymptoms.some((selected) => selected.chave === symptom.chave)
      )
      setSearchedSymptoms(filteredSymptoms)
      setIsSearching(true)
    } else {
      setSearchedSymptoms([]) // Clear the searched symptoms
      setIsSearching(false)
      updateSelectedAndUnselectedSymptoms() // Update selected and unselected symptoms
    }
  }

  function updateSelectedAndUnselectedSymptoms() {
    const selectedSymptomKeys = new Set(
      selectedSymptoms.map((symptom) => symptom.chave)
    )
    setSelectedSymptoms((prevSelected) =>
      prevSelected.filter((symptom) => selectedSymptomKeys.has(symptom.chave))
    )
    setUnselectedSymptoms((prevUnselected) =>
      prevUnselected.filter(
        (symptom) => !selectedSymptomKeys.has(symptom.chave)
      )
    )
  }

  useEffect(() => {
    setUnselectedSymptoms(symptoms)
  }, [symptoms])
  // State to store the list of unselected symptoms
  const [unselectedSymptoms, setUnselectedSymptoms] =
    useState<Sintoma[]>(symptoms)

  // State to store the list of selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState<Sintoma[]>([])

  // When its not searching
  const handleSymptomClick = (index: number, isUnselected: boolean) => {
    if (isUnselected) {
      const clickedSymptom = unselectedSymptoms[index]
      setUnselectedSymptoms((prevSymptoms) =>
        prevSymptoms.filter((_, i) => i !== index)
      )
      setSelectedSymptoms((prevSymptoms) => [...prevSymptoms, clickedSymptom])
    } else {
      const clickedSymptom = selectedSymptoms[index]
      setSelectedSymptoms((prevSymptoms) =>
        prevSymptoms.filter((_, i) => i !== index)
      )
      setUnselectedSymptoms((prevSymptoms) => [...prevSymptoms, clickedSymptom])
    }
  }

  // Function to handle clicking on a symptom when its searching
  function handleSymptomClickIsSearch(
    index: number,
    filteredSymptoms: Sintoma[]
  ) {
    const clickedSymptom = filteredSymptoms[index]
    setFilteredSymptoms((prevSymptoms) =>
      prevSymptoms.filter((_, i) => i !== index)
    )

    // Check if the clicked symptom is already selected
    const isAlreadySelected = selectedSymptoms.some(
      (selected) => selected.chave === clickedSymptom.chave
    )

    // Add the symptom to the list of selected symptoms only if it's not already selected
    if (!isAlreadySelected) {
      setSelectedSymptoms((prevSymptoms) => [...prevSymptoms, clickedSymptom])
    }
  }

  useEffect(() => {
    onSymptomSelect(selectedSymptoms)
  }, [selectedSymptoms])

  return (
    <Container>
      <SectionContainer>
        <TabButton open={showSymptoms} onClick={toggleSymptoms}>
          Symptoms
          <MdKeyboardArrowDown className="arrow transition2s" />
        </TabButton>
        {showSymptoms && (
          <SearchContainer>
            <Input
              variant={'filled'}
              type="text"
              placeholder="Search symptoms..."
              onChange={searchSymptom}
              className="input"
              width={'20rem'}
            />
            <SymptomListContainer>
              {isSearching
                ? searchedSymptoms.map((symptom, index) => (
                    <Box
                      cursor={'pointer'}
                      key={symptom.chave}
                      className="bullet"
                      onClick={() =>
                        handleSymptomClickIsSearch(index, searchedSymptoms)
                      }
                    >
                      <Text>{symptom.nomeSintoma}</Text>
                    </Box>
                  ))
                : unselectedSymptoms.map((symptom, index) => (
                    <Box
                      cursor={'pointer'}
                      key={symptom.chave}
                      className="bullet"
                      onClick={() => handleSymptomClick(index, true)}
                    >
                      <Text>{symptom.nomeSintoma}</Text>
                    </Box>
                  ))}
            </SymptomListContainer>
          </SearchContainer>
        )}
      </SectionContainer>
      <SectionContainer>
        <TabButton open={showSelectedSymptoms} onClick={toggleSelectedSymptoms}>
          Selected <MdKeyboardArrowDown className="arrow transition2s" />
        </TabButton>
        {showSelectedSymptoms && (
          <SearchContainer>
            <SymptomListContainer>
              {selectedSymptoms.length > 0 ? (
                selectedSymptoms.map((symptom, index) => (
                  <Box
                    cursor={'pointer'}
                    key={symptom.chave}
                    className="bullet"
                    onClick={() => handleSymptomClick(index, false)}
                  >
                    <Text>{symptom.nomeSintoma}</Text>
                  </Box>
                ))
              ) : (
                <Text className="bullet">Nenhum Sintoma Selecionado</Text>
              )}
            </SymptomListContainer>
          </SearchContainer>
        )}
      </SectionContainer>
    </Container>
  )
}

export default SymptomTab
