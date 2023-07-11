import Image from "next/image";
import Link from "next/link";

export default function Hemograma(){
    return(
        <div className="p-10">
        <Link href={"/"}>
          <span className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Retornar
          </span>
        </Link>
      </div>
    );
}