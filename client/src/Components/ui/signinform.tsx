import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "../../../utils/cn";
import { Link } from "react-router-dom";
import { signininput, Signininput } from "@notoriouspran/medium-clone-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
const serverUrl = import.meta.env.VITE_SERVER_URL


export function SigninForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Signininput>({
    email: '',
    password: ''
  })
  const [loading,setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof Signininput, string>>>({});
  type serverErrorType = {
    email: string|undefined,
    password: string|undefined
  }
  const [serverError, setServerError] = useState<serverErrorType>({
    email: undefined,
    password: undefined
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); 
    setServerError((prev) => {
      const newErrors = { ...prev, [name]: undefined };
      if (name === 'email') {
        newErrors.password = undefined; 
      }
      return newErrors;
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const result = signininput.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<Record<keyof Signininput, string>>);
      setLoading(false)
    } else {
      const serverResponse = await serverLogin(formData);
      if (serverResponse==='pass404') {
        setServerError((prev) => ({ ...prev, password: "Incorrect password" }));
        setLoading(false)
      } 
      else if(serverResponse==='email404') {
        setServerError((prev) => ({ ...prev, email: "No account found with that email" }));
        setLoading(false)
      }
      else if(serverResponse==='ok200') {
        console.log('Form submitted:', result.data);
        setErrors({});
        setServerError((prev) => ({ ...prev, email: undefined, password: undefined }));
        setLoading(false)
        navigate('/blogs')
      }
    }
  };

    const serverLogin = async (formData: Signininput): Promise<string> => {
      try{
        const response = await axios.post(`${serverUrl}/api/v1/user/signin`, formData);
        console.log(response.data);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('name',response.data.fname);
        return 'ok200';
      }
      catch(error: any) {
        console.log(error);
        if(error.response.data.error === 'email404'){
          return 'email404';
        }
        else if(error.response.data.error === 'pass404'){
          return 'pass404';
        }
        return 'fail500'
      }
    }


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      <h2 className="font-bold text-2xl text-neutral-200">
        Login to Your Account
      </h2>
      <p className="text-neutral-300 text-sm max-w-sm mt-2">
        Login to access Lit content
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
          <Input id="email" name="email" onChange={handleChange} value={formData.email} placeholder="heisenberg@DEA.us" type="text" className="bg-neutral-800 text-white" />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
          {serverError.email && <span className="text-red-500">{serverError.email}</span>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-neutral-300">Password</Label>
          <Input id="password" name="password" onChange={handleChange} value={formData.password} placeholder="••••••••" type="password" className="bg-neutral-800 text-white" />
          {errors.password && <span className="text-red-500">{errors.password}</span>}
          {serverError.password && <span className="text-red-500">{serverError.password}</span>}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {(loading)? 
          <div className="flex justify-center"><LoadingSpinner /></div> :
          <>Log In &rarr;</>}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <Link to={'/signup'}>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button">
              <span className="text-neutral-300 text-sm">Don't have an Account? SignUp Now!</span>
              <BottomGradient />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
