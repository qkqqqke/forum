import React from 'react';
import Loader from './UI/Loader/Loader';

const ContentWrapper = ({ isLoading, body, user, ...props }) => {
    return (
        <div className='content__wrapper'>
            {isLoading ?
                <Loader /> :
                <div className="content__author">
                    <div className="icon">
                        <img src={user.imageUrl} alt="" />
                    </div>
                    <span className="content__author__username">
                        {user.username}
                    </span>
                </div>
            }
            <div className='content__separator' />
            {
                isLoading ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1' }}>
                        <Loader />
                    </div> :
                    <div className='content__body'>
                        {body}
                    </div>
            }
        </div>
    );
};

export default ContentWrapper;