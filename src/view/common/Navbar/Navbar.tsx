import './Navbar.css';
import icon from '../../../assets/icon.png';
import {Link} from "react-router-dom";

export function Navbar() {

    return (
        <div className="p-2 bg-[#444544] flex justify-between
                          ">
            <div className="flex p-2">
                <h1 className="text-3xl text-[#e6f0e6] hover:text-green-400">
                    Organic Shop</h1>
                <img className="h-[2.5rem] w-[2.5rem] ml-2 pt-1" src={icon}
                     alt=""/>
            </div>
            <ul className="list-none flex mt-2 mb-2">
                <li className="mr-2 text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                    <Link to="/">Home</Link>
                </li>
                <li className="mr-2 text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                    <Link to="/about">About</Link>
                </li>
                <li className="mr-2 text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                    <Link to="/contact">Contact</Link>
                </li>
                <li className="mr-2 text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                    <Link to="/shopping-cart">My-Cart</Link>
                </li>
            </ul>
            <Link to="/login" className="text-[1.5rem] text-[#e6f0e6] bg-[#1f9e4b] py-3 px-6
                               rounded-lg border-white border-2 hover:bg-green-400">
                Sign In
            </Link>
        </div>
    );
}