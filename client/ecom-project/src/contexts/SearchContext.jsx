import { useContext, useState, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState("");
  const clearSearch = () => {
    setSearch("");
    setProduct("");
  };
  return (
    <SearchContext.Provider
      value={{ search, product, setSearch, clearSearch, setProduct }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
