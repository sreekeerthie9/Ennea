import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import classes from "./MainNavigation.module.css";
import { Button, Input, Modal, Form } from "antd";
import { useState } from "react";

const StyledHeader = styled.header`
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem 2rem; /* Adjust padding */
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Subtle border */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function MainNavigation() {
  const [hover, setHover] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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

  return (
    <>
      <StyledHeader>
        <nav className={classes.headernav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Categories
          </NavLink>
        </nav>
        <Button
          type="primary"
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
        </Button>
      </StyledHeader>

      <Modal
        title="Add New Product"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
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
    </>
  );
}

export default MainNavigation;
