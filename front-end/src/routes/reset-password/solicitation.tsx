import { useNavigate, NavigateFunction } from "react-router-dom"
import { SyntheticEvent, useState } from "react"

import FormCard from "../../components/forms/FormCard"
import Button from "../../components/Button"
import Header from "../../components/Header"
import Input from "../../components/inputs/Input"

import client from "../../api/client"

export default function SolicitationPassword(): JSX.Element {
    const navigate: NavigateFunction = useNavigate()
    const [email, setEmail] = useState('')

    const action = async (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            const response = await client.post(`/api/password/solicitation`, { email: email })
            if (response.status == 200) {
                alert('Solicitação feita, por favor, verifique seu e-mail.')
                navigate(`/`)
            }
        } catch (error) {
            alert('Dados inválidos')
            console.log('Erro: ', error)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-cgray-200">
            <Header page="Solicitação de senha" />
            <div className="flex-grow flex items-center justify-center">
                <FormCard>
                    <Input inputName="email" label="E-mail" type="text" placeholder="E-mail" onChange={(email: string) => setEmail(email)} />
                    <Button type="submit" style="py-2 bg-ifrn-500 text-white rounded-lg" onClick={action}>
                        Solicitar
                    </Button>
                </FormCard>
            </div>
        </div>
    )
}