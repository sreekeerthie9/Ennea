import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchProductDetails } from "../util/http";

const ProductDetailsStyled = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & p {
    margin: 0.3rem 0;
  }

  & .product-category {
    font-size: 1.5rem;
    font-weight: bold;
    color: #b0b3b7; 
  }

  & .product-brand {
    font-size: 1.5rem;
    font-style: italic;
    color: #a6a9ad; 
  }

  & .product-price {
    font-size: 1.5rem;
    color: #f0c14b; 
    margin: 0.5rem 0;
  }

  & .product-rating {
    font-size: 1.5rem;
    color: #ffcc00;
  }
`;

export default function ProductDetailsPage() {
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", params.productId],
    queryFn: ({ signal }) =>
      fetchProductDetails({ signal, id: params.productId }),
  });
  //console.log('params:', params); console.log('data:', data);

  let image;

  let content;

  if (isPending) {
    content = (
      <div id="product-details-content">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="product-details-content">
        <ErrorBlock
          title="Failed to load event."
          message={
            error.info?.message ||
            "Failed to fetch product details. try again later."
          }
        />
      </div>
    );
  }

  if (data) {
    if (data.images) {
      image = data.images[0];
    } else {
      image =
        "https://www.lg.com/lg5-common/images/common/product-default-list-350.jpg";
    }
    content = (
      <>
        <div id="product-details">
          <header>
            <h1>{data.title}</h1>
          </header>
          <img src={image} alt={data.title} />

        </div>

        <ProductDetailsStyled>
          
          <p className="product-category">Category: {data.category}</p>
          <p className="product-brand">Brand: {data.brand}</p>
          <p className="product-price">Price: ${data.price.toFixed(2)}</p>
          <p className="product-rating">★{data.rating}</p>
        </ProductDetailsStyled>
      </>
    );
  }

  return (
    <>
      <article id="product-details">{content}</article>
    </>
  );
}
