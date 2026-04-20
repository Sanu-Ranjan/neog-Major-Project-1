import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/index";
import { useWishlist } from "../contexts/WishlistContext";

export const WishlistIcon = () => {
  const { data } = useWishlist();
  const navigate = useNavigate();

  const wishlist = data?.data?.wishlist?.[0];
  const items = wishlist?.items ?? [];
  const itemCount = items.length;

  return (
    <div
      className="position-relative"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(ROUTES.WISHLIST)}
    >
      <span style={{ fontSize: "22px" }}>🤍</span>
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ fontSize: "10px" }}
      >
        {itemCount}
      </span>
    </div>
  );
};
