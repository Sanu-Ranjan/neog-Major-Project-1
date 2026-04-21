import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/index";
import { useWishlist } from "../contexts/WishlistContext";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { data, addItem, wishlistSet, deleteItem } = useWishlist();
  const { addToCart } = useCart();

  const isWishlisted = wishlistSet.has(product._id);

  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{ cursor: "pointer" }}
    >
      <div
        onClick={() => navigate(ROUTES.PRODUCT_DETAIL(product._id))}
        style={{ background: "#f8f8f8" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: "200px", objectFit: "contain" }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <p
          className="fw-semibold mb-1"
          style={{ fontSize: "14px" }}
          onClick={() => navigate(ROUTES.PRODUCT_DETAIL(product._id))}
        >
          {product.name}
        </p>

        <p className="text-warning mb-1" style={{ fontSize: "13px" }}>
          {"★".repeat(Math.floor(product.rating))}
          {"☆".repeat(5 - Math.floor(product.rating))}
          <span className="text-muted ms-1">({product.rating})</span>
        </p>

        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="fw-bold">₹{product.price}</span>
          <span
            className="text-muted text-decoration-line-through"
            style={{ fontSize: "13px" }}
          >
            ₹{product.originalPrice}
          </span>
          <span className="text-success" style={{ fontSize: "13px" }}>
            {product.discount}% off
          </span>
        </div>

        <div className="mt-auto d-flex gap-2">
          <button
            className="btn btn-warning btn-sm fw-semibold flex-grow-1"
            onClick={() => addToCart(product._id)}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-outline-secondary btn-sm px-3 "
            onClick={() =>
              isWishlisted ? deleteItem(product._id) : addItem(product._id)
            }
          >
            {isWishlisted ? (
              <i className="bi-heart-fill text-danger"></i>
            ) : (
              <i className="bi bi-heart"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
