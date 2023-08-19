import { redirect, useOutletContext } from "react-router-dom";
import '../styles/Login.css';

const Login = () => {
    const [isAuth, setIsAuth, token, setToken] = useOutletContext();

    const handleLogin = (event) => {
        event.preventDefault();
        
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
                        <input type="password" />
                    </label>
                    <button type="submit" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )

    return (
        <h4 style={{width: "fit-content", margin: "auto" }}>
            You are already logged in!
        </h4>
    )
}

export default Login;