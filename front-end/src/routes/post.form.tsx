import { useNavigate, NavigateFunction, useParams } from "react-router-dom"
import { SyntheticEvent, useEffect, useState } from "react"

import FormCard from "../components/forms/FormCard"
import Button from "../components/Button"
import TextArea from "../components/inputs/TextArea"
import Select from "../components/inputs/Select"
import Header from "../components/Header"

import client from "../api/client"
import InputFile from "../components/inputs/InputFile"
import { appendIfExists, isEmptyObject, objToArr } from "../utils/utils"
import { ClasseType, PostType, scopePost, scopeUser, UserType } from "../api/responses"
import { can, isLeader } from "../utils/authorization"
import { AxiosError } from "axios"
import ErrorCard from "../components/ErrorCard"

export default function PostForm(): JSX.Element {
    const navigate: NavigateFunction = useNavigate()
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File|null>(null)
    const [classeId, setClasseId] = useState('')
    const [classes, setClasses] = useState<Array<ClasseType>>([])
    const [user, setUser] = useState<UserType>(scopeUser)
    const [important, setImportant] = useState(0)
    const { postId } = useParams()
    const [post, setPost] = useState<PostType>(scopePost)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({})

    useEffect(() => {

        const getUserClasses = async () => {
            const userResponse = await client.get("/api/users/current")
            const classesResponse = await client.get('/api/classes')

            setUser(userResponse.data.data)
            setClasses(classesResponse.data.data[0])
            setLoading(false)
        }
        
        getUserClasses()

        if (postId) {
            const getPost = async () => {
                try {
                    const response = await client.get(`/api/posts/${postId}`)
                    setPost(response.data.data)
                } catch (error) {
                    console.log('Erro no carregamento da postagem: ', error)
                }
            }
            getPost()
        }

    }, [])


    const action = async (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            appendIfExists('classe_id', classeId, formData)
            appendIfExists('user_id', user.id, formData)
            appendIfExists('description', description, formData)
            appendIfExists('image', image, formData)
            appendIfExists('important', important, formData)

            const response = await client.post(`/api/posts${postId ? ('/' + postId) : '' }`, formData, )

            if (response.status == 201 || response.status == 200) {
                navigate(`/dashboard`)
            }
            
        } catch (error: unknown|any) {
            setErrors(error.response.data.errors)
        }
    }

    if (loading) return <div>Loading...</div>;

    if (postId) {
        if (
            !can(user.roles, ['Administrador']) &&
            !isLeader(user, post.classe_id) &&
            post.user_id != user.id
        ) {
            navigate('/dashboard');
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-ifrn-600">
            <Header isLogged={true} page="Cadastrar Postagem" />
            {!isEmptyObject(errors) && <div className="mx-auto mt-10"><ErrorCard errors={objToArr(errors)}/></div>}
            <div className="flex-grow flex items-center justify-center">
                <FormCard>
                    <InputFile inputName="image" label="Mídia" placeholder="Imagem" onChange={(image: File|null) => setImage(image)} />
                    <TextArea inputName="description" label="Descrição" placeholder="Descrição" onChange={(description: string) => setDescription(description)} defaultValue={post.description} />
                    <Select inputName="classe_id" label="Turma" onChange={(classeId) => setClasseId(classeId)} defaultValue={post.classe_id}>
                        <>
                            <option value="0" disabled>Selecione uma opção</option>
                            {classes.map(classe => <option value={classe.id} key={classe.id}>{classe.name} - {classe.year}</option>)}
                        </>
                    </Select>
                    <Select inputName="important" label="Destacar" onChange={(important) => setImportant(parseInt(important))} defaultValue={post.important}>
                        <>
                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                        </>
                    </Select>
                    <Button type="submit" style="py-2 text-white bg-ifrn-500 text-white rounded-lg" onClick={action}>
                        Cadastrar
                    </Button>
                </FormCard>
            </div>
        </div>
    )
}