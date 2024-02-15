import RegisterDiseaseTab from '../../components/Admin/registerDisease/Register'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Container } from '../../components/Clinic/mainPage/styles'
import ReturnButton from '../../components/returnButton'
import EditDiseaseTab from '../../components/Admin/registerDisease/Edit'

const NewRegisterDisease = () => {
  return (
    <Container>
      <ReturnButton />
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Doenças</Tab>
          <Tab>Sintomas</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tabs isFitted variant="soft-rounded" colorScheme="green">
              <TabList mb="1em">
                <Tab margin="1em">Cadastrar</Tab>
                <Tab margin="1em">Editar</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <RegisterDiseaseTab />
                </TabPanel>
                <TabPanel>
                  <EditDiseaseTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs isFitted variant="soft-rounded" colorScheme="red">
              <TabList mb="1em">
                <Tab>Cadastrar</Tab>
                <Tab>Editar</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>Registro Sintomas</p>
                </TabPanel>
                <TabPanel>
                  <p>Editar Sintomas</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default NewRegisterDisease
