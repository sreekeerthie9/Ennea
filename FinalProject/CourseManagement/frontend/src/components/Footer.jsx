import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const FooterContainer = styled.footer`
  background-color: antiquewhite;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 1.5rem;

  & a {
    font: inherit;
    cursor: pointer;
    border: none;
    color: #110e0e;
    text-decoration: none;
  }
  & a:hover {
    color: #e30d7c;
  }
  & a.active {
    color: #e30d7c;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;

  & svg {
    font-size: 1.5rem;
    cursor: pointer;
  }

  & svg:hover {
    color: #e30d7c;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Logo>MS</Logo>
      <FooterNav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </FooterNav>
      <SocialIcons>
        <FacebookOutlined />
        <TwitterOutlined />
        <InstagramOutlined />
        <LinkedinOutlined />
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
