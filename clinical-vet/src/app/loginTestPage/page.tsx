"use client";
import {
  Input,
  FormLabel,
  FormControl,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { database } from "../services/firebase";

type User = {
  login: string;
  password: string;
};

export default function LoginTestPage() {
  const [name, setName] = useState("");
  const [senha, setSenha] = useState("");

  const useRouterPage = useRouter();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  // leitura de DB

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const refUsers = database.ref("users");

    refUsers.on("value", (resultado) => {
      const resultUser = Object.entries<User>(
        resultado.val() ?? {}
      ).map(([chave, valor]) => {
        return {
          chave: chave,
          login: valor.login,
          password: valor.password
        };
      });
      setUsers(resultUser);
    });
  }, []);

  function login() {
    const userFound = users.find((user) => user.login === name && user.password === senha);
  
    if (userFound) {
      useRouterPage.push("/testPage");
    } else {
      toast({
        title: "Nome ou Senha incorretos",
        description: "Por favor tente novamente",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }


  return (
    <div>
      <Link href={"/dashboardPage"}>
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
        className="bg-azulclaro"
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
