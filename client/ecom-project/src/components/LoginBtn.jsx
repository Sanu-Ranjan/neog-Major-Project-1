export const LoginBtn = () => {
  return (
    <button
      className="btn btn-warning fw-semibold"
      onClick={() => navigate("/login")}
    >
      Login
    </button>
  );
};
