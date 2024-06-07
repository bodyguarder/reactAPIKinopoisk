import React from 'react';
import cl from './MyModal.module.css';
import { Rating } from '@mui/material';

const MyModal = ({ visible, setVisible, rating, setRating, setUserComments, userComments, userName, userComment, setUserName, setUserComment }) => {
  

  const rootClasses = [cl.myModal]
  if (visible) {
    rootClasses.push(cl.active);
  }

  function makeComment() {
    let formData = {
      name: userName,
      comment: userComment,
      rating: rating
    }
    setUserComments([...userComments, formData]);
    setVisible(false);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
        <form className={cl.myModalUserData} id="commentForm">
          <label htmlFor="userName">Введите ваше имя</label>
          <input id='userName' name="userName" type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
          <label htmlFor="userComment">Комментарий</label>
          <textarea id='userComment' name='userComment' value={userComment} onChange={e => setUserComment(e.target.value)}></textarea>
          <label htmlFor="userRating">Оцените нас</label>
          <Rating id='userRating'
            name="userRating"
            value={rating} max={10}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <button className={cl.sendFormBtn} id='sendFormBtn' type='button' onClick={makeComment}>Отправить</button>
        </form>
      </div>
    </div>
  );
}

export default MyModal;
