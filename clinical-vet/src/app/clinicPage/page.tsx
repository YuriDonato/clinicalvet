"use client";
import { useState } from "react";
import Link from "next/link";

export default function Clinic() {
  // Fazer o botão de abrir e fechar sintomas
  const [showSymptoms, setShowSymptoms] = useState(false);

  const toggleSymptoms = () => {
    setShowSymptoms(!showSymptoms);
  };


// retorno do html
  return (
    <div className="p-10">
      <Link href={'/'}><span className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Retornar</span></Link>
      <center>
        <div className="grid grid-cols-2 gap-5">
          <section id="unselectedSymptoms">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleSymptoms}
            >
              Ver Sintomas
            </button>
            {showSymptoms && (
              <div className="bg-white shadow-lg rounded-lg p-6 mt-4 grid grid-cols-5 gap-2">
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
          <span
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sintomas Selecionados
            </span>
            <div className="bg-white shadow-lg rounded-lg p-6 mt-4 grid grid-cols-5 gap-2">
              <a className="symptomUnchecked">Dor de Cabeça</a>
              <a className="symptomUnchecked">Dor de Cabeça</a>
              <a className="symptomUnchecked">Dor de Cabeça</a>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-6 gap-3 pl-10 pr-10 pt-10">
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
