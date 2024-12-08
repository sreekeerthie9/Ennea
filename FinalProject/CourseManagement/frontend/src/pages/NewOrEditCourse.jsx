import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useMutation } from "@tanstack/react-query";
import { queryClient, addNewCourse, editCourse } from "../util/http";
import { useForm } from "antd/es/form/Form";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
  background-color: #f8f9fa;
`;

const StyledForm = styled(Form)`
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled(Typography.Title)`
  text-align: center;
  color: #343a40;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #e30d7c;
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
  &:hover {
    background-color: #c00967;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: #e74c3c;
  text-align: center;
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
        title: "Course Added",
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
    <Container>
      <StyledForm form={form} initialValues={values} layout="vertical">
        <StyledTitle level={2}>
          {isEditMode ? "Edit Course Details" : "Confirm Course Details"}
        </StyledTitle>

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
          rules={[{ required: true, message: "Please input the category!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please input the image URL!" }]}
        >
          <Input />
        </Form.Item>

        <StyledButton type="primary" onClick={handleConfirm}>
          {isPending ? "Submitting..." : "Confirm Details"}
        </StyledButton>
        {isError && <ErrorMessage>Error!!</ErrorMessage>}
      </StyledForm>
    </Container>
  );
}
