import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  if (favorites.length === 0) return <p>No favorites yet!</p>;

  return (
    <div className="favorites-list">
      {favorites.map((book) => (
        <div key={book.id} className="book-card">
          <h3>{book.title}</h3>
          <p>{book.subtitle}</p>
          <Link to={`/book/${book.id}`}>View Details</Link>
          
          <div className="button-container">
            
            <button onClick={() => removeFromFavorites(book.id)}>
              Remove from Favorites
            </button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
