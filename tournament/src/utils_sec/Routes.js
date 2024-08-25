import { Navigate } from "react-router-dom";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import { getToken, getUserId } from "./auth";
import DashboardLayout from "./DashboardLayout";
import LoginLayout from "./LoginLayout";
import Dashboard from "../page/admin/Dashboard";
import Tournament from "../page/admin/Tournament";
import Matches from "../page/admin/Matches";
import Contests from "../page/admin/Contests";
import Categories from "../page/admin/Categories";
import Regions from "../page/admin/Regions";
import Tournaments from "../page/user/Tournaments";
import ContestsUser from "../page/user/Contests";
import ContestsRounds from "../page/admin/ContestsRounds";
import ContestsOpen from "../page/user/ContestsOpen";


const role = getUserId()?.userRole;
const isLoggedIn = !!getToken();
const protects = {
  user: [
    {
      path: "/",
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "/dashboard", element: <Tournaments/> },
        { path: "/tournaments", element: <Tournaments/> },
        { path: "/contests", element: <ContestsUser/> },
        { path: "/contest/:id", element: <ContestsOpen/> },
        { path: "*", element: <div>No page found</div> },
      ],
    },
  ],
  admin: [
    {
      path: "/",
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" />  },
        { path: "/dashboard", element: <Dashboard/>  },
        { path: "/tournaments", element: <Tournament/>  },
        { path: "/matches", element: <Matches/>  },
        { path: "/contests", element: <Contests/>  },
        { path: "/contest/:id", element: <ContestsRounds/>  },
        { path: "/categories", element: <Categories/>  },
        { path: "/regions", element: <Regions/>  },
        { path: "*", element: <div>No page found</div> },
      ],
    },
  ],
  default: [
    {
      path: "/",
      element: <LoginLayout />,
      children: [
        { path: "/", element: <Navigate to="/login" /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Register /> },

        { path: "*", element: <div>No page found</div> },
      ],
    },
  ],
};

export const protect = role && isLoggedIn ? protects[role] : protects['default'];
export const defaultProtect = protects['default'];
