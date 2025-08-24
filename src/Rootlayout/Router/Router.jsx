
import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../../Home/Home/Home";
import Login from "../../Home/Pages/Shared/Login";
import Register from "../../Home/Pages/Shared/Register";

 export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: '/login',
          Component: Login
        },
        {
          path: '/register',
          Component: Register
        }
    ]
  },
]);