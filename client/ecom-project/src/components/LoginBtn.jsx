import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/index";

export const LoginBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-warning fw-semibold"
      onClick={() => navigate(ROUTES.HOME)}
    >
      Login
    </button>
  );
};
