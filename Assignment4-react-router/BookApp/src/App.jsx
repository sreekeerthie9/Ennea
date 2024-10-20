import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider

import { FavoritesProvider } from "./context/FavoritesContext";
import { ReadLaterProvider } from "./context/ReadLaterContext";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ReadLater from "./pages/ReadLater";
import NavBar from "./components/NavBar";
import BookDetail from "./components/BookDetail";
import ErrorPage from "./pages/ErrorPage";
import SearchBooks from "./pages/SearchBooks";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <ReadLaterProvider>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/read-later" element={<ReadLater />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/search" element={<SearchBooks />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </Router>
        </ReadLaterProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
