import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http";
import ErrorBlock from "../components/UI/ErrorBlock";
import { useState, useRef } from "react";
import { DatePicker, Table, Input } from "antd";
import moment from "moment";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

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

function HomePage() {
  const [startDate, setStartDate] = useState(moment().subtract(7, "days"));
  const [endDate, setEndDate] = useState(moment());
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchElement = useRef();
  const onStartDateChange = (date) => {
    setStartDate(date);
  };

  const onEndDateChange = (date) => {
    setEndDate(date);
  };

  function handleViewDetails(productId) {
    navigate(`/products/${productId}`);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) =>
      fetchProducts({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined,
  });

  function handleSearch(value) {
    setSearchTerm(value);
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  const columns = [
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
  ];

  let content = (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={data}
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
            <DatePicker defaultValue={startDate} onChange={onStartDateChange} />
            <DatePicker
              defaultValue={endDate}
              onChange={onEndDateChange}
              disabledDate={(current) => current && current < startDate}
            />
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
}

export default HomePage;
