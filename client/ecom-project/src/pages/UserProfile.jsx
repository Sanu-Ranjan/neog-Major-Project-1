import { useState } from "react";
import { Navbar } from "../components/NavBar";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL, API_ROUTES } from "../constants";
import { Loading } from "../components/Loading";
import { useAddress } from "../contexts/AddressContext";
import { AddressForm } from "../components/AddressForm";
import { AddressCard } from "../components/AddressCard";
import { OrderCard } from "../components/OrderCard";
import { UserDetailsCard } from "../components/UserDetailsCard";
import { Footer } from "../components/Footer";

export const UserProfile = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addressOpen, setAddressOpen] = useState(true);
  const [orderOpen, setOrderOpen] = useState(true);

  const { addressData, addressLoading, setRefresh } = useAddress();
  const addresses = addressData?.data?.addresses ?? [];

  const { data: orderData, loading: orderLoading } = useFetch(
    `${API_BASE_URL}${API_ROUTES.orders.getAll}`,
  );
  const orders = orderData?.data?.orders ?? [];

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="container py-4" style={{ maxWidth: "700px" }}>
          <UserDetailsCard />

          {/* My Addresses */}
          <div className="card border shadow-sm mb-3">
            <div
              className="d-flex justify-content-between align-items-center p-4"
              style={{ cursor: "pointer" }}
              onClick={() => setAddressOpen((prev) => !prev)}
            >
              <h6 className="fw-bold mb-0">My Addresses</h6>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-warning btn-sm fw-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAddForm((prev) => !prev);
                    setAddressOpen(true);
                  }}
                >
                  {showAddForm ? "Cancel" : "+ Add New"}
                </button>
                <span
                  className="text-warning fw-semibold"
                  style={{ fontSize: "13px" }}
                >
                  {addressOpen ? "▲" : "▼"}
                </span>
              </div>
            </div>

            <div
              style={{
                overflow: "hidden",
                maxHeight: addressOpen ? "2000px" : "0",
                opacity: addressOpen ? 1 : 0,
                transition: "max-height 0.35s ease, opacity 0.3s ease",
              }}
            >
              <div className="px-4 pb-4">
                <hr className="mt-0" />

                {showAddForm && (
                  <div className="mb-4">
                    <AddressForm
                      onSuccess={() => {
                        setShowAddForm(false);
                        setRefresh((prev) => !prev);
                      }}
                    />
                  </div>
                )}

                {addressLoading ? (
                  <Loading />
                ) : addresses.length === 0 ? (
                  <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                    No addresses saved yet.
                  </p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {addresses.map((address) => (
                      <AddressCard address={address} key={address._id} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="card border shadow-sm mb-3">
            <div
              className="d-flex justify-content-between align-items-center p-4"
              style={{ cursor: "pointer" }}
              onClick={() => setOrderOpen((prev) => !prev)}
            >
              <h6 className="fw-bold mb-0">Order History</h6>
              <span
                className="text-warning fw-semibold"
                style={{ fontSize: "13px" }}
              >
                {orderOpen ? "▲" : "▼"}
              </span>
            </div>

            <div
              style={{
                overflow: "hidden",
                maxHeight: orderOpen ? "2000px" : "0",
                opacity: orderOpen ? 1 : 0,
                transition: "max-height 0.35s ease, opacity 0.3s ease",
              }}
            >
              <div className="px-4 pb-4">
                <hr className="mt-0" />
                {orderLoading ? (
                  <Loading />
                ) : orders.length === 0 ? (
                  <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                    No orders placed yet.
                  </p>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {orders.map((order) => (
                      <OrderCard order={order} key={order._id} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
