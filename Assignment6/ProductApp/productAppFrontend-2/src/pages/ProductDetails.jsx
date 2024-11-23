import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteProduct, fetchProductDetails, queryClient } from "../utils/http";
import { Card, Modal} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const StyledSection = styled.section`
  display: flex;

  justify-content: center;
  margin: 3rem auto;
`;

const Extra = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 1rem;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: left;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 300px;
  img {
    width: 300px;
    height: auto;
  }
`;
const DetailsWrapper = styled.div`
  flex: 2;
  margin-left: 40px;
`;

const StyledCard = styled(Card)`
  height: 100%;
  display: block;

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
  const { id } = useParams();
  const navigate = useNavigate();
  let image;
  let content;

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: ({ signal }) => fetchProductDetails({ signal, id }),
  });

  const {mutate, isPending, isError} = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
        console.log("Delete successful"+data);
        queryClient.invalidateQueries({queryKey: ["products"]});
        Modal.success({
            title: "Product Deleted",
            content: "Your product has been deleted successfully.",
            onOk: () => navigate("/"),
        })
    }
  })

  function handleDelete(){
    if(window.confirm("Are you sure you want to delete?")){
        mutate(id);
    }
  }

  if (product) {
    if (product.image) {
      image = product.image;
    } else {
      image =
        "https://www.lg.com/lg5-common/images/common/product-default-list-350.jpg";
    }
    content = (
      <>
        <StyledCard
          style={{ width: 600 }}
          title={product.title}
          extra={
            <Extra>
              <NavLink to="/new" state={product}>
                <EditOutlined key="edit" />
                edit
              </NavLink>

              <a onClick={handleDelete}>
                <DeleteOutlined key="delete" />
                Delete
              </a>
            </Extra>
          }
        >
          <ContentWrapper>
            <ImageWrapper>
              <img alt={product.title} src={image} />
            </ImageWrapper>
            <DetailsWrapper>
              <p>★{product.description}</p>

              {product.category && (
                <p className="product-category">Category: {product.category}</p>
              )}

              {product.brand && (
                <p className="product-brand">Brand: {product.brand}</p>
              )}

              <p className="product-price">Price: ${product.price}</p>
              {product.rating && (
                <p className="product-rating">★{product.rating}</p>
              )}
            </DetailsWrapper>
          </ContentWrapper>
        </StyledCard>
      </>
    );
  }
  return (
    <>
      <StyledSection>{content}</StyledSection>
    </>
  );
}
