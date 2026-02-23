import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [level, setLevel] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
          onClick={() => {
            setMobileOpen(true);
            setLevel(0);
          }}
        >
          ☰
        </button>

        <div className="logo">PRINT HUB</div>

        <input className="search" placeholder="Search" />

        <div className="actions">
          <button>Support</button>
          <button>Login</button>
        </div>
      </nav>

      {/* ===== MOBILE DRAWER ===== */}
      {mobileOpen && (
        <div className="drawer">

          {/* LEVEL 0 — MAIN CATEGORIES */}
          <div
            className="panel"
            style={{ transform: `translateX(${level * -100}%)` }}
          >
            <div className="drawer-header">
              <span>Categories</span>
              <button onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            {categories.map((cat) => (
              <div
                key={cat.name}
                className="drawer-item"
                onClick={() => {
                  setSelectedCategory(cat);
                  setLevel(1);
                }}
              >
                {cat.name} ▸
              </div>
            ))}
          </div>

          {/* LEVEL 1 — SUB CATEGORIES */}
          {selectedCategory && (
            <div
              className="panel"
              style={{ transform: `translateX(${level * -100}%)` }}
            >
              <div className="drawer-header">
                <button onClick={() => setLevel(0)}>←</button>
                <span>{selectedCategory.name}</span>
              </div>

              {Object.entries(selectedCategory.items).map(
                ([title, list]) => (
                  <div key={title} className="sub-section">
                    <h4>{title}</h4>

                    {list.map((item) => (
                      <a key={item} href="#">
                        {item}
                      </a>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* ===== STYLES ===== */}
      <style>{`
      
      .navbar {
        display: flex;
        align-items: center;
        padding: 14px 16px;
        background: white;
        border-bottom: 1px solid #eee;
        gap: 12px;
      }

      .logo {
        font-weight: 800;
      }

      .search {
        flex: 1;
        padding: 8px 12px;
        border-radius: 20px;
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
      }

      /* ===== DRAWER ===== */
      .drawer {
        position: fixed;
        top: 0;
        left: 0;
        width: 85%;
        height: 100vh;
        background: white;
        z-index: 2000;
        overflow: hidden;
      }

      /* Each sliding panel */
      .panel {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding: 16px;
        transition: transform 0.3s ease;
      }

      .drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .drawer-item {
        padding: 14px 0;
        border-bottom: 1px solid #eee;
        font-weight: 600;
        cursor: pointer;
      }

      .sub-section {
        margin-bottom: 20px;
      }

      .sub-section h4 {
        margin-bottom: 10px;
      }

      .sub-section a {
        display: block;
        padding: 6px 0;
        text-decoration: none;
        color: #444;
      }

      /* Desktop hide hamburger */
      @media (min-width: 768px) {
        .hamburger {
          display: none;
        }
      }

      `}</style>
    </>
  );
}