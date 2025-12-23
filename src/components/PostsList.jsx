import React from 'react';
import PostItem from "../components/PostItem";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const postsList = ({ posts, title, remove, template }) => {

  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>
      No posts yet.
    </h1>
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
        <div className={template ? template[template.current].className : ''}>
          {
            posts.map((item, index) =>
              <PostItem remove={remove} number={index} post={item} key={item.id}/>
            )
          }
        </div>
    </div>
  );
};

export default postsList;