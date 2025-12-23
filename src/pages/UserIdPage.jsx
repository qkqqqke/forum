import React, { useEffect, useState } from 'react';
import Loader from '../components/UI/Loader/Loader';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import UserInfo from '../components/UserInfo';
import PostsList from '../components/PostsList';
import { usePosts } from '../hooks/usePosts';

const UserIdPage = ({ }) => {
    const params = useParams();
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])

    const [fetchData, isUserLoading, error] = useFetching(async (id) => {
        const fetchedUser = await PostService.getUserById(id);
        setUser(fetchedUser.data);
        const fetchedPosts = await PostService.getPostsByUserId(id);
        const newPosts = fetchedPosts.data.map((post)=>{
            return {user: fetchedUser.data, ...post}
        })
        setPosts(newPosts);
    })


    useEffect(() => {
        fetchData(params.id);
    }, [])

    const removePost = (post) => {
    setPosts(posts.filter((p) => post.id !== p.id))
  }

    const sortedAndSearchedPosts = usePosts(posts);

    return (
        <div className='App'>
            {isUserLoading ?
                <Loader /> :
                <UserInfo user={user}/>
            }
            <hr style={{ margin: '15px 0' }} />
            <PostsList remove={removePost} posts={sortedAndSearchedPosts}/>
        </div>
        
    );
};

export default UserIdPage;