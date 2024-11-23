import {
  Dropdown,
  Layout,
  Space,
  Form,
  Modal,
  Button,
  Input,
  Menu,
  Select,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { HomeOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import { fetchCategories } from "../utils/http";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useState } from "react";

const StyledHeader = styled.header`
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem 2rem;

  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledMenu = styled(Menu)`
  display: flex;
  align-items: center;
  & a {
    font: inherit;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
    border: none;
    color: #110e0e;
    font-weight: bold;
    text-decoration: none;
    margin-right: 1rem;
  }
  & a:hover {
    color: #e30d7c;
  }
  & a.active {
    color: #e30d7c;
  }
`;

const AddButton = styled(Button)`
  background-color: ${(props) => (props.hover ? "#e30d5b" : "")};
  color: ${(props) => (props.hover ? "#fff" : "")};
  box-shadow: ${(props) =>
    props.hover ? "0 2px 8px rgba(0, 0, 0, 0.26)" : ""};
`;

export default function MainNavigation() {
  const [hover, setHover] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data } = useQuery({
    queryKey: ["products", "categories"],
    queryFn: ({ signal }) => fetchCategories({ signal }),
    staleTime: 5000,
  });

  function handleCategoryChange(value) {
    setSelectedCategory(value);
  }

  function showModal() {
    setModalVisible(true);
  }

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setModalVisible(false);
        navigate("/new", { state: values });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  }

  function handleCancel() {
    setModalVisible(false);
  }

  const dropdownItems = data
    ? data.map((category) => ({
        key: category.categoryName,
        label: category.categoryName,
      }))
    : [];

  function handleMenuClick(categoryName) {
    navigate(`/categories/${categoryName.key}`);
  }

  return (
    <>
      <Layout theme="dark">
        <StyledHeader>
          <StyledMenu>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              <HomeOutlined />
              Home
            </NavLink>
            <Dropdown
              menu={{
                items: dropdownItems,
                onClick: handleMenuClick,
              }}
            >
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                <Space>
                  Categories
                  <DownOutlined />
                </Space>
              </NavLink>
            </Dropdown>
          </StyledMenu>
          <StyledMenu>
            <AddButton
              type="primary"
              icon={<PlusOutlined />}
              style={{
                backgroundColor: hover ? "#e30d5b" : "",
                color: hover ? "#fff" : "",
                boxShadow: hover ? "0 2px 8px rgba(0, 0, 0, 0.26)" : "",
              }}
              onClick={showModal}
              className="custom-button ant-button"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Add New Product
            </AddButton>
          </StyledMenu>
        </StyledHeader>
      </Layout>
      <Modal
        title="Add New Product"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select onChange={handleCategoryChange}>
              {
                (data && data.map((category) => (
                  <Select.Option
                    key={category.categoryName}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </Select.Option>
                )))
              }
              <Select.Option key="other" value="Other">
                Other
              </Select.Option>
              {selectedCategory === "Other" && (
                <Form.Item
                  name="otherCategory"
                  label="Other Category"
                  rules={[
                    { required: true, message: "Please input the category!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
            </Select>
          </Form.Item>
          <Form.Item name="brand" label="Brand">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
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

          <Form.Item name="rating" label="Rating">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
