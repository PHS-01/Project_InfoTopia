export interface RoleType {
    id: number
    name: string
}

export interface UserType {
    id: number
    name: string
    email: string
    profile_photo: string
    matriculation?: string
    roles: Array<RoleType>
    classes: Array<ClasseType>
}

export interface PostType {
    id: number
    user_id: number
    classe_id: number
    description: string
    image: string
    updated_at: string
    created_at: string
    is_approved: boolean
    comments: Array<CommentType>
    classe: ClasseType
    user: UserType
    important: number
}

export interface ClasseType {
    id: number
    name: string
    profile_photo: string
    cover_photo: string
    year: number|string
    course_id: string|number
    course: CourseType
    posts: Array<PostType>
}

export interface CommentType {
    id: number
    content: string
    user: UserType
    post: PostType
    post_id: number
    user_id: number
    updated_at: string
    created_at: string
}

export interface CourseType {
    id: number
    name: string
    classes: Array<ClasseType>
}

export const scopePost = {
    id: 0,
    user_id: 0,
    classe_id: 0,
    description: '',
    image: '',
    updated_at: '21/11/2024',
    created_at: '21/11/2024',
    important: 0,
    matriculation: '',
    classe: {
        course_id: 0,
        cover_photo: '',
        id: 0,
        name: '',
        posts: [],
        profile_photo: '',
        year: '',
        course: {
            id: 0,
            name: '',
            classes: []
        }
    },
    comments: [],
    is_approved: false,
    user: {
        email: '',
        id: 0,
        name: '',
        profile_photo: '',
        roles: [],
        classes: []
    }
}

export const scopeClasse = {
    id: 0,
    name: '',
    profile_photo: '',
    cover_photo: '',
    course_id: 0,
    year: '',
    course: {
        id: 0,
        name: '',
        classes: []
    },
    posts: []
}

export const scopeUser = {
    id: 0,
    name: '',
    email: '',
    profile_photo: '',
    roles: [],
    classes: []
}

export const scopeCourse = {
    id: 0,
    name: ''
}

export const scopeRole = {
    id: 0,
    name: ''
}
