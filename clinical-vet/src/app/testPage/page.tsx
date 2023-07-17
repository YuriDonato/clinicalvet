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
import { CheckIcon } from "@chakra-ui/icons";

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
        sintomas: [],
    });

    // Valor Busca e estado
    const [busca, setBusca] = useState<Sintoma[]>();
    const [estaBuscando, setEstaBuscando] = useState(false);

    // Leitura de Dados
    const [sintomas, setSintomas] = useState<Sintoma[]>();
    const [patologias, setPatologias] = useState<Patologia[]>();

    useEffect(() => {
        const refSintomas = database.ref("sintomas");

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
    }, []);

    function createSymptomData(event: FormEvent) {
        event.preventDefault();
        const ref = database.ref("sintomas");
        const dados = {
            nomeSintoma,
        };
        ref.push(dados);
        setNomeSintoma("");
    }
    function createPathologyData(event: FormEvent) {
        event.preventDefault();
        const ref = database.ref("patologias");
        const dados = patologiaData;
        ref.push(dados);
    }

    function searchData(event: FormEvent<HTMLInputElement>) {
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

            setBusca(dados);
        } else {
            setEstaBuscando(false);
        }
    }

    function deleteData(key: string) {
        const referencia = database.ref(`sintomas/${key}`).remove();
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
                                    maxHeight={"70vh"}
                                    overflow={"auto"}
                                    height={"70vh"}
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
                                            onChange={(e) => {
                                                console.log(patologiaData),
                                                    setPatologiaData({
                                                        ...patologiaData,
                                                        nomePatologia:
                                                            e.target.value,
                                                    });
                                            }}
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

                                        {/* checkbox */}
                                        <CheckboxGroup
                                            colorScheme="green"
                                            defaultValue={[]}
                                        >
                                            <Stack
                                                paddingTop={"5px"}
                                                spacing={[1, 5]}
                                                direction={["column", "row"]}
                                            >
                                                <Text
                                                    color={"white"}
                                                    fontWeight={"bold"}
                                                >
                                                    Selecione Animal:{" "}
                                                </Text>
                                                <Checkbox
                                                    name="cachorro"
                                                    value="cachorro"
                                                    defaultChecked
                                                    isChecked={
                                                        patologiaData
                                                            .prevalencia.animal
                                                            .cachorro
                                                    }
                                                    onChange={(e) =>
                                                        setPatologiaData({
                                                            ...patologiaData,
                                                            prevalencia: {
                                                                ...patologiaData.prevalencia,
                                                                animal: {
                                                                    ...patologiaData
                                                                        .prevalencia
                                                                        .animal,
                                                                    cachorro:
                                                                        e.target
                                                                            .checked,
                                                                },
                                                            },
                                                        })
                                                    }
                                                >
                                                    <Text
                                                        color={"white"}
                                                        fontWeight={"medium"}
                                                    >
                                                        Cachorro
                                                    </Text>
                                                </Checkbox>
                                                <Checkbox
                                                    name="gato"
                                                    value="gato"
                                                    defaultChecked
                                                    colorScheme="green"
                                                    isChecked={
                                                        patologiaData
                                                            .prevalencia.animal
                                                            .gato
                                                    }
                                                    onChange={(e) =>
                                                        setPatologiaData({
                                                            ...patologiaData,
                                                            prevalencia: {
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
                                                        })
                                                    }
                                                >
                                                    <Text
                                                        color={"white"}
                                                        fontWeight={"medium"}
                                                    >
                                                        Gato
                                                    </Text>
                                                </Checkbox>
                                            </Stack>
                                        </CheckboxGroup>
                                        {/* fim checkbox */}
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
                                        onChange={searchData}
                                    />
                                    <SimpleGrid
                                        display={"flex"}
                                        flexWrap={"wrap"}
                                        paddingTop={5}
                                        columns={4}
                                        gap={2}
                                    >
                                        {estaBuscando
                                            ? busca?.map((sintoma) => {
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
                                                            <span
                                                                onClick={() =>
                                                                    deleteData(
                                                                        sintoma.chave
                                                                    )
                                                                }
                                                                className="text-red-500 cursor-pointer"
                                                            >
                                                                X
                                                            </span>
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
                                                            <span
                                                                onClick={() =>
                                                                    deleteData(
                                                                        sintoma.chave
                                                                    )
                                                                }
                                                                className="text-red-500 cursor-pointer"
                                                            >
                                                                X
                                                            </span>
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
                                        onChange={searchData}
                                    />
                                    <SimpleGrid
                                        display={"flex"}
                                        flexWrap={"wrap"}
                                        paddingTop={5}
                                        columns={4}
                                        gap={2}
                                    >
                                        {estaBuscando
                                            ? busca?.map((sintoma) => {
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
                                                            <span
                                                                onClick={() =>
                                                                    deleteData(
                                                                        sintoma.chave
                                                                    )
                                                                }
                                                                className="text-red-500 cursor-pointer"
                                                            >
                                                                X
                                                            </span>
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
                                                            <span
                                                                onClick={() =>
                                                                    deleteData(
                                                                        sintoma.chave
                                                                    )
                                                                }
                                                                className="text-red-500 cursor-pointer"
                                                            >
                                                                X
                                                            </span>
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
