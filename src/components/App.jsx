import { useState } from 'react';
import Header from './Header.jsx';
import { Outlet } from 'react-router-dom';
import '../styles/App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <Header isAuth={isAuth} />
      <Outlet />
    </>
  )
}

export default App
