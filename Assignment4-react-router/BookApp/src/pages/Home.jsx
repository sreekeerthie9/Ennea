import React from 'react';
import { useQuery } from '@tanstack/react-query';
import BookList from '../components/BookList';

const fetchRecentBooks = async () => {
  const response = await fetch('https://www.dbooks.org/api/recent');

  if (!response.ok) {
    throw new Error('Failed to fetch data.'); 
  }

  const data = await response.json(); 
  return data.books; 
};

const Home = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['recentBooks'],
    queryFn: fetchRecentBooks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading books: {error.message}</p>;

  return <BookList books={data} />;
};

export default Home;
