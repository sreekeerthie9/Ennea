import React, { useContext } from 'react';
import { ReadLaterContext } from '../context/ReadLaterContext';
import { Link } from 'react-router-dom';

const ReadLater = () => {
  const { readLater, removeFromReadLater } = useContext(ReadLaterContext);

  if (readLater.length === 0) return <p>No books in Read Later!</p>;

  return (
    <div className="read-later-list">
      {readLater.map((book) => (
        <div key={book.id} className="book-card">
          <h3>{book.title}</h3>
          <p>{book.subtitle}</p>
          <Link to={`/book/${book.id}`}>View Details</Link>
          
          <div className="button-container">
            <button onClick={() => removeFromReadLater(book.id)}>
              Remove from Read Later
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadLater;
