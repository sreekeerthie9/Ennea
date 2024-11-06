import { createContext, useEffect, useReducer } from "react";
import { fetchProducts } from "../util/http";
import { useQuery } from "@tanstack/react-query";

export const ProductContext = createContext({
  products: [],
  addProduct: () => {},
});

function ProductReducer(state, action) {
  if (action.type === "INIT") {
    return { products: action.payload };
  }

  if (action.type === "ADD_PRODUCT") {
    const updatedProducts = [action.payload, ...state.products];
    return {
      products: updatedProducts,
    };
  }

  return state;
}

export default function ProductContextProvider({ children }) {
  const [state, dispatch] = useReducer(ProductReducer, {
    products: [],
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


  function handleAddProduct(product) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
  }

  const value = {
    products: state.products,
    addProduct: handleAddProduct,
    isLoading,
    error,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
