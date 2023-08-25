import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import '../styles/Login.scss';

const Login = () => {
    const [isAuth, setIsAuth, token, setToken, userId, setUserId] = useOutletContext();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target.form;
        axios.post('https://blog-nu-bice.vercel.app/auth/login', {
            email: form.email.value,
            password: form.password.value,
        }).then(response => response.data)
          .then(data => {
            setToken(data.token);
            setIsAuth(true);
            setUserId(data._id);

            localStorage.token = data.token;
            localStorage.userId = data._id;
          })
    }

    if (!isAuth) return (
        <div className="login-page">
            <div className="login-container">
                <h3>Login</h3>
                <form>
                    <label htmlFor="email">
                        <div className="email">Email</div>
                        <input type="email" name="email" id="email" />
                    </label>
                    <label htmlFor="password">
                        <div className="password">Password</div>
                        <input type="password" name="password" id="password" />
                    </label>
                    <button type="submit" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )

    return (
        <h4 style={{width: "fit-content", margin: "auto" }}>
            Logged in successfully!
            <br />
            <Link to='/posts'>View Posts</Link>
        </h4>
    )
}

export default Login;