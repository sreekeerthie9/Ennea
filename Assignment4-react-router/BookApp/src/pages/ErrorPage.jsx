
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Book Not Found</h1>
      <p>The book you are looking for does not exist or is not available.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
