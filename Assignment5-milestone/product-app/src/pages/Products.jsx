import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http";
import ErrorBlock from "../components/UI/ErrorBlock";
import ProductItem from "../components/ProductItem";
import { useContext } from "react";
import { ProductContext } from "../context/products-context";

function ProductsPage() {
  const { products } = useContext(ProductContext);
  console.log(products);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => fetchProducts({ signal }),
  });

  let content;

  if (isPending) {
    content = <p>Loading...</p>;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured"
        message={error.info?.message || "Failed to fetch products."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="product-list">
        {data.map((product) => (
          <li key={product.id}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    );
  }

  if (products.length > 0) {
    content = (
      <ul className="product-list">
        {products.map((product) => (
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
