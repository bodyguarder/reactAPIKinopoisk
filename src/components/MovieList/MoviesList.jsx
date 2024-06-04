import React from "react";
import { nanoid } from "nanoid";
import styles from "./MovieList.module.css";
import { useNavigate } from "react-router-dom";

function doShort(str, length) {
  return str.slice(0, length) + '...';
}

function MoviesList({ currentMoviesList }) {
  const navigate = useNavigate();

  function movieHandleClick(movie) {
    navigate(`/movies/${movie.kinopoiskId}`);
    localStorage.setItem('currentMovie', JSON.stringify(movie));
  }


  let result = currentMoviesList.map(function (movie) {
    let id = nanoid();
    let linkToMovie = `https://www.kinopoisk.ru/film/${movie.kinopoiskId}`;
    let shortDescription = doShort(movie.description, 100);
    return <li key={id} className={styles.movieCard} onClick={() => movieHandleClick(movie)}>
      <img className={styles.moviePoster} src={movie.posterUrl} alt="Films poster" width="240" height="340"/>
      <div className={styles.container}>
        <span className={styles.movieName}>{movie.nameRu}</span>
        <div className={styles.box}>
          <span>{movie.year}</span>
          <span className={styles.rating}>{movie.ratingKinopoisk}</span>
        </div>
        <p>{shortDescription}</p>
        <a className={styles.link} href={linkToMovie} target="_blank" rel="noreferrer">смотреть фильм</a>
      </div>
    </li>
  });

  return <ul className={styles.movieList}>
    {result}
  </ul>
}

export default MoviesList;