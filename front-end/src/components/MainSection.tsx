import { useNavigate } from "react-router-dom"
import Button from "./Button"

export default function MainSection(): JSX.Element {
    const navigate = useNavigate()
    return (
        <main className="bg-ifrn-600">
            <div className="flex flex-col gap-y-3 h-96 justify-center items-center">
                <h1 className="text-center text-[5rem] font-bold text-cgray-800">InfoTopia</h1>
                <h3 className="text-center text-[2rem] text-white">Memorial dos cursos do IFRN/CA</h3>
                <div className="flex gap-x-4 mx-auto">
                    <Button type="submit" style="px-3 py-1 bg-white text-black rounded-lg" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                    <Button type="submit" style="px-3 py-1 bg-ifrn-500 text-white rounded-lg" onClick={() => navigate('/register')}>
                        Registrar
                    </Button>
                </div>
            </div>
        </main>
    )
}