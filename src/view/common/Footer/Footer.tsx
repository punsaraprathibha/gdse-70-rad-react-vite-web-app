import './Footer.css';
import logo from "../../../assets/icon.png";
export function Footer() {
    return (
        <div className="footer">
            <p className="copyright">Copyright © 2025</p>
            <img src={logo} alt="" className="icon"/>
            <p className="business-name">Organic Shop</p>
        </div>
    );
}