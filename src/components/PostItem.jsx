import React, { useEffect, useState } from 'react';
import { ReactComponent as EyeClosed } from '../assets/eye-closed.svg' ;
import { ReactComponent as DefaultAvatar } from '../assets/default-avatar.svg'
import { useNavigate } from 'react-router-dom'

const PostItem = ({ remove, ...props }) => {
    const router = useNavigate()

    const toPost = () => router(`/posts/${props.post.id}`)
    const toUser = () => router(`/users/${props.post.userId}`)

    return (
        <div className="post" onClick={toPost}>
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className='post__footer'>
                <div className="post__author" onClick={(e)=>{
                    toUser();
                    e.stopPropagation();
                    }}>
                    <div className="post__author__icon">
                        <DefaultAvatar/>
                    </div>
                    <div className="post__author__name">
                        {props.post.user.username}
                    </div>
                </div>
                <div className="post__btns">
                    <div className='post__svg'>
                        <EyeClosed onClick={(e) =>{
                            remove(props.post);
                            e.stopPropagation();
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;