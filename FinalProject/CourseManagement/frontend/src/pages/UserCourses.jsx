import { useQuery } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import CourseItem from "../components/CourseItem";
import { getAuthToken, getRole } from "../util/auth";
import { getProfile } from "../util/http";

const StyledContainer = styled.div`
  padding: 2rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h3`
  color: #343a40;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CourseList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const CourseListItem = styled.li`
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #e74c3c;
`;

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 2rem;
  color: #1890ff;
`;

export default function UserCourses() {
  const token = getAuthToken();
  const role = getRole();
  let isAdmin = false;

  if (role === "ROLE_ADMIN") {
    isAdmin = true;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    enabled: token && !isAdmin,
  });

  let content;

  if (isLoading) {
    content = <LoadingIcon spin />;
  } else if (error) {
    content = <ErrorMessage>{error.info}</ErrorMessage>;
  } else if (data) {
    if (data.courses.length) {
      content = (
        <CourseList>
          {data.courses.map((course) => (
            <CourseListItem key={course.id}>
              <CourseItem course={course} />
            </CourseListItem>
          ))}
        </CourseList>
      );
    } else {
      content = <p>You have not enrolled in any course.</p>;
    }
  }

  return <StyledContainer>{content}</StyledContainer>;
}
