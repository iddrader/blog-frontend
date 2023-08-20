import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./components/App.jsx";
import PostsList from "./components/PostsList.jsx";
import Post from './components/Post.jsx';
import Login from './components/Login.jsx';
import Register from "./components/Register.jsx";
import CreatePost from "./components/CreatePost.jsx";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {index: true, element: <PostsList />},
                {path: '/posts', element: <PostsList />},
                {path: '/post/:id', element: <Post />},
                {path: '/login', element: <Login />},
                {path: '/register', element: <Register />},
                {path: '/create', element: <CreatePost />}
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default Router;