import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { ClasseType, CourseType, scopeUser, UserType } from "../api/responses"
import { useEffect, useState } from "react"
import client from "../api/client"
import Dropdown from "./Dropdown"
import PlusIcon from "./icons/PlusIcon"
import { can } from "../utils/authorization"
import ConfigIcon from "./icons/ConfigIcon"
import CourseIcon from "./icons/CourseIcon"
import { castInt } from "../utils/utils"

interface Props {
    course: CourseType
}

function SubDropdown({course}: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="m-1">
            <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-ifrn-500 active:bg-ifrn-500 w-full text-left p-1 rounded-lg">
                {course.name}
            </button>
            {isOpen && 
                <div className="flex flex-col flex-y-2">
                    {course.classes.sort((a, b) => castInt(b.year) - castInt(a.year)).map(classe => (
                        <Link to={`/classes/${classe.id}`} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full" key={classe.id}>
                            {classe.name} - {classe.year}
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}


export function AuthOptions(): JSX.Element {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState<UserType>(scopeUser)
    const [courseMenuIsOpen, setCourseMenuIsOpen] = useState(false)
    const [courses, setCourses] = useState<Array<CourseType>>([])

    const makeLogout = () => {
        logout().then((value) => {
            if (value) navigate('/');
        })
    }

    useEffect(() => {
        const getUser = async () => {
            const response = await client.get('/api/users/current')
            setUser(response.data.data)
        }

        const getCourses = async () => {
            try {
                const response = await client.get('/api/courses')
                setCourses(response.data.data[0])
            } catch (error) {
                console.log('Um erro ocorreu ', error)
            }
        }

        getCourses()
        getUser()
    }, [])

    useEffect(() => {
        window.HSStaticMethods.autoInit()
    }, [location.pathname])

    return (
        <>
            <div>
                <Dropdown onClick={() => setCourseMenuIsOpen(!courseMenuIsOpen)} icon={
                    <div className="flex gap-x-2 items-end">
                        <CourseIcon />
                        {courseMenuIsOpen
                            ? <img className="w-4 text-white" src="./../../upper-arrow.svg" alt="Ícone de flecha para baixo" />
                            : <img className="w-4 text-white" src="./../../down-arrow.svg" alt="Ícone de flecha para baixo" />
                        }
                    </div>
                }>
                    <div className="flex flex-col gap-y-2">
                        {Array.isArray(courses) && courses.map((course) => (
                            <SubDropdown course={course} key={course.id}/>
                            // <Dropdown key={course.id} icon={course.name}>
                            //     {course.classes.sort((a, b) => castInt(b.year) - castInt(a.year)).map(classe => (
                            //         <Link to={`/classes/${classe.id}`} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full" key={classe.id}>
                            //             {classe.name}
                            //         </Link>
                            //     ))}
                            // </Dropdown>
                            // <span className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full" key={course.id}>
                            //     {course.name}
                                
                            // </span>
                            // <div key={course.id}>
                            //     <h3 className="px-3">{course.name}</h3>
                            //     {course.classes.sort((a, b) => b.year - a.year).map(classe => (
                            //         <div className="p-1 hover:bg-ifrn-500 m-1 rounded" key={classe.id}>
                            //             <button onClick={() => {
                            //                 navigate(`/classes/${classe.id}`);
                            //                 window.location.reload()
                            //             }}>
                            //                 {classe.name} - {classe.year}
                            //             </button>
                            //         </div>
                            //     ))}
                            // </div>
                        ))}
                    </div>
                </Dropdown>
            </div>
            <div>
                <Dropdown icon={<PlusIcon />}>
                    <Link to="/posts/create" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full">
                        Cadastrar Postagem
                    </Link>
                    {can(user.roles, ['Administrador'])
                        ? <>
                            <Link to="/roles/create" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full">
                                Cadastrar Cargo
                            </Link>
                            <Link to="/classes/create" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full">
                                Cadastrar Turma
                            </Link>
                            <Link to="/courses/create" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full">
                                Cadastrar Curso
                            </Link>
                        </>
                        : <></>
                    }
                </Dropdown>
            </div>
            <div>
                <Dropdown icon={<ConfigIcon />}>
                    <Link to="/users/edit" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full" type="button">
                        Editar Perfil
                    </Link>
                    <Link to="/posts" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full">
                        Posts
                    </Link>
                    {can(user.roles, ['Administrador'])
                        ? <>
                            <Link to="/roles" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full">
                                Cargos
                            </Link>
                            <Link to="/courses" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full">
                                Cursos
                            </Link>
                            <Link to="/classes" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full">
                                Turmas
                            </Link>
                        </>
                        : <></>
                    }
                    
                    <button className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full" type="button" onClick={makeLogout}>
                        Logout
                    </button>
                </Dropdown>
            </div>
            {/* <button type="button">
                <ConfigIcon />
                
            </button> */}
        </>
    )
}