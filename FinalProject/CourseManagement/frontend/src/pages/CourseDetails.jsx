import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  deleteCourse,
  fetchCourseDetails,
  getEnrolledStudents,
  queryClient,
} from "../util/http";
import { Card, Modal, Typography } from "antd";
import ConfigStyles from "../components/ConfigStyles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuthToken, getRole } from "../util/auth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";

const StyledCard = styled(Card)`
  margin: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  overflow: hidden;
  display: block;
  height: 100%;
`;
const StyledImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  background-color: #f0f0f0;
  margin-bottom: 1rem;
`;
const StyledText = styled(Typography.Text)`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;
const StyledExtra = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 1rem;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;
const DeleteLink = styled.a`
  color: #e30d7c;
  cursor: pointer;
  &:hover {
    color: #c00;
  }
`;

export default function CourseDetails() {
  const { id } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const token = getAuthToken();
  const role = getRole();
  const navigate = useNavigate();
  let isAdmin = false;

  if (role === "ROLE_ADMIN") {
    isAdmin = true;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", id],
    queryFn: ({ signal }) => fetchCourseDetails({ signal, id }),
  });

  const { data: enrolledStudents } = useQuery({
    queryKey: ["courses", "student", id],
    queryFn: () => getEnrolledStudents(id),
    enabled: token && isAdmin,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      Modal.success({
        title: "Product Deleted",
        content: "Your product has been deleted successfully.",
        onOk: () => navigate("/"),
      });
    },
  });

  function handleDelete() {
    setDeleteModal(true);
  }

  function handleOk(){
    mutate(id);
    setDeleteModal(false);
  }

  function handleCancel() {
    setDeleteModal(false);
  }

  let content;

  if (data) {
    content = (
      <>
        {!isAdmin && (
          <StyledCard title={data.title}>
            <StyledImage alt={data.title} src={data.image} />
            <StyledText>{data.description}</StyledText>
            <StyledText>{data.category}</StyledText>
          </StyledCard>
        )}
        {token && isAdmin && (
          <>
            <Card
              title={data.title}
              extra={
                <StyledExtra>
                  <NavLink
                    to="/admin/new"
                    state={{ values: data, isEditMode: true }}
                  >
                    <EditOutlined key="edit" />
                    Edit
                  </NavLink>

                  <DeleteLink onClick={handleDelete}>
                    <DeleteOutlined key="delete" />
                    Delete
                  </DeleteLink>
                </StyledExtra>
              }
            >
              <img alt={data.title} src={data.image} />
              <StyledText>{data.description}</StyledText>
              <StyledText>{data.category}</StyledText>
              <StyledText>Total enrolled student:{enrolledStudents}</StyledText>
            </Card>
            <Modal
              title="Confirm Deletion"
              open={deleteModal}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Are you sure you want to delete this course?</p>{" "}
            </Modal>
            {isPending && <p>Deleting...</p>}
          </>
        )}
      </>
    );
  }
  return <>{content}</>;
}
