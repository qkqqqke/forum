import React from 'react';
import PostItem from "../components/PostItem";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const postsList = ({ posts, title, remove }) => {

  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>
      No posts yet.
    </h1>
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {
          posts.map((item, index) =>
            <CSSTransition
            key={item.id}
            timeout={500}
            classNames = 'post'
            >
              <PostItem remove={remove} number={index} post={item}  />
            </CSSTransition>
          )

        }
      </TransitionGroup>
    </div>
  );
};

export default postsList;