import { useState } from "react"
import Header from "../components/Header"
import RegisterCard from "../components/auth/RegisterCard"
import { isEmptyObject, objToArr } from "../utils/utils"
import ErrorCard from "../components/ErrorCard"

export default function Register() {
    const [errors, setErrors] = useState({})
    return (
        <div className="flex flex-col min-h-screen bg-cgray-200">
            <Header />
            {!isEmptyObject(errors) && <div className="mx-auto mt-10"><ErrorCard errors={objToArr(errors)}/></div>}
            <RegisterCard setErrors={(obj: object) => setErrors(obj)} />
        </div> 
    )
}