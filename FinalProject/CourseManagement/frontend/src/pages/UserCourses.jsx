import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../util/http";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import CourseItem from "../components/CourseItem";
import { getAuthToken, getRole } from "../util/auth";

const CourseList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 3rem;
`;
const CourseListItem = styled.li`
  display: flex;
  justify-content: center;
`;

export default function UserCourses() {
  const token = getAuthToken();
  const role = getRole();
  let isAdmin = false;
  if(role === "ROLE_ADMIN"){
    isAdmin = true;
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    enabled:token && !isAdmin
  });

  let content;
  if (isLoading) {
    content = <LoadingOutlined />;
  }

  if (error) {
    content = <p>{error.info}</p>;
  }
  
  if (data) {
    content = (
      <CourseList>
        {data.courses.map((course) => (
          <CourseListItem key={course.id}>
            <CourseItem course={course} />
          </CourseListItem>
        ))}
      </CourseList>
    );
  }
  if (!data) {
    content = <p>Tou have not enrolled to any course.</p>;
  }

  return (
    <>
    {content}
    </>
  )
}
