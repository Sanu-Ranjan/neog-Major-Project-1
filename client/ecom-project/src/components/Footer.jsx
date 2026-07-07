import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{ background: "#1a1a1a" }} className="mt-auto py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">
          <div>
            <h5
              className="fw-bold text-white mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(ROUTES.HOME)}
            >
              GrillMart 🔥
            </h5>
            <p className="text-secondary mb-0" style={{ fontSize: "13px" }}>
              Premium grills, tandoors & bakeware — built for real cooking.
            </p>
          </div>

          <div>
            <p
              className="fw-semibold text-white mb-2"
              style={{ fontSize: "13px" }}
            >
              Contact
            </p>
            <p className="text-secondary mb-1" style={{ fontSize: "13px" }}>
              <i className="bi bi-envelope me-2"></i>support@grillmart.com
            </p>
            <p className="text-secondary mb-1" style={{ fontSize: "13px" }}>
              <i className="bi bi-telephone me-2"></i>+91 98765 43210
            </p>
            <p className="text-secondary mb-0" style={{ fontSize: "13px" }}>
              <i className="bi bi-geo-alt me-2"></i>Kolkata, West Bengal, India
            </p>
          </div>
        </div>

        <hr style={{ borderColor: "#333" }} className="my-3" />

        <p
          className="text-secondary mb-0 text-center"
          style={{ fontSize: "12px" }}
        >
          © 2026 GrillMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
