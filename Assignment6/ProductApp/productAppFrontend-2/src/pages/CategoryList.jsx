import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../utils/http";
import { styled } from "styled-components";
import { useState } from "react";
import ProductItem from "../components/ProductItem";
import { useParams } from "react-router-dom";

const CategoryCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: #f9f9f9;
    color: black;
  }
`;

const CategoriesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const Container = styled.div`
  margin: 3rem 0 6rem 0;
  padding: 0 15%;
  align-items: center;
`;

export default function CategoryList() {
  const { categoryName } = useParams();

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
  } = useQuery({
    queryKey: ["products", { categoryName }],
    queryFn: ({ signal, queryKey }) =>
      fetchProducts({ signal, ...queryKey[1] }),
    enabled: !!categoryName,
  });

  let categoryContent;

  if (isLoadingCategory) {
    categoryContent = <p style={{ textAlign: "center" }}>Loading...</p>;
  } else if (isErrorCategory) {
    categoryContent = <p>error</p>;
    {
      /* <ErrorBlock
        title="An error occurred"
        message={
          errorCategory.info?.message ||
          "Failed to fetch products for the selected category."
        }
      /> */
    }
  }

  if (categoryData) {
    if (!categoryData.length) {
      categoryContent = (
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>No Data!</h3>
      );
    } else {
      categoryContent = (
        <ul className="product-list">
          {categoryData.map((product) => (
            <li key={product.id}>
              <ProductItem product={product} />
            </li>
          ))}
        </ul>
      );
    }
  }

  return <Container>{categoryContent}</Container>;
}
