import './Navbar.css';
import logo from '../../../assets/icon.png';
import {Link} from "react-router-dom";
export function Navbar() {
    return (
        <div className="navbar">
            <img src={logo} alt="" className="icon"/>
            <p className="business-name">Organic Shop</p>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>

            <button className="btn-sign-in">
                <Link to="/login">Sign In</Link>
            </button>
        </div>
    );
}