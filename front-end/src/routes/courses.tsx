import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Table from "../components/Table"

import client from "../api/client"

import { CourseType } from "../api/responses"

export default function Courses(): JSX.Element {
    const [courses, setCourses] = useState<Array<CourseType>>([])
    const navigate = useNavigate()

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await client.get('/api/courses')
                setCourses(response.data.data[0])
            } catch (error) {
                console.log('Um erro ocorreu ', error)
            }
        }
        getCourses()
    }, [])

    const deleteCourse = async (id: number) => {
        try {
            const response = await client.delete(`/api/courses/${id}`)
            if (response.status == 200) {
                setCourses(courses.filter((course: CourseType) => course.id != id))
            }
        } catch (error) {
            console.log('Erro ao tentar deletar curso ', error)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-y-24 min-h-screen border-b bg-ifrn-600">
                <Header isLogged={true} page="Cursos"/>
                <div className="flex flex-col gap-x-4 mx-auto mb-12">
                    <Table headers={['ID', 'Curso', 'Ações']}>
                        {courses.map(course => (
                            <tr className="odd:bg-cgray-300 even:bg-cgray-200 border-b dark:border-white text-black" key={course.id}>
                                <td className="px-6 py-4">{course.id}</td>
                                <td className="px-6 py-4">{course.name}</td>
                                <td className="px-6 py-4 flex flex-row-reverse gap-x-2">
                                    <button type="button" onClick={() => deleteCourse(course.id)} >
                                        <img src="./../../delete.svg" alt="Icon de remoção" className="max-w-6" />
                                    </button>
                                    <button type="button" onClick={() => navigate(`/courses/${course.id}/edit`)}>
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