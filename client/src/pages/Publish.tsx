import { useEffect, useMemo, useState } from "react"
import { AppBar } from "../Components/ui/AppBar"
import { Postinput, postinput } from "@notoriouspran/medium-clone-common"
import axios from "axios"
import LoadingSpinner from "../Components/ui/LoadingSpinner"
import { useNavigate } from "react-router-dom"
import { Button } from "../Components/ui/ButtonEffect"
import { TextGenerateEffect } from "../Components/ui/TextGenerate"
const serverUrl = import.meta.env.VITE_SERVER_URL
import { FiShare } from "react-icons/fi";

export const Publish = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/signin')
        }
    }, [navigate])

    return (
        <div className="bg-black bg-grid-small-white/[0.2] min-h-screen">
            <AppBar />
            <div className="text-4xl font-extrabold text-white max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 pt-20 pb-4">
                Publish a New Blog
            </div>
            <Input />
        </div>
    )
}

const Input = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Postinput>({
        title: '',
        description: '',
    })
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof Postinput, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const result = postinput.safeParse(formData);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<Record<keyof Postinput, string>>);
            setLoading(false);
        } else {
            const serverResponse = await serverPublish(formData);
            if (serverResponse === 'fail500') {
                console.log('Server error');
                setLoading(false);
            }
            console.log(formData)
            setLoading(false);
            navigate(`/blog/${serverResponse}`)
        }
    }

    const serverPublish = async (formData: Postinput) => {
        try {
            // include authorization token
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            const response = await axios.post(`${serverUrl}/api/v1/blog/`, formData);
            console.log(response.data);
            return response.data.id;
        } catch (error) {
            console.log(error);
            return 'fail500';
        }
    }

    const CustomPlaceholder = useMemo(() => {
        const words = `Meri Ek taang nakli hai, Mai hockey ka bohoth bada khiladi tha.
            Ek din Uday bhai ko meri kisi baat pe gussa aagaya aur mere he hockey se meri taang ke do tukde kar diye.
            Lekin dil ke bohot ache hai, Fauran mujhe hospital le gaye aur ye nakli taang lagwayi.`
        return (
            <div className="text-gray-400">
                <TextGenerateEffect words={words} />
            </div>
        )
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <label htmlFor="title" className="block mb-2 text-lg font-medium text-white">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    maxLength={100}
                    className="border text-sm rounded-lg block w-full p-2.5 bg-neutral-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-2"
                    placeholder="Chai Peeyo, Biscuit Khaao"
                    onChange={handleChange}
                />
                {errors.title && <span className="text-red-500">{errors.title}</span>}

                <label htmlFor="description" className="block mb-2 text-lg font-medium text-white">Content</label>
                <div className="relative">
                    {!formData.description && (
                        <div className="absolute p-2.5 pointer-events-none">
                            {CustomPlaceholder}
                        </div>
                    )}
                    <textarea
                        id="description"
                        name="description"
                        rows={8}
                        className="block p-2.5 w-full text-sm rounded-lg border bg-neutral-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        onChange={handleChange}
                    />
                </div>
                {errors.description && <span className="text-red-500">{errors.description}</span>}

                <div className="flex justify-end p-4 font-bold">
                    <Button type='submit'>
                        {loading ? <LoadingSpinner /> : 'Publish'}{!loading&&<FiShare className="ml-2"/>}
                    </Button>
                </div>
            </div>
        </form>
    )
}
