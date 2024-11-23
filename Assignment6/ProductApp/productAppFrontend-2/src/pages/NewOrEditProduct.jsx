import { createNewProduct, queryClient, updateProduct } from "../utils/http";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Modal, Descriptions, Space, Card } from "antd";
import styled from "styled-components";
import { ProductContext } from "../context/products-context";

const StyledForm = styled(Form)`
  margin: auto;
  width: 50%;
  border: 3px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .ant-form-item {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
  }
  .ant-form-item-label {
    margin-bottom: 8px;
  }
  .ant-form-item-label > label {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .ant-input {
    border-color: #e30d7c;
  }
`;

export default function NewProduct() {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {values, isEditMode } = location.state || {};
  const [form] = Form.useForm();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: isEditMode ? updateProduct : createNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Modal.success({
        title: "Product Created",
        content: isEditMode
          ? "Your product has been edited successfully."
          : "Your product has been created successfully.",
        onOk: () => navigate("/products"),
      });
    },
  });

  async function handleConfirm() {
    const confirmedValues = await form.validateFields();
    
    mutate({
      id: isEditMode ? values.id : undefined,
      ...confirmedValues,
    });
  }

  return (
    <>
      <h1 style={{textAlign: "center"}}>{isEditMode ? "Edit Product Details" : "Confirm Product Details"}</h1>
      <StyledForm form={form} initialValues={values} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="category" label="Category">
          <Input />
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
          rules={[{ required: true, message: "Please input the description!" }]}
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
        <Button
          type="primary"
          className="ant-btn"
          onClick={handleConfirm}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {isPending ? "Submitting..." : "Confirm details."}
        </Button>
        {isError && <p>Error!!</p>}
      </StyledForm>
    </>
  );
}
