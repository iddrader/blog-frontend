import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./components/App.jsx";
import PostsList from "./components/PostsList.jsx";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {path: '/posts', element: <PostsList />}
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default Router;