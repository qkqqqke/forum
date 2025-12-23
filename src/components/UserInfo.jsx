import React from 'react';
import { ReactComponent as DefaultAvatar } from '../assets/default-avatar.svg'


const UserInfo = ({ user, ...props }) => {
    return (
        <div className="user_info">
            <div className="user_icon">
                {
                    user.icon ?
                        user.icon :
                        <DefaultAvatar/>
                }
            </div>
            <div className="user_about">
                <div>
                    <div className="user_name">
                        {user.username}
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
    );
};

export default UserInfo;