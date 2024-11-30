import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Header from "../components/Header"
import FormCard from "../components/forms/FormCard"
import Input from "../components/inputs/Input"
import Button from "../components/Button"
import Select from "../components/inputs/Select"

import client from "../api/client"
import { filterObject, isEmptyObject, objToArr } from "../utils/utils"
import { UserType, RoleType, ClasseType, scopeRole } from "../api/responses"
import ErrorCard from "../components/ErrorCard"


export default function RoleForm(): JSX.Element {
    const [name, setName] = useState('')
    const [users, setUsers] = useState<Array<UserType>>([])
    const [roles, setRoles] = useState<Array<RoleType>>([])
    const [classes, setClasses] = useState<Array<ClasseType>>([])
    const [userId, setUserId] = useState('')
    const [roleId, setRoleId] = useState('')
    const [classeId, setClasseId] = useState('')
    const [role, setRole] = useState<RoleType>(scopeRole)
    const navigate = useNavigate()
    const { id } = useParams()
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (id) {
            const getRole = async () => {
                const response = await client.get(`/api/roles/${id}`)
                setRole(response.data.data)
            }

            getRole()
        }

        const getUsers = async () => {
            const response = await client.get('/api/users')
            setUsers(response.data.data[0])
        }

        const getRoles = async () => {
            const response = await client.get('/api/roles')
            setRoles(response.data.data[0])
        }

        const getClasses = async () => {
            const response = await client.get('/api/classes')
            setClasses(response.data.data[0])
        }

        getUsers()
        getRoles()
        getClasses()
    }, [])
    

    const action = async () => {
        try {
            const response = id
                ? await client.put(`/api/roles/${id}`, filterObject({name: name}))
                : await client.post('/api/roles', {name: name})

            if (response.status == 201 || response.status == 200) {
                navigate('/roles')
            }
        } catch (error: unknown|any) {
            setErrors(error.response.data.errors)
        }
    }

    const addRole = async () => {
        try {
            const leaderRole = roles.find(role => role.name == 'Líder')
            await client.post(`/api/roles/${roleId}/assing`, {
                users: [userId]
            })

            if (parseInt(roleId) == leaderRole?.id) {
                await client.post(`/api/classes/${classeId}/assing`, {
                    users: [userId]
                })
            }

            alert('Cargo adicionado com sucesso!')
        } catch (error) {
            alert('Não foi possível realizar a operação')
            console.log(error)
        }
    }

    const removeRole = async () => {
        try {
            const leaderRole = roles.find(role => role.name == 'Líder')

            await client.delete(`/api/roles/${roleId}/remove`, {
                data: {users: [userId]}
            })

            if (parseInt(roleId) == leaderRole?.id) {
                await client.delete(`/api/classes/${classeId}/remove`, {
                    data: {users: [userId]}
                })
            }
            alert('Cargo removido com sucesso!')
        } catch (error) {
            alert('Não foi possível realizar a operação')
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-ifrn-600">
            <Header isLogged={true} page="Cadastrar Cargo" />
            {!isEmptyObject(errors) && <div className="mx-auto mt-10"><ErrorCard errors={objToArr(errors)}/></div>}
            <div className="flex-grow flex flex-col gap-y-12 items-center justify-center">
                <div className="mt-10">
                    <FormCard>
                        <Input inputName="name" label="Cargo" type="text" placeholder="Nome do cargo" onChange={(name: string) => setName(name)} defaultValue={role.name} />
                        <Button type="submit" style="py-2 bg-ifrn-500 text-white rounded-lg" onClick={action}>
                            Cadastrar
                        </Button>
                    </FormCard>
                </div>
                <div className="mb-10">
                    <FormCard>
                        <Select inputName="user_id" onChange={(userId) => setUserId(userId)} label="Usuário" defaultValue={0}>
                            <>
                                <option value="0" disabled>Selecione uma opção</option>
                                {users.map(user => (
                                    <option value={user.id} key={user.id}>{user.name}: {user.matriculation}</option>
                                ))}
                            </>
                        </Select>
                        <Select inputName="role_id" onChange={(roleId) => setRoleId(roleId)} label="Cargo" defaultValue={0}>
                            <>
                                <option value="0" disabled>Selecione uma opção</option>
                                {roles.map(roleModel => (
                                    <option value={roleModel.id} key={roleModel.id}>{roleModel.name}</option>
                                ))}
                            </>
                        </Select>
                        <Select inputName="classe_id" onChange={(classeId) => setClasseId(classeId)} label="Turma" defaultValue={0}>
                            <>
                                <option value="0" disabled>Selecione uma opção</option>
                                {classes.map(classe => (
                                    <option value={classe.id} key={classe.id}>{classe.name} - {classe.year}</option>
                                ))}
                            </>
                        </Select>
                        <div className="flex gap-x-4 mx-auto">
                            <button className="text-white bg-ifrn-500 rounded-lg py-2 hover:bg-white hover:text-ifrn-500 hover:border hover:border-ifrn-bg-ifrn-500 px-2
                            " type="button" onClick={() => addRole()}>
                                Adicionar
                            </button>
                            <button className="text-white bg-red-700 rounded-lg py-2 hover:bg-white hover:text-red-700 hover:border hover:border-red-700 px-2" type="button" onClick={() => removeRole()}>
                                Remover
                            </button>
                        </div>
                    </FormCard>
                </div>
            </div>
        </div>
    )
}