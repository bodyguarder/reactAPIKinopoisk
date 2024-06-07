import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from './MoviePage.module.css';
import { nanoid } from "nanoid";
import MyModal from "../components/ModalWindow/MyModal";
import Comments from "../components/Comments/Comments";

function MoviePage() {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [userComments, setUserComments] = useState([]);
  let location = useLocation();
  const currentMovie = location['state']['currentMovie']['movie'];
  const extSource = JSON.parse(localStorage.getItem('external_source'));
  const staff = JSON.parse(localStorage.getItem('staff'));
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  
  function getOwnRating() {
    if (userComments.length > 0) {
      let sum = 0;
      for (let obj of userComments) {
        sum += +obj.rating;
      }
      return (sum / userComments.length).toFixed(1);
    } else {
      return 0;
    }
  }
  
  function openMyModal() {
    setUserName('');
    setUserComment('');
    setRating(0);
    setVisible(true);
  }

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
        <span className={styles.ratings}>
          <span className={styles.rating}>Кинопоиск {currentMovie.ratingKinopoisk}</span>
          <span className={styles.rating}>Наш рейтинг {getOwnRating()}</span>
        </span>
      </div>
      <p className={styles.description}>{currentMovie.description}</p>

      <div className={styles.middleBox}>
        <div>
          <span className={styles.directors}>{directors.length > 1 ? <b>Режиссёры: </b> : <b>Режиссёр: </b>}{directors.join(', ')}</span>

          <div>
            <span><b>Где посмотреть:</b></span>
            <ul className={styles.links}>
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
        </div>


        <ul className={styles.list}>
          <li><b>В ролях:</b></li>
          {actors.slice(0, 10).map((actor, index) => {
            let id = nanoid();
            return <li key={id}>{actor}</li>
          })}
          <li>
            <button className={styles.commentBtn} onClick={openMyModal}>Оставить комментарий</button>
          </li>
        </ul>
      </div>

      <Comments userComments={userComments}></Comments>
    </div>
    <MyModal visible={visible} setVisible={setVisible} rating={rating} setRating={setRating} setUserComments={setUserComments} userComments={userComments} userName={userName} setUserName={setUserName} userComment={userComment} setUserComment={setUserComment}></MyModal>
  </div>
}

export default MoviePage;