import client, { getImage } from "../api/client"
import { formatDate } from "../utils/utils"

interface Props {
    id: number
    userPhoto: string
    userName: string
    content: string
    updatedAt: string
}

export default function CommentCard({id, userPhoto, userName, content, updatedAt}: Props): JSX.Element {
    const deleteComment = async (id: number) => {
        try {
            const response = await client.delete(`/api/comments/${id}`)
            if (response.status == 200) {
                alert('Comentário excluído com sucesso')
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col gap-y-6 border border-black rounded-lg p-4 bg-white">
            <div className="flex gap-x-4 justify-between">
                <div className="flex gap-x-4">
                    <img src={getImage(userPhoto)} alt="Imagem de perfil do curso" className="rounded-full w-14 h-14" />
                    <div className="flex flex-col gap-y-2">
                        <h3 className="text-cgray-600 hover:text-cgray-800">
                            {userName}
                        </h3>
                        <h3 className="text-cgray-100">{formatDate(updatedAt)}</h3>
                    </div>
                </div>
                <div className="flex flex-row-reverse gap-x-2">
                    <button type="button" onClick={() => deleteComment(id)} >
                        <img src="./../../delete.svg" alt="Icon de remoção" className="max-w-6" />
                    </button>
                    {/* <button type="button" onClick={() => navigate(`/posts/${id}/edit`)}>
                        <img src="./../../edit.svg" alt="Icon de edição" className="max-w-6" />
                    </button> */}
                </div>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}