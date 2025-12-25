import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';
import MyInput from '../components/UI/input/MyInput';
import { addRoboHashUrlToPosts, addRoboHashUrlToComments } from '../utils/robohash';
import ContentWrapper from '../components/ContentWrapper';

const PostIdPage = () => {
    const params = useParams();
    const location = useLocation();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        postId: params.id,
        email: 'newUser@emile.co',
        body: ''
    });

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        const newPost = (await PostService.getPostsWithUsersByPosts([response.data]))[0];
        const postWithRoboHash = addRoboHashUrlToPosts([newPost])[0];
        console.log(postWithRoboHash)
        setPost(postWithRoboHash);
    })

    const [fetchCommentsById, isCommentsLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        const commentsWithRoboHash = addRoboHashUrlToComments(response.data);
        setComments(commentsWithRoboHash);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchCommentsById(params.id);
    }, [location])

    const postComment = (e) => {
        e.preventDefault();
        setComments([...comments, {...comment, imageUrl: `https://robohash.org/${comment.email}` }]);
        setComment({ ...comment, body: '' });
    }


    return (
        <div className='App'>
            <h1>
                {post.title}
            </h1>
            <ContentWrapper user={post.user} isLoading={isLoading} body={post.body} />
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
                                (c) =>
                                    <ContentWrapper
                                        key={c.id}
                                        user={{ username: c.email, imageUrl: c.imageUrl }}
                                        body={c.body}
                                    />
                            )
                            :
                            <div>No comments yet.</div>
                }
                <form onSubmit={postComment}>
                    <MyInput
                        placeholder='Write your comment ...'
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