import { useNavigate } from "react-router-dom";
export const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={category._id}>
      <div
        className="card border-0 rounded-3 overflow-hidden shadow-sm"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/products?category=${category._id}`)}
      >
        <img
          src={category.image}
          alt={category.name}
          className="card-img-top"
          style={{
            height: "200px",
            objectFit: "contain",
            background: "#f8f8f8",
          }}
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
  );
};
