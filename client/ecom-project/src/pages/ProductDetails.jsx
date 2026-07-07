import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL, ROUTES, API_ROUTES } from "../constants";
import { useFetch } from "../hooks/useFetch";
import { Navbar } from "../components/NavBar";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { QuantityControls } from "../components/QuantityControls";
import { FeatureBadges } from "../components/FeatureBadges";
import { ProductSizes } from "../components/ProductSizes";
import { Rating } from "../components/Rating";
import { WishListButton } from "../components/WishlistButton";
import { useAddress } from "../contexts/AddressContext";
import { postData } from "../utils/postData";
import { Footer } from "../components/Footer";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `${API_BASE_URL}${API_ROUTES.products.getById(id)}`,
  ); //fetch products
  const product = data?.data?.product;

  const [quantity, setQuantity] = useState(0);
  const [categories, setCategories] = useState([]);

  const { selectedAddressId, addressData } = useAddress();
  const addresses = addressData?.data?.addresses ?? [];
  const selectedAddress = addresses.find(({ _id }) => selectedAddressId == _id);

  useEffect(() => {
    if (!product?.category?.length) return;

    const fetchCategories = async () => {
      const results = await Promise.all(
        product.category.map((categoryId) =>
          fetch(`${API_BASE_URL}${API_ROUTES.category.getById(categoryId)}`)
            .then((res) => res.json())
            .then((data) => data?.data?.category),
        ),
      );
      setCategories(results.filter(Boolean)); // filter out any nulls
    };

    fetchCategories();
  }, [product]); // runs when product loads

  const buyNow = (productId, quantity) => {
    const orderItems = [
      {
        productId: productId,
        quantity: quantity,
      },
    ];

    const { name, phone, pincode, city, state, addressLine, type } =
      selectedAddress;

    const orderAddress = {
      name: name,
      phone: phone,
      pincode: pincode,
      city: city,
      state: state,
      addressLine: addressLine,
      type: type,
    };

    const body = { items: orderItems, address: orderAddress };
    (async () => {
      const { data, error } = await postData(
        `${API_BASE_URL}${API_ROUTES.orders.add}`,
        body,
      );
      if (error) return console.log("Error occoured placing order : ", error);
      if (data.success === true) {
        navigate(ROUTES.ORDER_SUMMARY(data.data.order._id));
      }
    })();
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-12 col-md-5">
              <div
                className="border rounded-3 d-flex align-items-center justify-content-center"
                style={{ background: "#f8f8f8", minHeight: "380px" }}
              >
                <img
                  src={product?.image}
                  alt={product?.name}
                  style={{
                    maxHeight: "360px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="d-flex gap-3 mt-3">
                <div className="col">
                  {quantity > 0 ? (
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <button
                        className="btn btn-warning btn-sm px-2 py-0"
                        onClick={() =>
                          quantity > 0 && setQuantity((prev) => --prev)
                        }
                      >
                        −
                      </button>
                      <span className="fw-semibold">{quantity}</span>
                      <button
                        className="btn btn-warning btn-sm px-2 py-0"
                        onClick={() => setQuantity((prev) => ++prev)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => buyNow(product?._id, quantity)}
                      >
                        Quick Buy
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm fw-semibold"
                      style={{ width: "100%", height: "100%" }}
                      onClick={() => setQuantity((prev) => ++prev)}
                    >
                      Buy Now
                    </button>
                  )}
                </div>

                <div className="col">
                  <QuantityControls product={product} btnWarning={false} />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-7">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="fw-bold mb-2">{product?.name}</h5>
                <WishListButton product={product} />
              </div>

              <Rating product={product} size={"16"} margin={"3"} />

              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="fw-bold" style={{ fontSize: "24px" }}>
                  ₹{product?.price}
                </span>
                <span
                  className="text-muted text-decoration-line-through"
                  style={{ fontSize: "16px" }}
                >
                  ₹{product?.originalPrice}
                </span>
                <span className="text-success fw-semibold">
                  {product?.discount}% off
                </span>
              </div>

              <p
                className={`fw-semibold mb-3 ${product?.inStock ? "text-success" : "text-danger"}`}
                style={{ fontSize: "13px" }}
              >
                {product?.inStock ? "✔ In Stock" : "✘ Out of Stock"}
              </p>

              {product?.sizes?.length > 0 && <ProductSizes product={product} />}

              <FeatureBadges />

              <div className="d-flex align-items-center justify-content-wrap g-1">
                <p className="fw-semibold mb-2" style={{ fontSize: "14px" }}>
                  Category:
                </p>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <p className="mb-2 mx-1" key={category?._id}>
                      <span
                        className="badge bg-warning text-dark"
                        style={{ cursor: "pointer", fontSize: "11px" }}
                        onClick={() =>
                          navigate(
                            `${ROUTES.PRODUCTS}?category=${product.category[0]}`,
                          )
                        }
                      >
                        {category.name}
                      </span>
                    </p>
                  ))}
              </div>

              <hr />

              <div>
                <p className="fw-semibold mb-2" style={{ fontSize: "14px" }}>
                  Description:
                </p>
                <p
                  className="text-muted"
                  style={{ fontSize: "13px", lineHeight: "1.7" }}
                >
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
