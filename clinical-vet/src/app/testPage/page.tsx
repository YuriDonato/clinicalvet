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
    useDisclosure,
    Tag,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, SearchIcon, AddIcon } from "@chakra-ui/icons";

import PatologiaCard from "./patologiaCard";

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
    //load
    const [isLoading, setIsLoading] = useState(false);
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
        sintomas: [],
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
        sintomas: [],
    });
    // Valores patologia para checkbox
    const [cachorro, setCachorro] = useState("semcachorro");
    const [gato, setGato] = useState("semgato");
    const [norte, setNorte] = useState("semnorte");
    const [nordeste, setNordeste] = useState("semnordeste");
    const [centrooeste, setCentrooeste] = useState("semcentrooeste");
    const [sudeste, setSudeste] = useState("semsudeste");
    const [sul, setSul] = useState("semsul");

    function uncheckAll() {
        setCachorro("semcachorro");
        setGato("semgato");
        setNorte("semnorte");
        setNordeste("semnordeste");
        setCentrooeste("semcentrooeste");
        setSudeste("semsudeste");
        setSul("semsul");
        setPatologiaData({
            ...patologiaData,
            prevalencia: {
                ...patologiaData.prevalencia,
                animal: {
                    ...patologiaData.prevalencia.animal,
                    cachorro: false,
                    gato: false,
                },
                regiao: {
                    ...patologiaData.prevalencia.regiao,
                    norte: false,
                    nordeste: false,
                    centrooeste: false,
                    sudeste: false,
                    sul: false,
                },
            },
        });
    }
    function checkAll() {
        setCachorro("cachorro");
        setGato("gato");
        setNorte("norte");
        setNordeste("nordeste");
        setCentrooeste("centrooeste");
        setSudeste("sudeste");
        setSul("sul");
        setPatologiaData({
            ...patologiaData,
            prevalencia: {
                ...patologiaData.prevalencia,
                animal: {
                    ...patologiaData.prevalencia.animal,
                    cachorro: true,
                    gato: true,
                },
                regiao: {
                    ...patologiaData.prevalencia.regiao,
                    norte: true,
                    nordeste: true,
                    centrooeste: true,
                    sudeste: true,
                    sul: true,
                },
            },
        });
    }
    function checkSpecific(patologia: Patologia) {
        setCachorro(
            patologia.prevalencia.animal.cachorro ? "cachorro" : "semcachorro"
        );
        setGato(patologia.prevalencia.animal.gato ? "gato" : "semgato");
        setNorte(patologia.prevalencia.regiao.norte ? "norte" : "semnorte");
        setNordeste(
            patologia.prevalencia.regiao.nordeste ? "nordeste" : "semnordeste"
        );
        setCentrooeste(
            patologia.prevalencia.regiao.centrooeste
                ? "centrooeste"
                : "semcentrooeste"
        );
        setSudeste(
            patologia.prevalencia.regiao.sudeste ? "sudeste" : "semsudeste"
        );
        setSul(patologia.prevalencia.regiao.sul ? "sul" : "semsul");
    }

    // Estado de Modificação
    const [modificando, setModificando] = useState(false);

    // Valor Busca e estado
    const [buscaSintoma, setBuscaSintoma] = useState<Sintoma[]>();
    const [buscaPatologia, setBuscaPatologia] = useState<Patologia[]>();
    const [estaBuscando, setEstaBuscando] = useState(false);

    // Leitura de Dados
    const [sintomas, setSintomas] = useState<Sintoma[]>([]);
    const [patologias, setPatologias] = useState<Patologia[]>();

    // Toast
    const toast = useToast();

    // Drawer de Informação da Doença
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    function onOpen() {
        setIsDrawerOpen(true);
    }
    function onClose() {
        setIsDrawerOpen(false);
    }

    // Popular tudo
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
            setUnselectedSymptoms(resultadoSintoma);
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
    // Popular check de sintomas
    const [unselectedSymptoms, setUnselectedSymptoms] =
        useState<Sintoma[]>(sintomas);
    const [selectedSymptoms, setSelectedSymptoms] = useState<Sintoma[]>([]);
    const [defaultUnselectedSymptoms, setDefaultUnselectedSymptoms] =
        useState<Sintoma[]>(sintomas);
    const [defaultSelectedSymptoms, setDefaultSelectedSymptoms] = useState<
        Sintoma[]
    >([]);

    function resetSymptomSelection(){
        setUnselectedSymptoms(sintomas)
        setSelectedSymptoms(defaultSelectedSymptoms)
        setKeySymptomsSelecionados(defaultKeySymptomsSelecionados)
    }

    useEffect(() => {
        setUnselectedSymptoms(sintomas);
    }, [sintomas]);
    // Lidar com Sintomas Marcados

    const handleSymptomClick = (index: number, isUnselected: boolean) => {
        if (isUnselected) {
            const clickedSymptom = unselectedSymptoms[index];
            setUnselectedSymptoms((prevSymptoms) =>
                prevSymptoms.filter((_, i) => i !== index)
            );
            setSelectedSymptoms((prevSymptoms) => [
                ...prevSymptoms,
                clickedSymptom,
            ]);
        } else {
            const clickedSymptom = selectedSymptoms[index];
            setSelectedSymptoms((prevSymptoms) =>
                prevSymptoms.filter((_, i) => i !== index)
            );
            setUnselectedSymptoms((prevSymptoms) => [
                ...prevSymptoms,
                clickedSymptom,
            ]);
        }
    };

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
        uncheckAll();
        resetSymptomSelection()
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
        checkSpecific(patologia);
        setPatologiaData(patologia);
        setKeySymptomsSelecionados(patologia.sintomas);
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
        };
        ref.child(chave).update(dados);
        setPatologiaData(emptyPatologiaData);
        uncheckAll();
        setModificando(false);
        toast({
            title: "Patologia editada",
            description:
                "A patologia foi editada no banco de dados com sucesso.",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
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

    // Adicionar Novo Simtoma na Lista
    const [keySymptomsSelecionados, setKeySymptomsSelecionados] = useState([
        "",
    ]);
    const [defaultKeySymptomsSelecionados, setDefaultKeySymptomsSelecionados] = useState([
        "",
    ]);

    function adicionarNovoSintoma(
        keySymptomsSelecionados: string[],
        setKeySymptomsSelecionados: React.Dispatch<
            React.SetStateAction<string[]>
        >,
        newSymptom: string
    ) {
        const updatedSymptoms = [...keySymptomsSelecionados, newSymptom];
        setKeySymptomsSelecionados(updatedSymptoms);
        setIsLoading(false);
    }

    function removerSintoma(
        keySymptomsSelecionados: string[],
        setKeySymptomsSelecionados: React.Dispatch<
            React.SetStateAction<string[]>
        >,
        symptomToRemove: string
    ) {
        const updatedSymptoms = keySymptomsSelecionados.filter(
            (symptom) => symptom !== symptomToRemove
        );
        setKeySymptomsSelecionados(updatedSymptoms);
        setIsLoading(false);
    }

    useEffect(() => {
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
            sintomas: keySymptomsSelecionados,
        };

        setPatologiaData(dados);
    }, [keySymptomsSelecionados]);

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
                                                    defaultValue={[
                                                        "cachorro",
                                                        "gato",
                                                    ]}
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
                                                            value={cachorro}
                                                            onChange={(e) => {
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
                                                                );
                                                                checkSpecific(
                                                                    patologiaData
                                                                );
                                                            }}
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
                                                            value={gato}
                                                            colorScheme="green"
                                                            isChecked={
                                                                patologiaData
                                                                    .prevalencia
                                                                    .animal.gato
                                                            }
                                                            onChange={(e) => {
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
                                                                );
                                                                checkSpecific(
                                                                    patologiaData
                                                                );
                                                            }}
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
                                                    defaultValue={[
                                                        "norte",
                                                        "nordeste",
                                                        "centrooeste",
                                                        "sudeste",
                                                        "sul",
                                                    ]}
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
                                                            value={norte}
                                                            onChange={(e) => {
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
                                                                );
                                                                checkSpecific(
                                                                    patologiaData
                                                                );
                                                            }}
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
                                                            value={nordeste}
                                                            onChange={(e) => {
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
                                                                );
                                                                checkSpecific(
                                                                    patologiaData
                                                                );
                                                            }}
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
                                                            value={centrooeste}
                                                            onChange={(e) => {
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
                                                                );
                                                                checkSpecific(
                                                                    patologiaData
                                                                );
                                                            }}
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
                                                            value={sudeste}
                                                            onChange={(e) => {
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
                                                                );
                                                                checkSpecific(
                                                                    patologiaData
                                                                );
                                                            }}
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
                                                            value={sul}
                                                            onChange={(e) => {
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
                                                                );
                                                                checkSpecific(
                                                                    patologiaData
                                                                );
                                                            }}
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
                                                <ButtonGroup marginTop={"10px"}>
                                                    <Button
                                                        textColor={"white"}
                                                        onClick={checkAll}
                                                    >
                                                        Marcar Tudo
                                                    </Button>
                                                    <Button
                                                        textColor={"white"}
                                                        onClick={uncheckAll}
                                                    >
                                                        Desmarcar Tudo
                                                    </Button>
                                                </ButtonGroup>
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
                                        <Card
                                            marginTop={"5px"}
                                            backgroundColor={"whitesmoke"}
                                        >
                                            <CardHeader>
                                                <Text>Selecionados:</Text>
                                                <Card>
                                                    <CardBody>
                                                        {isLoading
                                                            ? selectedSymptoms.map(
                                                                (
                                                                    sintoma,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <Tag
                                                                        key={'0'}
                                                                            cursor={
                                                                                "pointer"
                                                                            }
                                                                        >
                                                                            {
                                                                                sintoma.nomeSintoma
                                                                            }
                                                                        </Tag>
                                                                    );
                                                                }
                                                            )
                                                            : selectedSymptoms.map(
                                                                (
                                                                    sintoma,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <Tag
                                                                        key={'1'}
                                                                            cursor={
                                                                                "pointer"
                                                                            }
                                                                            onClick={() => {
                                                                                removerSintoma(
                                                                                    keySymptomsSelecionados,
                                                                                    setKeySymptomsSelecionados,
                                                                                    sintoma.chave
                                                                                );
                                                                                handleSymptomClick(
                                                                                    index,
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            {" "}
                                                                            {
                                                                                sintoma.nomeSintoma
                                                                            }
                                                                        </Tag>
                                                                    );
                                                                }
                                                            )}
                                                    </CardBody>
                                                </Card>
                                            </CardHeader>
                                            <CardBody>
                                                {isLoading
                                                    ? unselectedSymptoms.map(
                                                        (sintoma, index) => {
                                                            return (
                                                                <Tag
                                                                key={'2'}
                                                                    cursor={
                                                                        "pointer"
                                                                    }
                                                                >
                                                                    {
                                                                        sintoma.nomeSintoma
                                                                    }
                                                                </Tag>
                                                            );
                                                        }
                                                    )
                                                    : unselectedSymptoms.map(
                                                        (sintoma, index) => {
                                                            return (
                                                                <Tag
                                                                key={'3'}
                                                                    cursor={
                                                                        "pointer"
                                                                    }
                                                                    onClick={() => {
                                                                        setIsLoading(
                                                                            true
                                                                        );
                                                                        adicionarNovoSintoma(
                                                                            keySymptomsSelecionados,
                                                                            setKeySymptomsSelecionados,
                                                                            sintoma.chave
                                                                        );
                                                                        handleSymptomClick(
                                                                            index,
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    {
                                                                        sintoma.nomeSintoma
                                                                    }
                                                                </Tag>
                                                            );
                                                        }
                                                    )}
                                            </CardBody>
                                        </Card>
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
                                                                <PatologiaCard
                                                                    patologia={
                                                                        patologia
                                                                    }
                                                                />
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
                                                            <PatologiaCard
                                                                patologia={
                                                                    patologia
                                                                }
                                                            />
                                                            <EditIcon
                                                                cursor={
                                                                    "pointer"
                                                                }
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
