"use client";
import { useState, useEffect, useMemo, FormEvent } from "react";
import styles from "../styles/Dashboard.module.scss";
import Link from "next/link";
import { Text, Box, Button, Circle } from "@chakra-ui/react";
import { BsArrowRight, BsFillGearFill, BsGearFill } from "react-icons/bs";

export default function LandingPage() {
    return (
        <div className={styles.bgMain}>
            <Box display={"block"}>
                <nav
                    className={styles.navBar}
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
                        <Link
                            href="/landingPage"
                            className={styles.arrowButton}
                        >
                            <BsArrowRight />
                        </Link>
                    </div>
                </nav>
                <section id="waveBackground">
                    <Box
                        paddingTop={"2%"}
                        className={styles.waveContainer}
                        position={"relative"}
                        width={"100vw"}
                        height={"fit-content"}
                    >
                        <img src="wave.svg" className={styles.backgroundWave} />

                        <Box id="rightSideFirstText">
                            <Box
                                justifyContent={"space-evenly"}
                                alignItems={"center"}
                                className={styles.textOverWave_firstInfo}
                            >
                                <Link
                                    href="/loginTestPage"
                                    className={styles.gearButton}
                                >
                                    <BsFillGearFill className={styles.gear} />
                                </Link>
                                <div className={styles.containerOptions}>                                    
                                <section className="font-bold grid md:grid-cols-1 grid-cols-2 content-between gap-5">
                                <div className={styles.containerOption}>
                                        <Link href="/clinicPage">
                                            <img
                                                className="circleImage linkImage"
                                                src="homepageclinica.png"
                                                alt=""
                                            />
                                            <h2 className={styles.linkText}>
                                                Modo Clinica
                                            </h2>
                                        </Link>
                                    </div>
                                    <div className={styles.containerOption}>
                                        <Link href="/hemoPage">
                                            <img
                                                className="circleImage linkImage"
                                                src="homepagehemograma.png"
                                                alt=""
                                            />
                                            <h2 className={styles.linkText}>
                                                Leitor de Hemograma
                                            </h2>
                                        </Link>
                                    </div>

                                </section>
                                </div>
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
                                Clinical <span className={styles.whiteTitle}>Vet</span>
                            </Text>
                        </Box>
                    </Box>
                </section>
            </Box>
        </div>
    );
}
