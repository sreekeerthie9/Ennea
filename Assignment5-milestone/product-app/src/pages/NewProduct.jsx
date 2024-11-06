import { createNewProduct, queryClient } from "../util/http";
import { useMutation } from "@tanstack/react-query";
import {useContext, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Modal } from "antd";
import ErrorBlock from "../components/UI/ErrorBlock";
import { ProductContext } from "../context/products-context";

function NewProduct() {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const {addProduct} = useContext(ProductContext)
  
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Modal.success({
        title: "Product Created",
        content: "Your product has been created successfully.",
        onOk: () => navigate("/products"),
      });
    },
  });

  async function handleConfirm() {
    const values = await form.validateFields();
    mutate({ product: values });
    const newproduct = {
      id: Math.random()*100/5,
      ...values,
    }
    addProduct(newproduct);
    console.log(newproduct);
    
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
          style={{
            backgroundColor: hover ? "#e30d5b" : "",
            color: hover ? "#fff" : "",
            boxShadow: hover ? "0 2px 8px rgba(0, 0, 0, 0.26)" : "",
          }}
          onClick={handleConfirm}
          className="custom-button ant-button"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {isPending ? "Submitting..." : "Confirm and Create Product"}
        </Button>
        {isError && (
          <ErrorBlock
            title="Failed to add product"
            message={
              error.info?.message || "Unable to add product, try again later."
            }
          />
        )}
      </Form>
    </div>
  );
}

export default NewProduct;
