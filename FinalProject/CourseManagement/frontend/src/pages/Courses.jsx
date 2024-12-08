import CourseItem from "../components/CourseItem";
import { useContext } from "react";
import { CourseContext } from "../context/course-context";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const StyledContainer = styled.div`
  padding: 2rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  flex-grow: 1;
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

export default function Courses() {
  const { isLoading, error, searchResults } = useContext(CourseContext);

  let content;

  if (isLoading) {
    content = <LoadingIcon spin />;
  } else if (error) {
    content = <ErrorMessage>{error.info}</ErrorMessage>;
  } else {
    const displayedCourses = searchResults ? searchResults.filteredCourses : [];
    content = (
      <>
        {searchResults?.searchTerm && displayedCourses.length > 0 &&(
          <Heading>Search results for "{searchResults.searchTerm}"</Heading>
        )}
        {searchResults?.searchTerm && displayedCourses.length === 0 &&(
          <Heading>Sorry! No Search results for "{searchResults.searchTerm}"</Heading>
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
