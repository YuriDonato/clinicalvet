import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Stack,
    Text,
    Box,
} from "@chakra-ui/react";
import { PiCatLight, PiDogLight } from "react-icons/pi"
import {IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline} from "react-icons/io"

type Patologia = {
    chave: string;
    nomePatologia: string;
    causador: string;
    descricao: string;
    diagnostico: string;
    prevalencia: {
        animal: {
            cachorro: boolean;
            gato: boolean;
        };
        regiao: {
            norte: boolean;
            nordeste: boolean;
            centrooeste: boolean;
            sudeste: boolean;
            sul: boolean;
        };
    };
    tratamento: string;
    prevencao: string;
    prognostico: string;
    sintomas: string[];
};

type PatologiaDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    patologia: Patologia;
}

const PatologiaDrawer: React.FC<PatologiaDrawerProps> = ({ isOpen, onClose, patologia }) => {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{patologia.nomePatologia}</DrawerHeader>
                <DrawerBody>
                    <Stack>
                        <Box>
                            <Text>{patologia.descricao}</Text>
                            <Text>{patologia.causador}</Text>
                            <Text>{patologia.diagnostico}</Text>
                            <Text
                                fontWeight={"bold"}
                                display={"flex"}
                                alignItems={"center"}
                                alignContent={"space-between"}
                            >
                                Animais:{" "}
                                {patologia.prevalencia.animal.cachorro ? (
                                    <PiCatLight />
                                ) : (
                                    <></>
                                )}{" "}
                                {patologia.prevalencia.animal.gato ? (
                                    <PiDogLight />
                                ) : (
                                    <></>
                                )}{" "}
                            </Text>
                            <Text fontWeight={"bold"}>
                                Regiao de prevalencia:{" "}
                            </Text>
                            <Text display={"flex"} alignItems={"center"}>
                                {patologia.prevalencia.regiao.norte ? (
                                    <IoIosCheckmarkCircleOutline className="mr-2" />
                                ) : (
                                    <IoIosCloseCircleOutline className="mr-2" />
                                )}
                                Região Norte
                            </Text>
                            <Text display={"flex"} alignItems={"center"}>
                                {patologia.prevalencia.regiao.nordeste ? (
                                    <IoIosCheckmarkCircleOutline className="mr-2" />
                                ) : (
                                    <IoIosCloseCircleOutline className="mr-2" />
                                )}
                                Região Nordeste
                            </Text>
                            <Text display={"flex"} alignItems={"center"}>
                                {patologia.prevalencia.regiao.centrooeste ? (
                                    <IoIosCheckmarkCircleOutline className="mr-2" />
                                ) : (
                                    <IoIosCloseCircleOutline className="mr-2" />
                                )}
                                Região Centro-Oeste
                            </Text>
                            <Text display={"flex"} alignItems={"center"}>
                                {patologia.prevalencia.regiao.sudeste ? (
                                    <IoIosCheckmarkCircleOutline className="mr-2" />
                                ) : (
                                    <IoIosCloseCircleOutline className="mr-2" />
                                )}
                                Região Sudoeste
                            </Text>
                            <Text display={"flex"} alignItems={"center"}>
                                {patologia.prevalencia.regiao.sul ? (
                                    <IoIosCheckmarkCircleOutline className="mr-2" />
                                ) : (
                                    <IoIosCloseCircleOutline className="mr-2" />
                                )}
                                Região Sul
                            </Text>
                            <Text>{patologia.tratamento}</Text>
                            <Text>{patologia.prevencao}</Text>
                            <Text>{patologia.prognostico}</Text>
                        </Box>
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default PatologiaDrawer;
