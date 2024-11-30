import { useState } from "react"
import { Link } from "react-router-dom"
import { AuthMobileOptions } from "./AuthMobileOptions"
import { GuestMobileOptions } from "./GuestMobileOptions"

interface Props {
    children: string | JSX.Element | JSX.Element[]
    isLogged?: boolean | undefined
    page?: string | undefined
}

export default function HamburguerMenu({children, isLogged, page}: Props): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isDropdownOpenConfig, setIsDropdownOpenConfig] = useState(false)

    return (
        <div className="bg-gray-100">
      {/* Barra de navegação */}
      <nav className="bg-ifrn-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">
            <Link to={isLogged ? "/dashboard" : "/"}>
                <img src="/ifrn.png" alt="Logo IFRN" className="w-12" />
            </Link>
          </h1>
          {isLogged && <h2 className=" bg-ifrn-600 text-white text-xl font-semibold p-2 max-h-[3rem] rounded-lg">{page}</h2>}

          {/* Botão do menu hamburguer */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white md:hidden"
          >
            {/* Ícone (três linhas) */}
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div className="hidden md:flex space-x-4 text-white font-semibold">
            {children}
          </div>
        </div>
      </nav>
      {isLogged
        ? <AuthMobileOptions isDropdownOpen={isDropdownOpen} setIsDropdownOpen={(val) => setIsDropdownOpen(val)} isMenuOpen={isMenuOpen} setIsMenuOpen={(val) => setIsMenuOpen(val)} isDropdownOpenConfig={isDropdownOpenConfig} setIsDropdownOpenConfig={(val) => setIsDropdownOpenConfig(val)} />
        : <GuestMobileOptions isDropdownOpen={isDropdownOpen} setIsDropdownOpen={(val) => setIsDropdownOpen(val)} isMenuOpen={isMenuOpen} setIsMenuOpen={(val) => setIsMenuOpen(val)} />}
    </div>
    )
}