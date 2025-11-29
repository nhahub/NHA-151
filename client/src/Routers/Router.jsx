import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../Components/Common/Loading/Loading";
import Main from "../Layouts/MainLayout";

const Home = lazy(() => import("../Pages/Home/Home"));
const AuthPage = lazy(() => import("../Pages/AuthPage/AuthPage"));
const AboutUs = lazy(() => import("../Pages/AboutUs/AboutUs"));
const Contact = lazy(() => import("../Pages/Contact/Contact"));
const Indoor = lazy(() => import("../Pages/indoor/Indoor"));
const Outdoor = lazy(() => import("../Pages/Outdoor/Outdoor"));
const PlantDetails = lazy(() => import("../Pages/PlantDetails/PlantDetails"));
const Checkout = lazy(() => import("@/Pages/Checkout/Checkout"));
const UserAccount = lazy(() => import("@/Pages/UserProfile/UserAccount"));
const OrderDetails = lazy(() => import("../Pages/Order/OrderDetails"));
const AdminDashboard = lazy(() =>
  import("../Pages/AdminDashboard/AdminDashboard")
);
const NotFound = lazy(() => import("../Pages/NotFoundPage/NotFoundPage"));
const AdminLayout = lazy(() => import("../Layouts/LayoutDashboard"));
const AdminOrders = lazy(() => import("../Pages/AdminDashboard/AdminOrders"));
const AdminProducts = lazy(() =>
  import("../Pages/AdminDashboard/AdminProducts")
);
const AdminUsers = lazy(() => import("../Pages/AdminDashboard/AdminUsers"));
const AdminMessages = lazy(() => import("../Pages/AdminDashboard/AdminMessages"));
const AdminAccount = lazy(() => import("../Pages/AdminDashboard/AdminAccount"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/indoor",
        element: (
          <Suspense fallback={<Loading />}>
            <Indoor />
          </Suspense>
        ),
      },
      {
        path: "/outdoor",
        element: (
          <Suspense fallback={<Loading />}>
            <Outdoor />
          </Suspense>
        ),
      },
      {
        path: "/plantdetails/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <PlantDetails />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<Loading />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <OrderDetails />
          </Suspense>
        ),
      },
      {
        path: "/myaccount",
        element: (
          <Suspense fallback={<Loading />}>
            <UserAccount />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthPage defaultMode={false} />
      </Suspense>
    ),
  },
  {
    path: "/signin",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthPage defaultMode={true} />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loading />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminOrders />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminProducts />
          </Suspense>
        ),
      },
      {
        path: "messages",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminMessages />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminUsers />
          </Suspense>
        ),
      },
      {
        path: "adminaccount",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminAccount />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
