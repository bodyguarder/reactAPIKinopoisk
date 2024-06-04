import React, { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import MoviesList from "../components/MovieList/MoviesList";
import Filters from "../components/Filter/Filters";
import ParseFilms from "../components/Parsers/ParseFilms";

if (!localStorage.getItem('movies')) {
  await ParseFilms();
}

let allMovies = JSON.parse(localStorage.getItem('movies'));
console.log(allMovies);

function Root() {
  const [movies, setMovies] = useState(allMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);

  let lastMovieIndex = currentPage * moviesPerPage;
  let firstMovieIndex = lastMovieIndex - moviesPerPage;
  let currentMoviesList = movies.slice(firstMovieIndex, lastMovieIndex);

  return <div className="container">
    <h1 className="title">Проект "Фильмы"</h1>
    <MoviesList currentMoviesList={currentMoviesList}></MoviesList>
    <Pagination moviesPerPage={moviesPerPage} totalMoviesLength={movies.length} setCurrentPage={setCurrentPage} currentPage={currentPage}></Pagination>
    <Filters setMovies={setMovies} setCurrentPage={setCurrentPage} allMovies={allMovies}></Filters>
  </div>
}

export default Root;