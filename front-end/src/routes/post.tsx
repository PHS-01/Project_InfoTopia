import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Post from "../components/Post"
import Button from "../components/Button"
import TextArea from "../components/inputs/TextArea"
import CommentCard from "../components/CommentCard"

import client from "../api/client"

import { scopePost, PostType, UserType, scopeUser } from "../api/responses"

export default function PostView(): JSX.Element {
    const [isLogged, setIsLogged] = useState(true)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState('')
    const [post, setPost] = useState<PostType>(scopePost)
    const [user, setUser] = useState<UserType>(scopeUser)
    const { postId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, postResponse] = await Promise.all([
                    client.get("/api/users/current"),
                    client.get(`/api/posts/${postId}`)
                ])

                setUser(userResponse.data.data)
                setPost(postResponse.data.data)
            } catch (error) {
                console.error("Erro ao carregar dados", error)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [])

    const handleComment = async () => {
        try {
            if (user.id && post.id) {
                const response = await client.post('/api/comments', {
                    user_id: user.id,
                    post_id: post.id,
                    content: content
                })

                if (response.status == 201 || response.status == 200) {
                    window.location.reload()
                }
            }
        } catch (error) {
            console.log('Erro ao comentar ', error)
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className="flex flex-col gap-y-24 min-h-screen border-b bg-ifrn-600">
                <Header isLogged={isLogged} page={`${post.classe.name} - ${post.classe.year}`}/>
                <div className="flex gap-x-4 mx-auto mb-12">
                        <div className="flex flex-col gap-y-4 w-[40rem]">
                            <div className="flex flex-col gap-y-4">
                                <Post post={post} user={user}/>
                                <div className="flex flex-col gap-y-2">
                                    <TextArea inputName="content" label="Comentário" onChange={(content: string) => setContent(content)} placeholder="Esse dia foi top viu, saudades IF..." />
                                    <Button style="bg-ifrn-500 text-white rounded-lg py-1" type="button" onClick={handleComment}>
                                        Comentar
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    {post.comments.map(comment => (
                                        <CommentCard id={comment.id} userPhoto={user.profile_photo} content={comment.content} key={comment.id} userName={user.name} updatedAt={comment.updated_at} />
                                    ))}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <Footer />
        </>
    )    
}