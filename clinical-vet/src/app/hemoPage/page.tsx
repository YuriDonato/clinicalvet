import Image from "next/image";
import Link from "next/link";

export default function Hemograma() {
  return (
    <div className="p-10">
      <div>
        <Link href={'/'}><span className=""><img className="buttonArrow" src="/arrow-right.svg" alt="" /></span></Link>
      </div>

    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-bold mb-4">Hemograma</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="leucocitos">Leucócitos:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="leucocitos" type="text" placeholder="Digite o valor dos leucócitos" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="hemoglobina">Hemoglobina:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hemoglobina" type="text" placeholder="Digite o valor da hemoglobina" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="plaquetas">Plaquetas:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="plaquetas" type="text" placeholder="Digite o valor das plaquetas" />
        </div>
        {/* Outros campos do hemograma */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Enviar</button>
      </form>
    </div>
    </div>
  );
}
