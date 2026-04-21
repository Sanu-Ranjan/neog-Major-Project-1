import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL, ROUTES } from "../constants";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Navbar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

export const Cart = () => {
  const { cart, cartId, items, loading, error, addToCart, decQty, removeItem } =
    useCart();
  const { addItem } = useWishlist();

  const navigate = useNavigate();

  const moveToWishlist = async (id) => {
    await addItem(id);
    await removeItem(id);
  };

  const subtotal = items.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  );
  const totalDiscount = items.reduce(
    (acc, { product, quantity }) =>
      acc + (product.originalPrice - product.price) * quantity,
    0,
  );
  const deliveryCharge = subtotal > 999 ? 0 : 499;
  const total = subtotal + deliveryCharge;

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h4 className="fw-bold mb-4">My Cart ({items.length})</h4>

        {items.length === 0 ? (
          <div className="text-center mt-5">
            <p className="text-muted">Your cart is empty.</p>
            <button
              className="btn btn-warning fw-semibold"
              onClick={() => navigate(ROUTES.PRODUCTS)}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {/* cart items */}
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column gap-3">
                {items.map(({ product, quantity, _id }) => (
                  <div className="card border shadow-sm p-3" key={_id}>
                    <div className="d-flex gap-3">
                      {/* image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "contain",
                          background: "#f8f8f8",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate(ROUTES.PRODUCT_DETAIL(product._id))
                        }
                      />

                      <div className="flex-grow-1">
                        {/* name */}
                        <p
                          className="fw-semibold mb-1"
                          style={{ fontSize: "14px", cursor: "pointer" }}
                          onClick={() =>
                            navigate(ROUTES.PRODUCT_DETAIL(product._id))
                          }
                        >
                          {product.name}
                        </p>

                        {/* price */}
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="fw-bold">₹{product.price}</span>
                          <span
                            className="text-muted text-decoration-line-through"
                            style={{ fontSize: "13px" }}
                          >
                            ₹{product.originalPrice}
                          </span>
                          <span
                            className="text-success"
                            style={{ fontSize: "13px" }}
                          >
                            {product.discount}% off
                          </span>
                        </div>

                        {/* quantity controls */}
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <button
                            className="btn btn-outline-secondary btn-sm px-2 py-0"
                            onClick={() => quantity > 1 && decQty(product._id)}
                          >
                            −
                          </button>
                          <span className="fw-semibold">{quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm px-2 py-0"
                            onClick={() => addToCart(product._id)}
                          >
                            +
                          </button>
                        </div>

                        {/* action buttons */}
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => removeItem(product._id)}
                          >
                            Remove
                          </button>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => moveToWishlist(product._id)}
                          >
                            Move to Wishlist
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* price details */}
            <div className="col-12 col-lg-4">
              <div className="card border shadow-sm p-4">
                <h6
                  className="fw-bold text-muted mb-3"
                  style={{ letterSpacing: "0.05em", fontSize: "13px" }}
                >
                  PRICE DETAILS
                </h6>
                <hr />
                <div
                  className="d-flex justify-content-between mb-2"
                  style={{ fontSize: "14px" }}
                >
                  <span>Price ({items.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div
                  className="d-flex justify-content-between mb-2"
                  style={{ fontSize: "14px" }}
                >
                  <span>Discount</span>
                  <span className="text-success">− ₹{totalDiscount}</span>
                </div>
                <div
                  className="d-flex justify-content-between mb-3"
                  style={{ fontSize: "14px" }}
                >
                  <span>Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? "text-success" : ""}>
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-2">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
                <p className="text-success mb-4" style={{ fontSize: "13px" }}>
                  You will save ₹{totalDiscount} on this order
                </p>
                <button
                  className="btn btn-warning fw-semibold w-100"
                  onClick={() => navigate("/checkout")}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
