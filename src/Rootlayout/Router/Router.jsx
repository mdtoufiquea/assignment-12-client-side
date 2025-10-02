
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
import ManageScholarships from "../../Home/Pages/Shared/ManageScholarships";
import UsersManage from "../../Home/Pages/Shared/UsersManage";
import CheckOut from "../../Home/Pages/Shared/CheckOut";
import AppliedScholarshipManage from "../../Home/Pages/Shared/AppliedScholarshipManage";
import MyApplication from "../../DashBoard/UserDashBoard/MyApplication";
import MyReviews from "../../DashBoard/UserDashBoard/Myreviews";
import AllReviews from "../../DashBoard/AdminDashBoard/AllReviews";

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
        path: '/scholarships/:id',
        Component: ScholarshipDetails
      },
      {
        path: "/checkout/:id",
        Component: CheckOut,
      },

    ]
  },
  {
    path: '/user-dashboard',
    Component: UserDashBoard,
    children: [
      {
        index: true,
        Component: MyProfile
      },
      {
        path: 'my-applications',
        Component: MyApplication
      },
      {
        path: 'my-reviews',
        Component: MyReviews
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
      {
        path: 'manage-scholarship',
        Component: ManageScholarships
      },
      {
        path: 'users-manage',
        Component: UsersManage
      },
      {
        path: 'applied-scholarships',
        Component: AppliedScholarshipManage
      },
      {
        path: "all-reviews",
        Component: AllReviews
      }
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
      },
      {
        path: 'manage-scholarship',
        Component: ManageScholarships
      },
      {
        path: 'applied-scholarships',
        Component: AppliedScholarshipManage
      },
      {
        path: "all-reviews",
        Component: AllReviews
      }

    ]
  },
]);