import { useState, useEffect } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

export const SearchBaar = () => {
  const [focused, setFocused] = useState(false);
  const { search, product, setSearch, setProduct } = useSearch();
  const navigate = useNavigate();

  const pressEnter = (key) => {
    if (key == "Enter") {
      navigate(ROUTES.PRODUCTS);
      setSearch(product.toLowerCase());
      setFocused(false);
    }
  };

  return (
    <>
      {focused && (
        <div
          onClick={() => setFocused(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 99,
          }}
        />
      )}
      <div
        className="d-flex align-items-center"
        style={{ width: "35%", position: "relative", zIndex: 100 }}
      >
        <div className="input-group mb-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search Products"
            id="button-addon2"
            value={product}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={({ key }) => pressEnter(key)}
            onChange={(e) => setProduct(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => pressEnter("Enter")}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
    </>
  );
};
