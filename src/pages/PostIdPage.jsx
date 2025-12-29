import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';
import { addRoboHashUrlToPosts, addRoboHashUrlToComments } from '../utils/robohash';
import ContentWrapper from '../components/UI/ContentWrapper/ContentWrapper';
import CommentField from '../components/UI/CommentField/CommentField';
import { Slide, ToastContainer, toast } from 'react-toastify';


const PostIdPage = () => {
    const params = useParams();
    const location = useLocation();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({
        username: 'newUser@emile.co',
        imageUrl: `https://robohash.org/newUser@emile.co`
    });
    const [comment, setComment] = useState({
        postId: params.id,
        email: 'newUser@emile.co',
        body: ''
    });

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        const newPost = (await PostService.getPostsWithUsersByPosts([response.data]))[0];
        const postWithRoboHash = addRoboHashUrlToPosts([newPost])[0];
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

    const postComment = async (e) => {
        if(comment.body === '') return
        const responce = await toast.promise(
            PostService.setNewPostComment(params.id, comment.body), {
            success: 'Successfully published',
            error: 'Rejected'
        })
        console.log(responce)
        if (responce.status >= 200 && responce.status < 300) {
            setComments([...comments, { ...comment, imageUrl: user.imageUrl }]);
            setComment({ ...comment, body: '' });
        }
    }


    return (
        <div className='App'>
            <h1>
                {post.title}
            </h1>
            <ContentWrapper user={post.user} isLoading={isLoading}>
                <CommentField
                    readOnly={"readOnly"}
                    value={post.body}
                />
            </ContentWrapper>
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
                                    >
                                        <CommentField
                                            readOnly={"readOnly"}
                                            value={c.body}
                                        />
                                    </ContentWrapper>
                            )
                            :
                            <div>No comments yet.</div>
                }
                <ContentWrapper user={user}>
                    <CommentField
                        onSubmit={postComment}
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
                </ContentWrapper>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                transition={Slide}
            />
        </div>
    );
};

export default PostIdPage;