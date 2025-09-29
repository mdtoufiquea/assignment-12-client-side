
import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../../Home/Home/Home";
import Login from "../../Home/Pages/Shared/Login";
import Register from "../../Home/Pages/Shared/Register";
import AdminDashBoard from "../../DashBoard/AdminDashBoard/AdminDashBoard";
import ModeratorDashBoard from "../../DashBoard/ModeratorDashBoard/ModeratorDashBoard";
import UserDashBoard from "../../DashBoard/UserDashBoard/UserDashBoard";
import MyProfile from "../../DashBoard/UserDashBoard/MyProfile";
import Moderator from "../../DashBoard/ModeratorDashBoard/Moderator";
import Admin from "../../DashBoard/AdminDashBoard/Admin";
import AddScholarship from "../../Home/Pages/Shared/AddScholarship";
import AllScholarships from "../../Home/Pages/Shared/AllScholarships";
import ScholarshipDetails from "../../Home/Pages/Shared/ScholarshipDetails";

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
      },

      {
        path: '/moderator-dashBoard',
        Component: ModeratorDashBoard
      },
      {
        path: "/allScholarships",
        Component: AllScholarships
      },
      {
        path: '/scholarship/:id',
        Component: ScholarshipDetails
      }

    ]
  },
  {
    path: '/user-dashboard',
    Component: UserDashBoard,
    children: [
      {
        index: true,
        Component: MyProfile
      }
    ]
  },
  {
    path: '/admin-DashBoard',
    Component: AdminDashBoard,
    children: [
      {
        index: true,
        Component: Admin
      },
      {
        path: "add-scholarship",
        Component: AddScholarship,
      },
    ]
  },
  {
    path: '/moderator-dashBoard',
    Component: ModeratorDashBoard,
    children: [
      {
        index: true,
        Component: Moderator
      },
      {
        path: "add-scholarship",
        Component: AddScholarship,
      }
    ]
  },
]);