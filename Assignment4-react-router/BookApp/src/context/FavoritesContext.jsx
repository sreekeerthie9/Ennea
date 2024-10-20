import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const addToFavorites = (book) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, book];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
      return updatedFavorites; 
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(book => book.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
