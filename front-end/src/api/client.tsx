import axios from "axios"

const baseURL = 'http://localhost:8000'

export function getImage(path: string): string {
    return `${baseURL}/storage/${path}`
}

const client = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    withXSRFToken: true,
})

export default client