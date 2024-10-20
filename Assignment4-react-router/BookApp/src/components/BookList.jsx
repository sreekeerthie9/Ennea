import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { ReadLaterContext } from "../context/ReadLaterContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledBookCard = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: calc(25% - 20px);
  background: white;
  transition: transform 0.2s;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;

  & img {
    width: 100%;
    height: 200px;
    background-color: #f0f0f0;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & img::before {
    content: "No Image Available";
    color: #999;
    font-size: 1em;
    text-align: center;
    display: none;
  }

  .book-title {
    font-size: 1.2em;
    margin: 5px 0;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 60px;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
  }

  & button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  & button:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 50%;
    margin: 10px 0;

    & img {
      height: 150px;
    }
  }
`;

const BookList = ({ books }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const { readLater, addToReadLater, removeFromReadLater } =
    useContext(ReadLaterContext);

  const isFavorite = (bookId) => favorites.some((book) => book.id === bookId);
  const isInReadLater = (bookId) =>
    readLater.some((book) => book.id === bookId);

  return (
    <div className="book-list">
      {books.map((book) => (
        <StyledBookCard key={book.id}>
          <h3 className="book-title">{book.title}</h3>

          <img src={book.image} alt={book.title} />

          <div className="button-container">
            <Link to={`/book/${book.id}`}>View Details</Link>
            {isFavorite(book.id) ? (
              <button onClick={() => removeFromFavorites(book.id)}>
                Remove from Favorites
              </button>
            ) : (
              <button onClick={() => addToFavorites(book)}>
                Add to Favorites
              </button>
            )}

            {isInReadLater(book.id) ? (
              <button onClick={() => removeFromReadLater(book.id)}>
                Remove from Read Later
              </button>
            ) : (
              <button onClick={() => addToReadLater(book)}>Read Later</button>
            )}
          </div>
        </StyledBookCard>
      ))}
    </div>
  );
};

export default BookList;
