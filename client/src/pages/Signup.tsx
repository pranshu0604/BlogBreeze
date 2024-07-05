import { Quote } from "../Components/ui/Quote";
import { HeroText } from "../Components/ui/HeroText";
import { SignupForm } from "../Components/ui/signupform";
import Logo from "../assets/Designer_prev_ui.png";

export const SignUp = () => {
    return (
        <div className="lg:grid lg:grid-cols-5 lg:min-h-screen">
            <div className="lg:col-span-3 bg-black min-h-screen text-white flex flex-col">

                <img src={Logo} alt="Designer" style={{ filter: 'invert(1)',
                    height: '120px',
                    width: '120px',
                 }}
                 className="lg:absolute lg:top-5 lg:left-8"/>

                <div className="w-full flex justify-center lg:h-auto mt-10">

                    <div className="h-full -mt-12 lg:mt-5">
                    <SignupForm />
                    </div>

                </div>
                
                <div className="lg:relative lg:bg-black my-5 lg:mt-9 lg:mb-4">
                <HeroText />
                </div>

            </div>
            <div className="lg:col-span-2 flex justify-center items-center">
                <Quote />
            </div>
        </div>
    );
};