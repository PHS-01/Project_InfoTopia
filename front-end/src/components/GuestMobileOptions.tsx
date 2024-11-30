import { Link } from "react-router-dom"

interface Props {
    isMenuOpen: boolean
    setIsMenuOpen: (value: boolean | ((prev: any) => boolean)) => void
    isDropdownOpen: boolean
    setIsDropdownOpen: (value: boolean | ((prev: any) => boolean)) => void
}

export function GuestMobileOptions({isDropdownOpen, isMenuOpen, setIsDropdownOpen, setIsMenuOpen}: Props): JSX.Element {
    return (
        <>
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-ifrn-800 text-white transform ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300`}
            >
                <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4"
                >
                {/* Ícone de fechar */}
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
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
                <ul className="mt-16 space-y-4 text-lg font-semibold">
                    <li className="hover:bg-ifrn-500 relative" onClick={() => setIsDropdownOpen((prev) => !prev)}>
                        <a href="#" className="p-4 flex items-center justify-between">
                            Entrar
                            <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                        {isDropdownOpen && (
                        <ul className="bg-ifrn-700 ml-4 mt-2 space-y-2 text-sm">
                            <li className="hover:text-ifrn-800 hover:underline">
                                <Link to="/login" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full">
                                    Login
                                </Link>
                            </li>
                            <li className="hover:text-ifrn-800 hover:underline">
                                <Link to="/register" className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm w-full">
                                    Registrar
                                </Link>
                            </li>
                        </ul>
                        )}
                    </li>
                    
                </ul>
            </div>
        </>
    )

}