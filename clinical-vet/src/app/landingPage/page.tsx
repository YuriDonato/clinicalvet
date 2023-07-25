"use client";
import { useState, useEffect } from "react";
import styles from "../styles/Landing.module.scss";
import Link from "next/link";
import {
    Text,
    Box,
    Button,
    Circle,
} from "@chakra-ui/react";

export default function LandingPage() {
  //!! Navbar Opacity Effect
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY >= 100) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

    return (
        <div className={styles.bgMain}>
            <Box display={"block"}>
                <nav
                    className={`${styles.navBar}, ${navbar ? `${styles.navBar_active}` : `${styles.navBar}`
                        }`}
                >
                    <Text
                        marginLeft={"1rem"}
                        fontSize={"24px"}
                        color={"white"}
                        padding={"0.5rem"}
                    >
                        Clinical Vet
                    </Text>
                    <div className="flex lg:flex lg:items-center lg:w-auto items-center">
                        <Text
                            borderRadius={"3rem"}
                            margin={"0.5rem"}
                            padding={"0.5rem 2rem"}
                            cursor={'pointer'}
                            className={styles.assineButton}
                        >
                            <Text>ASSINE AGORA</Text>
                        </Text>
                        <Link href="/dashboardPage">
                            <Text
                                margin={"0.5rem"}
                                cursor={"pointer"}
                                className={styles.entrarButton}
                            >
                                Entrar
                            </Text>
                        </Link>
                    </div>
                </nav>
                <section id="waveBackground">
                    <Box
                        paddingTop={"2.5%"}
                        className={styles.waveContainer}
                        position={"relative"}
                        width={"100vw"}
                        height={"fit-content"}
                    >
                        <img src="wave.svg" className={styles.backgroundWave} />
                        <img
                            src="wave.svg"
                            className={styles.backgroundWaveMeio}
                        />
                        <Box
                            id="rightSideFirstText"
                        >
                            <Box
                                justifyContent={"space-evenly"}
                                alignItems={"center"}
                                className={styles.textOverWave_firstInfo}
                            >
                                <Text
                                    className={
                                        styles.textOverWave_firstInfo__text1
                                    }
                                >
                                    Bem-vindo à plataforma definitiva para
                                    médicos veterinários!
                                </Text>
                                <Text                                     className={
                                        styles.textOverWave_firstInfo__text2
                                    }>
                                    Leve sua prática a um novo patamar de
                                    excelência
                                </Text>
                                <Text                                     className={
                                        styles.textOverWave_firstInfo__text3
                                    }>
                                    Com nosso método de pesquisa inteligente,
                                    você pode inserir os sintomas apresentados
                                    pelo animal e obter uma lista precisa de
                                    possíveis patologias. Nossa plataforma
                                    utiliza algoritmos avançados para filtrar e
                                    classificar as doenças, proporcionando uma
                                    lista de diagnósticos prováveis,
                                    acompanhados de suas respectivas
                                    procentagens de chance.
                                </Text>
                                <Text className={
                                        styles.textOverWave_firstInfo__text4
                                    }>
                                    Em conjunto com o leitor de hemograma, você
                                    terá acesso a análises sanguíneas precisas.
                                    Através da comparação dos resultados com
                                    valores de referência, você poderá
                                    identificar rapidamente qualquer desvio,
                                    permitindo uma rápida leitura para obter um
                                    diagnóstico precoce e eficaz.
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </section>
                <section
                    id="mainPage"
                    className="grid grid-cols-3 content-between gap-5"
                >
                    <Box
                        id="leftSideFirstText"
                        display={"block"}
                        className={styles.textOverWave_logo}
                    >
                        <Box
                            justifyContent={"space-evenly"}
                            alignItems={"center"}
                            display={"flex"}
                        >
                            <Circle
                                size={"350px"}
                                className={styles.bgCorMedia}
                            >
                                <img
                                    className={styles.logo}
                                    src="dogcatHomePage.png"
                                    alt=""
                                />
                            </Circle>
                            <Text
                                fontSize={"5xl"}
                                className={styles.logoName}
                                color={"black"}
                            >
                                Clinical Vet
                            </Text>
                        </Box>
                        <Button className={styles.assine}>Assine Agora</Button>
                    </Box>
                </section>
            </Box>
        </div>
    );
}
