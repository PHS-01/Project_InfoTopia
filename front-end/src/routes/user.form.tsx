import { useNavigate, NavigateFunction } from "react-router-dom"
import { SyntheticEvent, useEffect, useState } from "react"

import FormCard from "../components/forms/FormCard"
import Button from "../components/Button"
import Header from "../components/Header"
import InputFile from "../components/inputs/InputFile"
import Input from "../components/inputs/Input"

import client from "../api/client"
import { appendIfExists } from "../utils/utils"

import { scopeUser, UserType } from "../api/responses"

export default function UserForm(): JSX.Element {
    const navigate: NavigateFunction = useNavigate()
    const [user, setUser] = useState<UserType>(scopeUser)
    const [email, setEmail] = useState('')
    const [profilePhoto, setProfilePhoto] = useState<File|null>(null)

    useEffect(() => {
        const getUser = async () => {
            const response = await client.get("/api/users/current")
            setUser(response.data.data)
        }

        getUser()
    }, [])

    const action = async (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            appendIfExists('email', email, formData)
            appendIfExists('profile_photo', profilePhoto, formData)
            const response = await client.post(`/api/users/${user.id}`, formData)
            if (response.status == 201 || response.status == 200) {
                navigate(`/dashboard`)
            }
            
        } catch (error: any|unknown) {
            alert('Dados inválidos')
            console.log('Erro: ', error)
        }
    }

    const handlePassword = async () => {
        try {
            const response = await client.post('/api/password/solicitation', { email: user.email })
            if (response.status == 200) {
                alert('Solicitação feita, por favor, verifique seu e-mail.')
                navigate('/dashboard')
            }
        } catch (error: any|unknown) {
            console.error(error)
            // setErrors(error.response.data.errors)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-ifrn-600">
            <Header isLogged={true} page="Editar Perfil" />
            <div className="flex-grow flex items-center justify-center">
                <FormCard>
                    <Input inputName="email" label="E-mail" type="text" placeholder="E-mail" onChange={(email: string) => setEmail(email)} defaultValue={user.email} />
                    <InputFile inputName="profile_photo" label="Foto de Perfil" placeholder="Foto de perfil da turma" onChange={(image: File|null) => setProfilePhoto(image)} />
                    <div>
                        <button type="button" className="text-xl text-white underline" onClick={() => handlePassword()}>
                            Esqueceu a senha?
                        </button>
                    </div>
                    <Button type="submit" style="py-2 bg-ifrn-500 text-white rounded-lg" onClick={action}>
                        Editar
                    </Button>
                </FormCard>
            </div>
        </div>
    )
}