import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVshows";
import UserListedMovies from "./pages/UserListedMovies";
import Account from "./pages/Account";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/player" element={<Player />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/new" element={<Player />} />
        <Route path="/mylist" element={<UserListedMovies />} />
        <Route path="/" element={<Netflix />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}