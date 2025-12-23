import React, { useEffect, useState } from 'react';
import Loader from '../components/UI/Loader/Loader';
import { ReactComponent as DefaultAvatar } from '../assets/default-avatar.svg'
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';


const UserIdPage = ({ }) => {
    const params = useParams();
    const [user, setUser] = useState({})

    const [fetchUserById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getUserById(id);
        setUser(response.data);
    })

    useEffect(() => {
        console.log(isLoading)
        fetchUserById(params.id);
    }, [])

    return (
        <div className='App'>
            {isLoading ?
                <Loader /> :
                <div className="user_info">
                    <div className="user_icon">
                        {
                            user.icon ?
                                user.icon :
                                <DefaultAvatar />
                        }
                    </div>
                    <div className="user_about">
                        <div>
                            <div className="user_name">
                                {user.name}
                            </div>
                            <div className="user_bio">
                                {user.company.catchPhrase}
                            </div>
                        </div>
                        <div>
                            <div className="user_stat">
                                <div className='user_message_count'>
                                    <span>
                                        Сообщения
                                    </span>
                                    <span>
                                        0
                                    </span>
                                </div>
                                <div className='user_reactions'>
                                    <span>
                                        Реакции
                                    </span>
                                    <span>
                                        0
                                    </span>
                                </div>
                                <div className='user_rating_sccore'>
                                    <span>
                                        Рейтинг
                                    </span>
                                    <span>
                                        0
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default UserIdPage;