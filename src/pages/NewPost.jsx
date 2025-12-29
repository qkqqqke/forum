import React, { useState } from 'react';
import ContentWrapper from '../components/UI/ContentWrapper/ContentWrapper';
import CommentField from '../components/UI/CommentField/CommentField';
import PostService from '../API/PostService';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const NewPost = () => {
    const [user, setUser] = useState({
        id: 13123124,
        username: 'newUser@emile.co',
        imageUrl: `https://robohash.org/newUser@emile.co`
    })
    const [post, setPost] = useState({
        userId: user.id,
        title: '',
        body: ''
    })

    const router = useNavigate()

    const newPost = async () => {
        const responce = await toast.promise(
            PostService.setNewPost(post), {
            success: 'Successfully published',
            error: 'Rejected'
        })
        //router(`/post/${responce.data.id}`)
    }

    return (
        <div className="App">
            <textarea
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className='post_title'

            />
            <ContentWrapper user={user}>
                <CommentField
                    onSubmit={newPost}
                    value={post.body}
                    onChange={(e) => setPost({ ...post, body: e.target.value })}
                />
            </ContentWrapper>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                transition={Slide}
            />
        </div>
    );
};

export default NewPost;