import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';
import MyInput from '../components/UI/input/MyInput';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        postId: post.id,
        email: 'newUser@emile.co',
        body: ''
    });

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })

    const [fetchCommentsById, isCommentsLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchCommentsById(params.id)

    }, [])

    const postComment = (e) => {
        e.preventDefault();
        setComments([...comments, comment]);
        setComment({ ...comment, body: '' });
    }


    return (
        <div className='App'>
            <h1>
                {post.title}
            </h1>
            <div>
                {isLoading ?
                    <Loader /> :
                    <div>
                        {post.body}
                    </div>
                }
            </div>
            <h1>
                Комментарии
            </h1>
            <div>

                {
                    isCommentsLoading ?
                        <Loader />
                        :
                        comments.length ?
                            comments.map(
                                (c) => <div key={c.id} style={{ marginTop: 15 }}>
                                    <h5>{c.email}</h5>
                                    <div>{c.body}</div>
                                </div>
                            )
                            :
                            <div>No comments yet.</div>
                }
                <form onSubmit={postComment}>
                    <MyInput
                        placeholder='Write comment ...'
                        value={comment.body}
                        onChange={(e) => {
                            setComment({
                                ...comment,
                                body: e.target.value,
                                id: comments[comments.length - 1].id + 1
                            })
                        }}
                    />
                </form>
            </div>

        </div>
    );
};

export default PostIdPage;