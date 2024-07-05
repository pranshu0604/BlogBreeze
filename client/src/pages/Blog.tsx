import { AppBar } from "../Components/ui/AppBar"
import { useNavigate, useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { Avatar } from "../Components/ui/Avatar"
import { toZonedTime } from "date-fns-tz"
import { TracingBeam } from "../Components/ui/tracing-beam"
import { useEffect } from "react"
import NotFoundPage from "./NotFoundPage"

export const Blog = () => {
    const navigate = useNavigate()
    try{useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/signin')
        }
    }, [navigate])

    const { id } = useParams()


    
    const { loading, blog } = useBlog({
        id: id || ""
    })


    const date = new Date(blog?.data?.publishedDate ?? '');

    const timeZone = 'Asia/Kolkata';
    const zonedDate = toZonedTime(date, timeZone);
    const formattedDate = zonedDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });



    return (<div className="bg-black text-white bg-grid-small-white/[0.2] min-h-screen">
        <AppBar />
        <div className="max-md:flex max-md:flex-col-reverse md:grid md:grid-cols-3 px-10 py-16">
            <div className="md:col-span-2 ml-10">
                <TracingBeam>

                    <div className="text-5xl text-gray-200 break-words font-extrabold mb-1">
                        {loading && <TitleSkeleton />}
                        {!loading && blog?.data.title}
                    </div>
                    {loading && <PublishedSkeleton />}
                    {!loading && <div className="text-gray-500">Posted on {formattedDate}</div>}
                    <div className="pt-4 text-lg text-gray-200 whitespace-pre-wrap break-words">
                        {loading && <DescriptionSkeleton />}
                        {!loading && blog?.data.description}
                    </div>
                </TracingBeam>
                <div className="h-1" />
            </div>

            <div className="max-md:mb-3 md:col-span-1">
                {loading && <AuthorSkeletonHeader />}
                {!loading && <div className="m-2 ml-6">
                    Author
                </div>}
                {loading && <AuthorSkeletonBody />}
                {!loading && <div className="flex items-center ml-6">
                    <Avatar name={`${blog?.data?.author.firstname} ${blog?.data?.author.lastname}`} />
                    <div className="mx-2">
                        <div>{blog?.data?.author.firstname} {blog?.data?.author.lastname}</div>
                    </div>
                </div>}
            </div>

        </div>
    </div>
    )}catch{
        return <NotFoundPage/>
    }
}

const TitleSkeleton = () => {
    return (
        <div role="status" className="w-5/6 animate-pulse">
            <div className="h-10 rounded-sm bg-gray-700 mb-4" />
        </div>
    )
}
const PublishedSkeleton = () => {
    return (
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-3 rounded-sm bg-gray-700 w-48 mb-4" />
        </div>
    )
}
const DescriptionSkeleton = () => {
    return (
        <div role="status" className="animate-pulse">
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-5/6 mb-3.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-3/4 mb-3.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5"></div>
            <div className="h-4 rounded-sm bg-gray-700 w-11/12 mb-2.5"></div>
        </div>
    )
}
const AuthorSkeletonHeader = () => {
    return (
        <div role="status" className="w-5/6 animate-pulse">
            <div className="h-5 m-2 ml-6 flex items-center rounded-sm bg-gray-700 w-1/4" />
        </div>
    )
}
const AuthorSkeletonBody = () => {
    return (
        <div role="status" className="w-5/6 ml-6 flex items-center animate-pulse">
            <div className="h-10 w-10 rounded-full bg-gray-700" />
            <div className="h-5 mx-2 flex items-center rounded-sm bg-gray-700 w-3/4" />
        </div>
    )
}