import { Button, Card, message, Modal } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuthToken, getRole } from "../util/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient,  getProfile, enrollTOCourse, unrollCourse } from "../util/http";

const CourseCard = styled(Card)`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const CourseImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const Wrapper = styled.div`
  height: 150px;
  width: 100%;
`;

const CourseTitle = styled.h3`
  font-size: 1.25rem;
  margin: 1rem 0;
`;

const CourseDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  color: #e30d7c;
  border: 1px solid #e30d7c;
  border-radius: 4px;
  &:hover {
    background-color: #e30d7c;
    color: #fff;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  color: #e30d7c;
  border: 1px solid #e30d7c;
  border-radius: 4px;
  &:hover {
    background-color: #e30d7c;
    color: #fff;
  }
`;

export default function CourseItem({ course }) {
  const token = getAuthToken();
  const role = getRole();
  const navigate = useNavigate();
  let isAdmin = false;
  let enrolled = false;

  if (role === "ROLE_ADMIN") {
    isAdmin = true;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    enabled: !!token && !isAdmin,
  });

  const {
    mutate: enroll,
    isPending: enrolling,
    isError: enrollError,
  } = useMutation({
    mutationFn: enrollTOCourse,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      Modal.success({
        title: "Enrolled to Course",
        content: "you have been successfully enrolled to this course.",
        onOk: () => navigate("/"),
      });
    },

    onError: (error) => {
      if (error.code === 403) {
        message.error("Max limit exceeded");
      } else {
        message.error("An error occurred while enrolling in the course.");
      }
    },
  });

  const {
    mutate: unroll,
    isPending: unrolling,
    isError: unrollError,
  } = useMutation({
    mutationFn: unrollCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["courses", "profile"] });
      Modal.success({
        title: "Unrolled from Course",
        content: "you have been successfully unrolled from this course.",
        onOk: () => navigate("/"),
      });
    },
  });

  if (data && data.courses.some((userCourse) => userCourse.id === course.id)) {
    enrolled = true;
  }

  function handleEnroll() {
    enroll(course.id);
  }

  function handleUnroll() {
    unroll(course.id);
  }

  return (
    <>
      <CourseCard key={course.id}>
        <CourseImage src={course.image} alt={course.title} />
        <Wrapper>
          <CourseTitle>{course.title}</CourseTitle>
          <CourseDescription>{course.description}</CourseDescription>
        </Wrapper>
        <StyledNavLink to={`/courses/${course.id}`}>View Details</StyledNavLink>

        {token && !isAdmin && !enrolled && (
          <StyledButton onClick={handleEnroll}>Enroll</StyledButton>
        )}
        {token && !isAdmin && enrolled && (
          <StyledButton onClick={handleUnroll}>Unroll</StyledButton>
        )}
      </CourseCard>
    </>
  );
}
