import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Main from "./layouts/main.tsx";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import AuthContext from "./contexts/auth-context/AuthContext.tsx";
import ProtectAuthenticatePage from "./private-route/ProtectAuthenticatePage.tsx";
import ProtectAdminRoute from "./private-route/ProtectAdminRoute.tsx";
import Admin from "./pages/admin/Admin.tsx";
import ProtectedUserRoute from "./private-route/ProtectedUserRoute.tsx";
import Services from "./pages/services/Services.tsx";
import SingleService from "./pages/services/SingleService.tsx";
import { getServices } from "./actions/services/getAllServices.tsx";
import OrderContext from "./contexts/order-context/OrderContext.tsx";
import Checkout from "./pages/checkout/Checkout.tsx";
import Profile from "./pages/dashboard/Profile/Profile.tsx";
import OrderHistory from "./pages/dashboard/Order-history/OrderHistory.tsx";
import Review from "./pages/dashboard/Review/Review.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import Cart from "./components/cart/Cart.tsx";
import CommentContext from "./contexts/comments-context/CommentContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services />, loader: getServices },
      {
        path: "/services/:id",
        element: (
          <ProtectedUserRoute>
            <SingleService />
          </ProtectedUserRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedUserRoute>
            <DashboardLayout />
          </ProtectedUserRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to={"profile"} replace />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "order-history",
            element: <OrderHistory />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "review",
            element: <Review />,
          },
        ],
      },
      {
        path: "/login",
        element: (
          <ProtectAuthenticatePage>
            <Login />
          </ProtectAuthenticatePage>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectAuthenticatePage>
            <Register />
          </ProtectAuthenticatePage>
        ),
      },
      {
        path: "/admin",
        element: (
          <ProtectAdminRoute>
            <Admin />
          </ProtectAdminRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          // <ProtectedUserRoute>
          <Checkout />
          // </ProtectedUserRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContext>
      <OrderContext>
        <CommentContext>
          <RouterProvider router={router} />
        </CommentContext>
      </OrderContext>
    </AuthContext>
  </React.StrictMode>
);
