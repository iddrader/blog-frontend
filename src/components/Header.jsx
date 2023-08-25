import { Link } from 'react-router-dom';
import '../styles/Header.scss';

const Header = (props) => {
    const isAuth = props.isAuth;
    const setIsAuth = props.setIsAuth;
    const setToken = props.setToken;

    const logOut = () => {
        setIsAuth(false);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    }

    return (
        <header>
            <Link to='/posts' className="logoText"><h1>Blog</h1></Link>
            <div className="header-buttons">
            { isAuth ? (
                <ul>
                    <li><Link to="/create">Create post</Link></li>
                    <li><a href="#" onClick={logOut}>Log out</a></li>
                </ul>
            ) : (
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            )}
            </div>
        </header>
    )
}

export default Header;