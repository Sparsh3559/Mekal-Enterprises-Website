import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">PRINT HUB</div>

      {/* MAIN MENU */}
      <ul className="menu">

        {/* ===== APPAREL ===== */}
        <li className="menu-item">
          Apparel

          <div className="mega-menu">
            <div className="mega-container">

              <div className="mega-column">
                <h4>T-Shirts</h4>
                <Link to="/tshirt-printing">Round Neck T-Shirts</Link>
                <Link to="/tshirt-printing">Polo T-Shirts</Link>
                <Link to="/tshirt-printing">Oversized T-Shirts</Link>
              </div>

              <div className="mega-column">
                <h4>Corporate Wear</h4>
                <Link to="/tshirt-printing">Uniform Printing</Link>
                <Link to="/tshirt-printing">Event Apparel</Link>
                <Link to="/tshirt-printing">Team Jerseys</Link>
              </div>

            </div>
          </div>
        </li>

        {/* ===== DRINKWARE ===== */}
        <li className="menu-item">
          Drinkware

          <div className="mega-menu">
            <div className="mega-container">

              <div className="mega-column">
                <h4>Mugs</h4>
                <Link to="/mug-printing">Ceramic Mugs</Link>
                <Link to="/mug-printing">Magic Mugs</Link>
                <Link to="/mug-printing">Photo Mugs</Link>
              </div>

              <div className="mega-column">
                <h4>Bottles</h4>
                <Link to="/mug-printing">Steel Bottles</Link>
                <Link to="/mug-printing">Sipper Bottles</Link>
                <Link to="/mug-printing">Glass Bottles</Link>
              </div>

            </div>
          </div>
        </li>

        {/* ===== MARKETING ===== */}
        <li className="menu-item">
          Marketing

          <div className="mega-menu">
            <div className="mega-container">

              <div className="mega-column">
                <h4>Posters & Banners</h4>
                <Link to="/banner-printing">Vinyl Banners</Link>
                <Link to="/banner-printing">Flex Printing</Link>
                <Link to="/banner-printing">Large Posters</Link>
              </div>

              <div className="mega-column">
                <h4>Corporate Printing</h4>
                <Link to="/corporate-printing">Visiting Cards</Link>
                <Link to="/corporate-printing">Brochures</Link>
                <Link to="/corporate-printing">Flyers</Link>
              </div>

            </div>
          </div>
        </li>

      </ul>

      {/* CSS */}
      <style>{`

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 40px;
          background: white;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .logo {
          font-size: 22px;
          font-weight: 800;
        }

        .menu {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .menu-item {
          position: relative;
          font-weight: 600;
          cursor: pointer;
        }

        /* ===== MEGA MENU ===== */

        .mega-menu {
          position: absolute;
          left: 0;
          top: 100%;
          width: 100vw;
          background: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          opacity: 0;
          visibility: hidden;
          transition: all 0.25s ease;
        }

        .menu-item:hover .mega-menu {
          opacity: 1;
          visibility: visible;
        }

        .mega-container {
          max-width: 1200px;
          margin: auto;
          padding: 40px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .mega-column h4 {
          font-size: 16px;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .mega-column a {
          display: block;
          color: #555;
          text-decoration: none;
          margin-bottom: 8px;
          font-size: 14px;
          transition: color 0.2s;
        }

        .mega-column a:hover {
          color: #000;
          text-decoration: underline;
        }

        /* MOBILE (disable mega) */
        @media (max-width: 900px) {
          .menu {
            display: none;
          }
        }

      `}</style>
    </nav>
  );
}