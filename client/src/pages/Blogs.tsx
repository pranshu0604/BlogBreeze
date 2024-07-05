import { AppBar } from "../Components/ui/AppBar"
import BlogCard from "../Components/ui/BlogCard"
import { Link, useNavigate } from "react-router-dom"
import { useBlogs } from "../hooks"
import { toZonedTime } from "date-fns-tz"
import { Button } from "../Components/ui/ButtonEffect"
import { useEffect } from "react"
import { FiPenTool } from "react-icons/fi";


export const Blogs = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/signin')
        }
      }, [navigate])

    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div className="min-h-screen bg-black relative">
                <AppBar/>
                <div className="bg-grid-small-white/[0.2] flex flex-col items-center pt-16">
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                </div>
            </div>)
    }

    return (
        <div className="bg-black text-white min-h-screen relative">
            <AppBar/>
            
            <div className="flex bg-grid-small-white/[0.2] justify-center pt-16 pb-24">
                <div className="w-3/4">
                    {blogs && blogs.data && blogs.data.length > 0 ? (
                        blogs.data.map((blog: { id: string; title: string; description: string; author: { firstname: string; lastname: string }; publishedDate: string }) => {
                            const date = new Date(blog.publishedDate);
                            const timeZone = 'Asia/Kolkata';
                            const zonedDate = toZonedTime(date, timeZone);
                            const formattedDate = zonedDate.toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });
    
                            return (
                                <Link to={`/blog/${blog.id}`} key={blog.id}>
                                    <BlogCard
                                        key={blog.id}
                                        id={blog.id}
                                        title={blog.title}
                                        description={blog.description}
                                        authorName={`${blog.author.firstname} ${blog.author.lastname}`}
                                        publishedDate={formattedDate}
                                    />
                                </Link>
                            );
                        })
                    ) : (
                        <p>No blogs available</p>
                    )}
                </div>
            </div>
            <div className="fixed bottom-8 right-8 font-extrabold">
                <Button onClick={() => {navigate('/publish')}}>
                    New Blog <FiPenTool className="ml-2"/>
                </Button>
            </div>
        </div>
    );
}

const LoadingSkeleton = () => {
    return (
        <div role="status" className="animate-pulse w-3/4 flex flex-col border-b border-slate-200">
            <div className="flex items-center mt-1">
                <div className="h-10 w-10 rounded-full bg-gray-700" />
                <div className="h-5 mx-2 flex items-center rounded-sm bg-gray-700 w-1/4" />
            </div>
            <div className="h-8 rounded-sm bg-gray-700 my-3" />
            <div className="h-4 rounded-sm bg-gray-700 w-full mb-2.5" />
            <div className="h-3 rounded-sm bg-gray-700 w-48 mb-3" />
        </div>
    )
}