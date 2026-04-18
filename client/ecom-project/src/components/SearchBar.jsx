import { useState, useEffect } from "react";
import { useSearch } from "../contexts/SearchContext";

export const SearchBaar = () => {
  const { search, product, setSearch, setProduct } = useSearch();

  const pressEnter = (key) => {
    if (key == "Enter") {
      setSearch(product.toLowerCase());
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ width: "35%" }}>
      <div className="input-group mb-0">
        <input
          type="text"
          className="form-control"
          placeholder="Search Products"
          id="button-addon2"
          value={product}
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
  );
};
