import { createNewProduct, queryClient } from "../util/http";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Modal } from "antd";

function NewProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Modal.success({
        title: "Product Created",
        content: "Your product has been created successfully.",
        onOk: () => navigate("/"),
      });
    },
  });


  function handleConfirm() {
    mutate({ event: form.validateFields() });
  }

  return (
    <div className="container">
      <h1 className="header">Confirm Product Details</h1>
      <Form form={form} initialValues={location.state} className="confirm-form">
        <Form.Item
          name="title"
          label="Title"
          className="custom-form-item-label"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input className="custom-input" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          className="custom-form-item-label"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input className="custom-input" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          className="custom-form-item-label"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Button
          type="primary"
          onClick={handleConfirm}
          className="custom-button ant-button"
        >
          {isPending? "Submitting..." : "Confirm and Create Product"}
        </Button>
      </Form>
    </div>
  );
}

export default NewProduct;
