import React from 'react';
import { ReactComponent as EyeClosed } from '../assets/eye-closed.svg' 
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
            <div className='post__operations'>
                <div className="post__btns">
                    <div className='post__svg'>
                        <EyeClosed onClick={(e) =>{
                            remove(props.post);
                            e.stopPropagation();
                        }}
                        stroke='whitesmoke'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;