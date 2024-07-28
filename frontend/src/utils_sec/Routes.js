import { Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import LoginLayout from "./LoginLayout";
import { getToken, getUserId } from "./auth";
import Login from "../components/account/Login";
import HomePage from "../pages/HomePage";
import Index from "../pages/admin/Index";
import Events from "../pages/admin/Events";
import NewEvent from "../components/event/NewEvent";
import BookingCard from "../components/booking/BookingCard";
import BookingRequests from "../components/booking/BookingRequests";
import PendingForMyApprovalPage from "../pages/Booking/PendingForMyApprovalPage";
import EventDetailsPage from "../pages/event/EventDetailsPage";

const role = getUserId()?.userRole;
const isLoggedIn = !!getToken();

const protects = {
  user: [
    {
      path: "/",
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/eventDetails/:id", element: <EventDetailsPage /> },
        { path: "*", element: <div>No page found</div> },
      ],
    },
  ],
  admin: [
    {
      path: "/",
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: "/", element: <Index />  },
        { path: "/event", element: <NewEvent /> },
        { path: "/requests", element: <BookingRequests /> },
        { path: "/pendingApproval", element: <PendingForMyApprovalPage /> },
        { path: "/events/:id", element: <EventDetailsPage /> },
        { path: "*", element: <div>No page found</div> },
      ],
    },
  ],
  default: [
    {
      path: "/",
      element: <LoginLayout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/login", element: <Login /> },
        { path: "*", element: <div>No page found</div> },
      ],
    },
  ],
};

export const protect = role && isLoggedIn ? protects[role] : protects['default'];
export const defaultProtect = protects['default'];
