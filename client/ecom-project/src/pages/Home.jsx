import { CategoryCard } from "../components/CategoryCard";
import { Error } from "../components/Error";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";
import { Navbar } from "../components/NavBar";
import { API_BASE_URL, API_ROUTES, ROUTES } from "../constants/index";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}${API_ROUTES.category.getFeatured}`,
  );
  const navigate = useNavigate();

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="container py-4">
          <div
            className="rounded-3 mb-5 d-flex align-items-center px-5 py-3 py-sm-0"
            style={{ background: "#1a1a1a", minHeight: "260px" }}
          >
            <div className="text-sm-start text-center">
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
                onClick={() => navigate(ROUTES.PRODUCTS)}
              >
                Shop Now
              </button>
            </div>
          </div>

          <h2
            className="fw-semibold mb-4 text-sm-start text-center"
            style={{ fontSize: "1.3rem" }}
          >
            Most Loved Categories
          </h2>

          <div className="row g-3 justify-content-center">
            {data?.data?.categories?.map((category) => (
              <CategoryCard category={category} key={category._id} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export { Home };
