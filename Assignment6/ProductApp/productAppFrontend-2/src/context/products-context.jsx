import { createContext, useEffect, useReducer, useState } from "react";
import { fetchProducts } from "../utils/http";
import { useQuery } from "@tanstack/react-query";

export const ProductContext = createContext({
  products: [],
});

function ProductReducer(state, action) {
  if (action.type === "INIT") {
    return { ...state, products: action.payload };
  }
  return state;
}

export default function ProductContextProvider({ children }) {
  const [state, dispatch] = useReducer(ProductReducer, {
    products: []
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => fetchProducts({ signal }),
    onSuccess: (fetchedProducts) => {
      dispatch({ type: "INIT", payload: fetchedProducts });
    },
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: "INIT", payload: data });
    }
  }, [data]);

  

  const value = {
    products: state.products,
    isLoading,
    error,
    
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
