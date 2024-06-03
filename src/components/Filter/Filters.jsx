import React, { useState } from "react";
import { nanoid } from "nanoid";
import { isEqual, uniq } from "lodash";
import styles from './Filters.module.css';

function Filters({ setMovies, setCurrentPage, allMovies }) {
  const startParams = ['Все жанры', 'Все страны', 0, 0]//[genre, country, year, rating]
  const [filterParams, setFilterParams] = useState(startParams);
  const [inputYear, setInputYear] = useState(0);
  const [inputRating, setInputRating] = useState(0);

  function getCountries() {
    let buffer = [];
    for (let movie of allMovies) {
      for (let obj of movie.countries) {
        buffer.push(obj['country']);
      }
    }
    return uniq(buffer);
  }

  function getGenres() {
    let buffer = [];
    for (let movie of allMovies) {
      for (let obj of movie.genres) {
        buffer.push(obj['genre']);
      }
    }
    return uniq(buffer);
  }

  function setFilters([genre, country, year, rating]) {
    let filterMovies = allMovies.filter(function (movie) {
      let countries = movie.countries;
      let checkCountry;
      if (country !== 'Все страны') {
        let compareObj = { 'country': country };
        checkCountry = countries.find(function (obj) {
          return isEqual(compareObj, obj) === true;
        });
      } else {
        checkCountry = true;
      }

      let genres = movie.genres;
      let checkGenre;
      if (genre !== 'Все жанры') {
        let compareObj = { 'genre': genre };
        checkGenre = genres.find(function (obj) {
          return isEqual(compareObj, obj) === true;
        });
      } else {
        checkGenre = true;
      }

      let checkYear = movie.year >= year;
      let checkRating = movie.ratingKinopoisk >= rating;

      if (checkGenre && checkCountry && checkYear && checkRating) {
        return true;
      } else {
        return false;
      }
    });

    return filterMovies;
  }

  function SomeFilterChange([genre, country, year, rating]) {
    setFilterParams([genre, country, year, rating]);
    setMovies(setFilters([genre, country, year, rating]));
    setCurrentPage(1);
  }

  function cancelFilters(startParams) {
    setFilterParams(startParams);
    setMovies(setFilters(startParams));
    setInputYear(0);
    setInputRating(0);
    setCurrentPage(1);
  }

  return <ul className={styles.filtersList}>
    <li>
      <label htmlFor="genreFilter">Жанр</label>
      <select className={styles.select} id="genreFilter" value={filterParams[0]} onChange={(e) => SomeFilterChange([e.target.value, filterParams[1], filterParams[2], filterParams[3]])}>
        <option value={'Все жанры'}>Все жанры</option>
        {
          getGenres().map((elem) => {
            let id = nanoid();
            return <option key={id}>{elem}</option>
          })
        }
      </select>
    </li>
    <li>
      <label htmlFor="countryFilter">Страна</label>
      <select className={styles.select} id="countryFilter" value={filterParams[1]} onChange={(e) => SomeFilterChange([filterParams[0], e.target.value, filterParams[2], filterParams[3]])}>
        <option value={'Все страны'}>Все страны</option>
        {
          getCountries().map((elem) => {
            let id = nanoid();
            return <option key={id}>{elem}</option>
          })
        }
      </select>
    </li>
    <li>
      <label htmlFor="yearFilter">Год выпуска</label>
      <input id="yearFilter" value={inputYear} type="text" onChange={(e) => setInputYear(e.target.value)} onBlur={(e) => SomeFilterChange([filterParams[0], filterParams[1], e.target.value, filterParams[3]])} />
    </li>
    <li>
      <label htmlFor="ratingFilter">Рейтинг кинопоиск</label>
      <input id="ratingFilter" value={inputRating} type="text" onChange={(e) => setInputRating(e.target.value)} onBlur={(e) => SomeFilterChange([filterParams[0], filterParams[1], filterParams[2], e.target.value])} />
    </li>
    <li>
      <button className={styles.button} onClick={() => cancelFilters(startParams)}>убрать фильтры</button>
    </li>
  </ul>
}

export default Filters;