import {Avatar} from "./Avatar";
interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    description: string;
    publishedDate: string;
}

export default function BlogCard({ authorName, title, description, publishedDate }: BlogCardProps) {
    const avgCPM=183*5      //Average Characters per minute reading speed
    return (
        <div className="border-b border-slate-200 my-1">
            <div className="flex items-center mb-1">
                <div className="mr-2">
                <Avatar name={authorName} />
                </div>
                {authorName} • {publishedDate}
            </div>
            <div className="text-2xl break-words font-bold">{title}</div>
            <div className="text-lg break-words text-slate-200">{description.slice(0, 100) + "..."}</div>
            <div className="text-md font-light my-2 text-slate-300">{Math.ceil(description.length / avgCPM)} min read</div>
        </div>
    );
}