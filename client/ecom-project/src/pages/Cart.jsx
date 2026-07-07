import { useNavigate } from "react-router-dom";
import { API_BASE_URL, ROUTES } from "../constants";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Navbar } from "../components/NavBar";
import { useCart } from "../contexts/CartContext";
import { useAddress } from "../contexts/AddressContext";
import { AddressCard } from "../components/AddressCard";
import { CheckoutBtn } from "../components/CheckoutBtn";
import { CartItemCard } from "../components/CartItemCard";
import { Footer } from "../components/Footer";

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, items, loading, error, emptyCart } = useCart();

  const { addressData, selectedAddressId } = useAddress();
  const addresses = addressData?.data?.addresses ?? [];
  const selectedAddress = addresses.find(({ _id }) => selectedAddressId == _id);

  const subtotal = items.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  );
  const totalDiscount = items.reduce(
    (acc, { product, quantity }) =>
      acc + (product.originalPrice - product.price) * quantity,
    0,
  );
  const deliveryCharge = subtotal > 999 ? 0 : 499;
  const total = subtotal + deliveryCharge;

  if (loading && !cart) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="container py-4">
          <h4 className="fw-bold mb-4 text-center text-md-start">
            My Cart ({items.length})
          </h4>

          {items.length === 0 ? (
            <div className="text-center mt-5">
              <p className="text-muted">Your cart is empty.</p>
              <button
                className="btn btn-warning fw-semibold"
                onClick={() => navigate(ROUTES.PRODUCTS)}
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-12 col-lg-8">
                <div className="d-flex flex-column gap-3">
                  {items.map(({ product, quantity, _id }) => (
                    <CartItemCard
                      product={product}
                      quantity={quantity}
                      key={_id}
                    />
                  ))}
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="card border shadow-sm p-3 mb-3">
                  {selectedAddress ? (
                    <button
                      className="btn btn-warning fw-semibold w-100"
                      onClick={() => navigate(ROUTES.PROFILE)}
                    >
                      Choose different address
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning fw-semibold w-100"
                      onClick={() => navigate(ROUTES.PROFILE)}
                    >
                      Select an address
                    </button>
                  )}
                  <hr />
                  {selectedAddress && <AddressCard address={selectedAddress} />}
                </div>

                <div className="card border shadow-sm p-4">
                  <h6
                    className="fw-bold text-muted mb-3"
                    style={{ letterSpacing: "0.05em", fontSize: "13px" }}
                  >
                    PRICE DETAILS
                  </h6>
                  <hr />
                  <div
                    className="d-flex justify-content-between mb-2"
                    style={{ fontSize: "14px" }}
                  >
                    <span>Price ({items.length} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div
                    className="d-flex justify-content-between mb-2"
                    style={{ fontSize: "14px" }}
                  >
                    <span>Discount</span>
                    <span className="text-success">− ₹{totalDiscount}</span>
                  </div>
                  <div
                    className="d-flex justify-content-between mb-3"
                    style={{ fontSize: "14px" }}
                  >
                    <span>Delivery Charges</span>
                    <span
                      className={deliveryCharge === 0 ? "text-success" : ""}
                    >
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold mb-2">
                    <span>Total Amount</span>
                    <span>₹{total}</span>
                  </div>
                  <p className="text-success mb-4" style={{ fontSize: "13px" }}>
                    You will save ₹{totalDiscount} on this order
                  </p>
                  <CheckoutBtn
                    items={items}
                    loading={loading}
                    selectedAddress={selectedAddress}
                    emptyCart={emptyCart}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};
