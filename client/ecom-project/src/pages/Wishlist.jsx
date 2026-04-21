import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL, ROUTES } from "../constants";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Navbar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";

export const Wishlist = () => {
  const { data, loading, error, deleteItem } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const wishlist = data?.data?.wishlist?.[0];
  const items = wishlist?.items ?? [];

  const moveToCart = async (id) => {
    await addToCart(id);
    await deleteItem(id);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <h4 className="fw-bold mb-4">My Wishlist ({items.length})</h4>

        {items.length === 0 ? (
          <div className="text-center mt-5">
            <p className="text-muted">Your wishlist is empty.</p>
            <button
              className="btn btn-warning fw-semibold"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="row g-3">
            {items.map((item) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item._id}>
                <div className="card border shadow-sm h-100">
                  <div style={{ background: "#f8f8f8" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "contain" }}
                      onClick={() => navigate(ROUTES.PRODUCT_DETAIL(item._id))}
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <p
                      className="fw-semibold mb-1"
                      style={{ fontSize: "14px", cursor: "pointer" }}
                      onClick={() => navigate(ROUTES.PRODUCT_DETAIL(item._id))}
                    >
                      {item.name}
                    </p>

                    <p
                      className="text-warning mb-1"
                      style={{ fontSize: "13px" }}
                    >
                      {"★".repeat(Math.floor(item.rating))}
                      {"☆".repeat(5 - Math.floor(item.rating))}
                      <span className="text-muted ms-1">({item.rating})</span>
                    </p>

                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="fw-bold">₹{item.price}</span>
                      <span
                        className="text-muted text-decoration-line-through"
                        style={{ fontSize: "13px" }}
                      >
                        ₹{item.originalPrice}
                      </span>
                      <span
                        className="text-success"
                        style={{ fontSize: "13px" }}
                      >
                        {item.discount}% off
                      </span>
                    </div>

                    <div className="mt-auto d-flex flex-column gap-2">
                      <button
                        className="btn btn-warning btn-sm fw-semibold"
                        onClick={() => moveToCart(item._id)}
                      >
                        Move to Cart
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => deleteItem(item._id)}
                      >
                        <i className="bi bi-heart-fill text-danger me-1"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
