import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom'; // To access query params
import BookList from '../components/BookList'; // Reuse the BookList component

const fetchSearchResults = async (query) => {
  const response = await fetch(`https://www.dbooks.org/api/search/${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch search results.');
  }

  const data = await response.json();
  return data.books;
};

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search); // Hook to get query parameters
};

const SearchBooks = () => {
  const queryParams = useQueryParams();
  const searchQuery = queryParams.get('q');


  const { data, error, isLoading } = useQuery({
    queryKey: ['searchResults', searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),
  });

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>

      {isLoading && <p>Loading search results...</p>}
      {error && <p>{error.message=`Sorry! No books found for ${searchQuery}.`}</p>}
      {!isLoading && !error && data && (
        <>
          {data.length > 0  ? (
            <BookList books={data} /> 
          ) : (
            <p>No results found for "{searchQuery}".</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBooks;
