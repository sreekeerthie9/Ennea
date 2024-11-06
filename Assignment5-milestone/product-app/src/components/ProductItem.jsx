import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import classes from "./MainNavigation.module.css";

const ProductItemStyled = styled.article`
  height: 100%;
  margin: 2rem 0;
  padding: 0;
  border-radius: 4px;
  background-color: #3c4249;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  gap: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20rem;

  & img {
    max-width: 100%;
    height: auto;
    max-height: 300px;
    margin: auto;
    display: block;
  }

  & .product-item-content {
    height: 100%;
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & h2 {
    font-size: 1.15rem;
    font-family: "Lato", sans-serif;
    margin: 0;
    color: #d7bfcb;
  }

  & p {
    margin: 0.3rem 0;
  }

  & .product-category {
    font-weight: bold;
    color: #b0b3b7; // color for the category
  }

  & .product-brand {
    font-style: italic;
    color: #a6a9ad; // color for the brand
  }

  & .product-price {
    font-size: 1.2rem;
    color: #f0c14b; // standout color for price
    margin: 0.5rem 0;
  }

  & .product-rating {
    color: #ffcc00; // gold color for rating stars
  }

  & a {
  font: inherit;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border: none;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
}

& a:hover {
  color: #e30d7c;
}

& a.active {
  color: #e30d7c;
}
`;

export default function ProductItem({ product }) {
  let image;

  if (product.images) {
    image = product.images[0];
  } else {
    image =
      "https://www.lg.com/lg5-common/images/common/product-default-list-350.jpg";
  }
  //console.log(product);

  return (
    <ProductItemStyled>
      <img src={image} alt={product.title} />

      <div className="product-item-content">
        <h2>{product.title}</h2>
        <p>★{product.description}</p>

        {product.category && (
          <p className="product-category">Category: {product.category}</p>
        )}
        {product.brand && (
          <p className="product-brand">Brand: {product.brand}</p>
        )}
        <p className="product-price">Price: ${product.price}</p>
        {product.rating && <p className="product-rating">★{product.rating}</p>}

        {product.id && (
          
          <NavLink
          to={`/products/${product.id}`}
          className={({ isActive }) =>
            isActive ? "active" : undefined
          }
        >
          View Details
        </NavLink>
        )}
      </div>
    </ProductItemStyled>
  );
}
