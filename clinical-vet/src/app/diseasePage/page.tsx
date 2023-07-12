import Image from "next/image";
import Link from "next/link";

export default function Disease() {
  return (
    <div className="p-10">
      <div className="flex searchBar">
        <Link href={"/"}>
          {" "}
          <button>
            <img className="buttonArrow" src="/arrow-right.svg" alt="" />
          </button>{" "}
        </Link>
        
        <div className=" bg-white p-4 rounded-lg w-fit">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="bg-white border rounded-lg border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
    </div>
  );
}
