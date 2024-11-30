import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { scopeUser, UserType } from "../api/responses"
import { useEffect, useState } from "react"
import client from "../api/client"
import { can, isLeader } from "../utils/authorization"

interface Props {
    isMenuOpen: boolean
    setIsMenuOpen: (value: boolean | ((prev: any) => boolean)) => void
    isDropdownOpen: boolean
    setIsDropdownOpen: (value: boolean | ((prev: any) => boolean)) => void
    isDropdownOpenConfig: boolean
    setIsDropdownOpenConfig: (value: boolean | ((prev: any) => boolean)) => void
}

export function AuthMobileOptions({isDropdownOpen, setIsDropdownOpen, setIsMenuOpen, isMenuOpen, isDropdownOpenConfig, setIsDropdownOpenConfig }: Props): JSX.Element {
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
    return (
        <>
            <div className={`fixed top-0 left-0 w-64 h-full bg-ifrn-800 z-50 text-white transform ${ isMenuOpen ? "translate-x-0" : "-translate-x-full" } transition-transform duration-300`}>
                <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4" >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <ul className="mt-16 space-y-4 text-lg font-semibold">
                    <li className="hover:bg-ifrn-500 relative" onClick={() => setIsDropdownOpen((prev) => !prev)}>
                        <a href="#" className="p-4 flex items-center justify-between">
                            Criar
                            <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                        {isDropdownOpen && (
                        <ul className="bg-ifrn-700 ml-4 mt-2 space-y-2 text-sm">
                            <li className="hover:text-ifrn-800 hover:underline">
                                <Link to="/posts/create" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full">
                                    Cadastrar Postagem
                                </Link>
                            </li>
                            {can(user.roles, ['Administrador']) ? (
                                <>
                                    <li className="hover:text-ifrn-800 hover:underline">
                                        <Link to="/roles/create" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full">
                                            Cadastrar Cargo
                                        </Link>
                                    </li>
                                    <li className="hover:text-ifrn-800 hover:underline">
                                        <Link to="/classes/create" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full">
                                            Cadastrar Turma
                                        </Link>
                                    </li>
                                    <li className="hover:text-ifrn-800 hover:underline">
                                        <Link to="/courses/create" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full">
                                            Cadastrar Curso
                                        </Link>
                                    </li>
                                </>
                            ) : <></>}
                        </ul>
                        )}
                    </li>
                    <li className="hover:bg-ifrn-500 relative" onClick={() => setIsDropdownOpenConfig((prev) => !prev)}>
                        <a href="#" className="p-4 flex items-center justify-between">
                            Configurações
                            <svg className={`w-5 h-5 transition-transform ${isDropdownOpenConfig ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                        {isDropdownOpenConfig && (
                        <ul className="bg-ifrn-700 ml-4 mt-2 space-y-2 text-sm">
                            <li className="hover:text-ifrn-800 hover:underline">
                                <Link to="/users/edit" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full" type="button">
                                    Editar Perfil
                                </Link>
                            </li>
                            <li className="hover:text-ifrn-800 hover:underline">    
                                <Link to="/posts" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm hover:bg-ifrn-500 hover:text-white w-full">
                                    Posts
                                </Link>
                            </li>
                            {can(user.roles, ['Administrador']) ? (
                                <>
                                    <li className="hover:text-ifrn-800 hover:underline">
                                        <Link to="/roles" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full">
                                            Cargos
                                        </Link>
                                    </li>
                                    <li className="hover:text-ifrn-800 hover:underline">
                                        <Link to="/courses" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full">
                                            Cursos
                                        </Link>
                                    </li>
                                    <li className="hover:text-ifrn-800 hover:underline">
                                        <Link to="/classes" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full">
                                            Turmas
                                        </Link>
                                    </li>
                                </>
                            ) : <></>}
                            <button className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full" type="button" onClick={makeLogout}>
                                Logout
                            </button>
                        </ul>
                        )}
                    </li>
                </ul>
            </div>
        </>
    )

}