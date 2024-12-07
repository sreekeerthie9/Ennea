import React from 'react';
import styled from 'styled-components';
import { Card, Button, Carousel } from 'antd';

// Mock Data
const categories = [
  { id: 1, name: 'Development' },
  { id: 2, name: 'Business' },
  { id: 3, name: 'Finance' },
  // Add more categories as needed
];

const courses = [
  { id: 1, title: 'React for Beginners', category: 'Development', image: 'https://via.placeholder.com/150', description: 'Learn the basics of React.' },
  { id: 2, title: 'Advanced JavaScript', category: 'Development', image: 'https://via.placeholder.com/150', description: 'Master advanced JavaScript concepts.' },
  { id: 3, title: 'Business Strategies', category: 'Business', image: 'https://via.placeholder.com/150', description: 'Learn effective business strategies.' },
  // Add more courses as needed
];

const carouselImages = [
  'https://via.placeholder.com/800x400?text=Image1',
  'https://via.placeholder.com/800x400?text=Image2',
  'https://via.placeholder.com/800x400?text=Image3',
  // Add more image URLs as needed
];

// Styled Components
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
  background-color: #fff;
  border: 1px solid #ccc;
  &:hover {
    background-color: #e6e6e6;
    border-color: #999;
  }
`;

const CoursesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

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

const CourseTitle = styled.h3`
  font-size: 1.25rem;
  margin: 1rem 0;
`;

const CourseDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

export default function HomePage() {
  return (
    <Container>
      <CarouselContainer autoplay>
        {carouselImages.map((image, index) => (
          <div key={index}>
            <CarouselImage src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </CarouselContainer>

      <CategoryContainer>
        {categories.map(category => (
          <CategoryButton key={category.id}>{category.name}</CategoryButton>
        ))}
      </CategoryContainer>
      
      <CoursesContainer>
        {courses.map(course => (
          <CourseCard key={course.id}>
            <CourseImage src={course.image} alt={course.title} />
            <CourseTitle>{course.title}</CourseTitle>
            <CourseDescription>{course.description}</CourseDescription>
            <Button type="primary">Enroll Now</Button>
          </CourseCard>
        ))}
      </CoursesContainer>
    </Container>
  );
}
