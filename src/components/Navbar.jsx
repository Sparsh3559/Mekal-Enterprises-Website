import { useState } from "react";

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(null);

  const categories = [
    {
      name: "Apparel",
      items: {
        "T-Shirts": ["Round Neck", "Polo", "Oversized"],
        Hoodies: ["Zipper Hoodie", "Pullover"],
      },
    },
    {
      name: "Drinkware",
      items: {
        Mugs: ["Ceramic", "Magic Mug", "Photo Mug"],
        Bottles: ["Steel Bottle", "Sipper"],
      },
    },
    {
      name: "Marketing",
      items: {
        "Visiting Cards": ["Standard", "Premium", "Folded"],
        Banners: ["Flex Banner", "Standee"],
      },
    },
  ];

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <nav className="navbar">

        <button
          className="hamburger"
          onClick={() =>
            setOpenMobile(openMobile === "menu" ? null : "menu")
          }
        >
          ☰
        </button>

        <div className="logo">PRINT HUB</div>

        <input className="search" placeholder="Search products..." />

        <div className="actions">
          <button>Support</button>
          <button>Login</button>
        </div>
      </nav>

      {/* ===== CATEGORIES BAR ===== */}
      <div className="categories">

        {categories.map((cat) => (
          <div key={cat.name} className="dropdown">
            {cat.name}

            {/* LEVEL 1 */}
            <div className="dropdown-content">
              {Object.entries(cat.items).map(
                ([title, list]) => (
                  <div key={title} className="submenu">
                    {title}

                    {/* LEVEL 2 */}
                    <div className="submenu-content">
                      {list.map((item) => (
                        <a key={item} href="#">
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ===== MOBILE MENU ===== */}
      {openMobile === "menu" && (
        <div className="mobile-menu">
          {categories.map((cat) => (
            <details key={cat.name}>
              <summary>{cat.name}</summary>

              {Object.entries(cat.items).map(
                ([title, list]) => (
                  <details key={title} className="mobile-sub">
                    <summary>{title}</summary>

                    {list.map((item) => (
                      <a key={item} href="#">
                        {item}
                      </a>
                    ))}
                  </details>
                )
              )}
            </details>
          ))}
        </div>
      )}

      {/* ===== STYLES ===== */}
      <style>{`

      /* NAVBAR */
      .navbar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: white;
        border-bottom: 1px solid #eee;
      }

      .logo {
        font-weight: 800;
      }

      .search {
        flex: 1;
        padding: 10px 14px;
        border-radius: 22px;
        border: 1px solid #ddd;
      }

      .actions button {
        background: none;
        border: none;
        font-weight: 600;
        margin-left: 8px;
      }

      .hamburger {
        font-size: 22px;
        background: none;
        border: none;
        cursor: pointer;
      }

      /* ===== DESKTOP DROPDOWN ===== */
      .categories {
        display: flex;
        gap: 30px;
        padding: 12px 24px;
        background: #fafafa;
        border-bottom: 1px solid #eee;
      }

      .dropdown {
        position: relative;
        font-weight: 600;
        cursor: pointer;
      }

      .dropdown-content {
        position: absolute;
        display: none;
        background: white;
        box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        padding: 10px 0;
        min-width: 180px;
      }

      .dropdown:hover .dropdown-content {
        display: block;
      }

      .submenu {
        position: relative;
        padding: 8px 16px;
      }

      .submenu-content {
        position: absolute;
        left: 100%;
        top: 0;
        display: none;
        background: white;
        box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        min-width: 180px;
      }

      .submenu:hover .submenu-content {
        display: block;
      }

      .submenu-content a {
        display: block;
        padding: 8px 16px;
        text-decoration: none;
        color: #444;
      }

      .submenu-content a:hover {
        background: #f2f2f2;
      }

      /* ===== MOBILE MENU ===== */
      .mobile-menu {
        padding: 16px;
        background: white;
        border-top: 1px solid #eee;
      }

      details summary {
        padding: 10px 0;
        font-weight: 600;
        cursor: pointer;
      }

      .mobile-sub {
        margin-left: 12px;
      }

      .mobile-sub a {
        display: block;
        padding: 6px 0;
        color: #444;
        text-decoration: none;
      }

      /* RESPONSIVE */
      @media (max-width: 768px) {
        .categories {
          display: none;
        }
      }

      @media (min-width: 768px) {
        .hamburger {
          display: none;
        }
      }

      `}</style>
    </>
  );
}