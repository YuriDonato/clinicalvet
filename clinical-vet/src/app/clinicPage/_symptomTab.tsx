import React from "react";
import { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Text, Box } from "@chakra-ui/react";
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

const SymptomTab = () => {
    const [sintomas, setSintomas] = useState<Sintoma[]>();
    const [patologias, setPatologias] = useState<Patologia[]>();

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

    return (
        <div className="bg-azulclaro shadow-lg rounded-lg p-6 mt-4 grid md:grid-cols-2 grid-cols-5 gap-2">
            {sintomas?.map((sintoma) => {
                return (
                    <Box cursor={'pointer'} key={sintoma.chave} className="symptomUnchecked" >
                        <Text>{sintoma.nomeSintoma} </Text>
                    </Box>
                );
            })}
        </div>
    );
};

export default SymptomTab;
