"use client";
import Link from "next/link";
import styles from "../styles/Test.module.scss";
import { useState, FormEvent, useEffect } from "react";
import {
    Box,
    ChakraProvider,
    Button,
    ButtonGroup,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    SimpleGrid,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea,
    Checkbox,
    CheckboxGroup,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";

import { database } from "../services/firebase";

type Patologia = {
    chave: string;
    nomePatologia: string;
    causador: string;
    descricao: string;
    diagnostico: string;
    prevalencia: {
        animal: {
            cachorro: boolean;
            gato: boolean;
        };
        regiao: {
            norte: boolean;
            nordeste: boolean;
            centrooeste: boolean;
            sudeste: boolean;
            sul: boolean;
        };
    };
    tratamento: string;
    prevencao: string;
    prognostico: string;
    sintomas: string[];
};

type Sintoma = {
    chave: string;
    nomeSintoma: string;
};

export default function Test() {
    // Key
    const [chave, setChave] = useState("");
    // Valores Sintomas
    const [nomeSintoma, setNomeSintoma] = useState("");
    // Valores Patologias
    const [patologiaData, setPatologiaData] = useState<Patologia>({
        chave: "",
        nomePatologia: "",
        causador: "",
        descricao: "",
        diagnostico: "",
        prevalencia: {
            animal: {
                cachorro: false,
                gato: false,
            },
            regiao: {
                norte: false,
                nordeste: false,
                centrooeste: false,
                sudeste: false,
                sul: false,
            },
        },
        tratamento: "",
        prevencao: "",
        prognostico: "",
        sintomas: [""],
    });
    const [emptyPatologiaData, setEmptyPatologiaData] = useState<Patologia>({
        chave: "",
        nomePatologia: "",
        causador: "",
        descricao: "",
        diagnostico: "",
        prevalencia: {
            animal: {
                cachorro: false,
                gato: false,
            },
            regiao: {
                norte: false,
                nordeste: false,
                centrooeste: false,
                sudeste: false,
                sul: false,
            },
        },
        tratamento: "",
        prevencao: "",
        prognostico: "",
        sintomas: [""],
    });
    const [caoData, setCaoData] = useState(false);

    // Estado de Modificação
    const [modificando, setModificando] = useState(false);

    // Valor Busca e estado
    const [buscaSintoma, setBuscaSintoma] = useState<Sintoma[]>();
    const [buscaPatologia, setBuscaPatologia] = useState<Patologia[]>();
    const [estaBuscando, setEstaBuscando] = useState(false);

    // Leitura de Dados
    const [sintomas, setSintomas] = useState<Sintoma[]>();
    const [patologias, setPatologias] = useState<Patologia[]>();

    // Toast
    const toast = useToast();

    useEffect(() => {
        const refSintomas = database.ref("sintomas");
        const refPatologias = database.ref("patologias");

        refSintomas.on("value", (resultado) => {
            const resultadoSintoma = Object.entries<Sintoma>(
                resultado.val() ?? {}
            ).map(([chave, valor]) => {
                return {
                    chave: chave,
                    nomeSintoma: valor.nomeSintoma,
                };
            });
            setSintomas(resultadoSintoma);
        });

        refPatologias.on("value", (resultado) => {
            const resultadoPatologia = Object.entries<Patologia>(
                resultado.val() ?? {}
            ).map(([chave, valor]) => {
                return {
                    chave: chave,
                    nomePatologia: valor.nomePatologia,
                    causador: valor.causador,
                    descricao: valor.descricao,
                    diagnostico: valor.diagnostico,
                    prevalencia: {
                        animal: {
                            cachorro: valor.prevalencia.animal.cachorro,
                            gato: valor.prevalencia.animal.gato,
                        },
                        regiao: {
                            norte: valor.prevalencia.regiao.norte,
                            nordeste: valor.prevalencia.regiao.nordeste,
                            centrooeste: valor.prevalencia.regiao.centrooeste,
                            sudeste: valor.prevalencia.regiao.sudeste,
                            sul: valor.prevalencia.regiao.sul,
                        },
                    },
                    tratamento: valor.tratamento,
                    prevencao: valor.prevencao,
                    prognostico: valor.prognostico,
                    sintomas: valor.sintomas,
                };
            });
            setPatologias(resultadoPatologia);
        });
    }, []);

    function createSymptomData(event: FormEvent) {
        event.preventDefault();
        const ref = database.ref("sintomas");
        const dados = {
            nomeSintoma,
        };
        ref.push(dados);
        toast({
            title: "Sintoma criado",
            description: "O sintoma foi criado no banco de dados com sucesso.",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
        setNomeSintoma("");
    }
    function createPathologyData(event: FormEvent) {
        event.preventDefault();
        const ref = database.ref("patologias");
        const dados = patologiaData;
        ref.push(dados);
        toast({
            title: "Patologia criada",
            description:
                "A patologia foi criada no banco de dados com sucesso.",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
        setPatologiaData(emptyPatologiaData);
    }

    function searchSymptomData(event: FormEvent<HTMLInputElement>) {
        const palavra = event.currentTarget.value;
        if (palavra.length > 0) {
            setEstaBuscando(true);
            const dados: any[] = [];
            sintomas?.map((sintoma) => {
                const regra = new RegExp(event.currentTarget.value, "gi");
                if (regra.test(sintoma.nomeSintoma)) {
                    dados.push(sintoma);
                }
            });
            setBuscaSintoma(dados);
        } else {
            setEstaBuscando(false);
        }
    }

    function searchDiseaseData(event: FormEvent<HTMLInputElement>) {
        const palavra = event.currentTarget.value;
        if (palavra.length > 0) {
            setEstaBuscando(true);
            const dados: any[] = [];
            patologias?.map((patologia) => {
                const regra = new RegExp(event.currentTarget.value, "gi");
                if (regra.test(patologia.nomePatologia)) {
                    dados.push(patologia);
                }
            });
            setBuscaPatologia(dados);
        } else {
            setEstaBuscando(false);
        }
    }

    function editDiseaseData(patologia: Patologia) {
        setModificando(true);
        setChave(patologia.chave);
        setCaoData(patologia.prevalencia.animal.cachorro)
        setPatologiaData(patologia);
    }

    function updateDiseaseData() {
        const ref = database.ref("patologias/");
        const dados = {
            chave: chave,
            nomePatologia: patologiaData.nomePatologia,
            causador: patologiaData.causador,
            descricao: patologiaData.descricao,
            diagnostico: patologiaData.diagnostico,
            prevalencia: {
                animal: {
                    cachorro: patologiaData.prevalencia.animal.cachorro,
                    gato: patologiaData.prevalencia.animal.gato,
                },
                regiao: {
                    norte: patologiaData.prevalencia.regiao.norte,
                    nordeste: patologiaData.prevalencia.regiao.nordeste,
                    centrooeste: patologiaData.prevalencia.regiao.centrooeste,
                    sudeste: patologiaData.prevalencia.regiao.sudeste,
                    sul: patologiaData.prevalencia.regiao.sul,
                },
            },
            tratamento: patologiaData.tratamento,
            prevencao: patologiaData.prevencao,
            prognostico: patologiaData.prognostico,
            sintomas: patologiaData.sintomas,
        }
        ref.child(chave).update(dados);
        toast({
            title: "Patologia editada",
            description:
                "A patologia foi editada no banco de dados com sucesso.",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
        setPatologiaData(emptyPatologiaData);
        setModificando(false);
    }

    function deleteSymptomData(key: string) {
        const referencia = database.ref(`sintomas/${key}`).remove();
        toast({
            title: "Sintoma deletado",
            description: "Sintoma foi deletado com sucesso.",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    }

    function deleteDiseaseData(key: string) {
        const referencia = database.ref(`patologias/${key}`).remove();
        toast({
            title: "Patologia deletada",
            description: "Patologia foi deletada com sucesso.",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    }

    return (
        <div>
            <Link href={"/"}>
                {" "}
                <button>
                    <img
                        className="buttonArrow"
                        src="/arrow-right.svg"
                        alt=""
                    />
                </button>{" "}
            </Link>

            <center>
                <Tabs
                    className={styles.container}
                    isFitted
                    variant="soft-rounded"
                    defaultIndex={0}
                >
                    <TabList mb="1em">
                        <Tab
                            _selected={{ color: "white", bg: "blue.500" }}
                            _focus={{ boxShadow: "none" }}
                            fontWeight="bold"
                        >
                            Doenças
                        </Tab>
                        <Tab
                            _selected={{ color: "white", bg: "blue.500" }}
                            _focus={{ boxShadow: "none" }}
                            fontWeight="bold"
                        >
                            Sintomas
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <SimpleGrid
                                bg="gray.50"
                                columns={2}
                                spacing="8"
                                p="2"
                                textAlign="center"
                                rounded="lg"
                                color="gray.400"
                            >
                                <Box
                                    boxShadow="xs"
                                    p="6"
                                    rounded="md"
                                    bg="lightgray"
                                    maxHeight={"fit-content"}
                                    width={"100%"}
                                    borderRadius={"0.8rem"}
                                    display={"block"}
                                >
                                    <Text color={"white"} fontWeight={"bold"}>
                                        Inserção Doenças
                                    </Text>
                                    <FormControl
                                        display={"flex"}
                                        flexWrap={"nowrap"}
                                        justifyContent={"center"}
                                        flexDirection={"column"}
                                        alignItems={"stretch"}
                                        paddingLeft={"5px"}
                                    >
                                        <Input
                                            className="mt-2"
                                            backgroundColor={"whitesmoke"}
                                            type="text"
                                            placeholder="Nome da Patologia"
                                            value={patologiaData.nomePatologia}
                                            required
                                            onChange={(e) =>
                                                setPatologiaData({
                                                    ...patologiaData,
                                                    nomePatologia:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                        <Textarea
                                            className="mt-2"
                                            backgroundColor={"whitesmoke"}
                                            placeholder="Causador"
                                            value={patologiaData.causador}
                                            resize={"vertical"}
                                            onChange={(e) =>
                                                setPatologiaData({
                                                    ...patologiaData,
                                                    causador: e.target.value,
                                                })
                                            }
                                        />
                                        <Textarea
                                            className="mt-2"
                                            backgroundColor={"whitesmoke"}
                                            placeholder="Descrição"
                                            value={patologiaData.descricao}
                                            resize={"vertical"}
                                            onChange={(e) =>
                                                setPatologiaData({
                                                    ...patologiaData,
                                                    descricao: e.target.value,
                                                })
                                            }
                                        />
                                        <Textarea
                                            className="mt-2"
                                            backgroundColor={"whitesmoke"}
                                            placeholder="Diagnostico"
                                            value={patologiaData.diagnostico}
                                            resize={"vertical"}
                                            onChange={(e) =>
                                                setPatologiaData({
                                                    ...patologiaData,
                                                    diagnostico: e.target.value,
                                                })
                                            }
                                        />
                                        <Card marginTop={"2"} bg={"lightgray"}>
                                            <CardBody>
                                                <Text
                                                    fontSize={"xl"}
                                                    textColor={"white"}
                                                    fontWeight={"bold"}
                                                >
                                                    Prevalencia
                                                </Text>
                                                <CheckboxGroup
                                                    colorScheme="green"
                                                    defaultValue={[]}
                                                >
                                                    <Stack
                                                        paddingTop={"5px"}
                                                        spacing={[1, 5]}
                                                        direction={[
                                                            "column",
                                                            "row",
                                                        ]}
                                                    >
                                                        <Text
                                                            color={"white"}
                                                            fontWeight={"bold"}
                                                        >
                                                            Animal:{" "}
                                                        </Text>
                                                        <Checkbox
                                                            name="cachorro"
                                                            value="cachorro"
                                                            isChecked={
                                                                caoData
                                                            }
                                                            
                                                            onChange={(e) =>
                                                                setPatologiaData(
                                                                    {
                                                                        ...patologiaData,
                                                                        prevalencia:
                                                                        {
                                                                            ...patologiaData.prevalencia,
                                                                            animal: {
                                                                                ...patologiaData
                                                                                    .prevalencia
                                                                                    .animal,
                                                                                cachorro:
                                                                                    e
                                                                                        .target
                                                                                        .checked,
                                                                            },
                                                                        },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                color={"white"}
                                                                fontWeight={
                                                                    "medium"
                                                                }
                                                            >
                                                                Cachorro
                                                            </Text>
                                                        </Checkbox>
                                                        <Checkbox
                                                            name="gato"
                                                            value="gato"
                                                            colorScheme="green"
                                                            isChecked={
                                                                patologiaData
                                                                    .prevalencia
                                                                    .animal.gato
                                                            }
                                                            onChange={(e) =>
                                                                setPatologiaData(
                                                                    {
                                                                        ...patologiaData,
                                                                        prevalencia:
                                                                        {
                                                                            ...patologiaData.prevalencia,
                                                                            animal: {
                                                                                ...patologiaData
                                                                                    .prevalencia
                                                                                    .animal,
                                                                                gato: e
                                                                                    .target
                                                                                    .checked,
                                                                            },
                                                                        },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                color={"white"}
                                                                fontWeight={
                                                                    "medium"
                                                                }
                                                            >
                                                                Gato
                                                            </Text>
                                                        </Checkbox>
                                                    </Stack>
                                                </CheckboxGroup>
                                                <CheckboxGroup
                                                    colorScheme="green"
                                                    defaultValue={[]}
                                                >
                                                    <Stack
                                                        paddingTop={"5px"}
                                                        spacing={[1, 2]}
                                                        direction={[
                                                            "column",
                                                            "column",
                                                        ]}
                                                    >
                                                        <Text
                                                            color={"white"}
                                                            fontWeight={"bold"}
                                                        >
                                                            Regiao:{" "}
                                                        </Text>
                                                        <Checkbox
                                                            name="norte"
                                                            value="norte"
                                                            defaultChecked
                                                            isChecked={
                                                                patologiaData
                                                                    .prevalencia
                                                                    .regiao
                                                                    .norte
                                                            }
                                                            onChange={(e) =>
                                                                setPatologiaData(
                                                                    {
                                                                        ...patologiaData,
                                                                        prevalencia:
                                                                        {
                                                                            ...patologiaData.prevalencia,
                                                                            regiao: {
                                                                                ...patologiaData
                                                                                    .prevalencia
                                                                                    .regiao,
                                                                                norte: e
                                                                                    .target
                                                                                    .checked,
                                                                            },
                                                                        },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                color={"white"}
                                                                fontWeight={
                                                                    "medium"
                                                                }
                                                            >
                                                                Região Norte
                                                            </Text>
                                                        </Checkbox>
                                                        <Checkbox
                                                            name="nordeste"
                                                            value="nordeste"
                                                            defaultChecked
                                                            isChecked={
                                                                patologiaData
                                                                    .prevalencia
                                                                    .regiao
                                                                    .nordeste
                                                            }
                                                            onChange={(e) =>
                                                                setPatologiaData(
                                                                    {
                                                                        ...patologiaData,
                                                                        prevalencia:
                                                                        {
                                                                            ...patologiaData.prevalencia,
                                                                            regiao: {
                                                                                ...patologiaData
                                                                                    .prevalencia
                                                                                    .regiao,
                                                                                nordeste:
                                                                                    e
                                                                                        .target
                                                                                        .checked,
                                                                            },
                                                                        },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                color={"white"}
                                                                fontWeight={
                                                                    "medium"
                                                                }
                                                            >
                                                                Região Nordeste
                                                            </Text>
                                                        </Checkbox>
                                                        <Checkbox
                                                            name="centrooeste"
                                                            value="centrooeste"
                                                            defaultChecked
                                                            isChecked={
                                                                patologiaData
                                                                    .prevalencia
                                                                    .regiao
                                                                    .centrooeste
                                                            }
                                                            onChange={(e) =>
                                                                setPatologiaData(
                                                                    {
                                                                        ...patologiaData,
                                                                        prevalencia:
                                                                        {
                                                                            ...patologiaData.prevalencia,
                                                                            regiao: {
                                                                                ...patologiaData
                                                                                    .prevalencia
                                                                                    .regiao,
                                                                                centrooeste:
                                                                                    e
                                                                                        .target
                                                                                        .checked,
                                                                            },
                                                                        },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                color={"white"}
                                                                fontWeight={
                                                                    "medium"
                                                                }
                                                            >
                                                                Região
                                                                Centro-Oeste
                                                            </Text>
                                                        </Checkbox>
                                                        <Checkbox
                                                            name="sudeste"
                                                            value="sudeste"
                                                            defaultChecked
                                                            isChecked={
                                                                patologiaData
                                                                    .prevalencia
                                                                    .regiao
                                                                    .sudeste
                                                            }
                                                            onChange={(e) =>
                                                                setPatologiaData(
                                                                    {
                                                                        ...patologiaData,
                                                                        prevalencia:
                                                                        {
                                                                            ...patologiaData.prevalencia,
                                                                            regiao: {
                                                                                ...patologiaData
                                                                                    .prevalencia
                                                                                    .regiao,
                                                                                sudeste:
                                                                                    e
                                                                                        .target
                                                                                        .checked,
                                                                            },
                                                                        },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                color={"white"}
                                                                fontWeight={
                                                                    "medium"
                                                                }
                                                            >
                                                                Região Sudeste
                                                            </Text>
                                                        </Checkbox>
                                                        <Checkbox
                                                            name="sul"
                                                            value="sul"
                                                            defaultChecked
                                                            isChecked={
                                                                patologiaData
                                                                    .prevalencia
                                                                    .regiao.sul
                                                            }
                                                            onChange={(e) =>
                                                                setPatologiaData(
                                                                    {
                                                                        ...patologiaData,
                                                                        prevalencia:
                                                                        {
                                                                            ...patologiaData.prevalencia,
                                                                            regiao: {
                                                                                ...patologiaData
                                                                                    .prevalencia
                                                                                    .regiao,
                                                                                sul: e
                                                                                    .target
                                                                                    .checked,
                                                                            },
                                                                        },
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                color={"white"}
                                                                fontWeight={
                                                                    "medium"
                                                                }
                                                            >
                                                                Região Sul
                                                            </Text>
                                                        </Checkbox>
                                                    </Stack>
                                                </CheckboxGroup>
                                            </CardBody>
                                        </Card>
                                        <Textarea
                                            className="mt-2"
                                            backgroundColor={"whitesmoke"}
                                            placeholder="Tratamento"
                                            value={patologiaData.tratamento}
                                            resize={"vertical"}
                                            onChange={(e) =>
                                                setPatologiaData({
                                                    ...patologiaData,
                                                    tratamento: e.target.value,
                                                })
                                            }
                                        />
                                        <Textarea
                                            className="mt-2"
                                            backgroundColor={"whitesmoke"}
                                            placeholder="Prevenção"
                                            value={patologiaData.prevencao}
                                            resize={"vertical"}
                                            onChange={(e) =>
                                                setPatologiaData({
                                                    ...patologiaData,
                                                    prevencao: e.target.value,
                                                })
                                            }
                                        />
                                        <Textarea
                                            className="mt-2"
                                            backgroundColor={"whitesmoke"}
                                            placeholder="Prognostico"
                                            value={patologiaData.prognostico}
                                            resize={"vertical"}
                                            onChange={(e) =>
                                                setPatologiaData({
                                                    ...patologiaData,
                                                    prognostico: e.target.value,
                                                })
                                            }
                                        />
                                        {modificando ? (
                                            <Button
                                                colorScheme="teal"
                                                margin={"10px 50px"}
                                                variant={"outline"}
                                                bg={"white"}
                                                borderRadius={"0.8rem"}
                                                type="button"
                                                onClick={updateDiseaseData}
                                            >
                                                Atualizar
                                            </Button>
                                        ) : (
                                            <Button
                                                colorScheme="teal"
                                                margin={"10px 50px"}
                                                variant={"outline"}
                                                bg={"white"}
                                                borderRadius={"0.8rem"}
                                                type="button"
                                                onClick={createPathologyData}
                                            >
                                                Inserir
                                            </Button>
                                        )}
                                    </FormControl>
                                </Box>
                                <Box
                                    boxShadow="sm"
                                    p="6"
                                    rounded="md"
                                    bg="lightgray"
                                    maxHeight={"70vh"}
                                    height={"70vh"}
                                    overflow={"auto"}
                                    borderRadius={"0.8rem"}
                                >
                                    <Text color={"white"} fontWeight={"bold"}>
                                        Visualização de Doenças
                                    </Text>
                                    <Input
                                        className="block mt-2"
                                        type="text"
                                        placeholder="Buscar"
                                        bg={"white"}
                                        onChange={searchDiseaseData}
                                    />
                                    <SimpleGrid
                                        display={"flex"}
                                        flexWrap={"wrap"}
                                        paddingTop={5}
                                        columns={4}
                                        gap={2}
                                    >
                                        {estaBuscando
                                            ? buscaPatologia?.map(
                                                (patologia) => {
                                                    return (
                                                        <div
                                                            key={
                                                                patologia.chave
                                                            }
                                                            className={
                                                                styles.symptomUnchecked
                                                            }
                                                        >
                                                            <Text>
                                                                {
                                                                    patologia.nomePatologia
                                                                }{" "}
                                                                <SearchIcon/>
                                                                <EditIcon
                                                                    marginLeft={
                                                                        "2px"
                                                                    }
                                                                    marginRight={
                                                                        "4px"
                                                                    }
                                                                    onClick={() =>
                                                                        editDiseaseData(
                                                                            patologia
                                                                        )
                                                                    }
                                                                />
                                                                <DeleteIcon
                                                                    cursor={
                                                                        "pointer"
                                                                    }
                                                                    onClick={() =>
                                                                        deleteDiseaseData(
                                                                            patologia.chave
                                                                        )
                                                                    }
                                                                />
                                                            </Text>
                                                        </div>
                                                    );
                                                }
                                            )
                                            : patologias?.map((patologia) => {
                                                return (
                                                    <div
                                                        key={patologia.chave}
                                                        className={
                                                            styles.symptomUnchecked
                                                        }
                                                    >
                                                        <Text>
                                                            {
                                                                patologia.nomePatologia
                                                            }{" "}
                                                            <SearchIcon
                                                                cursor={'pointer'}
                                                                marginLeft={
                                                                    "2px"
                                                                }
                                                                onClick={()=>{}}
                                                            />
                                                            <EditIcon
                                                                cursor={'pointer'}
                                                                marginLeft={
                                                                    "2px"
                                                                }
                                                                marginRight={
                                                                    "4px"
                                                                }
                                                                onClick={() =>
                                                                    editDiseaseData(
                                                                        patologia
                                                                    )
                                                                }
                                                            />
                                                            <DeleteIcon
                                                                cursor={
                                                                    "pointer"
                                                                }
                                                                onClick={() =>
                                                                    deleteDiseaseData(
                                                                        patologia.chave
                                                                    )
                                                                }
                                                            />
                                                        </Text>
                                                    </div>
                                                );
                                            })}
                                    </SimpleGrid>
                                </Box>
                            </SimpleGrid>
                        </TabPanel>
                        <TabPanel>
                            <SimpleGrid
                                bg="gray.50"
                                columns={2}
                                spacing="8"
                                p="2"
                                textAlign="center"
                                rounded="lg"
                                color="gray.400"
                            >
                                <Box
                                    boxShadow="xs"
                                    p="6"
                                    rounded="md"
                                    bg="lightgray"
                                    maxHeight={"70vh"}
                                    overflow={"auto"}
                                    height={"70vh"}
                                    borderRadius={"0.8rem"}
                                    display={"flex"}
                                >
                                    <FormControl paddingLeft={"5px"}>
                                        <FormLabel
                                            display={"flex"}
                                            justifyContent={"center"}
                                        >
                                            <Text
                                                color={"white"}
                                                fontWeight={"bold"}
                                            >
                                                Inserir Sintoma
                                            </Text>
                                        </FormLabel>
                                        <Input
                                            className="mt-2"
                                            backgroundColor={"whitesmoke"}
                                            type="text"
                                            placeholder="Nome do Sintoma"
                                            value={nomeSintoma}
                                            required
                                            onChange={(event) =>
                                                setNomeSintoma(
                                                    event.target.value
                                                )
                                            }
                                        />
                                        <Button
                                            colorScheme="teal"
                                            margin={"10px 50px"}
                                            variant={"outline"}
                                            bg={"white"}
                                            borderRadius={"0.8rem"}
                                            type="button"
                                            onClick={createSymptomData}
                                        >
                                            Inserir
                                        </Button>
                                    </FormControl>
                                </Box>
                                <Box
                                    boxShadow="sm"
                                    p="6"
                                    rounded="md"
                                    bg="lightgray"
                                    maxHeight={"70vh"}
                                    height={"70vh"}
                                    overflow={"auto"}
                                    borderRadius={"0.8rem"}
                                >
                                    <Text color={"white"} fontWeight={"bold"}>
                                        Visualização Sintomas
                                    </Text>
                                    <Input
                                        className="block mt-2"
                                        type="text"
                                        placeholder="Buscar"
                                        bg={"white"}
                                        onChange={searchSymptomData}
                                    />
                                    <SimpleGrid
                                        display={"flex"}
                                        flexWrap={"wrap"}
                                        paddingTop={5}
                                        columns={4}
                                        gap={2}
                                    >
                                        {estaBuscando
                                            ? buscaSintoma?.map((sintoma) => {
                                                return (
                                                    <div
                                                        key={sintoma.chave}
                                                        className={
                                                            styles.symptomUnchecked
                                                        }
                                                    >
                                                        <Text>
                                                            {
                                                                sintoma.nomeSintoma
                                                            }{" "}
                                                            <DeleteIcon
                                                                cursor={
                                                                    "pointer"
                                                                }
                                                                onClick={() =>
                                                                    deleteSymptomData(
                                                                        sintoma.chave
                                                                    )
                                                                }
                                                            />
                                                        </Text>
                                                    </div>
                                                );
                                            })
                                            : sintomas?.map((sintoma) => {
                                                return (
                                                    <div
                                                        key={sintoma.chave}
                                                        className={
                                                            styles.symptomUnchecked
                                                        }
                                                    >
                                                        <Text>
                                                            {
                                                                sintoma.nomeSintoma
                                                            }{" "}
                                                            <DeleteIcon
                                                                cursor={
                                                                    "pointer"
                                                                }
                                                                onClick={() =>
                                                                    deleteSymptomData(
                                                                        sintoma.chave
                                                                    )
                                                                }
                                                            />
                                                        </Text>
                                                    </div>
                                                );
                                            })}
                                    </SimpleGrid>
                                </Box>
                            </SimpleGrid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </center>
        </div>
    );
}
