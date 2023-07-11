"use client";
import { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/Md";

export default function Clinic() {
  // Fazer o botão de abrir e fechar sintomas
  const [showSymptoms, setShowSymptoms] = useState(false);
  const [showSelectedSymptoms, setShowSelectedSymptoms] = useState(false);
  var [style,setStyle] = useState("rotate-0");
  const [currentState, setCurrentState] = useState(false)

  const changeStyle = () => {
    if(currentState){
      setStyle("rotate-0");
    }else{
      setStyle("rotate-180");
    }
  }

  const toggleCurrentState = () => {
    setCurrentState(!currentState);
  }

  const toggleSymptoms = () => {
    setShowSymptoms(!showSymptoms);
    changeStyle()
    toggleCurrentState()
  };

  const toggleSelectedSymptoms = () => {
    setShowSelectedSymptoms(!showSelectedSymptoms);
    changeStyle()
    toggleCurrentState()
  };

  // retorno do html
  return (
    <div className="p-10">
      <div>
        <Link href={"/"}>
          {" "}
          <button>
            <img className="buttonArrow" src="/arrow-right.svg" alt="" />
          </button>{" "}
        </Link>
      </div>
      <center>
        <div className="grid grid-cols-2 gap-5">
          <section id="unselectedSymptoms">
            <button
              className="buttonOpen bg-azulclaro text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleSymptoms}
            >
              Sintomas
              <MdKeyboardArrowDown className={style} />
            </button>
            {showSymptoms && (
              <div className="bg-azulclaro shadow-lg rounded-lg p-6 mt-4 grid grid-cols-5 gap-2">
                <a className="symptomUnchecked">Dor de cabeça</a>
                <a className="symptomUnchecked">Febre</a>
                <a className="symptomUnchecked">Cansaço</a>
                <a className="symptomUnchecked">Tontura</a>
                <a className="symptomUnchecked">Náuseas</a>
                <a className="symptomUnchecked">Febre</a>
                <a className="symptomUnchecked">Cansaço</a>
                <a className="symptomUnchecked">Dor de cabeça</a>
                <a className="symptomUnchecked">Náuseas</a>
                <a className="symptomUnchecked">Tontura</a>
                <a className="symptomUnchecked">Febre</a>
                <a className="symptomUnchecked">Dor de cabeça</a>
                <a className="symptomUnchecked">Cansaço</a>
                <a className="symptomUnchecked">Tontura</a>
                <a className="symptomUnchecked">Náuseas</a>
              </div>
            )}
          </section>
          <section id="selectedSymptoms">
            <button
              className="buttonOpen bg-azulclaro text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleSelectedSymptoms}
            >
              Selecionados <MdKeyboardArrowDown className={style}  />
            </button>
            {showSelectedSymptoms && (
              <div className="bg-azulclaro shadow-lg rounded-lg p-6 mt-4 grid grid-cols-5 gap-2">
                <a className="symptomUnchecked">Dor de cabeça</a>
              </div>
            )}
          </section>
        </div>

        <div className="grid grid-cols-6 gap-3 pl-10 pr-10 pt-10">
          <div className="bg-white text-black shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Nome da Doença</h2>
            <p className="text-gray-600 mb-4">
              Descrição da doença Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
            <h3 className="text-lg font-bold mb-2">Sintomas:</h3>
            <ul className="list-disc list-inside">
              <li>Dor de cabeça</li>
              <li>Febre</li>
              <li>Cansaço</li>
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Nome da Doença</h2>
            <p className="text-gray-600 mb-4">
              Descrição da doença Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
            <h3 className="text-lg font-bold mb-2">Sintomas:</h3>
            <ul className="list-disc list-inside">
              <li>Dor de cabeça</li>
              <li>Febre</li>
              <li>Cansaço</li>
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Nome da Doença</h2>
            <p className="text-gray-600 mb-4">
              Descrição da doença Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
            <h3 className="text-lg font-bold mb-2">Sintomas:</h3>
            <ul className="list-disc list-inside">
              <li>Dor de cabeça</li>
              <li>Febre</li>
              <li>Cansaço</li>
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Nome da Doença</h2>
            <p className="text-gray-600 mb-4">
              Descrição da doença Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
            <h3 className="text-lg font-bold mb-2">Sintomas:</h3>
            <ul className="list-disc list-inside">
              <li>Dor de cabeça</li>
              <li>Febre</li>
              <li>Cansaço</li>
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Nome da Doença</h2>
            <p className="text-gray-600 mb-4">
              Descrição da doença Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
            <h3 className="text-lg font-bold mb-2">Sintomas:</h3>
            <ul className="list-disc list-inside">
              <li>Dor de cabeça</li>
              <li>Febre</li>
              <li>Cansaço</li>
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Nome da Doença</h2>
            <p className="text-gray-600 mb-4">
              Descrição da doença Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
            <h3 className="text-lg font-bold mb-2">Sintomas:</h3>
            <ul className="list-disc list-inside">
              <li>Dor de cabeça</li>
              <li>Febre</li>
              <li>Cansaço</li>
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Nome da Doença</h2>
            <p className="text-gray-600 mb-4">
              Descrição da doença Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
            <h3 className="text-lg font-bold mb-2">Sintomas:</h3>
            <ul className="list-disc list-inside">
              <li>Dor de cabeça</li>
              <li>Febre</li>
              <li>Cansaço</li>
            </ul>
          </div>
        </div>
      </center>
    </div>
  );
}
