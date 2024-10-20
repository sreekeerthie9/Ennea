import React, { createContext, useState, useEffect } from 'react';

export const ReadLaterContext = createContext();

export const ReadLaterProvider = ({ children }) => {
  const [readLater, setReadLater] = useState([]);

  useEffect(() => {
    const savedReadLater = JSON.parse(localStorage.getItem('readLater')) || [];
    setReadLater(savedReadLater);
  }, []);

  const addToReadLater = (book) => {
    setReadLater((prevReadLater) => {
      const updatedReadLater = [...prevReadLater, book];
      localStorage.setItem('readLater', JSON.stringify(updatedReadLater)); 
      return updatedReadLater; 
    });
  };

  
  const removeFromReadLater = (id) => {
    setReadLater((prevReadLater) => {
      const updatedReadLater = prevReadLater.filter(book => book.id !== id);
      localStorage.setItem('readLater', JSON.stringify(updatedReadLater)); 
      return updatedReadLater; 
    });
  };

  return (
    <ReadLaterContext.Provider value={{ readLater, addToReadLater, removeFromReadLater }}>
      {children}
    </ReadLaterContext.Provider>
  );
};
