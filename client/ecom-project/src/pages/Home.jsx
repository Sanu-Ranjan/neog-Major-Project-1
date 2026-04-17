// pages/Home.jsx
import { API_BASE_URL } from "../constants/index";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/categories/featured`,
  );
  const navigate = useNavigate();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">Something went wrong. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* hero banner */}
      <div
        className="rounded-3 mb-5 d-flex align-items-center px-5"
        style={{ background: "#1a1a1a", minHeight: "260px" }}
      >
        <div>
          <p
            className="text-warning fw-semibold mb-1"
            style={{ fontSize: "13px", letterSpacing: "0.1em" }}
          >
            NEW ARRIVALS
          </p>
          <h1
            className="text-white fw-bold mb-3"
            style={{ fontSize: "2.2rem" }}
          >
            Fire Up Your Kitchen
          </h1>
          <p className="text-secondary mb-4">
            Premium grills, tandoors & bakeware — built for real cooking.
          </p>
          <button
            className="btn btn-warning fw-semibold px-4"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* categories heading */}
      <h2 className="fw-semibold mb-4" style={{ fontSize: "1.3rem" }}>
        Shop by Category
      </h2>

      {/* category cards */}
      <div className="row g-3">
        {data?.data?.categories?.map((category) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={category._id}>
            <div
              className="card border-0 rounded-3 overflow-hidden shadow-sm"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onClick={() => navigate(`/products?category=${category._id}`)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <img
                src={category.image}
                alt={category.name}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div
                className="card-body text-center py-3"
                style={{ background: "#1a1a1a" }}
              >
                <h6 className="card-title text-white mb-0 fw-semibold">
                  {category.name}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Home };
