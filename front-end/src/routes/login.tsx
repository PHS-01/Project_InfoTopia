import { useState } from "react"
import Header from "../components/Header"
import LoginCard from "../components/auth/LoginCard"
import { isEmptyObject, objToArr } from "../utils/utils"
import ErrorCard from "../components/ErrorCard"

export default function Login() {
    const [errors, setErrors] = useState({})
    return (
        <div className="flex flex-col min-h-screen bg-ifrn-600">
            <Header />
            {!isEmptyObject(errors) && <div className="mx-auto mt-10"><ErrorCard errors={objToArr(errors)}/></div>}
            <LoginCard setErrors={(obj: object) => setErrors(obj)} />
        </div> 
    )
}