import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../util/http";
import CourseItem from "../components/CourseItem";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const Container = styled.div`
  padding: 2rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200vh;
`;

const Heading = styled.h2`
  font: inherit;
  color: #343a40;
  margin-bottom: 1.5rem;
  font-size: 2rem;
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

export default function CategoryCourseList() {
  const { categoryName } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", categoryName],
    queryFn: () => fetchCategory(categoryName),
    enabled: !!categoryName,
  });

  let content;

  if (isLoading) {
    content = <LoadingIcon spin />;
  } else if (error) {
    content = <ErrorMessage>{error.info}</ErrorMessage>;
  } else if (data) {
    content = (
      <>
        {categoryName && <Heading>{categoryName}</Heading>}
        <CourseList>
          {data.map((course) => (
            <CourseListItem key={course.id}>
              <CourseItem course={course} />
            </CourseListItem>
          ))}
        </CourseList>
      </>
    );
  }

  return <Container>{content}</Container>;
}
