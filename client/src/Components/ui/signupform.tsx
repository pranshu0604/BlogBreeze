import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "../../../utils/cn";
import { Link } from "react-router-dom";
import { Signupinput, signupinput } from "@notoriouspran/medium-clone-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
const serverUrl = import.meta.env.VITE_SERVER_URL

export const SignupForm: React.FC = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState<Signupinput>({
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof Signupinput, string>>>({});

  type serverErrorType = {
    email: string | undefined
  }
  const [serverError, setServerError] = useState<serverErrorType>({
    email: undefined
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = signupinput.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<Record<keyof Signupinput, string>>);
      setLoading(false);
    } else {
      const serverResponse = await serverSignUp(formData);
      if (serverResponse === 'email403') {
        setServerError((prev) => ({ ...prev, email: "Email already taken" }));
        setLoading(false);
      }
      else if(serverResponse === 'ok200'){ {
        console.log('Form submitted:', result.data);
        setErrors({});
        setServerError((prev) => ({ ...prev, email: undefined}));
        setLoading(false);
        navigate('/blogs')
      }
    }
  }
    return 'fail500'
  }


  const serverSignUp = async (formData: Signupinput): Promise<string> => {
    try{
      const response = await axios.post(`${serverUrl}/api/v1/user/signup`, formData);
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('name',formData.firstname);
      return 'ok200';
    }
    catch(error: any) {
      console.log(error);
      if(error.response.data.error === 'email403'){
        return 'email403';
      }
      return 'fail500'
    }
  }

  return (
    <div className="rounded-none shadow-input bg-black">
      <h2 className="font-bold text-2xl text-neutral-200 mb-4">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:space-x-2 max-md:mb-4">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="firstname" className="text-neutral-300">First name</Label>
            <Input id="firstname" name="firstname" onChange={handleChange} value={formData.firstname} placeholder="Walter" type="text" className="bg-neutral-800 text-white" />
            {errors.firstname && <span className="text-red-500">{errors.firstname}</span>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-neutral-300">Last name</Label>
            <Input id="lastname" name="lastname" onChange={handleChange} value={formData.lastname} placeholder="White" type="text" className="bg-neutral-800 text-white" />
            {errors.lastname && <span className="text-red-500">{errors.lastname}</span>}
          </LabelInputContainer>
        </div>
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
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {(loading)?
          <div className="flex justify-center"><LoadingSpinner /></div> 
          :<>Sign up &rarr;</>}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <Link to={'/signin'}>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-white rounded-md h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button">
              <span className="text-neutral-300 text-sm">Already have an account? Login</span>
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
