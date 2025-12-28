import React from 'react';
import classes from './CommentField.module.css'


const CommentField = ({ onSubmit, ...props }) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    }

    return (
            <textarea
                className={classes.comment}
                onKeyDown={handleKeyDown}
                {...props}
            />
    );
};

export default CommentField;