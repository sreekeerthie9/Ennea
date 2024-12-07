import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../util/http";
import CourseItem from "../components/CourseItem";

export default function CategoryCourseList() {
  const { categoryName } = useParams();
 
  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", categoryName],
    queryFn: () => fetchCategory(categoryName),
    enabled: categoryName ? true : false,
  });
  
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>{error.info}</p>;
  }
  if (data) {
    content = (
      <>
        {categoryName && <h2>{categoryName}</h2>}
        <ul  className="course-list">
          {data.map((course) => (
            <li key={course.id}>
              <CourseItem course={course} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <>{content}</>;
}
