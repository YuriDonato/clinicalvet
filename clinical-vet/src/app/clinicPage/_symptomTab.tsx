import React, { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Text, Box } from "@chakra-ui/react";
import { database } from "../services/firebase";
import { MdKeyboardArrowDown } from "react-icons/md";

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

const SymptomTab = () => {
    // Logica dos botoes principais
    const [showSymptoms, setShowSymptoms] = useState(false);
    const [showSelectedSymptoms, setShowSelectedSymptoms] = useState(false);
    var [style, setStyle] = useState("rotate-0");
    const [currentState, setCurrentState] = useState(false);
    const [firstClick, setFirstClick] = useState(true);

    const changeStyle = () => {
        if (currentState) {
            setStyle("rotate-0");
        } else {
            setStyle("rotate-180");
        }
    };

    const toggleCurrentState = () => {
        setCurrentState(!currentState);
    };

    const toggleSymptoms = () => {
        setShowSymptoms(!showSymptoms);
        changeStyle();
        toggleCurrentState();
    };

    const toggleSelectedSymptoms = () => {
        setShowSelectedSymptoms(!showSelectedSymptoms);
        changeStyle();
        toggleCurrentState();
    };

    // Logica para database
    const [sintomas, setSintomas] = useState<Sintoma[]>([]);
    const [patologias, setPatologias] = useState<Patologia[]>([]);

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
            setUnselectedSymptoms(sintomas);
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

    useEffect(() => {
        setUnselectedSymptoms(sintomas)
    }, [sintomas]);

    const [unselectedSymptoms, setUnselectedSymptoms] = useState<Sintoma[]>(sintomas);
    const [selectedSymptoms, setSelectedSymptoms] = useState<Sintoma[]>([]);

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

    return (
        <div className="grid md:grid-cols-1 grid-cols-2 gap-5">
            <section id="unselectedSymptoms">
                <button
                    className="buttonOpen bg-azulclaro text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={toggleSymptoms}
                >
                    Sintomas
                    <MdKeyboardArrowDown className={style} />
                </button>
                {showSymptoms && (
                    <div className="bg-azulclaro shadow-lg rounded-lg p-6 mt-4 grid md:grid-cols-2 grid-cols-5 gap-2">
                        {unselectedSymptoms.map((sintoma, index) => (
                            <Box
                                cursor={"pointer"}
                                key={sintoma.chave}
                                className="symptomUnchecked"
                                onClick={() => handleSymptomClick(index, true)}
                            >
                                <Text>{sintoma.nomeSintoma}</Text>
                            </Box>
                        ))}
                    </div>
                )}
            </section>
            <section id="selectedSymptoms">
                <button
                    className="checkUncheckMenu buttonOpen bg-azulclaro text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={toggleSelectedSymptoms}
                >
                    Selecionados <MdKeyboardArrowDown className={style} />
                </button>
                {showSelectedSymptoms && (
                    <div className="bg-azulclaro shadow-lg rounded-lg p-6 mt-4 grid md:grid-cols-2 grid-cols-5 gap-2">
                        {selectedSymptoms.map((sintoma, index) => (
                            <Box
                                cursor={"pointer"}
                                key={sintoma.chave}
                                className="symptomUnchecked"
                                onClick={() => handleSymptomClick(index, false)}
                            >
                                <Text>{sintoma.nomeSintoma}</Text>
                            </Box>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default SymptomTab