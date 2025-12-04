import React from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom'

const PostItem = ({ remove, ...props }) => {
    const router = useNavigate()

    const toPost = () => router(`/posts/${props.post.id}`)

    return (
        <div className="post" onClick={toPost}>
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => remove(props.post)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;