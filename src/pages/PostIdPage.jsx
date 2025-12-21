import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
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
                isCommentsLoading?
                <Loader/>
                :
                comments.length ?
                    comments.map(
                        (c) => <div key={c.id} style={{marginTop: 15}}>
                            <h5>{c.email}</h5>
                            <div>{c.body}</div>
                        </div>
                    )
                    :
                <div>No comments yet.</div>
            }
            </div>

        </div>
    );
};

export default PostIdPage;