import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { scopeUser, UserType } from "../api/responses"
import { useEffect, useState } from "react"
import client from "../api/client"
import BellIcon from "./icons/BellIcon"
import Dropdown from "./Dropdown"
import PlusIcon from "./icons/PlusIcon"
import { can } from "../utils/authorization"
import ConfigIcon from "./icons/ConfigIcon"


export function AuthOptions(): JSX.Element {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState<UserType>(scopeUser)
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

        getUser()
    }, [])

    useEffect(() => {
        window.HSStaticMethods.autoInit()
    }, [location.pathname])

    return (
        <>
            <button type="button">
                <BellIcon />
            </button>
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