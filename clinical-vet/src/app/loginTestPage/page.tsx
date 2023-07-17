"use client";
import {
  Input,
  FormLabel,
  FormControl,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

export default function loginTestPage() {
  const [name, setName] = useState("");
  const [senha, setSenha] = useState("");
  const trueName = "admin";
  const truePassword = "admin123";

  const router = useRouter();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  function login() {
    console.log("tentou login");
    if (name === trueName && senha === truePassword) {
      console.log("conseguiu login");
      router.push("/testPage");
    } else {
      console.log("falhou login");
    }
  }
  return (
    <div>
      <Link href={"/"}>
        {" "}
        <button>
          <img
            className="buttonArrow"
            src="/arrow-right.svg"
            alt=""
          />
        </button>{" "}
      </Link>
    <center>
      <FormControl
        borderRadius={"25px"}
        bgColor={"blue.300"}
        w={"300px"}
        marginTop={"15%"}
        padding={"20px"}
      >
        <FormLabel></FormLabel>
        <Input
          bg={"white"}
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputGroup marginTop={"15px"} marginBottom={"15px"}>
          <Input
            bg={"white"}
            placeholder="Senha"
            type={show ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              padding={"5px"}
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? "Esconder" : "Mostrar"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button onClick={login}>Entrar</Button>
      </FormControl>
    </center>
    </div>
  );
}
