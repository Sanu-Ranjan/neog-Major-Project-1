import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/index";
import { useWishlist } from "../contexts/WishlistContext";
import { QuantityControls } from "../components/QuantityControls";
import { Rating } from "./Rating";
import { WishListButton } from "./WishlistButton";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlistSet } = useWishlist();

  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{ cursor: "pointer" }}
    >
      <div
        onClick={() => navigate(ROUTES.PRODUCT_DETAIL(product._id))}
        style={{ background: "#f8f8f8" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "contain" }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <p
          className="fw-semibold mb-1"
          style={{ fontSize: "14px" }}
          onClick={() => navigate(ROUTES.PRODUCT_DETAIL(product._id))}
        >
          {product.name}
        </p>

        <Rating product={product} size={"13"} margin={"1"} />

        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="fw-bold">₹{product.price}</span>
          <span
            className="text-muted text-decoration-line-through"
            style={{ fontSize: "13px" }}
          >
            ₹{product.originalPrice}
          </span>
          <span className="text-success" style={{ fontSize: "13px" }}>
            {product.discount}% off
          </span>
        </div>

        <div className="mt-auto d-flex gap-2">
          <QuantityControls product={product} listingMode={true} />

          <WishListButton product={product} wishlistSet={wishlistSet} />
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
