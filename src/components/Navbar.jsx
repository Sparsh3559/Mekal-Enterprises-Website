import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header">

      {/* ===== TOP BAR ===== */}
      <div className="topbar">

        <div className="logo">PRINT HUB</div>

        <input
          className="search"
          placeholder="Search products, services..."
        />

        <div className="actions">
          <button className="support">Support</button>
          <button className="login">Login</button>

          {/* MOBILE HAMBURGER */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* ===== CATEGORY BAR ===== */}
      <nav className="category-bar">

        <div className="category">
          Apparel
          <div className="mega">
            <div className="mega-inner">
              <div>
                <h4>T-Shirts</h4>
                <Link to="/tshirt-printing">Round Neck</Link>
                <Link to="/tshirt-printing">Polo</Link>
                <Link to="/tshirt-printing">Oversized</Link>
              </div>
              <div>
                <h4>Corporate Wear</h4>
                <Link to="/tshirt-printing">Uniform</Link>
                <Link to="/tshirt-printing">Event Apparel</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="category">
          Drinkware
          <div className="mega">
            <div className="mega-inner">
              <div>
                <h4>Mugs</h4>
                <Link to="/mug-printing">Ceramic</Link>
                <Link to="/mug-printing">Magic Mug</Link>
                <Link to="/mug-printing">Photo Mug</Link>
              </div>
              <div>
                <h4>Bottles</h4>
                <Link to="/mug-printing">Steel Bottles</Link>
                <Link to="/mug-printing">Sipper Bottles</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="category">
          Marketing
          <div className="mega">
            <div className="mega-inner">
              <div>
                <h4>Banners</h4>
                <Link to="/banner-printing">Vinyl</Link>
                <Link to="/banner-printing">Flex</Link>
              </div>
              <div>
                <h4>Corporate</h4>
                <Link to="/corporate-printing">Visiting Cards</Link>
                <Link to="/corporate-printing">Brochures</Link>
              </div>
            </div>
          </div>
        </div>

      </nav>

      {/* ===== MOBILE MENU ===== */}
      {mobileOpen && (
        <div className="mobile-menu">

          <details>
            <summary>Apparel</summary>
            <Link to="/tshirt-printing">Round Neck</Link>
            <Link to="/tshirt-printing">Polo</Link>
          </details>

          <details>
            <summary>Drinkware</summary>
            <Link to="/mug-printing">Ceramic Mugs</Link>
            <Link to="/mug-printing">Magic Mugs</Link>
          </details>

          <details>
            <summary>Marketing</summary>
            <Link to="/banner-printing">Banners</Link>
            <Link to="/corporate-printing">Visiting Cards</Link>
          </details>

        </div>
      )}

      {/* ===== CSS ===== */}
      <style>{`

        .header {
          position: sticky;
          top: 0;
          background: white;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }

        /* ===== TOP BAR ===== */

        .topbar {
          display: flex;
          align-items: center;
          padding: 14px 28px;
          gap: 20px;
        }

        .logo {
          font-weight: 800;
          font-size: 22px;
          white-space: nowrap;
        }

        .search {
          flex: 1;
          padding: 12px 16px;
          border-radius: 30px;
          border: 1px solid #ddd;
          font-size: 14px;
        }

        .actions {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .support,
        .login {
          background: transparent;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }

        .hamburger {
          display: none;
          font-size: 22px;
          background: none;
          border: none;
          cursor: pointer;
        }

        /* ===== CATEGORY BAR ===== */

        .category-bar {
          display: flex;
          gap: 40px;
          padding: 12px 28px;
          border-top: 1px solid #eee;
          background: #fafafa;
        }

        .category {
          position: relative;
          font-weight: 600;
          cursor: pointer;
        }

        /* ===== MEGA MENU ===== */

        .mega {
          position: absolute;
          left: 0;
          top: 100%;
          width: 100vw;
          background: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          opacity: 0;
          visibility: hidden;
          transition: 0.25s;
        }

        .category:hover .mega {
          opacity: 1;
          visibility: visible;
        }

        .mega-inner {
          max-width: 1200px;
          margin: auto;
          padding: 40px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .mega-inner h4 {
          margin-bottom: 12px;
        }

        .mega-inner a {
          display: block;
          color: #555;
          text-decoration: none;
          margin-bottom: 8px;
        }

        .mega-inner a:hover {
          text-decoration: underline;
          color: black;
        }

        /* ===== MOBILE ===== */

        .mobile-menu {
          padding: 20px;
          border-top: 1px solid #eee;
          background: white;
        }

        .mobile-menu a {
          display: block;
          padding: 8px 0;
          text-decoration: none;
          color: #333;
        }

        @media (max-width: 900px) {

          .search {
            display: none;
          }

          .category-bar {
            display: none;
          }

          .hamburger {
            display: block;
          }

        }

      `}</style>

    </header>
  );
}