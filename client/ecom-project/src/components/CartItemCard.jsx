import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { CartItemBtns } from "./CartItemBtns";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export const CartItemCard = ({ product, quantity }) => {
  const navigate = useNavigate();
  const { loading, addToCart, decQty, removeItem } = useCart();
  const { addItem } = useWishlist();

  return (
    <div className="card border-0 shadow-sm p-3 mb-2">
      <div className="d-flex gap-3">
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            background: "#f8f8f8",
            borderRadius: "8px",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onClick={() => navigate(ROUTES.PRODUCT_DETAIL(product._id))}
        />

        <div className="flex-grow-1 d-flex flex-column justify-content-between">
          <div>
            <p
              className="fw-semibold mb-1"
              style={{ fontSize: "14px", cursor: "pointer" }}
              onClick={() => navigate(ROUTES.PRODUCT_DETAIL(product._id))}
            >
              {product.name}
            </p>
            <div className="d-flex align-items-center gap-2 flex-wrap">
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
          </div>

          <CartItemBtns
            addItem={addItem}
            addToCart={addToCart}
            removeItem={removeItem}
            decQty={decQty}
            loading={loading}
            product={product}
            quantity={quantity}
          />
        </div>
      </div>
    </div>
  );
};
