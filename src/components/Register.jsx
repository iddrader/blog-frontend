import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import '../styles/Login.scss';

const Register = () => {
    const [isAuth, setIsAuth, token, setToken, userId, setUserId, serverURL] = useOutletContext();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target.form;
        axios.post(`${serverURL.current}/auth/register`, {
            email: form.email.value,
            fullName: form.fullName.value,
            password: form.password.value,
        }).then(response => response.data)
          .then(data => {
            setToken(data.token);
            setIsAuth(true);
            setUserId(data._id);

            localStorage.token = data.token;
            localStorage.userId = data._id;
          })
          .catch((err) => alert(err.response.data.message))
    }

    if (!isAuth) return (
        <div className="login-page">
            <div className="login-container">
                <h3>Register</h3>
                <form>
                    <label htmlFor="email">
                        <div className="email">Email</div>
                        <input type="email" name="email" id="email"/>
                    </label>
                    <label htmlFor="fullName">
                        <div className="fullName">Full Name</div>
                        <input type="text" name="fullName" id="fullName" />
                    </label>
                    <label htmlFor="password">
                        <div className="password">Password</div>
                        <input type="password" name="password" id="password" />
                    </label>
                    <button type="submit" onClick={handleLogin}>Register</button>
                </form>
            </div>
        </div>
    )

    return (
        <h4 style={{width: "fit-content", margin: "auto 2em" }}>
            Registered in successfully!
            <br />
            <Link to='/posts'>View Posts</Link>
        </h4>
    )
}

export default Register;