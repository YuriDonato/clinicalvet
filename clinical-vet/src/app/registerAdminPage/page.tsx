"use client";
import {
    Button,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { database } from "../services/firebase";

type User = {
    login: string;
    password: string;
};

export default function RegisterAdmin() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function createAdminData(event: FormEvent) {
        event.preventDefault();
        const ref = database.ref("users");
        const dados = {
            login,
            password
        };
        ref.push(dados);
        setLogin("");
        setPassword("");
    }

    return (
    <div className="container">
        <form>
            <input type="text"
            placeholder="login" 
            value={login}
            required
            onChange={(e) => setLogin(e.target.value)}
            />
            <input type="text"
            placeholder="password" 
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={createAdminData}>Criar</Button>
        </form>
    </div>);
}
