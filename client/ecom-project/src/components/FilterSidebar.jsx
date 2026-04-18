// components/FilterSidebar.jsx

const FilterSidebar = ({
  categories,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="p-3 border rounded-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">Filters</h6>
        <span
          className="text-warning fw-semibold"
          style={{ cursor: "pointer", fontSize: "13px" }}
          onClick={onClearFilters}
        >
          Clear All
        </span>
      </div>

      <hr />

      <div className="mb-4">
        <p className="fw-semibold mb-2" style={{ fontSize: "14px" }}>
          Category
        </p>
        <div className="form-check mb-1">
          <input
            className="form-check-input"
            type="checkbox"
            id="All"
            checked={filters.categories.includes("All")}
            onChange={() => onFilterChange("category", "All")}
          />
          <label
            className="form-check-label"
            htmlFor="All"
            style={{ fontSize: "13px" }}
          >
            All
          </label>
        </div>
        {categories?.map((category) => (
          <div className="form-check mb-1" key={category._id}>
            <input
              className="form-check-input"
              type="checkbox"
              id={category._id}
              checked={filters.categories.includes(category._id)}
              onChange={() => onFilterChange("category", category._id)}
            />
            <label
              className="form-check-label"
              htmlFor={category._id}
              style={{ fontSize: "13px" }}
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>

      <hr />

      <div className="mb-4">
        <p className="fw-semibold mb-2" style={{ fontSize: "14px" }}>
          Rating: {filters.rating}★ & above
        </p>
        <input
          type="range"
          className="form-range"
          min="1"
          max="5"
          step="1"
          value={filters.rating}
          onChange={(e) => onFilterChange("rating", e.target.value)}
        />
        <div
          className="d-flex justify-content-between"
          style={{ fontSize: "11px", color: "gray" }}
        >
          <span>1★</span>
          <span>2★</span>
          <span>3★</span>
          <span>4★</span>
          <span>5★</span>
        </div>
      </div>

      <hr />

      <div className="mb-3">
        <p className="fw-semibold mb-2" style={{ fontSize: "14px" }}>
          Sort by Price
        </p>
        <div className="form-check mb-1">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="lowToHigh"
            checked={filters.sort === "low-to-high"}
            onChange={() => onFilterChange("sort", "low-to-high")}
          />
          <label
            className="form-check-label"
            htmlFor="lowToHigh"
            style={{ fontSize: "13px" }}
          >
            Price — Low to High
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="highToLow"
            checked={filters.sort === "high-to-low"}
            onChange={() => onFilterChange("sort", "high-to-low")}
          />
          <label
            className="form-check-label"
            htmlFor="highToLow"
            style={{ fontSize: "13px" }}
          >
            Price — High to Low
          </label>
        </div>
      </div>
    </div>
  );
};

export { FilterSidebar };
