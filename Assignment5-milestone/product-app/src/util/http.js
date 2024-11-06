import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchProducts({ signal, categoryName }) {
  let url = "https://dummyjson.com/products";

  if (categoryName) {
    url = "https://dummyjson.com/products/category/" + categoryName;
  }
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occured while fetching the products.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { products } = await response.json();
  
  return products;
}

export async function fetchCategories({ signal }) {
  
  const response = await fetch("https://dummyjson.com/products/categories", {
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error("An error occured while fetching the products.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const categories = await response.json();
  

  return categories;
}

export async function fetchProductDetails({ id, signal }) {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    signal,
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the product");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const product = await response.json();
  console.log("Fetched product:", product);
  return product;
}

export async function createNewProduct(productData) {
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while creating the product");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const product = await response.json();

  return product;
}
