import { useEffect, useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Post from "../components/Post"

import client from "../api/client"

import { PostType, scopeUser, UserType } from "../api/responses"

export default function Dashboard(): JSX.Element {
    const [isLogged, setIsLogged] = useState(true)
    const [posts, setPosts] = useState<Array<PostType>>([])
    const [user, setUser] = useState<UserType>(scopeUser)
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const getPosts = async () => {
            const response = await client.get('/api/posts')
            setPosts(response.data.data.filter((post: PostType) => post.is_approved))
            setIsLoading(false)
        }
        const getUser = async () => {
            const response = await client.get('/api/users/current')
            setUser(response.data.data)
        }

        getUser()
        getPosts()
    }, [])

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className="flex flex-col gap-y-24 min-h-screen border-b bg-ifrn-600">
                <Header isLogged={isLogged}/>
                <div className="flex flex-wrap gap-x-4 gap-y-10 mx-auto mb-12">
                    <div className="flex flex-col gap-y-4 w-[40rem]">
                        {posts.map(post => (
                            <Post post={post} user={user} key={post.id} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )    
}