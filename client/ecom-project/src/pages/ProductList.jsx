import { Navbar } from "../components/NavBar";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { API_BASE_URL, API_ROUTES } from "../constants";
import { ProductCard } from "../components/ProductCard";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { FilterSidebar } from "../components/FilterSidebar";
import { useSearch } from "../contexts/SearchContext";
import { Footer } from "../components/Footer";
import { postData } from "../utils/postData";

export const ProductList = () => {
  const [filters, setFilters] = useState({
    categories: [],
    rating: 1,
    sort: "",
  });
  const { search, clearSearch } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const [aiResults, setAiResults] = useState(null); // null = not tried yet
  const [aiLoading, setAiLoading] = useState(false);

  // Sync URL category param into filter state so checkbox reflects it
  useEffect(() => {
    if (categoryId) {
      setFilters((prev) => ({ ...prev, categories: [categoryId] }));
    }
  }, [categoryId]);

  const { data, loading, error } = useFetch(
    `${API_BASE_URL}${API_ROUTES.products.getAll}`,
  );
  const products = data?.data?.products;

  const { data: categoryData } = useFetch(
    `${API_BASE_URL}${API_ROUTES.category.getAll}`,
  );
  const categories = categoryData?.data?.categories;

  const onFilterChange = (type, value) => {
    if (type === "category") {
      // Clear URL category param when user manually changes category
      setSearchParams({});
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

  // Single unified filtering — no more dual categoryId + filters.categories
  let filteredProducts = products;

  if (filters.categories.length > 0) {
    if (filters.categories.includes("All")) {
      filteredProducts = [...(products ?? [])];
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

  if (search !== "") {
    filteredProducts = filteredProducts?.filter((product) =>
      product.name.toLowerCase().includes(search),
    );
  }

  const keywordSearchFailed =
    search !== "" && !loading && !!products && filteredProducts?.length === 0;

  // AI fallback search : only fires when keyword search found nothing
  useEffect(() => {
    if (!keywordSearchFailed) {
      setAiResults(null);
      return;
    }
    (async () => {
      setAiLoading(true);
      const { data, error } = await postData(
        `${API_BASE_URL}${API_ROUTES.ai.search}`,
        { query: search },
      );
      if (error || !data?.success) {
        setAiResults({ products: [], message: "" });
      } else {
        setAiResults(data.data);
      }
      setAiLoading(false);
    })();
  }, [keywordSearchFailed, search]);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const itemsCount = filteredProducts?.length ?? 0;
  const showAiResults = keywordSearchFailed && aiResults?.products?.length > 0;

  const displayProducts = showAiResults ? aiResults.products : filteredProducts;

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-12 col-md-3">
              <FilterSidebar
                categories={categories}
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
                clearSearchParam={() => setSearchParams({})}
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
                  {aiResults.message && (
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
