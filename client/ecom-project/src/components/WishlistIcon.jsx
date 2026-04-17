export const WishlistIcon = () => {
  return (
    <div
      className="position-relative"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/wishlist")}
    >
      <span style={{ fontSize: "22px" }}>🤍</span>
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ fontSize: "10px" }}
      >
        0
      </span>
    </div>
  );
};
