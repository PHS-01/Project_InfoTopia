import { useNavigate } from "react-router-dom"
import Button from "./Button"


export default function GuestOptions(): JSX.Element {
    const navigate = useNavigate()
    return (
        <>
            <Button type="button" style="px-3 py-1 bg-white text-black rounded-lg" onClick={() => navigate('/login')}>
                Logar
            </Button>
            <Button type="button" style="px-3 py-1 bg-ifrn-500 text-white rounded-lg" onClick={() => navigate('/register')}>
                Registrar
            </Button>
        </>
    )
}