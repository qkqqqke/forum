import React from 'react';
import Loader from '../Loader/Loader';
import classes from './ContentWrapper.module.css'
import { Outlet, useOutlet } from 'react-router-dom';

const ContentWrapper = ({ isLoading, body, user, children, ...props }) => {
    const nestedContent = useOutlet()

    return (
        <div className={classes.contentWrapper}>
            {isLoading ?
                <Loader /> :
                <div className={classes.contentAuthor}>
                    <div className={classes.contentAuthorIcon}>
                        <img src={user.imageUrl} alt="" />
                    </div>
                    <span className={classes.contentAuthorUsername}>
                        {user.username}
                    </span>
                </div>
            }
            <div className={classes.contentSeparator} />
            {
                isLoading ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1' }}>
                        <Loader />
                    </div> :
                    <div className={classes.contentBody}>{
                        children ?
                            children
                            :
                            <textarea className='' readOnly style={{height: '100%', width: '100%', resize: 'none'}}>
                                { body }
                            </textarea>
                    }
                    </div>
            }
        </div>
    );
};

export default ContentWrapper;