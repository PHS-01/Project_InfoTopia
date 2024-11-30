import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Header from "../components/Header"
import FormCard from "../components/forms/FormCard"
import Input from "../components/inputs/Input"
import Button from "../components/Button"
import client from "../api/client"

import { filterObject, isEmptyObject, objToArr } from "../utils/utils"

import { CourseType, scopeCourse } from "../api/responses"
import ErrorCard from "../components/ErrorCard"

export default function CourseForm(): JSX.Element {
    const [name, setName] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    const [course, setCourse] = useState<CourseType>(scopeCourse)

    if (id) {
        useEffect(() => {
            const getCourse = async () => {
                const response = await client.get(`/api/courses/${id}`)
                setCourse(response.data.data)
            }
            getCourse()
        }, [])
    }

    const action = async () => {
        try {
            const response = id
                ? await client.put(`/api/courses/${id}`, filterObject({name: name}))
                : await client.post('/api/courses', {name: name})
    
            if (response.status == 201 || response.status == 200) navigate('/courses');
        } catch (error: any|unknown) {
            setErrors(error.response.data.errors)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-ifrn-600">
            <Header isLogged={true} page="Cadastrar Curso" />
            {!isEmptyObject(errors) && <div className="mx-auto mt-10"><ErrorCard errors={objToArr(errors)}/></div>}
            <div className="flex-grow flex items-center justify-center">
                <FormCard>
                    <Input inputName="name" label="Curso" type="text" placeholder="Nome do curso" onChange={(name: string) => setName(name)} defaultValue={course.name} />
                    <Button type="submit" style="py-2 bg-ifrn-500 text-white rounded-lg" onClick={action}>
                        Cadastrar
                    </Button>
                </FormCard>
            </div>
        </div>
    )
}