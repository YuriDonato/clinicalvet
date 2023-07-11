import Image from "next/image";
import Link from "next/link";

export default function Disease() {
  return (
    <div className="p-10">
      <div>
        <Link href={'/'}><span className=""><img className="buttonArrow" src="/arrow-right.svg" alt="" /></span></Link>
      </div>
    </div>
  );
}
