import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./components/App.jsx";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default Router;