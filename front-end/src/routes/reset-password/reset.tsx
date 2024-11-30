import { useNavigate, NavigateFunction, useParams } from "react-router-dom"
import { SyntheticEvent, useState } from "react"

import FormCard from "../../components/forms/FormCard"
import Button from "../../components/Button"
import Header from "../../components/Header"
import Input from "../../components/inputs/Input"

import client from "../../api/client"

export default function ResetPassword(): JSX.Element {
    const navigate: NavigateFunction = useNavigate()
    const [password, setPassword] = useState('')
    const { token } = useParams()

    const action = async (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            const response = await client.post(`/api/password/password-reset/${token}`, { 'new_password': password })
            if (response.status == 201 || response.status == 200) {
                alert('Senha trocada com sucesso!')
                navigate(`/`)
            }
            
        } catch (error) {
            alert('Dados inválidos')
            console.log('Erro: ', error)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-cgray-200">
            <Header isLogged={true} page="Editar Perfil" />
            <div className="flex-grow flex items-center justify-center">
                <FormCard>
                    <Input inputName="password" label="Nova senha" type="password" placeholder="Nova senha" onChange={(password: string) => setPassword(password)} />
                    <Button type="submit" color="dark-gray" style="py-2 text-white hover:bg-cgray-800" onClick={action}>
                        Trocar
                    </Button>
                </FormCard>
            </div>
        </div>
    )
}