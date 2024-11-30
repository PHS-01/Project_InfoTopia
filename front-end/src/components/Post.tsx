import { Link, useNavigate } from "react-router-dom"
import client, { getImage } from "../api/client"
import { appendIfExists, formatDate, isImage } from "../utils/utils"
import { can, isLeader } from "../utils/authorization"

import { PostType, UserType } from "../api/responses"

interface Props {
    post: PostType
    user: UserType
    isApprovePage?: boolean | undefined
}

interface EditRemoveProps {
    destroy: () => void
    edit: () => void
}

interface DesaproveAproveProps {
    approve: () => void
    remove: () => void
}

function EditRemoveOptions({destroy, edit}: EditRemoveProps): JSX.Element {
    return (
        <>    
            <button type="button" onClick={destroy} >
                <img src="./../../delete.svg" alt="Icon de remoção" className="max-w-6" />
            </button>
            <button type="button" onClick={edit}>
                <img src="./../../edit.svg" alt="Icon de edição" className="max-w-6" />
            </button>
        </>
    )
}

function DesaproveApproveOptions({remove, approve}: DesaproveAproveProps): JSX.Element {
    return (
        <>    
            <button type="button" onClick={remove} >
                <img src="./../../desapprove.svg" alt="Icon de remoção" className="max-w-6" />
            </button>
            <button type="button" onClick={approve} >
                <img src="./../../approve.svg" alt="Icon de remoção" className="max-w-6" />
            </button>
        </>
    )
}

export default function Post({post, user, isApprovePage}: Props): JSX.Element {
    const navigate = useNavigate()

    const deletePost = async (id: number) => {
        try {
            const response = await client.delete(`/api/posts/${id}`)
            if (response.status == 200) {
                alert('Postagem deletada com sucesso')
                window.location.reload()
            }
        } catch (error) {
            console.log('Erro ao deletar a postagem: ', error)
        }
    }

    const approvePost = async (id: number) => {
        try {
            const formData = new FormData()
            appendIfExists('is_approved', 1, formData)
            const response = await client.post(`/api/posts/${id}`, formData)
            if (response.status == 200) {
                alert('Postagem aprovada com sucesso')
                window.location.reload()
            }
        } catch (error) {
            console.log('Houve um erro ao aprovar a publicação ', error)
        }
    }

    return (
        <div className="flex flex-col gap-y-2 pb-5 border rounded-lg border-cgray-800 bg-white">
            <div className="flex justify-between mx-2 mt-2">
                <div className="flex gap-x-4">
                    <img src={getImage(post.user.profile_photo)} alt="Imagem de perfil do curso" className="rounded-full w-14 h-14" />
                    <div className="flex flex-col gap-y-2">
                        <h3 className="text-cgray-600 hover:text-cgray-800">
                            {post.user.name}
                        </h3>
                        <h3 className="text-cgray-100">{formatDate(post.updated_at)}</h3>
                    </div>
                </div>
                <div className="flex flex-row-reverse gap-x-2">
                    {(can(user.roles, ['Administrador']) || isLeader(user, post.classe_id)) &&
                        <>
                            <EditRemoveOptions destroy={() => deletePost(post.id)} edit={() => navigate(`/posts/${post.id}/edit`)}/>
                            {isApprovePage && 
                                <DesaproveApproveOptions remove={() => deletePost(post.id)} approve={() => approvePost(post.id)} />
                            }
                        </>
                    }
                </div>
            </div>
            {isImage(getImage(post.image))
                ? <img src={getImage(post.image)} alt="Imagem da postagem"  style={{maxHeight: '30rem'}} />
                : <video style={{maxHeight: '30rem'}} controls><source src={getImage(post.image)} /></video>
            }
            <div className="ml-2 flex flex-col gap-y-4">
                <p className="text-cgray-800">
                    {post.description}   
                </p>
                <Link to={`/posts/${post.id}`}>
                    <span className="font-bold hover:underline">Comentários</span>
                </Link>
            </div>
        </div>
    )
}