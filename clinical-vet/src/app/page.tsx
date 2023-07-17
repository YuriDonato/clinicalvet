import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <center>
            <div className="container">
                <div className="img-container">
                    <img
                        className="imgPawsHomePage md:top-36"
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

            <section className="options grid md:grid-cols-1 grid-cols-3 content-between gap-5">
                <div className="option">
                    <Link href="/hemoPage">
                        <img
                            className="circleImage linkImage"
                            src="homepagehemograma.png"
                            alt=""
                        />
                        <h2 className="linkText">Leitor de Hemograma</h2>
                    </Link>
                </div>
                <div className="option">
                    <Link href="/clinicPage">
                        <img
                            className="circleImage linkImage"
                            src="homepageclinica.png"
                            alt=""
                        />
                        <h2 className="linkText">Clinica</h2>
                    </Link>
                </div>
                <div className="option">
                    <Link href="/diseasePage">
                        <img
                            className="circleImage linkImage"
                            src="homepagedoenca.png"
                            alt=""
                        />
                        <h2 className="linkText">Doenças</h2>
                    </Link>
                </div>
            </section>
            <div className="option">
                <Link href="/loginTestPage">
                    <img
                        className="circleImage linkImage"
                        src="test.jpg"
                        alt=""
                    />
                    <h2 className="linkText">AMBIENTE DE TESTES</h2>
                </Link>
            </div>
        </center>
    );
}
