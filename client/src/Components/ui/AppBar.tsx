import { Avatar } from "./Avatar";
import Logo from "../../assets/Designer_prev_ui.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";



export const AppBar = () => {
    const name = localStorage.getItem('name')
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin')
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const DropDownMenuButton = () => {
        return (
            <button
                id="dropdownButton"
                onClick={toggleDropdown}
                className="text-white focus:outline-none"
            >
                <svg
                    className="w-5 h-5 inline ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
        )
    }

    const RegularOptions = () => {
        return <>
            <Avatar name={name||''} />
            <button className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 font-bold focus:ring-offset-slate-50 mx-2" onClick={handleLogout}>
          Logout <CiLogout className="ml-2"/>
        </button>
        </>
    }

    const DropDownOptions = () => {
        return (
            <button className="absolute flex items-center right-0 mr-1 mt-1 h-12 animate-shimmer rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-bold text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={handleLogout}>
                Logout <CiLogout className="ml-2"/>
            </button>
        );
    }


    return (
        <div className="flex z-10 bg-black fixed w-full bg-grid-small-white/[0.2] justify-between items-center px-10 border-b mb-2">
            <Link to='/'>
                <div className="flex items-center">
                    <div className="h-14 w-14">
                        <img src={Logo} style={{ filter: 'invert(1)' }} />
                    </div>
                    <div className="text-3xl px-3 font-semibold text-white">
                        BlogBreeze
                    </div>
                </div>
            </Link>
            <div className="max-md:hidden">
                {<RegularOptions />}
            </div>
            <div className="md:hidden">
                <div className="flex">
                    <Avatar name={name||''} />
                    <DropDownMenuButton />
                </div>
                {isDropdownOpen && <DropDownOptions />}
            </div>

        </div>
    );
}
