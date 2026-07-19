import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../constants";

export const SearchBaar = () => {
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Keep the input in sync with the URL — so it reflects the active
  // search whether the user typed it, followed a link, or hit back/forward.
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    setValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  const pressEnter = (key) => {
    if (key == "Enter" && value != "") {
      const next = new URLSearchParams(searchParams);
      next.set("search", value.toLowerCase());
      navigate(`${ROUTES.PRODUCTS}?${next.toString()}`);
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
        className="d-flex align-items-center w-35"
        style={{ position: "relative", zIndex: 100 }}
      >
        <div className="input-group mb-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search Products"
            id="button-addon2"
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={({ key }) => pressEnter(key)}
            onChange={(e) => setValue(e.target.value)}
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
