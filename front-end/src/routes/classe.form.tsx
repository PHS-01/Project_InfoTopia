import { useNavigate, NavigateFunction, useParams } from "react-router-dom"
import { SyntheticEvent, useEffect, useState } from "react"

import FormCard from "../components/forms/FormCard"
import Button from "../components/Button"
import Select from "../components/inputs/Select"
import Header from "../components/Header"
import InputFile from "../components/inputs/InputFile"
import Input from "../components/inputs/Input"

import client from "../api/client"
import { appendIfExists, isEmptyObject, objToArr } from "../utils/utils"

import { ClasseType, CourseType, scopeClasse } from "../api/responses"
import ErrorCard from "../components/ErrorCard"

export default function ClasseForm(): JSX.Element {
    const navigate: NavigateFunction = useNavigate()
    const [name, setName] = useState('')
    const [profilePhoto, setProfilePhoto] = useState<File|null>(null)
    const [coverPhoto, setCoverPhoto] = useState<File|null>(null)
    const [courses, setCourses] = useState<Array<CourseType>>([])
    const [courseId, setCourseId] = useState('')
    const [year, setYear] = useState('')
    const [classe, setClasse] = useState<ClasseType>(scopeClasse)
    const [errors, setErrors] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const getUserClasses = async () => {
            const response = await client.get('/api/courses')
            setCourses(response.data.data[0])
        }

        if (id) {
            const getClasse = async () => {
                try {
                    const response = await client.get(`/api/classes/${id}`)
                    setClasse(response.data.data)
                    setName(classe.name)
                } catch (error) {
                    console.log('Erro no carregamento da turma: ', error)
                }
            }
            getClasse()
        }
        
        getUserClasses()
    }, [])

    const action = async (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            appendIfExists('name', name, formData)
            appendIfExists('profile_photo', profilePhoto, formData)
            appendIfExists('cover_photo', coverPhoto, formData)
            appendIfExists('course_id', courseId, formData)
            appendIfExists('year', year, formData)

            const response = await client.post(`/api/classes${id ? ('/' + id) : '' }`, formData)
            if (response.status == 201 || response.status == 200) {
                navigate(`/classes/${response.data.data.id}`)
            }
            
        } catch (error: any|unknown) {
            setErrors(error.response.data.errors)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-ifrn-600">
            <Header isLogged={true} page="Cadastrar Turma" />
            {!isEmptyObject(errors) && <div className="mx-auto mt-10"><ErrorCard errors={objToArr(errors)}/></div>}
            <div className="flex-grow flex items-center justify-center">
                <FormCard>
                    <Input inputName="name" label="Turma" type="text" placeholder="Nome da turma" onChange={(name: string) => setName(name)} defaultValue={classe.name} />
                    <Input inputName="year" label="Ano" type="text" placeholder="Ano da turma" onChange={(year: string) => setYear(year)} defaultValue={classe.year} />
                    <InputFile inputName="profile_photo" label="Foto de Perfil" placeholder="Foto de perfil da turma" onChange={(image: File|null) => setProfilePhoto(image)} />
                    <InputFile inputName="cover_photo" label="Capa" placeholder="Foto da capa da turma" onChange={(image: File|null) => setCoverPhoto(image)} />
                    <Select inputName="course_id" label="Curso" onChange={(courseId) => setCourseId(courseId)} defaultValue={classe.course_id}>
                        <>
                            <option value="0" disabled>Selecione uma opção</option>
                            {courses.map(course => <option value={course.id} key={course.id}>{course.name}</option>)}
                        </>
                    </Select>
                    <Button type="submit" style="py-2 bg-ifrn-500 text-white rounded-lg" onClick={action}>
                        Cadastrar
                    </Button>
                </FormCard>
            </div>
        </div>
    )
}