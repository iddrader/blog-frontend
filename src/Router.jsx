import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./components/App.jsx";
import PostsList from "./components/PostsList.jsx";
import Post from './components/Post.jsx';
import Login from './components/Login.jsx';

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {path: '/posts', element: <PostsList />},
                {path: '/post/:id', element: <Post />},
                {path: '/login', element: <Login />}
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default Router;