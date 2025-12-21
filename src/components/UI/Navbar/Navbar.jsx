import React, { useContext } from 'react';
import MyButton from '../button/MyButton';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context';
import classes from './Navbar.module.css'

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

return (
    <div className="navbar">
        <MyButton onClick={logout}>
            Выйти
        </MyButton>
        <div className="navbar__links">
            <Link to="/about">О сайте</Link>
            <Link to="/posts">Посты</Link>
            {!isAuth ? <Link to='/login'>Логин</Link> : <Link to=''>{localStorage.getItem('login')}</Link>} 
        </div>
    </div>
);
};

export default Navbar;