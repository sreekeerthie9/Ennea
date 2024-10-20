import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: #333;
  padding: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: 1.2rem;

  & a {
    color: white;
    text-decoration: none;
  }

  & a:hover {
    color: #ddd;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 10px;

    & a {
      margin-bottom: 10px;
    }
  }
`;

const NavBar = () => {
  return (
    <StyledNav>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/read-later">Read Later</Link>
      <SearchBar />
    </StyledNav>
  );
};

export default NavBar;
