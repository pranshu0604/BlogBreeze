import axios from "axios"
import { useEffect, useState } from "react"

const serverUrl = import.meta.env.VITE_SERVER_URL

export type BlogType = {
    data: {
        id: string
        title: string
        description: string
        publishedDate: string
        authorId: string
        author: {
            firstname: string
            lastname: string
        }
    }
}

type Blogs = {
    data: {
        id: string
        title: string
        description: string
        publishedDate: string
        authorId: string
        author: {
            firstname: string
            lastname: string
        }
    }[]
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blogs>()

    useEffect(() => {
        const fetchData = async () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            const blogs: Blogs = await axios.get(`${serverUrl}/api/v1/blog/bulk`)
            setBlogs(blogs);
            setLoading(false)
        }

        fetchData();
    }, []);

    return { loading, blogs }
}

export const useBlog = ({id}: {id:string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<BlogType>()

    useEffect(() => {
        const fetchData = async () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            const blog: BlogType = await axios.get(`${serverUrl}/api/v1/blog/single/${id}`)
            setBlog(blog);
            setLoading(false)
        }

        fetchData();
    }, []);

    return { loading, blog }
}