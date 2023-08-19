import { redirect, useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css';

const Login = () => {
    const [isAuth, setIsAuth, token, setToken] = useOutletContext();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target.form;
        axios.post('http://localhost:3000/auth/login', {
            email: form.email.value,
            password: form.password.value,
        }).then(response => response.data)
          .then(data => {
            setToken(data.token);
            setIsAuth(true);
          })
    }

    if (!isAuth) return (
        <div className="login-page">
            <div className="login-container">
                <h3>Login</h3>
                <form>
                    <label htmlFor="email">
                        Email
                        <input type="email" name="email" id="email" />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input type="password" name="password" id="password" />
                    </label>
                    <button type="submit" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )

    return (
        <h4 style={{width: "fit-content", margin: "auto" }}>
            You are already logged in!
            <Link to='/posts'>View Posts</Link>
        </h4>
    )
}

export default Login;