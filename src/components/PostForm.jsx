import React, { useState } from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import { Formik } from 'formik';


const PostForm = ({ create, user }) => {
    const [post, setPost] = useState({
        title: '',
        body: '',
        user
    })

    function validateTitle(value) {
        let error;
        if (value === '')
            error = 'Required';
        else if (value.length > 100)
            error = 'Must be 100 characters or less';
        return error;
    }

    function validateBody(value) {
        let error;
        if (value === '')
            error = 'Required';
        else if (value.length > 1000)
            error = 'Must be 1000 characters or less';
        return error;
    }

    const addNewPosts = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({
            title: '',
            body: '',
        })
    }



    return (
        <Formik
            initialValues={{ title: '', body: '' }}
            onSubmit={values => {
                console.log(values)
            }}
            validate={values => {
                const errors = {};
                if (!values.title)
                    errors.title = 'Required';
                else if (values.title.length > 10)
                    errors.body = 'Must be 100 characters or less';

                if (!values.body)
                    errors.body = 'Required';
                else if (values.body.length > 1000)
                    errors.body = 'Must be 1000 characters or less';

                return errors;
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
                    <MyInput
                        type="title"
                        name="title"
                        value={values.title}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={'Название поста'}
                    />
                    {errors.title && <span id="feedback">{errors.title}</span>}
                    <MyInput
                        type="body"
                        name="body"
                        value={values.body}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={'Описание поста'}
                    />
                    {errors.body && touched.body && errors.body}
                    <MyButton onClick={addNewPosts}>Создать пост</MyButton>
                </form>
            )}
        </Formik>
    );
};

export default PostForm;