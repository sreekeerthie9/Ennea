import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http";
import ErrorBlock from "../components/UI/ErrorBlock";
import ProductItem from "../components/ProductItem";
import { useContext } from "react";
import { ProductContext } from "../context/products-context";

function ProductsPage() {
  const { products } = useContext(ProductContext);
  let content;
  if (products.length > 0) {
    let newProducts= products.slice(0,10)
    content = (
      <ul className="product-list">
        {newProducts.map((product) => (
          <li key={product.id}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section">
      <h2>Newly Added Products</h2>
      {content}
    </section>
  );
}

export default ProductsPage;
