import React from "react";
import { useLocation } from "react-router-dom";
import styles from './MoviePage.module.css';
import { nanoid } from "nanoid";

function MoviePage() {
  let location = useLocation();
  const currentMovie = location['state']['currentMovie']['movie'];
  console.log(currentMovie);
  const extSource = JSON.parse(localStorage.getItem('external_source'));
  console.log(extSource);
  const staff = JSON.parse(localStorage.getItem('staff'));
  console.log(staff);

  function getEmployees(staff, actors, directors) {
    for (let employee of staff) {
      if (employee.professionText === 'Режиссеры') {
        directors.push(employee.nameRu);
      }
      if (employee.professionText === 'Актеры') {
        actors.push(employee.nameRu);
      }
    }
  }

  let actors = [];
  let directors = [];
  getEmployees(staff, actors, directors);

  return <div className={['container', styles.movieContainer].join(' ')}>
    <div>
      <img className={styles.moviePoster} src={currentMovie.posterUrl} alt="Films poster" width="300" height="450" />
    </div>
    <div className={styles.movieInfo}>
      <h2 className={styles.movieTitle}>{currentMovie.nameRu}</h2>
      <div className={styles.box}>
        <span className={styles.year}>{currentMovie.year}</span>
        <span className={styles.rating}>{currentMovie.ratingKinopoisk}</span>
      </div>
      <p className={styles.description}>{currentMovie.description}</p>

      <div className={styles.middleBox}>
        <div>
          <span className={styles.directors}>{directors.length > 1 ? <b>Режиссёры: </b> : <b>Режиссёр: </b>}{directors.join(', ')}</span>

          <ul className={styles.links}>
            <li>
              <span><b>Где посмотреть:</b></span>
            </li>
            {extSource.map((source) => {
              let id = nanoid();
              return <li key={id}>
                <a href={source.url} className={styles.link} target="_blank" rel="noreferrer">
                  <span className={styles.logo}><img src={source.logoUrl} alt="logo" width="32" height="32" /></span>
                  <span>{source.platform}</span>
                </a>
              </li>
            })}
          </ul>
        </div>


        <ul className={styles.list}>
          <li><b>В ролях:</b></li>
          {actors.slice(0, 10).map((actor, index) => {
            let id = nanoid();
            return <li key={id}>{actor}</li>
          })}
        </ul>
      </div>
    </div>
  </div>
}

export default MoviePage;