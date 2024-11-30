import { Link } from "react-router-dom"

import FigmanIcon from "./FigmaIcon"
import XIcon from "./XIcon"
import InstagramIcon from "./InstagramIcon"
import YouTubeIcon from "./YouTubeIcon"

export default function Footer(): JSX.Element {
    return (
        <footer className="flex flex-wrap gap-y-10 gap-x-96 bg-ifrn-800 items-center justify-center pt-10 px-16 pb-12 text-white">
            <div className="flex flex-col gap-y-4">
                <h3 className="font-bold text-xl">Explore</h3>
                <div className="flex flex-col gap-y-2">
                    <Link to="/login" className="hover:font-bold">Login</Link>
                    <Link to="/register" className="hover:font-bold">Cadastro</Link>
                    <a href="#" className="hover:font-bold">Turmas</a>
                </div>
            </div>
            <div className="flex gap-x-3">
                <XIcon />
                <InstagramIcon />
                <YouTubeIcon />
            </div>
            <div className="flex flex-col gap-y-4">
                <h3 className="font-bold text-xl">Contato</h3>
                <div className="flex flex-col gap-y-2">
                    <a href="#" className="hover:font-bold">X</a>
                    <a href="#" className="hover:font-bold">YouTube</a>
                    <a href="#" className="hover:font-bold">Instagram</a>
                </div>
            </div>
        </footer>
    )
}