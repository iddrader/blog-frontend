import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = (props) => {
    const isAuth = props.isAuth;

    return (
        <header>
            <Link to='/posts'><h1>Blog</h1></Link>
            <div className="header-buttons">
            { isAuth ? (
                <ul>
                    <li><a href="#">Create post</a></li>
                    <li><a href="#">Log out</a></li>
                </ul>
            ) : (
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><a href="#">Register</a></li>
                </ul>
            )}
            </div>
        </header>
    )
}

export default Header;