import React, { useState } from "react"

import { useAuth } from "../contexts/AuthContext"

import FormCard from "../forms/FormCard"
import Input from "../inputs/Input"
import Button from "../Button"

import { Link, useNavigate } from "react-router-dom"

interface Props {
    setErrors?: (obj: object) => void
}


export default function LoginCard({setErrors}: Props): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (await login(email, password)) {
            navigate('/dashboard')
        } else {
            if (setErrors) setErrors({'credenciais': ['Credenciais inválidas']});
        }
    }

    return (
        <div className="flex-grow flex items-center justify-center">
            <FormCard>
                <Input inputName="email" label="E-mail" type="email" placeholder="E-mail" onChange={(email: string) => setEmail(email)} />
                <Input inputName="password" label="Senha" type="password" placeholder="Senha" onChange={(pass: string) => setPassword(pass)} />
                <Button type="submit" style="py-2 bg-ifrn-500 text-white rounded-lg" onClick={handleLogin}>
                    Entrar
                </Button>
                <Link to="/password/solicitation" className="text-xl text-white underline">Esqueceu a senha?</Link>
            </FormCard>
        </div>
    )
}