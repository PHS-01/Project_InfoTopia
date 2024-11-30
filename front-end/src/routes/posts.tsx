import { useEffect, useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Post from "../components/Post"

import client from "../api/client"

import { PostType, UserType, scopeUser } from "../api/responses"
import { can } from "../utils/authorization"



export default function Posts(): JSX.Element {
    const [isLogged, setIsLogged] = useState(true)
    const [user, setUser] = useState<UserType>(scopeUser)
    const [posts, setPosts] = useState<Array<PostType>>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // const getUser = async () => {
        //     const response = await client.get('/api/users/current')
        //     setUser(response.data.data)
        //     console.log(user)
        // }
        // const getPosts = async () => {
        //     const response = await client.get('/api/posts')
        //     setPosts(response.data.data[0].filter((post: PostType) => !post.is_approved))
        // }

        // getUser()

        const fetchData = async () => {
            try {
                const [userResponse, postResponse] = await Promise.all([
                    client.get("/api/users/current"),
                    client.get(`/api/posts`)
                ])

                const rawPosts: Array<PostType> = postResponse.data.data[0]
                const rawUser: UserType = userResponse.data.data
                let filterPosts: Array<PostType> = []
                for (let i = 0; i < rawPosts.length; i++) {
                    for (let j = 0; j < rawUser.classes.length; j++) {
                        if (rawPosts[i].classe_id == rawUser.classes[j].id) {
                            filterPosts.push(rawPosts[i])
                            break
                        }
                    }
                }
                setUser(rawUser)
                setPosts(can(rawUser.roles, ['Administrador']) ? rawPosts : filterPosts)
            } catch (error) {
                console.error("Erro ao carregar dados", error)
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, [])

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className="flex flex-col gap-y-24 min-h-screen border-b  bg-ifrn-600">
                <Header isLogged={isLogged} page="Posts a serem aprovados"/>
                <div className="flex gap-x-4 mx-auto mb-12">
                        <div className="flex flex-col gap-y-4 w-[40rem]">
                            {user.classes.map(classe => (
                                <div key={classe.id} className="flex flex-col gap-y-4">
                                    {classe.posts.filter((post) => !post.is_approved)
                                        .map(post => (
                                            <Post post={post} user={user} isApprovePage key={post.id} />
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                </div>
            </div>
            <Footer />
        </>
    )    
}