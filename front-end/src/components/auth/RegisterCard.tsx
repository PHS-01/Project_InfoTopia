import { useNavigate, NavigateFunction, Link } from "react-router-dom"
import { useState } from "react"

import FormCard from "../forms/FormCard"
import Input from "../inputs/Input"
import Button from "../Button"
import { useAuth } from "../contexts/AuthContext"
import client from "../../api/client"

interface Props {
    setErrors?: (obj: object) => void
}

export default function RegisterCard({ setErrors }: Props): JSX.Element {
    const navigate: NavigateFunction = useNavigate()
    const [matriculation, setMatriculation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register, login } = useAuth()

    const action = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            const response = await client.post('/api/register', {
                matriculation: matriculation,
                email: email,
                password: password,
            })

            if (response.status == 200 || response.status == 201) {
                if (await login(email, password)) {
                    navigate('/dashboard')
                } else {
                    alert('Credenciais incorretas!')
                }
            }
        } catch (error: any|unknown) {
            if (setErrors) setErrors(error.response.data.errors);
        }
    }
    return (
        <div className="flex-grow flex items-center justify-center">
            <FormCard>
                <Input inputName="matriculation" label="Matrícula" type="text" placeholder="Matrícula do SUAP" onChange={(matriculation) => setMatriculation(matriculation)} />
                <Input inputName="email" label="E-mail" type="email" placeholder="E-mail" onChange={(email) => setEmail(email)} />
                <Input inputName="password" label="Senha" type="password" placeholder="Senha do IF" onChange={(password) => setPassword(password)} />
                <Button type="submit" style="py-2 bg-ifrn-500 text-white rounded-lg" onClick={action}>
                    Entrar
                </Button>
                <Link to="/login" className="text-xl text-cgray-800 underline">Já possui conta?</Link>
            </FormCard>
        </div>
    )
}