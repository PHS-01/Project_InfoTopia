import { useEffect, useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Table from "../components/Table"

import client from "../api/client"
import { useNavigate } from "react-router-dom"

import { ClasseType } from "../api/responses"

export default function Classes(): JSX.Element {
    const [classes, setClasses] = useState<Array<ClasseType>>([])
    const navigate = useNavigate()

    useEffect(() => {
        const getClasses = async () => {
            try {
                const response = await client.get('/api/classes')
                setClasses(response.data.data[0])
            } catch (error) {
                console.log('Um erro ocorreu ', error)
            }
        }
        getClasses()
    }, [])

    const deleteClasse = async (id: number) => {
        try {
            const response = await client.delete(`/api/classes/${id}`)
            if (response.status == 200) {
                setClasses(classes.filter((classe: ClasseType) => classe.id != id))
            }
        } catch (error) {
            console.log('Erro ao tentar deletar turma ', error)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-y-24 min-h-screen border-b bg-ifrn-600">
                <Header isLogged={true} page="Turmas"/>
                <div className="flex flex-col gap-x-4 mx-auto mb-12">
                    <Table headers={['ID', 'Turma', 'Ações']}>
                        {classes.map(classe => (
                            <tr className="odd:bg-cgray-300 even:bg-cgray-200 border-b dark:border-white text-black" key={classe.id}>
                                <td className="px-6 py-4">{classe.id}</td>
                                <td className="px-6 py-4">{classe.name} - {classe.year}</td>
                                <td className="px-6 py-4 flex flex-row-reverse gap-x-2">
                                    <button type="button" onClick={() => deleteClasse(classe.id)} >
                                        <img src="./../../delete.svg" alt="Icon de remoção" className="max-w-6" />
                                    </button>
                                    <button type="button" onClick={() => navigate(`/classes/${classe.id}/edit`)}>
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