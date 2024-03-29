import RegisterDiseaseTab from '../../components/Admin/registerDisease/Register'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Container } from '../../components/Clinic/mainPage/styles'
import ReturnButton from '../../components/returnButton'
import EditDiseaseTab from '../../components/Admin/registerDisease/Edit'
import RegisterSymptomTab from '../../components/Admin/registerSymptom/Register'
import EditSymptomTab from '../../components/Admin/registerSymptom/Edit'
import RegisterDrugTab from '../../components/Admin/registerDrug/Register'
import EditDrugTab from '../../components/Admin/registerDrug/Edit'
import RegisterCategoriaTab from '../../components/Admin/registerDrugCategory/Register'
import EditDrugCategoryTab from '../../components/Admin/registerDrugCategory/Edit'

const RegisterDisease = () => {
  return (
    <Container>
      <ReturnButton />
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Doenças</Tab>
          <Tab>Sintomas</Tab>
          <Tab>Farmaco</Tab>
          <Tab>Categoria Farmaco</Tab>
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
                <Tab>Registrar</Tab>
                <Tab>Editar</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <RegisterSymptomTab />
                </TabPanel>
                <TabPanel>
                  <EditSymptomTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs isFitted variant="soft-rounded" colorScheme="green">
              <TabList mb="1em">
                <Tab margin="1em">Cadastrar</Tab>
                <Tab margin="1em">Editar</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <RegisterDrugTab />
                </TabPanel>
                <TabPanel>
                  <EditDrugTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs isFitted variant="soft-rounded" colorScheme="green">
              <TabList mb="1em">
                <Tab margin="1em">Cadastrar</Tab>
                <Tab margin="1em">Editar</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <RegisterCategoriaTab />
                </TabPanel>
                <TabPanel>
                  <EditDrugCategoryTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

export default RegisterDisease
