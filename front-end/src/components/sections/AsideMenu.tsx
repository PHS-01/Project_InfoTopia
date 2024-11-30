import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import client from "../../api/client"

interface Props {
    category: string
}

interface Classe {
    id: number
    name: string
    profile_photo: string
    cover_photo: string
    course_id: number
    year: number
}

interface Course {
    id: number
    name: string
    classes: Array<Classe>
}

export default function AsideMenu({category}: Props): JSX.Element {
    // const [classes, setClasses] = useState<Array<Classe>>([])
    const [courses, setCourses] = useState<Array<Course>>([])
    const navigate = useNavigate()

    useEffect(() => {
        const getCourses = async () => {
            const response = await client.get('/api/courses')
            setCourses(response.data.data[0])
        }
        getCourses()

        // const getClasses = async () => {
        //     const response = await client.get('/api/classes')
        //     setClasses(response.data.data[0])
        // }
        // getClasses()
    }, [])

    return (
        <div>
            <div className="w-screen flex flex-col gap-y-4 bg-ifrn-800 text-white rounded-lg md:w-48 text-center">
                <div className="p-3 m-1 rounded">
                    {category}
                </div>
                {Array.isArray(courses) && courses.map((course) => (
                    <div key={course.id}>
                        <h3 className="px-3">{course.name}</h3>
                        {course.classes.sort((a, b) => b.year - a.year).map(classe => (
                            <div className="p-1 hover:bg-ifrn-500 m-1 rounded" key={classe.id}>
                                <button onClick={() => {
                                    navigate(`/classes/${classe.id}`);
                                    window.location.reload()
                                }}>
                                    {classe.name} - {classe.year}
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}