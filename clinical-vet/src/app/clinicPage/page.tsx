import Image from "next/image";

export default function Clinic() {
  return (
    <div className="">
      <center>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={toggleSymptoms}
            >
              Ver Sintomas
            </button>
            {showSymptoms && (
              <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
                <h3 className="text-lg font-bold mb-2">Sintomas:</h3>
                <ul className="list-disc list-inside">
                  <li>Dor de cabeça</li>
                  <li>Febre</li>
                  <li>Cansaço</li>
                  <li>Tontura</li>
                  <li>Náuseas</li>
                </ul>
              </div>
            )}
          </div>
          <div>selecionadas</div>
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
        </div>
      </center>
    </div>
  );
}
