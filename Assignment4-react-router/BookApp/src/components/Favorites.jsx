import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) return <p>No favorites yet!</p>;

  return (
    <div className="favorites-list">
      {favorites.map((book) => (
        <div key={book.id} className="book-card">
          <h3>{book.title}</h3>
          <p>{book.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
