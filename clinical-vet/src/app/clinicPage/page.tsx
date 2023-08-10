"use client";
import { useState, useEffect, useMemo, FormEvent } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { database } from "@/app/services/firebase";
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
  // Dog and Cat Mode
  const [catMode, setCatMode] = useState(false);
  const [transition, setTransition] = useState(false);

  const toggleCatMode = () => {
    setCatMode((prevCatMode) => !prevCatMode);
    setTransition(true);
    setTimeout(() => {
      setTransition(false);
    }, 250);
  };

  // Toggle Symptoms
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [showSelectedSymptoms, setShowSelectedSymptoms] = useState(false);
  const [style, setStyle] = useState("rotate-0");
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

  // State for storing filtered symptoms
  const [filteredSymptoms, setFilteredSymptoms] = useState<Sintoma[]>([]);
  
  const [isSearching, setIsSearching] = useState(false);

  // Function to filter symptoms based on search
  const [searchedSymptoms, setSearchedSymptoms] = useState<Sintoma[]>([]);

  function searchSymptom(event: FormEvent<HTMLInputElement>) {
    const word = event.currentTarget.value.trim().toLowerCase();
    if (word.length > 0) {
      const filteredSymptoms = symptoms.filter(
        (symptom) =>
          symptom.nomeSintoma.toLowerCase().includes(word) &&
          !selectedSymptoms.some((selected) => selected.chave === symptom.chave)
      );
      setSearchedSymptoms(filteredSymptoms);
      setIsSearching(true);
    } else {
      setSearchedSymptoms([]); // Clear the searched symptoms
      setIsSearching(false);
      updateSelectedAndUnselectedSymptoms(); // Update selected and unselected symptoms
    }
  }

  // Database logic
  const [symptoms, setSymptoms] = useState<Sintoma[]>([]);
  const [patologias, setPatologias] = useState<Patologia[]>([]);

  useEffect(() => {
    const refSintomas = database.ref("sintomas");
    const refPatologias = database.ref("patologias");

    refSintomas.on("value", (snapshot) => {
      const data = snapshot.val();
      const resultadoSintomas = Object.entries<Sintoma>(data ?? {}).map(
        ([chave, valor]) => {
          return {
            chave: chave,
            nomeSintoma: valor.nomeSintoma,
          };
        }
      );
      setSymptoms(resultadoSintomas);
      setUnselectedSymptoms(resultadoSintomas);
    });

    refPatologias.on("value", (snapshot) => {
      const data = snapshot.val();
      const resultadoPatologia = Object.entries<Patologia>(
        data ?? {}
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

  // Selecting Symptoms
  // useEffect to ensure that the list of unselected symptoms is initialized with the symptoms from the database
  useEffect(() => {
    setUnselectedSymptoms(symptoms);
  }, [symptoms]);

  // State to store the list of unselected symptoms
  const [unselectedSymptoms, setUnselectedSymptoms] =
    useState<Sintoma[]>(symptoms);

  // State to store the list of selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState<Sintoma[]>([]);

  // Function to handle clicking on a symptom when its searching
  function handleSymptomClickIsSearch(
    index: number,
    isUnselected: boolean,
    filteredSymptoms: Sintoma[]
  ) {
    const clickedSymptom = filteredSymptoms[index];
    setFilteredSymptoms((prevSymptoms) =>
      prevSymptoms.filter((_, i) => i !== index)
    );
  
    // Check if the clicked symptom is already selected
    const isAlreadySelected = selectedSymptoms.some(
      (selected) => selected.chave === clickedSymptom.chave
    );
  
    // Add the symptom to the list of selected symptoms only if it's not already selected
    if (!isAlreadySelected) {
      setSelectedSymptoms((prevSymptoms) => [...prevSymptoms, clickedSymptom]);
    }
  }

  // When its not searching
  const handleSymptomClick = (index: number, isUnselected: boolean) => {
    if (isUnselected) {
      const clickedSymptom = unselectedSymptoms[index];
      setUnselectedSymptoms((prevSymptoms) =>
        prevSymptoms.filter((_, i) => i !== index)
      );
      setSelectedSymptoms((prevSymptoms) => [...prevSymptoms, clickedSymptom]);
    } else {
      const clickedSymptom = selectedSymptoms[index];
      setSelectedSymptoms((prevSymptoms) =>
        prevSymptoms.filter((_, i) => i !== index)
      );
      setUnselectedSymptoms((prevSymptoms) => [...prevSymptoms, clickedSymptom]);
    }
  };
  

  // Populating symptoms for each patologia card
  const [sintomasPorPatologia, setSintomasPorPatologia] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    // Function to define symptoms for each patologia
    const definirSintomasPorPatologia = () => {
      const sintomasPorPatologia: { [key: string]: string[] } = {};
      patologias.forEach((patologia) => {
        const sintomasNomesPatologia = definirSintoma(patologia);
        sintomasPorPatologia[patologia.chave] = sintomasNomesPatologia;
      });
      return sintomasPorPatologia;
    };

    // Define symptoms for each patologia using useMemo to avoid unnecessary calls
    setSintomasPorPatologia(definirSintomasPorPatologia());
  }, [patologias]);

  // Initialize the state with an empty array
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
      }, []); // Using reduce to avoid duplicates
    console.log(`Sintomas nomes: ${sintomasNomes}`);
    return sintomasNomes;
  }

  useEffect(() => {
    const refSintomas = database.ref("sintomas");
    refSintomas.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSintomasNomesKeys(data);
      }
    });
  }, []);

  // Filter patologias based on selected symptoms
  const [filteredPatologias, setFilteredPatologias] = useState<Patologia[]>(
    []
  );

  useEffect(() => {
    // Function to check if a patologia contains all selected symptoms
    const containsAllSelectedSymptoms = (patologia: Patologia) => {
      return selectedSymptoms.every((selected) =>
        patologia.sintomas.includes(selected.chave)
      );
    };

    // Filter patologias based on selected symptoms
    const filteredData = patologias.filter(containsAllSelectedSymptoms);
    setFilteredPatologias(filteredData);
  }, [selectedSymptoms, patologias]);

  // Test
  const filteredAndSortedPatologias = useMemo(() => {
    return filterAndSortPatologias(patologias, catMode, selectedSymptoms);
  }, [patologias, catMode, selectedSymptoms]);

  // Filter by cat or dog mode and alphabetical order
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

  function updateSelectedAndUnselectedSymptoms() {
    const selectedSymptomKeys = new Set(selectedSymptoms.map((symptom) => symptom.chave));
    setSelectedSymptoms((prevSelected) => prevSelected.filter((symptom) => selectedSymptomKeys.has(symptom.chave)));
    setUnselectedSymptoms((prevUnselected) => prevUnselected.filter((symptom) => !selectedSymptomKeys.has(symptom.chave)));
  }

  // Return the HTML
  return (
    <div className="p-10 select-none">
      <div className="flex justify-between">
        <Link href={"/"}>
          <button>
            <img
              className="buttonArrow"
              src="/arrow-right.svg"
              alt=""
            />
          </button>
        </Link>
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
      </div>
      <center>
        <div className="grid md:grid-cols-1 grid-cols-2 gap-5">
          <section id="unselectedSymptoms">
            <button
              className="buttonOpen bg-azulclaro text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleSymptoms}
            >
              Symptoms
              <MdKeyboardArrowDown className={style} />
            </button>
            {showSymptoms && (
              <div className="bg-azulclaro shadow-lg rounded-lg mt-4">
                <Input
                  variant={"filled"}
                  type="text"
                  placeholder="Search symptoms..."
                  onChange={searchSymptom}
                  className="mt-4 p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                  width={"20rem"}
                  borderRadius={"200px"}
                />
                <div className="mt-4 pb-4 grid md:grid-cols-1 xl:grid-cols-3 grid-cols-6 gap-2">
                {isSearching
  ? searchedSymptoms.map((symptom, index) => (
      <Box
        cursor={"pointer"}
        key={symptom.chave}
        className="symptomUnchecked"
        onClick={() => handleSymptomClickIsSearch(index, true, searchedSymptoms)}
      >
        <Text>{symptom.nomeSintoma}</Text>
      </Box>
    ))
  : unselectedSymptoms.map((symptom, index) => (
      <Box
        cursor={"pointer"}
        key={symptom.chave}
        className="symptomUnchecked"
        onClick={() => handleSymptomClick(index, true)}
      >
        <Text>{symptom.nomeSintoma}</Text>
      </Box>
    ))}
                </div>
              </div>
            )}
          </section>
          <section id="selectedSymptoms">
            <button
              className="checkUncheckMenu buttonOpen bg-azulclaro text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleSelectedSymptoms}
            >
              Selected <MdKeyboardArrowDown className={style} />
            </button>
            {showSelectedSymptoms && (
              <div className="bg-azulclaro shadow-lg rounded-lg p-6 mt-4 grid md:grid-cols-1 xl:grid-cols-3 grid-cols-6 gap-2">
                {selectedSymptoms.map((symptom, index) => (
                  <Box
                    cursor={"pointer"}
                    key={symptom.chave}
                    className="symptomUnchecked"
                    onClick={() =>
                      handleSymptomClick(index, false)
                    }
                  >
                    <Text>{symptom.nomeSintoma}</Text>
                  </Box>
                ))}
              </div>
            )}
          </section>
        </div>
        <div
          id="listaPatologias"
          className="grid md:grid-cols-1 xl:grid-cols-3 grid-cols-4 gap-3 pl-10 pr-10 pt-10"
        >
          {filteredAndSortedPatologias.map((patologia) => (
            <div key={patologia.chave} className="">
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
                      Symptoms:
                    </h3>
                    <ul className="list-disc list-inside">
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
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}