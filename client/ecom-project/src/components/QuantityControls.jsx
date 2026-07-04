import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useBusyState } from "../hooks/useBusyState";
import { ROUTES } from "../constants/index";

export const QuantityControls = ({ product, btnWarning = true, listingMode = false }) => {
  const { addToCart, itemMap, decQty, removeItem, loading } = useCart();
  const { isBusy, setIsBusy } = useBusyState(loading);
  const navigate = useNavigate();
  const isInCart = itemMap.has(product?._id);
  const quantity = itemMap.get(product?._id);

  const handleAddtoCart = async () => {
    setIsBusy(true);
    try {
      await addToCart(product?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async () => {
    setIsBusy(true);
    try {
      await removeItem(product?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handledecItem = async () => {
    setIsBusy(true);
    try {
      await decQty(product?._id);
    } catch (error) {
      console.log(error);
    }
  };

  // On listing page: no +/- controls, just "Add to Cart" or "Go to Cart"
  if (listingMode) {
    if (isInCart) {
      return (
        <button
          className="btn btn-success btn-sm fw-semibold"
          style={{ width: "100%", height: "100%" }}
          onClick={() => navigate(ROUTES.CART)}
        >
          In Cart ({quantity}) →
        </button>
      );
    }
    return (
      <button
        className={`btn btn-${btnWarning ? "warning" : "outline-secondary"} btn-sm fw-semibold`}
        style={{ width: "100%", height: "100%" }}
        disabled={isBusy}
        onClick={handleAddtoCart}
      >
        {isBusy ? (
          <span className="spinner-border spinner-border-sm me-2" />
        ) : (
          "Add to Cart"
        )}
      </button>
    );
  }

  // Full controls for Cart page and Product Details page
  return (
    <>
      {isInCart ? (
        <div className="d-flex align-items-center justify-content-between gap-2">
          <button
            className="btn btn-outline-secondary btn-sm px-2 py-0"
            onClick={() => quantity > 1 && handledecItem()}
            disabled={isBusy}
          >
            -
          </button>
          <span className="fw-semibold">{quantity}</span>
          <button
            className="btn btn-outline-secondary btn-sm px-2 py-0"
            onClick={handleAddtoCart}
            disabled={isBusy}
          >
            +
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleRemoveItem}
            disabled={isBusy}
          >
            {isBusy ? (
              <span className="spinner-border spinner-border-sm me-2" />
            ) : (
              "Remove from cart"
            )}
          </button>
        </div>
      ) : (
        <button
          className={`btn btn-${btnWarning ? "warning" : "outline-secondary"} btn-sm fw-semibold`}
          style={{ width: "100%", height: "100%" }}
          disabled={isBusy}
          onClick={handleAddtoCart}
        >
          {isBusy ? (
            <span className="spinner-border spinner-border-sm me-2" />
          ) : (
            "Add to Cart"
          )}
        </button>
      )}
    </>
  );
};
