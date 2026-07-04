import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBaar } from "./SearchBar";
import { CartIcon } from "./CartIcon";
import { WishlistIcon } from "./WishlistIcon";
import { ROUTES } from "../constants/index";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = (route) => {
    navigate(route);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 py-3">
      {/* MOBILE */}
      <div className="d-md-none w-100">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span
            className="fw-bold fs-4"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            GrillMart 🏠
          </span>

          <div className="position-relative" ref={menuRef}>
            <button
              className="btn btn-warning fw-bold px-3"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            {menuOpen && (
              <div
                className="position-absolute end-0 mt-2 bg-white border rounded-3 shadow-sm"
                style={{ minWidth: "160px", zIndex: 1000 }}
              >
                <div
                  className="px-3 py-2 border-bottom fw-semibold"
                  style={{ fontSize: "13px", cursor: "pointer" }}
                  onClick={() => handleNav(ROUTES.HOME)}
                >
                  🏠 Home
                </div>
                <div
                  className="px-3 py-2 border-bottom fw-semibold"
                  style={{ fontSize: "13px", cursor: "pointer" }}
                  onClick={() => handleNav(ROUTES.PRODUCTS)}
                >
                  🛍️ Products
                </div>
                <div
                  className="px-3 py-2 border-bottom fw-semibold"
                  style={{ fontSize: "13px", cursor: "pointer" }}
                  onClick={() => handleNav(ROUTES.WISHLIST)}
                >
                  🤍 Favorites
                </div>
                <div
                  className="px-3 py-2 border-bottom fw-semibold"
                  style={{ fontSize: "13px", cursor: "pointer" }}
                  onClick={() => handleNav(ROUTES.CART)}
                >
                  🛒 Cart
                </div>
                <div
                  className="px-3 py-2 fw-semibold"
                  style={{ fontSize: "13px", cursor: "pointer" }}
                  onClick={() => handleNav(ROUTES.PROFILE)}
                >
                  👤 Profile
                </div>
              </div>
            )}
          </div>
        </div>
        <SearchBaar />
      </div>

      {/* DESKTOP */}
      <div className="d-none d-md-flex w-100 align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-4">
          <span
            className="fw-bold fs-4"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            GrillMart 🏠
          </span>
        </div>

        <SearchBaar />

        <div className="d-flex align-items-center gap-3">
          <WishlistIcon />
          <CartIcon />
          <span
            className="btn btn-warning"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(ROUTES.PROFILE)}
          >
            <i className="bi bi-person-fill-gear"></i>
          </span>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
