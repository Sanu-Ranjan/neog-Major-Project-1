import { Navbar } from "../components/NavBar";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL, API_ROUTES } from "../constants";
import { ProductCard } from "../components/ProductCard";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { FilterSidebar } from "../components/FilterSidebar";
import { Footer } from "../components/Footer";
import { postData } from "../utils/postData";

export const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Every filter now lives in the URL — shareable, bookmarkable, refresh-safe.
  const categoryParam = searchParams.get("category") ?? "";
  const ratingParam = Number(searchParams.get("rating") ?? 1);
  const sortParam = searchParams.get("sort") ?? "";
  const searchParam = (searchParams.get("search") ?? "").toLowerCase();

  const categories_selected = categoryParam ? categoryParam.split(",") : [];

  const [aiResults, setAiResults] = useState(null); // null = not tried yet
  const [aiLoading, setAiLoading] = useState(false);

  const { data, loading, error } = useFetch(
    `${API_BASE_URL}${API_ROUTES.products.getAll}`,
  );
  const products = data?.data?.products;

  const { data: categoryData } = useFetch(
    `${API_BASE_URL}${API_ROUTES.category.getAll}`,
  );
  const categories = categoryData?.data?.categories;

  // Every filter change writes straight into the URL.
  const onFilterChange = (type, value) => {
    const next = new URLSearchParams(searchParams);

    if (type === "category") {
      if (value === "All") {
        next.delete("category");
      } else {
        const current = categories_selected;
        const updated = current.includes(value)
          ? current.filter((c) => c !== value)
          : [...current, value];
        if (updated.length === 0) next.delete("category");
        else next.set("category", updated.join(","));
      }
    } else if (type === "rating") {
      next.set("rating", value);
    } else if (type === "sort") {
      next.set("sort", value);
    }

    setSearchParams(next);
  };

  const onClearFilters = () => {
    setSearchParams({});
  };

  // Shared filter logic : used for BOTH keyword results and AI fallback results,
  // so filters (category, rating, sort) apply no matter which source produced the list.
  const applyFilters = (list) => {
    let result = list ?? [];

    if (categories_selected.length > 0) {
      result = result.filter(({ category }) =>
        category.some(({ _id }) => categories_selected.includes(_id)),
      );
    }

    if (ratingParam > 1) {
      result = result.filter((p) => p.rating >= ratingParam);
    }

    if (sortParam === "low-to-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortParam === "high-to-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  };

  let keywordMatched = products;
  if (searchParam !== "") {
    keywordMatched = keywordMatched?.filter((product) =>
      product.name.toLowerCase().includes(searchParam),
    );
  }
  const filteredProducts = applyFilters(keywordMatched);

  const keywordSearchFailed =
    searchParam !== "" &&
    !loading &&
    !!products &&
    filteredProducts?.length === 0;

  // AI fallback search — only fires when keyword search found nothing.
  useEffect(() => {
    if (!keywordSearchFailed) {
      setAiResults(null);
      return;
    }
    (async () => {
      setAiLoading(true);
      const { data, error } = await postData(
        `${API_BASE_URL}${API_ROUTES.ai.search}`,
        { query: searchParam },
      );
      if (error || !data?.success) {
        setAiResults({ products: [], message: "" });
      } else {
        setAiResults(data.data);
      }
      setAiLoading(false);
    })();
  }, [keywordSearchFailed, searchParam]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  // Filters (category/rating/sort) apply to AI results exactly the same way.
  const filteredAiProducts = applyFilters(aiResults?.products);
  const showAiResults = keywordSearchFailed && filteredAiProducts.length > 0;

  const displayProducts = showAiResults ? filteredAiProducts : filteredProducts;
  const itemsCount = displayProducts?.length ?? 0;

  const filtersForSidebar = {
    categories: categories_selected.length > 0 ? categories_selected : ["All"],
    rating: ratingParam,
    sort: sortParam,
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-12 col-md-3">
              <FilterSidebar
                categories={categories}
                filters={filtersForSidebar}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
                clearSearchParam={() => onFilterChange("category", "All")}
              />
            </div>

            <div className="col-12 col-md-9">
              {itemsCount > 0 ? (
                <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                  Showing {itemsCount} products
                </p>
              ) : keywordSearchFailed && aiLoading ? (
                <div className="text-center my-4">
                  <span className="spinner-border spinner-border-sm text-warning me-2" />
                  <span style={{ fontSize: "14px" }}>
                    No exact matches — looking for similar products…
                  </span>
                </div>
              ) : showAiResults ? (
                <div
                  className="rounded-3 p-3 mb-3"
                  style={{ background: "#fff8e1", fontSize: "14px" }}
                >
                  <i className="bi bi-stars text-warning me-2"></i>
                  <span className="fw-semibold">
                    No exact matches found, but here are similar products.
                  </span>
                  {aiResults?.message && (
                    <span className="text-muted"> {aiResults.message}</span>
                  )}
                </div>
              ) : (
                <p className="text-center mb-3" style={{ fontSize: "14px" }}>
                  No Products Found
                </p>
              )}

              <div className="row g-3">
                {displayProducts?.map((product) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
