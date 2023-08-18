import '../styles/Header.css';

const Header = (props) => {
    const isAuth = props.isAuth;

    return (
        <header>
            <h1>Blog</h1>
            <div className="header-buttons">
            { isAuth ? (
                <ul>
                    <li><a href="#">Create post</a></li>
                    <li><a href="#">Log out</a></li>
                </ul>
            ) : (
                <ul>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Register</a></li>
                </ul>
            )}
            </div>
        </header>
    )
}

export default Header;