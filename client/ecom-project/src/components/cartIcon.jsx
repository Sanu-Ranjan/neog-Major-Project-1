export const CartIcon = () => {
  return (
    <div
      className="position-relative"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/cart")}
    >
      <span style={{ fontSize: "22px" }}>🛒</span>
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ fontSize: "10px" }}
      >
        0
      </span>
    </div>
  );
};
