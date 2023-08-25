import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import { Outlet } from 'react-router-dom';
import '../styles/App.scss';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if(localStorage.token) {
      setToken(localStorage.token);
      setUserId(localStorage.userId);
      setIsAuth(true);
    }
  }, [])

  return (
    <>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken}/>
      <Outlet context={[isAuth, setIsAuth, token, setToken, userId, setUserId]}/>
    </>
  )
}

export default App
