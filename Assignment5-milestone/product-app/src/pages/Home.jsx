
import { useState, memo, useMemo, useRef, useContext } from "react";
import { DatePicker, Table, Input, Button, message } from "antd";
import dayjs from 'dayjs';
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/products-context";

const ViewDetailsButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const { Search } = Input;

const HomePage = memo(function HomePage() {
  const searchElement = useRef();
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(dayjs().subtract(7, "days"));
  const [endDate, setEndDate] = useState(dayjs());
  const { products, isLoading } = useContext(ProductContext);
  const [searchValue, setSearchValue] = useState("");
  let content;

  const handleStartChange = (date) => {
    setStartDate(date);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
  };

  function handleSubmit() {
    message.info(
      `Start Date: ${startDate.format("YYYY-MM-DD")} End Date: ${endDate.format(
        "YYYY-MM-DD"
      )}`
    );
  }

  function handleViewDetails(productId) {
    navigate(`/products/${productId}`);
  }

  function handleSearch(value) {
    setSearchValue(value.toLowerCase());
  }

  const filteredProducts = useMemo(() => {
    return searchValue
      ? products.filter((product) => {
          return (
            (product.title && product.title.toLowerCase().includes(searchValue)) ||
            (product.category && product.category.toLowerCase() === searchValue) ||
            (product.brand && product.brand.toLowerCase() === searchValue)
          );
        })
      : products;
  }, [searchValue, products]); 

  const columns = useMemo(() => [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <ViewDetailsButton onClick={() => handleViewDetails(record.id)}>
          View Details
        </ViewDetailsButton>
      ),
    },
  ], []);


  content = (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        loading={isLoading}
      />
    </div>
  );

  return (
    <>
      <h2 style={{ fontWeight: "bold" }}>Welcome!</h2>

      <section className="content-section" id="all-events-section">
        <header style={{ alignItems: "center" }}>
          <div className="date-picker-group">
            <DatePicker
              defaultValue={startDate}
              onChange={handleStartChange}
              format="YYYY-MM-DD"
            />
            <DatePicker
              defaultValue={endDate}
              onChange={handleEndChange}
              disabledDate={(current) => current && current < startDate}
              format="YYYY-MM-DD"
            />
            <Button
              type="primary"
              style={{
                backgroundColor: hover ? "#e30d5b" : "",
                color: hover ? "#fff" : "",
                boxShadow: hover ? "0 2px 8px rgba(0, 0, 0, 0.26)" : "",
              }}
              className="custom-button ant-button"
              onClick={handleSubmit}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Submit
            </Button>
          </div>
          <div className="search-bar">
            <Search
              placeholder="Search products"
              onSearch={handleSearch}
              ref={searchElement}
              style={{ width: 400 }}
            />
          </div>
        </header>
        {content}
      </section>
    </>
  );
});

export default HomePage;
