import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchProducts({ signal, categoryName }) {
  let url = "http://localhost:8080/products";

  if (categoryName) {
    url = "http://localhost:8080/products/categories/" + categoryName;
  }
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occured while fetching the products.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const products = await response.json();

  return products;
}

export async function fetchCategories({ signal }) {
  const response = await fetch("http://localhost:8080/products/categories", {
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
  const response = await fetch(`http://localhost:8080/products/${id}`, {
    signal,
  });
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the product");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const product = await response.json();
  return product;
}

export async function createNewProduct(productData) {
  const response = await fetch("http://localhost:8080/products/add", {
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

export async function updateProduct(productData) {
  const response = await fetch(`http://localhost:8080/products/add/${productData.id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while updating the product");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const product = await response.json();

  return product;
}

export async function deleteProduct(id) {
  console.log(id);
  const response = await fetch(`http://localhost:8080/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = new Error("An error occurred while deleting the product");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  let data = response.json;
  return data;
}
