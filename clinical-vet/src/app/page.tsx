import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <center>
      <div className="container">
        <div className="img-container">
          <img
            className="imgPawsHomePage"
            src="/dogPaws.png"
            alt="Dog Paws crossing the screen"
          />
        </div>
        <section className="header">
          <div className="container">
            <center>
              <h1 className="text-white mb-8 titleHomePage text-5xl">
                Clinical.vet
              </h1>
              <img
                className="imgDogCatHomePage"
                src="/dogcatHomePage.png"
                alt="Dog and Cat"
              />
            </center>
          </div>
        </section>
      </div>

      <hr className="horizontalLine" />

      <section className="options grid grid-cols-3 content-between gap-5">
        <div className="option">
          <a>
            <Link href="/hemoPage">
              <img
                className="circleImage linkImage"
                src="homepagehemograma.png"
                alt=""
              />
              <h2 className="linkText">Leitor de Hemograma</h2>
            </Link>
          </a>
        </div>
        <div className="option">
          <a>
            <Link href="/clinicPage">
              <img
                className="circleImage linkImage"
                src="homepageclinica.png"
                alt=""
              />
              <h2 className="linkText">Clinica</h2>
            </Link>
          </a>
        </div>
        <div className="option">
          <a>
            <Link href="/diseasePage">
              <img
                className="circleImage linkImage"
                src="homepagedoenca.png"
                alt=""
              />
              <h2 className="linkText">Doenças</h2>
            </Link>
          </a>
        </div>
      </section>
    </center>
  );
}
