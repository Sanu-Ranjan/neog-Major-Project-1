import { useNavigate } from "react-router-dom";

import { LoginBtn } from "./LoginBtn";
import { SearchBaar } from "./SearchBar";
import { CartIcon } from "./CartIcon";
import { WishlistIcon } from "./WishlistIcon";
import { ROUTES } from "../constants/index";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 py-3">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <span
          className="fw-bold fs-5"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(ROUTES.HOME)}
        >
          GrillMart 🏠
        </span>

        <SearchBaar />

        <div className="d-flex align-items-center gap-3">
          <WishlistIcon />

          <CartIcon />

          <LoginBtn />
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
