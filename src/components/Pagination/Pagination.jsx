import React from "react";
import { nanoid } from "nanoid";
import styles from './Pagination.module.css';

function handleClick(event, elem, setCurrentPage) {
  setCurrentPage(elem);
  event.preventDefault();
}

function prevClick(event, setCurrentPage, currentPage, arr) {
  if (currentPage === 1) {
    setCurrentPage(arr.length);
  } else {
    setCurrentPage(currentPage - 1); 
  }
  event.preventDefault();
}

function nextClick(event, setCurrentPage, currentPage, arr) {
  if (currentPage === arr.length) {
    setCurrentPage(1);
  } else {
    setCurrentPage(currentPage + 1);
  }
  event.preventDefault();
}

function Pagination({ moviesPerPage, totalMoviesLength, setCurrentPage, currentPage }) {
  const numberOfButtons = [];
  for (let i = 1; i <= Math.ceil(totalMoviesLength / moviesPerPage); i++) {
    numberOfButtons.push(i);
  }
  let buttons = numberOfButtons.map(function (elem) {
    let id = nanoid();
    return <li key={id}>
      <a href="!#" className={currentPage === elem ? styles.btnActive : styles.button} onClick={(e) => handleClick(e, elem, setCurrentPage)}>
        {elem}
      </a>
    </li>
  });

  return <ul className={styles.list}>
    <a href="!#" className={styles.button} onClick={(e) => { prevClick(e, setCurrentPage, currentPage, numberOfButtons) }}>←</a>
    {buttons}
    <a href="!#" className={styles.button} onClick={(e) => { nextClick(e, setCurrentPage, currentPage, numberOfButtons) }}>→</a>
  </ul>
}

export default Pagination;