import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import ConfigStyles from "../components/ConfigStyles";
import { addNewCourse, editCourse, queryClient } from "../util/http";
import { useForm } from "antd/es/form/Form";
import styled from "styled-components";

const StyledForm = styled(Form)`
  padding: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  font: inherit;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default function NewOrEditCourse() {
  const location = useLocation();
  const [form] = useForm();
  const { values, isEditMode } = location.state || {};
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: isEditMode ? editCourse : addNewCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      Modal.success({
        title: "CourseAdded",
        content: isEditMode
          ? "Course has been edited successfully."
          : "Course has been added successfully.",
        onOk: () => navigate("/"),
      });
    },
  });

  async function handleConfirm() {
    const confirmedValues = await form.validateFields();
    if (isEditMode) {
      mutate({
        id: values.id,
        ...confirmedValues,
      });
    } else {
      mutate(confirmedValues);
    }
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        {isEditMode ? "Edit Course Details" : "Confirm Course Details"}
      </h1>
      <StyledForm form={form} initialValues={values} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
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
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input />
          {/* {values.image && <img alt="values.title" src={values.image} />} */}
        </Form.Item>

        <Button type="primary" className="ant-btn" onClick={handleConfirm}>
          {isPending ? "Submitting..." : "Confirm details."}
        </Button>
        {isError && <p>Error!!</p>}
      </StyledForm>
    </>
  );
}
