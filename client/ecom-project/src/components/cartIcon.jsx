import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/index";
import { useCart } from "../contexts/CartContext";

export const CartIcon = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className="position-relative"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(ROUTES.CART)}
    >
      <span style={{ fontSize: "22px" }}>🛒</span>
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ fontSize: "10px" }}
      >
        {items?.length}
      </span>
    </div>
  );
};
