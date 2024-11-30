import PostCard from "./PostCard"

interface SimplePost {
    username: string
    userImage: string
    message: string
}

export default function PostSection(): JSX.Element {
    const posts: Array<SimplePost> = [
        {username: 'Maria', message: 'Texto genérico...', userImage: './../../vite.svg' },
        {username: 'Maria', message: 'Texto genérico...', userImage: './../../vite.svg' },
        {username: 'Maria', message: 'Texto genérico...', userImage: './../../vite.svg' },
        {username: 'Maria', message: 'Texto genérico...', userImage: './../../vite.svg' },
        {username: 'Maria', message: 'Texto genérico...', userImage: './../../vite.svg' },
        
    ]

    return (
        <section className="m-12">
            <div className="flex flex-wrap gap-12">
                {posts.map((post, index) => (
                    <PostCard key={index} name={post.username} image={post.userImage}>{post.message}</PostCard>
                ))}
            </div>
        </section>
    )
}