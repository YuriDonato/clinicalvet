import React, { useState } from 'react'

import { CreatePreg } from '../../utils/farmacoNeonato/CRUD'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Farmaco from '../../components/Neonato/Registro/Farmaco'
import TabelaFarmaco from '../../components/Neonato/Tabela/Farmaco'

const Teste: React.FC = () => {
  const [tipo, setTipo] = useState('')
  const [classe, setClasse] = useState('')
  const [nome, setNome] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    CreatePreg(nome, tipo, classe)
  }

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Registro Preg</Tab>
          <Tab>Registro Neo</Tab>
          <Tab>Vis Preg</Tab>
          <Tab>Vis Neo</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Farmaco paciente="preg" />
          </TabPanel>
          <TabPanel>
            <Farmaco paciente="neo" />
          </TabPanel>
          <TabPanel>
            <TabelaFarmaco paciente="preg" />
          </TabPanel>
          <TabPanel>
            <TabelaFarmaco paciente="neo" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Teste
