import { useBusyState } from "../hooks/useBusyState";

export const CartItemBtns = ({
  addItem,
  addToCart,
  removeItem,
  decQty,
  loading,
  quantity,
  product,
}) => {
  const { isBusy, setIsBusy } = useBusyState(loading);

  const handleAddtoCart = async (id) => {
    setIsBusy(true);
    try {
      await addToCart(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveItem = async (id) => {
    setIsBusy(true);
    try {
      await removeItem(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDecItem = async (id) => {
    setIsBusy(true);
    try {
      await decQty(id);
    } catch (e) {
      console.log(e);
    }
  };

  const moveToWishlist = async (id) => {
    setIsBusy(true);
    try {
      await addItem(id);
      await removeItem(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
      <button
        className="btn btn-outline-secondary btn-sm px-2 py-0"
        onClick={() => quantity > 1 && handleDecItem(product._id)}
        disabled={isBusy}
      >
        −
      </button>

      <span className="fw-semibold">{quantity}</span>

      <button
        className="btn btn-outline-secondary btn-sm px-2 py-0"
        onClick={() => handleAddtoCart(product._id)}
        disabled={isBusy}
      >
        +
      </button>

      <span className="text-muted" style={{ fontSize: "12px" }}>
        |
      </span>

      <button
        className="btn btn-outline-secondary btn-sm px-2"
        onClick={() => handleRemoveItem(product._id)}
        disabled={isBusy}
        title="Remove"
      >
        {isBusy ? (
          <span className="spinner-border spinner-border-sm" />
        ) : (
          <i className="bi bi-trash3"></i>
        )}
      </button>

      <button
        className="btn btn-outline-warning btn-sm"
        onClick={() => moveToWishlist(product._id)}
        disabled={isBusy}
      >
        {isBusy ? (
          <span className="spinner-border spinner-border-sm" />
        ) : (
          "Move to wishlist"
        )}
      </button>
    </div>
  );
};
