import { Navbar } from "../components/NavBar";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL } from "../constants";
import { ProductCard } from "../components/ProductCard";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { FilterSidebar } from "../components/FilterSidebar";
import { useSearch } from "../contexts/SearchContext";

export const ProductList = () => {
  const [filters, setFilters] = useState({
    categories: [],
    rating: 1,
    sort: "",
  });
  const { search, clearSearch } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const { data, loading, error } = useFetch(`${API_BASE_URL}/products`);
  const products = data?.data?.products;

  const { data: categoryData } = useFetch(`${API_BASE_URL}/categories`);
  const categories = categoryData?.data?.categories;

  const onFilterChange = (type, value) => {
    if (type === "category") {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.includes(value)
          ? prev.categories.filter((c) => c !== value)
          : [...prev.categories, value],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [type]: value }));
    }
  };

  const onClearFilters = () => {
    setFilters({ categories: [], rating: 1, sort: "" });
    setSearchParams({});
    clearSearch();
  };

  let filteredProducts = categoryId
    ? products?.filter(({ category }) =>
        category.some(({ _id }) => _id == categoryId),
      )
    : products;

  if (filters.categories.length > 0) {
    if (filters.categories.includes("All")) {
      filteredProducts = [...filteredProducts];
    } else {
      filteredProducts = filteredProducts?.filter(({ category }) =>
        category.some(({ _id }) => filters.categories.includes(_id)),
      );
    }
  }

  if (filters.rating > 1) {
    filteredProducts = filteredProducts?.filter(
      (p) => p.rating >= filters.rating,
    );
  }

  if (filters.sort === "low-to-high") {
    filteredProducts = [...(filteredProducts ?? [])].sort(
      (a, b) => a.price - b.price,
    );
  } else if (filters.sort === "high-to-low") {
    filteredProducts = [...(filteredProducts ?? [])].sort(
      (a, b) => b.price - a.price,
    );
  }

  if (search != "") {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search),
    );
  }

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <FilterSidebar
              categories={categories}
              filters={filters}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
            />
          </div>

          <div className="col-12 col-md-9">
            <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
              Showing {filteredProducts?.length ?? 0} products
            </p>
            <div className="row g-3">
              {filteredProducts?.map((product) => (
                <div className="col-12 col-sm-6 col-lg-4" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
