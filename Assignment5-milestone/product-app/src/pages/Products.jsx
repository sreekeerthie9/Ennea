import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http";
import ErrorBlock from "../components/UI/ErrorBlock";
import ProductItem from "../components/ProductItem";
import { useParams } from "react-router-dom";

function ProductsPage() {

  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: ({signal}) => fetchProducts({signal, categoryName:params.categoryName, searchTerm:params.searchTerm}),
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

  return <section className="content-section">{content}</section>;
}

export default ProductsPage;
