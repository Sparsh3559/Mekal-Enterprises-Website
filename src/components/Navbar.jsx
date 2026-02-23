import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">PRINT HUB</div>

      {/* MENU */}
      <ul className="nav-links">

        {/* APPAREL */}
        <li className="menu-item">
          Apparel

          <div className="mega-menu">
            <div className="mega-column">
              <h4>T-Shirts</h4>
              <Link to="/tshirt-printing">Round Neck T-Shirts</Link>
              <Link to="/tshirt-printing">Polo T-Shirts</Link>
              <Link to="/tshirt-printing">Oversized T-Shirts</Link>
            </div>

            <div className="mega-column">
              <h4>Hoodies</h4>
              <Link to="/corporate-printing">Zipper Hoodies</Link>
              <Link to="/corporate-printing">Pullover Hoodies</Link>
            </div>

            <div className="mega-column">
              <h4>Corporate Wear</h4>
              <Link to="/corporate-printing">Uniforms</Link>
              <Link to="/corporate-printing">Event Apparel</Link>
            </div>
          </div>
        </li>

        {/* DRINKWARE */}
        <li className="menu-item">
          Drinkware

          <div className="mega-menu">
            <div className="mega-column">
              <h4>Mugs</h4>
              <Link to="/mug-printing">Ceramic Mugs</Link>
              <Link to="/mug-printing">Magic Mugs</Link>
              <Link to="/mug-printing">Travel Mugs</Link>
            </div>

            <div className="mega-column">
              <h4>Bottles</h4>
              <Link to="/banner-printing">Steel Bottles</Link>
              <Link to="/banner-printing">Glass Bottles</Link>
            </div>

            <div className="mega-column">
              <h4>Tumblers</h4>
              <Link to="/banner-printing">Insulated Tumblers</Link>
            </div>
          </div>
        </li>

        {/* MARKETING */}
        <li className="menu-item">
          Marketing

          <div className="mega-menu">
            <div className="mega-column">
              <h4>Banners</h4>
              <Link to="/banner-printing">Flex Banners</Link>
              <Link to="/banner-printing">Vinyl Banners</Link>
            </div>

            <div className="mega-column">
              <h4>Posters</h4>
              <Link to="/banner-printing">Indoor Posters</Link>
              <Link to="/banner-printing">Outdoor Posters</Link>
            </div>

            <div className="mega-column">
              <h4>Corporate Kits</h4>
              <Link to="/corporate-printing">Branding Materials</Link>
            </div>
          </div>
        </li>

      </ul>
    </nav>
  );
}