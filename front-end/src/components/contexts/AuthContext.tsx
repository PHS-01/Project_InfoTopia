import { createContext, useContext, useState, ReactNode, FC } from "react"
import client from "../../api/client"

interface User {
    id: number
    name: string
    email: string
    profile_photo: string
}

interface AuthContextType {
    // isAuthenticated: boolean
    // user: User | null
    login: (email: string, password: string, needUser?: boolean) => Promise<boolean>
    logout: () => Promise<boolean>
    register: (email: string, password: string, matriculation: string, name: string) => Promise<boolean>
    user: User
    // check: () => Promise<Boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User>({
        id: 0,
        email: '',
        name: '',
        profile_photo: ''
    })

    const register = async (email: string, password: string, matriculation: string, name: string): Promise<boolean> => {
        try {
            await client.get("/sanctum/csrf-cookie")
            await client.post("/api/register", { email: email, password: password, matriculation: matriculation, name: name })
            return true
        } catch (error) {
            console.error("Login failed:", error)
            return false
        }
    }

    const login = async (email: string, password: string, needUser?: boolean): Promise<boolean> => {
        try {
            await client.get("/sanctum/csrf-cookie")
            await client.post("/api/login", { email, password })
            if (needUser) {
                const response = await client.get("/api/users/current")
                setUser(response.data.data)
            }
            return true
        } catch (error) {
            console.error("Login failed:", error)
            return false
        }
    }

    const logout = async () => {
        try {
            await client.post("/api/logout")
            return true
        } catch (error) {
            console.error("Logout failed:", error)
            return false
        }
        // setIsAuthenticated(false)
        // setUser(null)
    }

    return (
        <AuthContext.Provider value={{ login, logout, user, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}