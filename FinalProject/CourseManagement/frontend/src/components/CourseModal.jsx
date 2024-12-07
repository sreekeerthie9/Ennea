import { useQuery } from "@tanstack/react-query";
import { Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { fetchAllCategories } from "../util/http";
import { useNavigate } from "react-router-dom";

export default function CourseModal({ visible, onCancel }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses", "categories"],
    queryFn: ({ signal }) => fetchAllCategories({ signal }),
  });

  function handleCategoryChange(value) {
    setSelectedCategory(value);
  }

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        navigate("/admin/new", { state: { values, isEditMode: false } });
        onCancel();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  }
  return (
    <Modal
      open={visible}
      title="Add New Course"
      okText="Create"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Course Title"
          rules={[
            {
              required: true,
              message: "Please enter the course title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please input the category!" }]}
        >
          <Select onChange={handleCategoryChange}>
            {categories &&
              categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            <Select.Option key="other" value="Other">
              Other
            </Select.Option>
          </Select>
        </Form.Item>

        {selectedCategory === "Other" && (
          <Form.Item
            label="Enter Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input the category!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter the course description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please input the image url!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
