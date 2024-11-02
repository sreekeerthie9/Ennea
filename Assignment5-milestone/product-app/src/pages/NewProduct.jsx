// src/Page2.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';


const NewProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleConfirm = async () => {
    try {
      const values = await form.validateFields();
      console.log('Confirmed Product Details:', values);
      await axios.post('https://dummyjson.com/products/add', values);
      Modal.success({
        title: 'Product Created',
        content: 'Your product has been created successfully.',
        onOk: () => navigate('/')
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="container">
        
      <h1 className="header">Confirm Product Details</h1>
      <Form
        form={form}
        initialValues={location.state}
        className="confirm-form"
      >
        <Form.Item
          name="title"
          label="Title"
          className="custom-form-item-label"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input className="custom-input"/>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          className="custom-form-item-label"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input className="custom-input"/>
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          className="custom-form-item-label"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <Input type="number" className="custom-input"/>
        </Form.Item>
        <Button type="primary" onClick={handleConfirm} className="confirm-button">
          Confirm and Create Product
        </Button>
      </Form>
      
    </div>
  );
};

export default NewProductPage;
