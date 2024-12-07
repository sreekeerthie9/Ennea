import { Button, Card, Modal } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuthToken, getRole } from "../util/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  enrollTOCourse,
  getProfile,
  queryClient,
  unrollCourse,
} from "../util/http";

const StyledCard = styled(Card)`
  margin: 2rem 0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20rem;
  text-align: center;

  & .product-category {
    font-size: 1.5rem;
    font-weight: bold;
    color: #b0b3b7;
  }

  & a {
    font: inherit;
    cursor: pointer;
    border: none;
    color: #110e0e;
    font-weight: bold;
    text-decoration: none;
  }

  & a:hover {
    color: #e30d7c;
  }

  & a.active {
    color: #e30d7c;
  }
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
  width: 100px; /* Ensure consistent button width */
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
    enabled:token && !isAdmin,
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
  });

  const {
    mutate: unroll,
    isPending: unrolling,
    isError: unrollError,
  } = useMutation({
    mutationFn: unrollCourse,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["courses","profile"] });
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
      <StyledCard
        title={course.title}
        cover={<StyledImage alt={course.title} src={course.image} />}
      >
        <p className="product-category">Category: {course.category}</p>

        <NavLink
          to={`/courses/${course.id}`}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          View Details
        </NavLink>
        {token && !isAdmin && !enrolled && (
          <StyledButton onClick={handleEnroll}>Enroll</StyledButton>
        )}
        {token && !isAdmin && enrolled && (
          <StyledButton onClick={handleUnroll}>Unroll</StyledButton>
        )}
      </StyledCard>
    </>
  );
}
