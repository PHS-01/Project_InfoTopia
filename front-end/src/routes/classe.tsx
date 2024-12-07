import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Post from "../components/Post"
import AsideMenu from "../components/sections/AsideMenu"

import client, { getImage } from "../api/client"


import { ClasseType, UserType, PostType, scopeClasse, scopeUser } from "../api/responses"

export default function Classe(): JSX.Element {
    const { id } = useParams()
    const [isLogged, setIsLogged] = useState(true)
    const [posts, setPosts] = useState<Array<PostType>>([])
    const [user, setUser] = useState<UserType>(scopeUser)
    const [classe, setClasse] = useState<ClasseType>(scopeClasse)

    useEffect(() => {
        const getClasse = async () => {
            try {
                const response = await client.get(`/api/classes/${id}`)
                setClasse(response.data.data)
            } catch (error) {
                console.log('Erro no carregamento da turma: ', error)
            }
        }

        const getPosts = async () => {
            try {
                const response = await client.get('/api/posts')
                const classePosts = response.data.data.filter((post: PostType) => post.classe_id == parseInt(id || ''))
                setPosts(classePosts)
            } catch (error) {
                console.log('Erro no carregamento dos posts: ', error)
            }
        }

        const getUser = async () => {
            try {
                const response = await client.get("/api/users/current")
                setUser(response.data.data)
            } catch (error) {
                console.log('Erro ao carregar o usuário logado', error)
            }
        }

        getClasse()
        getPosts()
        getUser()
    }, [])

    return (
        <>
            <div className="flex flex-col gap-y-24 min-h-screen border-b bg-ifrn-600">
                <Header isLogged={isLogged} page={`${classe.course.name} ${classe.year} - ${classe.name}`} />
                <div className="flex flex-wrap gap-x-4 gap-y-10 mx-auto mb-12">
                    <div className="flex flex-col gap-y-4 w-[40rem]">
                        <div className="mb-8 bg-white border border-cgray-800">
                            <img src={getImage(classe.cover_photo)} alt="Capa do curso" className="w-full" style={{maxHeight: "40rem"}} />
                            <div className="flex gap-x-4  py-6 px-2">
                                <img src={getImage(classe.profile_photo)} alt="Foto de perfil do curso" className="rounded-full w-14" />
                                <h4 className="text-xl my-auto">{classe.course.name} {classe.year} - {classe.name}</h4>
                            </div>
                        </div>
                        {posts.map(post => (
                            <Post  key={post.id} post={post} user={user} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )    
}