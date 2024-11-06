import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchProductDetails } from "../util/http";
import { useContext } from "react";
import { ProductContext } from "../context/products-context";

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
  const { products } = useContext(ProductContext);
  let addedProductData;
  let image;
  let content;
  //if (params.productId >= 1000) {
    addedProductData = products.find(
      (product) => params.productId == product.id
    );
    if (addedProductData) {
      if (addedProductData.images) {
        image = addedProductData.images[0];
      } else {
        image =
          "https://www.lg.com/lg5-common/images/common/product-default-list-350.jpg";
      }
      content = (
        <>
          <div id="product-details">
            <header>
              <h1>{addedProductData.title}</h1>
            </header>
            <img src={image} alt={addedProductData.title} />
          </div>

          <ProductDetailsStyled>
            <p>★{addedProductData.description}</p>
            {addedProductData.category && (
              <p className="product-category">Category: {addedProductData.category}</p>
            )}
            {addedProductData.brand && (
              <p className="product-brand">Brand: {addedProductData.brand}</p>
            )}
            <p className="product-price">Price: ${addedProductData.price}</p>
            {addedProductData.rating && (
              <p className="product-rating">★{addedProductData.rating}</p>
            )}
          </ProductDetailsStyled>
        </>
      );
    }
 // } 
 /* else {
    const { data, isPending, isError, error } = useQuery({
      queryKey: ["products", params.productId],
      queryFn: ({ signal }) =>
        fetchProductDetails({ signal, id: params.productId }),
    });
    if (isPending) {
      content = (
        <div id="product-details-content">
          <p>Fetching product data...</p>
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
            <p>★{data.description}</p>
            {data.category && (
              <p className="product-category">Category: {data.category}</p>
            )}
            {data.brand && (
              <p className="product-brand">Brand: {data.brand}</p>
            )}
            <p className="product-price">Price: ${data.price}</p>
            {data.rating && (
              <p className="product-rating">★{data.rating}</p>
            )}
          </ProductDetailsStyled>
        </>
      );
    }
  } */

  //console.log('params:', params); console.log('data:', data);

 

  return (
    <>
      <article id="product-details">{content}</article>
    </>
  );
  }
