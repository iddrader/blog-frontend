import { useState } from 'react';
import Header from './Header.jsx';
import { Outlet } from 'react-router-dom';
import '../styles/App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken}/>
      <Outlet context={[isAuth, setIsAuth, token, setToken]}/>
    </>
  )
}

export default App
