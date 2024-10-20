import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchButton = styled.button`
  background-color: #333;
  align-items: center;
  color: white;

  &:hover {
    background-color: #333;
    color: #828c97;
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton type="submit">Search</SearchButton>
    </form>
  );
};

export default SearchBar;
