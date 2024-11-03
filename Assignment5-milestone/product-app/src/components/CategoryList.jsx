import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../util/http";
import ErrorBlock from "./UI/ErrorBlock";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const CategoryCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
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

export default function CategoryList() {
    const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", "categories"],
    queryFn: ({ signal }) => fetchCategories({ signal }),
  });

  function handleCategoryClick(category){
    
    navigate(`/products?category=${category}`);
  };

  let content;


  if (isLoading) {
    content = <p>Loading different categories.</p>;
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
            <CategoryCard onClick={() => handleCategoryClick(category)}>
              <h3>{category.name}</h3>
            </CategoryCard>
          </li>
        ))}
      </CategoriesList>
    );
  }

  return <div>{content}</div>;
}
