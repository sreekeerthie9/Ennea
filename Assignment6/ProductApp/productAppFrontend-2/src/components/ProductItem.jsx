import { Avatar, Card } from "antd";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import Icon, { EditOutlined } from "@ant-design/icons";

const { Meta } = Card;
const StyledCard = styled(Card)`
  height: 600px;
  margin: 2rem 0;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  gap: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20rem;

  & img {
    max-width: 100%;

    height: 300px;
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

  & .product-category {
    font-weight: bold;
    color: #b0b3b7;
  }

  & .product-brand {
    font-style: italic;
    color: #a6a9ad;
  }

  & .product-price {
    font-size: 1.2rem;
    color: #f0c14b;
    margin: 0.5rem 0;
  }

  & .product-rating {
    color: #ffcc00;
  }

  & a {
    font: inherit;
    cursor: pointer;
    border: none;
    color: #110e0e;
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

  if (product.image) {
    image = product.image;
  } else {
    image =
      "https://www.lg.com/lg5-common/images/common/product-default-list-350.jpg";
  }

  return (
    <>
      <StyledCard
        style={{ width: 300 }}
        cover={<img alt={product.title} src={image} />}
        title={product.title}
      >
        {product.category && (
          <p className="product-category">Category: {product.category}</p>
        )}

        <p className="product-price">Price: ${product.price}</p>
        {product.rating && <p className="product-rating">★{product.rating}</p>}

        {product.id && (
          <NavLink
            to={`/products/${product.id}`}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            View Details
          </NavLink>
        )}
      </StyledCard>
    </>
  );
}
