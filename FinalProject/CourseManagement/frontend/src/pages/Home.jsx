import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Carousel } from "antd";
import { CourseContext } from "../context/course-context";
import { fetchCategory } from "../util/http";
import { useQuery } from "@tanstack/react-query";
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.jpg";
import CourseItem from "../components/CourseItem";
import { LoadingOutlined } from "@ant-design/icons";

const carouselImages = [
  { image: image1, index:1 },
  { image: image2, index:2 },
  { image: image3, index:3 },
];

const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarouselContainer = styled(Carousel)`
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryButton = styled(Button)`
  background-color: ${(props) => (props.active ? "#e30d7c" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: 1px solid ${(props) => (props.active ? "#e30d7c" : "#ccc")};

  &:hover {
    background-color: ${(props) => (props.active ? "#e3498b" : "#e6e6e6")};
    border-color: ${(props) => (props.active ? "#e3498b" : "#999")};
  }
`;

const CoursesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

export default function HomePage() {
  const {
    categories,
    loadingCategories,
    categoryError,
    courses,
    coursesLoading,
    courseError,
  } = useContext(CourseContext);

  const [displayedCourses, setDisplayedCourses] = useState(courses);
  const [categoryName, setCategoryName] = useState("All");

  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", categoryName],
    queryFn: () => fetchCategory(categoryName),
    enabled: categoryName !== "All",
  });

  useEffect(() => {
    if (categoryName === "All") {
      setDisplayedCourses(courses);
    } else if (data) {
      setDisplayedCourses(data);
    }
  }, [categoryName, data, courses]);

  if (loadingCategories || coursesLoading) return <LoadingOutlined />;
  if (categoryError || courseError)
    return <p>There was an error loading data.</p>;

  function handleCategory(selectedCategoryName) {
    setCategoryName(selectedCategoryName);
  }

  return (
    <Container>
      <CarouselContainer autoplay>
        {carouselImages.map(({ image, index }) => (
          <div key={index}>
            <CarouselImage
              src={image}
              alt={`Slide ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </CarouselContainer>

      <CategoryContainer>
        <CategoryButton
          key="all"
          onClick={() => handleCategory("All")}
          active={categoryName === "All"}
        >
          All
        </CategoryButton>
        {categories &&
          categories.map((category) => (
            <CategoryButton
              key={category}
              onClick={() => handleCategory(category)}
              active={categoryName === category}
            >
              {category}
            </CategoryButton>
          ))}
      </CategoryContainer>

      <CoursesContainer>
        {displayedCourses &&
          displayedCourses.map((course) => <CourseItem course={course} />)}
      </CoursesContainer>
    </Container>
  );
}
