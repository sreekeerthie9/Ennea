import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "../util/http";
import ErrorBlock from "../components/UI/ErrorBlock";
import { styled } from "styled-components";
import { useState } from "react";
import ProductItem from "../components/ProductItem";

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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", "categories"],
    queryFn: ({ signal }) => fetchCategories({ signal }),
    staleTime: 5000,
  });

  const [categoryName, setCategoryName] = useState("");

  const {
    data: categoryData,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
    error: errorCategory,
  } = useQuery({
    queryKey: ["products", { categoryName }],
    queryFn: ({signal, queryKey }) => fetchProducts({signal, ...queryKey[1] }),
    enabled: !!categoryName,
  });

  function handleCategoryClick(categoryName) {
    setCategoryName(categoryName);
  }

  let content;

  if (isLoading) {
    content = (
      <p style={{ textAlign: "center" }}>Loading different categories...</p>
    );
  }

  if (isError) {
    <ErrorBlock
      title="An error occured"
      message={
        error.info?.message || "Failed to fetch different product categories."
      }
    />;
  }

  if (data) {
    const limitedCategories = data.slice(0, 10);
    content = (
      <CategoriesList>
        {limitedCategories.map((category) => (
          <li key={category.name}>
            <CategoryCard onClick={() => handleCategoryClick(category.name)}>
              <h3>{category.name}</h3>
            </CategoryCard>
          </li>
        ))}
      </CategoriesList>
    );
  }

  let categoryContent;

  if (isLoadingCategory) {
    categoryContent = <p style={{ textAlign: "center" }}>Loading...</p>;
  } else if (isErrorCategory) {
    categoryContent = (
      <ErrorBlock
        title="An error occurred"
        message={
          errorCategory.info?.message ||
          "Failed to fetch products for the selected category."
        }
      />
    );
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

  return (
    <Container>
      {content}
      {categoryContent}
    </Container>
  );
}
