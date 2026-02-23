import { useEffect, useState } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [showCategories, setShowCategories] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  // Hide categories on scroll down, show on scroll up
  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        setShowCategories(false);
      } else {
        setShowCategories(true);
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* ========= TOP BAR ========= */}
      <nav className="navbar">

        {/* MOBILE HAMBURGER */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>

        <div className="logo">PRINT HUB</div>

        <input
          className="search"
          placeholder="Search products"
        />

        <div className="actions">
          <button>Support</button>
          <button>Login</button>
        </div>
      </nav>

      {/* ========= CATEGORIES BAR ========= */}
      <div
        className={`categories-bar ${
          showCategories ? "show" : "hide"
        }`}
      >
        {categories.map((cat, i) => (
          <div
            key={i}
            className="category"
            onMouseEnter={() => setOpenMenu(i)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            {cat.name}

            {openMenu === i && (
              <div className="mega">
                {Object.entries(cat.items).map(
                  ([title, list]) => (
                    <div key={title} className="col">
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
        ))}
      </div>

      {/* ========= MOBILE DRAWER ========= */}
      {mobileOpen && (
        <div className="drawer">
          <div className="drawer-header">
            <span>Menu</span>
            <button onClick={() => setMobileOpen(false)}>
              ✕
            </button>
          </div>

          {categories.map((cat, i) => (
            <div key={i}>
              <div
                className="drawer-item"
                onClick={() =>
                  setExpanded(expanded === i ? null : i)
                }
              >
                {cat.name} ▸
              </div>

              {expanded === i &&
                Object.entries(cat.items).map(
                  ([title, list]) => (
                    <div key={title} className="drawer-sub">
                      <strong>{title}</strong>

                      {list.map((item) => (
                        <a key={item} href="#">
                          {item}
                        </a>
                      ))}
                    </div>
                  )
                )}
            </div>
          ))}
        </div>
      )}

      {/* ========= STYLES ========= */}
      <style>{`

      /* ===== TOP BAR ===== */
      .navbar {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 14px 24px;
        background: white;
        border-bottom: 1px solid #eee;
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .logo {
        font-weight: 800;
        font-size: 22px;
      }

      .search {
        flex: 1;
        padding: 10px 14px;
        border-radius: 30px;
        border: 1px solid #ddd;
      }

      .actions button {
        background: none;
        border: none;
        font-weight: 600;
        margin-left: 12px;
        cursor: pointer;
      }

      /* ===== HAMBURGER ===== */
      .hamburger {
        display: none;
        font-size: 22px;
        background: none;
        border: none;
      }

      /* ===== CATEGORIES BAR ===== */
      .categories-bar {
        display: flex;
        gap: 30px;
        padding: 12px 24px;
        background: #fafafa;
        border-bottom: 1px solid #eee;
        position: sticky;
        top: 60px;
        z-index: 999;
        transition: transform 0.3s;
      }

      .categories-bar.hide {
        transform: translateY(-100%);
      }

      .categories-bar.show {
        transform: translateY(0);
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
        top: 36px;
        width: 100vw;
        background: white;
        box-shadow: 0 10px 40px rgba(0,0,0,0.12);
        display: flex;
        gap: 60px;
        padding: 30px 60px;
      }

      .col h4 {
        margin-bottom: 12px;
      }

      .col a {
        display: block;
        margin: 6px 0;
        text-decoration: none;
        color: #444;
      }

      /* ===== MOBILE DRAWER ===== */
      .drawer {
        position: fixed;
        left: 0;
        top: 0;
        width: 85%;
        height: 100vh;
        background: white;
        z-index: 2000;
        padding: 20px;
        overflow-y: auto;
        box-shadow: 4px 0 20px rgba(0,0,0,0.2);
      }

      .drawer-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .drawer-item {
        padding: 14px 0;
        font-weight: 600;
        border-bottom: 1px solid #eee;
        cursor: pointer;
      }

      .drawer-sub {
        padding-left: 10px;
        margin-bottom: 12px;
      }

      .drawer-sub a {
        display: block;
        margin: 6px 0;
        color: #444;
        text-decoration: none;
      }

      /* ===== MOBILE ===== */
      @media (max-width: 768px) {
        .search {
          display: none;
        }

        .hamburger {
          display: block;
        }

        .categories-bar {
          display: none;
        }
      }

      `}</style>
    </>
  );
}