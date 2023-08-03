"use client"
// PatologiaCard.tsx
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import PatologiaDrawer from "./pageDrawer";

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

interface PatologiaCardProps {
  patologia: Patologia;
}

const PatologiaCard: React.FC<PatologiaCardProps> = ({ patologia }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearchIconClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <SearchIcon cursor={'pointer'} onClick={handleSearchIconClick} />
      {isDrawerOpen && <PatologiaDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} patologia={patologia} />}
    </>
  );
};

export default PatologiaCard;
