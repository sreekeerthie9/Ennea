// src/Page1.js
import React, { useState, useEffect } from "react";
import { DatePicker, Table, Input, Button, Modal, Form } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const { Search } = Input;

const HomePage = () => {
  const [startDate, setStartDate] = useState(moment().subtract(7, "days"));
  const [endDate, setEndDate] = useState(moment());
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const onStartDateChange = (date) => {
    setStartDate(date);
  };

  const onEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSearch = async (value) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${value}`
      );
      setFilteredProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error searching products:", error);
      setLoading(false);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("New Product Details:", values);
        form.resetFields();
        setModalVisible(false);
        navigate("/new", { state: values });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <div className="container">
      <h1 className="header">Home</h1>
      <div className="date-picker-group">
        <DatePicker defaultValue={startDate} onChange={onStartDateChange} />
        <DatePicker
          defaultValue={endDate}
          onChange={onEndDateChange}
          disabledDate={(current) => current && current < startDate}
        />
        <Button type="primary" onClick={showModal} className="add-button">
          Add New Product
        </Button>
      </div>
      <div className="search-bar">
        <Search
          placeholder="Search products"
          onSearch={handleSearch}
          style={{ width: 400 }}
        />
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={loading}
        />
      </div>
      <Modal
        title="Add New Product"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} className="modal-form">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
