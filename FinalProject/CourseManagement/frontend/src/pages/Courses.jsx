import CourseItem from "../components/CourseItem";
import { useContext } from "react";
import { CourseContext } from "../context/course-context";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const StyledContainer = styled.div`
  padding: 2rem;
  margin: 1rem;
`;
const Heading = styled.h2`
  color: #343a40;
  margin-bottom: 1.5rem;
`;
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

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #e74c3c;
`;

export default function Courses() {
  const { isLoading, error, searchResults } = useContext(CourseContext);

  let content;

  if (isLoading) {
    content = <LoadingOutlined />;
  }
  if (error) {
    content = <ErrorMessage>{error.info}</ErrorMessage>;
  }

  const displayedCourses = searchResults ? searchResults.filteredCourses : [];

  if (searchResults) {
    content = (
      <>
        {searchResults.searchTerm && (
          <Heading>Search results for "{searchResults.searchTerm}"</Heading>
        )}
        <CourseList>
          {displayedCourses.map((course) => (
            <CourseListItem key={course.id}>
              <CourseItem course={course} />
            </CourseListItem>
          ))}
        </CourseList>
      </>
    );
  }

  return <StyledContainer>{content}</StyledContainer>;
}
