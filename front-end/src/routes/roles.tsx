import { useEffect, useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Table from "../components/Table"

import client from "../api/client"
import { useNavigate } from "react-router-dom"

import { RoleType } from "../api/responses"

export default function Roles(): JSX.Element {
    const [roles, setRoles] = useState<Array<RoleType>>([])
    const navigate = useNavigate()

    useEffect(() => {
        const getRoles = async () => {
            try {
                const response = await client.get('/api/roles')
                setRoles(response.data.data[0])
            } catch (error) {
                console.log('Um erro ocorreu ', error)
            }
        }
        getRoles()
    }, [])

    const deleteRole = async (id: number) => {
        try {
            const response = await client.delete(`/api/roles/${id}`)
            if (response.status == 200) {
                setRoles(roles.filter((role: RoleType) => role.id != id))
            }
        } catch (error) {
            console.log('Erro ao tentar deletar role ', error)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-y-24 min-h-screen border-b bg-ifrn-600">
                <Header isLogged={true} page="Cargos"/>
                <div className="flex flex-col gap-x-4 mx-auto mb-12">
                    <Table headers={['ID', 'Cargo', 'Ações']}>
                        {roles.map(role => (
                            <tr className="odd:bg-cgray-300 even:bg-cgray-200 border-b dark:border-white text-black" key={role.id}>
                                <td className="px-6 py-4">{role.id}</td>
                                <td className="px-6 py-4">{role.name}</td>
                                <td className="px-6 py-4 flex flex-row-reverse gap-x-2">
                                    <button type="button" onClick={() => deleteRole(role.id)} >
                                        <img src="./../../delete.svg" alt="Icon de remoção" className="max-w-6" />
                                    </button>
                                    <button type="button" onClick={() => navigate(`/roles/${role.id}/edit`)}>
                                        <img src="./../../edit.svg" alt="Icon de edição" className="max-w-6" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>
            </div>
            <Footer />
        </>
    )
}