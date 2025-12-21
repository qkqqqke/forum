import React, { useContext, useState } from 'react';
import MyInput from '../components/UI/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [ userLogin, setUserLogin ] = useState('')
    const navigate = useNavigate()
    const login = e => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
        localStorage.setItem('login', userLogin)
        navigate('/posts')

    }

    return (
        <div className='App'>
            <h1>Авторизация</h1>
            <form onSubmit={login}>
                <MyInput value={userLogin} onChange={(e)=>setUserLogin(e.target.value)} type="text" placeholder='Введите логин' />
                <MyInput type="password" placeholder='Введите пароль' />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;