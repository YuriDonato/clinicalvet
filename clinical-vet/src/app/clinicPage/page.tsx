"use client";
import { useState, useEffect, useMemo, FormEvent } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { database } from "../services/firebase";
import {
  Text,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormLabel,
  Input,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { PiCatLight, PiDogLight } from "react-icons/pi";

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

export default function Clinic() {
  // Cachorro e Gato
  const [catMode, setCatMode] = useState(false);
  const [transition, setTransition] = useState(false);

  const toggleCatMode = () => {
    setCatMode((prevCatMode) => !prevCatMode);
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
    }, 250);
  };

  // Fazer o botão de abrir e fechar sintomas
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [showSelectedSymptoms, setShowSelectedSymptoms] = useState(false);
  var [style, setStyle] = useState("rotate-0");
  const [currentState, setCurrentState] = useState(false);

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

  // Novo estado para armazenar os sintomas filtrados
  const [sintomasFiltrados, setSintomasFiltrados] = useState<Sintoma[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Função para filtrar os sintomas com base na busca
  function searchSymptom(event: FormEvent<HTMLInputElement>) {
    const palavra = event.currentTarget.value.trim().toLowerCase();

    if (palavra.length > 0) {
      const sintomasFiltrados = sintomas.filter(
        (sintoma) =>
          sintoma.nomeSintoma.toLowerCase().includes(palavra) &&
          !selectedSymptoms.some(
            (selected) => selected.chave === sintoma.chave
          ),
          setIsSearching(true)
      );

      setSintomasFiltrados(sintomasFiltrados);
    } else {
      setSintomasFiltrados([]), // Limpar a busca se a palavra estiver vazia
      setIsSearching(false)

    }
  }

  // Logica dos botoes principais

  var [style, setStyle] = useState("rotate-0");

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

  //Selecionando sintoma
  useEffect(() => {
    setUnselectedSymptoms(sintomas);
  }, [sintomas]);

  const [unselectedSymptoms, setUnselectedSymptoms] =
    useState<Sintoma[]>(sintomas);
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
    console.log(`Sintoma selecionado: ${selectedSymptoms.length}`);
    console.log(`Sintoma não selecionado: ${unselectedSymptoms.length}`);
  };

  // Populando sintomas para cada patologia Card
  const [sintomasPorPatologia, setSintomasPorPatologia] = useState<{
    [key: string]: string[];
  }>({});
  useEffect(() => {
    // Função para definir os sintomas para cada patologia
    const definirSintomasPorPatologia = () => {
      const sintomasPorPatologia: { [key: string]: string[] } = {};
      patologias.forEach((patologia) => {
        const sintomasNomesPatologia = definirSintoma(patologia);
        sintomasPorPatologia[patologia.chave] = sintomasNomesPatologia;
      });
      return sintomasPorPatologia;
    };

    // Define os sintomas para cada patologia usando useMemo para evitar chamadas desnecessárias
    setSintomasPorPatologia(definirSintomasPorPatologia());
  }, [patologias]);

  // Inicialize o estado com um array vazio
  // Inicialize o estado com um objeto vazio
  const [sintomasNomesKeys, setSintomasNomesKeys] = useState<{
    [key: string]: Sintoma;
  }>({});

  function definirSintoma(patologia: Patologia) {
    const sintomasNomes = patologia.sintomas
      .map((chave) => sintomasNomesKeys[chave]?.nomeSintoma)
      .filter((nomeSintoma) => nomeSintoma !== undefined)
      .reduce<string[]>((acc, nomeSintoma) => {
        if (!acc.includes(nomeSintoma)) {
          acc.push(nomeSintoma);
        }
        return acc;
      }, []); // Usando reduce para evitar duplicatas
    console.log(` sintomas nomes ${sintomasNomes}`);
    return sintomasNomes;
  }

  useEffect(() => {
    const refSintomas = database.ref("sintomas");
    refSintomas.on("value", (resultado) => {
      const resultadoSintomas = resultado.val();
      if (resultadoSintomas) {
        setSintomasNomesKeys(resultadoSintomas);
      }
    });
  }, []);

  // Buscar patologias com base nos sintomas selecionados
  const [filteredPatologias, setFilteredPatologias] = useState<Patologia[]>(
    []
  );

  useEffect(() => {
    // Função para verificar se uma patologia contém todos os sintomas selecionados
    const containsAllSelectedSymptoms = (patologia: Patologia) => {
      return selectedSymptoms.every((selected) =>
        patologia.sintomas.includes(selected.chave)
      );
    };

    // Filtrar as patologias com base nos sintomas selecionados
    const filteredData = patologias.filter(containsAllSelectedSymptoms);
    setFilteredPatologias(filteredData);
  }, [selectedSymptoms, patologias]);

  // Teste
  const filteredAndSortedPatologias = useMemo(() => {
    return filterAndSortPatologias(patologias, catMode, selectedSymptoms);
  }, [patologias, catMode, selectedSymptoms]);

  // Filtrar pelo state de gato ou cão e ordem alfabetica
  function filterAndSortPatologias(
    patologias: Patologia[],
    catMode: boolean,
    selectedSymptoms: Sintoma[]
  ) {
    const filteredPatologias = patologias.filter((patologia) => {
      const containsAllSelectedSymptoms = selectedSymptoms.every(
        (selected) => patologia.sintomas.includes(selected.chave)
      );

      return (
        containsAllSelectedSymptoms &&
        ((catMode && patologia.prevalencia.animal.gato) ||
          (!catMode && patologia.prevalencia.animal.cachorro))
      );
    });

    const sortedPatologias = filteredPatologias.sort((a, b) => {
      const percentageA =
        (selectedSymptoms.length / (a.sintomas.length - 1)) * 100;
      const percentageB =
        (selectedSymptoms.length / (b.sintomas.length - 1)) * 100;

      return percentageB - percentageA;
    });

    return sortedPatologias;
  }

  useEffect(() => {
    const filteredData = filterAndSortPatologias(
      patologias,
      catMode,
      selectedSymptoms
    );
    setFilteredPatologias(filteredData);
  }, [selectedSymptoms, patologias, catMode]);
  // retorno do html
  return (
    <div className="p-10 select-none">
      <div className="flex justify-between">
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
        {/* cachorro ou gato */}
        <Box
          className="bg-azulclaro"
          borderRadius={"25px"}
          height={"fit-content"}
          width={"fit-content"}
          display={"flex"}
        >
          <PiDogLight
            size={"2rem"}
            color="white"
            opacity={catMode ? 0 : 1}
            onClick={toggleCatMode}
            cursor={"pointer"}
            className={transition ? "transition2s" : ""}
          />
          <PiCatLight
            size={"2rem"}
            color="yellow.300"
            opacity={catMode ? 1 : 0}
            onClick={toggleCatMode}
            cursor={"pointer"}
            className={transition ? "transition2s" : ""}
          />
        </Box>
        {/* fim cachorro ou gato */}
      </div>
      <center>
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
              <div className="bg-azulclaro shadow-lg rounded-lg mt-4">
                <Input
                variant={"filled"}
                  type="text"
                  placeholder="Buscar sintomas..."
                  onChange={searchSymptom}
                  className="mt-4 p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                  width={'20rem'}
                  borderRadius={'200px'}
                />
              <div className="mt-4 pb-4 grid md:grid-cols-1 xl:grid-cols-3 grid-cols-6 gap-2">
                {isSearching
                  ? sintomasFiltrados.map(
                    (sintoma, index) => (
                      <Box
                        cursor={"pointer"}
                        key={sintoma.chave}
                        className="symptomUnchecked"
                        onClick={() =>
                          handleSymptomClick(
                            index,
                            true
                          )
                        }
                      >
                        <Text>
                          {sintoma.nomeSintoma}
                        </Text>
                      </Box>
                    )
                  )
                  : unselectedSymptoms.map(
                    (sintoma, index) => (
                      <Box
                        cursor={"pointer"}
                        key={sintoma.chave}
                        className="symptomUnchecked"
                        onClick={() =>
                          handleSymptomClick(
                            index,
                            true
                          )
                        }
                      >
                        <Text>
                          {sintoma.nomeSintoma}
                        </Text>
                      </Box>
                    )
                  )}
              </div>
            </div>
            )}
          </section>
          <section id="selectedSymptoms">
            <button
              className="checkUncheckMenu buttonOpen bg-azulclaro text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleSelectedSymptoms}
            >
              Selecionados{" "}
              <MdKeyboardArrowDown className={style} />
            </button>
            {showSelectedSymptoms && (
              <div className="bg-azulclaro shadow-lg rounded-lg p-6 mt-4 grid md:grid-cols-1 xl:grid-cols-3 grid-cols-6 gap-2">
                {selectedSymptoms.map((sintoma, index) => (
                  <Box
                    cursor={"pointer"}
                    key={sintoma.chave}
                    className="symptomUnchecked"
                    onClick={() =>
                      handleSymptomClick(index, false)
                    }
                  >
                    <Text>{sintoma.nomeSintoma}</Text>
                  </Box>
                ))}
              </div>
            )}
          </section>
        </div>
        <div
          id="listaPatologias"
          className="grid md:grid-cols-1 xl:grid-cols-3 grid-cols-4  gap-3 pl-10 pr-10 pt-10"
        >
          {filteredAndSortedPatologias.map((patologia) => (
            <div key={"0"} className=" ">
              {/* teste */}
              <Accordion allowToggle>
                <AccordionItem className="bg-white text-black shadow-lg rounded-lg">
                  <h2>
                    <AccordionButton
                      className="p-6"
                      _expanded={{
                        bg: "",
                        color: "black",
                      }}
                    >
                      <Box
                        as="span"
                        flex={"1"}
                        textAlign={"left"}
                        id="header"
                        display={"flex"}
                        alignItems={"center"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <h2 className="text-xl font-bold mb-4">
                          {patologia.nomePatologia}
                        </h2>
                        <CircularProgress
                          size={"60px"}
                          top={"0"}
                          left={"0"}
                          value={
                            (selectedSymptoms.length /
                              (patologia.sintomas
                                .length -
                                1)) *
                            100
                          }
                          color="green.400"
                        >
                          <CircularProgressLabel
                            fontSize={"10px"}
                          >
                            {(
                              (selectedSymptoms.length /
                                (patologia
                                  .sintomas
                                  .length -
                                  1)) *
                              100
                            ).toFixed(2)}
                            %
                          </CircularProgressLabel>
                        </CircularProgress>
                      </Box>
                      <AccordionIcon
                        alignSelf={"right"}
                      />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <p className="text-gray-600 mb-4">
                      {patologia.descricao}
                    </p>
                    <h3
                      onClick={() =>
                        definirSintoma(patologia)
                      }
                      className="text-lg font-bold mb-2"
                    >
                      Sintomas:
                    </h3>
                    { }
                    <ul className="list-disc list-inside ">
                      {sintomasPorPatologia[
                        patologia.chave
                      ]?.map((nomeSintoma) => (
                        <li key={nomeSintoma}>
                          {nomeSintoma}
                        </li>
                      ))}
                    </ul>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {/* cabo teste */}
              {/* ESTILO
               <Box
                id="header"
                display={"flex"}
                alignItems={"center"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <h2 className="text-xl font-bold mb-4">
                  {patologia.nomePatologia}
                </h2>
                <CircularProgress size={'60px'}
                  top={"0"}
                  left={"0"}
                  value={
                    (selectedSymptoms.length /
                      (patologia.sintomas.length - 1)) *
                    100
                  }
                  color="green.400"
                >
                  <CircularProgressLabel fontSize={'10px'}>
                    {(
                      (selectedSymptoms.length /
                        (patologia.sintomas.length -
                          1)) *
                      100
                    ).toFixed(2)}
                    %
                  </CircularProgressLabel>
                </CircularProgress>
              </Box>
              <p className="text-gray-600 mb-4">
                {patologia.descricao}
              </p>
              <h3
                onClick={() => definirSintoma(patologia)}
                className="text-lg font-bold mb-2"
              >
                Sintomas:
              </h3>
              { }
              <ul className="list-disc list-inside">
                {sintomasPorPatologia[patologia.chave]?.map(
                  (nomeSintoma) => (
                    <li key={nomeSintoma}>{nomeSintoma}</li>
                  )
                )
                }
              </ul> */}
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}
