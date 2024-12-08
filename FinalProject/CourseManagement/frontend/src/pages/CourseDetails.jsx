import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  fetchCourseDetails,
  queryClient,
  deleteCourse,
  getEnrolledStudents,
} from "../util/http";
import { Card, Modal, Typography } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuthToken, getRole } from "../util/auth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const CourseDetailsCard = styled(Card)`
  max-width: 700px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledImage = styled.img`
  width: 300px;
  object-fit: cover;
  background-color: #f0f0f0;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Typography.Title)`
  font-size: 2rem;
  color: #343a40;
  margin-bottom: 1rem;
`;

const StyledText = styled(Typography.Text)`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const HighlightedText = styled(Typography.Text)`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const StyledExtra = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
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

const StyledNavLink = styled(NavLink)`
  color: #e30d7c;
  &:hover {
    color: #e30d5b;
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
    enabled: !!token && isAdmin,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      Modal.success({
        title: "Course Deleted",
        content: "The course has been deleted successfully.",
        onOk: () => navigate("/"),
      });
    },
  });

  function handleDelete() {
    setDeleteModal(true);
  }

  function handleOk() {
    mutate(id);
    setDeleteModal(false);
  }

  function handleCancel() {
    setDeleteModal(false);
  }

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>There was an error loading the course details.</p>;
  } else if (data) {
    content = (
      <CourseDetailsCard>
        <ContentWrapper>
          <StyledImage alt={data.title} src={data.image} />
          <DetailsWrapper>
            <StyledTitle>{data.title}</StyledTitle>
            <HighlightedText>{data.description}</HighlightedText>
            <StyledText>Category:</StyledText>
            <HighlightedText>{data.category}</HighlightedText>
            {!token && (
              <StyledText style={{ fontWeight: "bold" }}>
                To enroll to close please login or sign up.
              </StyledText>
            )}
            {token && isAdmin && (
              <>
                <StyledText>
                  Total enrolled students:{" "}
                  <HighlightedText>{enrolledStudents || 0}</HighlightedText>
                </StyledText>
                <StyledExtra>
                  <StyledNavLink
                    to="/admin/new"
                    state={{ values: data, isEditMode: true }}
                  >
                    <EditOutlined key="edit" /> Edit
                  </StyledNavLink>
                  <DeleteLink onClick={handleDelete}>
                    <DeleteOutlined key="delete" /> Delete
                  </DeleteLink>
                </StyledExtra>

                <Modal
                  title="Confirm Deletion"
                  open={deleteModal}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Are you sure you want to delete this course?</p>
                </Modal>
                {isPending && <p>Deleting...</p>}
              </>
            )}
            <StyledNavLink to="../">Back</StyledNavLink>
          </DetailsWrapper>
        </ContentWrapper>
      </CourseDetailsCard>
    );
  }

  return <Container>{content}</Container>;
}
