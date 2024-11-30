interface Props {
    children?: string | JSX.Element | JSX.Element[]
    image?: string
    name: string
}

export default function PostCard({ children, image, name }: Props): JSX.Element {
    return (
        <div className="bg-white rounded-lg border-cgray-800 border p-4 max-w-64 w-64">
            <div className="flex flex-col gap-y-3 overflow-hidden whitespace-nowrap text-ellipsis">
                {children}
                <div className="flex gap-x-2">
                    <img src={image} alt="Foto de perfil" className="rounded-full" />
                    <span className="text-cgray-700">{name}</span>
                </div>
            </div>
        </div>
    )
}