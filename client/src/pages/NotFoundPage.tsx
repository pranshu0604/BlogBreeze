import { Link } from "react-router-dom";


const NotFoundPage = () => {
    return (
        <div className="bg-black bg-grid-small-white/[0.2] min-h-screen flex items-center justify-center">
            <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl">Seems like Pran didn't need this page.</p>
                <Link to="/" className="text-blue-500 hover:underline">Go to Home Page</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
