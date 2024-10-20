import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const StyledBookDetail = styled.div`
  padding: 20px;

  & img {
    width: 200px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-right: 20px;
  }

  & a {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  & a:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 15px;

    & img {
      width: 100%;
      margin-right: 0;
    }
  }
`;

const fetchBookDetail = async (id) => {
  const response = await fetch(`https://www.dbooks.org/api/book/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  return response.json();
};

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["bookDetail", id],
    queryFn: () => fetchBookDetail(id),
  });

  if (isLoading) return <p>Loading book details...</p>;
  //if (error) return <p>Error loading book details: {error.message}</p>;
  if (error) {
    navigate("/error", { replace: true });
    return null;
  }

  const authors = Array.isArray(data.authors)
    ? data.authors.join(", ")
    : data.authors || "Unknown Author";

  return (
    <StyledBookDetail>
      <img src={data.image} alt={data.title} />

      <h2>{data.title}</h2>
      <h4>{data.subtitle}</h4>
      <p>
        <strong>Authors:</strong> {authors}
      </p>
      <p>
        <strong>Description:</strong> {data.description}
      </p>
      <p>
        <strong>Publisher:</strong> {data.publisher}
      </p>
      <p>
        <strong>Year:</strong> {data.year}
      </p>
      <a href={data.download} target="_blank" rel="noopener noreferrer">
        Download Book
      </a>
    </StyledBookDetail>
  );
};

export default BookDetail;
