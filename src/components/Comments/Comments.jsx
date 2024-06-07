import React from "react";
import {nanoid} from "nanoid";
import { Rating } from '@mui/material';
import cl from "./Comments.module.css";

function Comments({userComments}) {
  console.log(userComments);
  return <ul className={cl.commentsList}>
    {userComments.length > 0 ? <li><b>Отзывы</b></li> : false}
    {userComments.map((obj) => {
      let id = nanoid();
      return <li className={cl.commentsComment} key={id}>
        <div className={cl.commentsBox}>
          <span>{obj.name ? obj.name : 'Unknown'}</span>
          <Rating name="read-only" value={+obj.rating} max={10} readOnly />
        </div>
        
        <p>{obj.comment}</p>
      </li>
    })}
  </ul>
}

export default Comments;