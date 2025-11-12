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
const AdminDashboard = lazy(() => import("../Pages/AdminDashboard/AdminDashboard"));

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
        <AdminDashboard />
      </Suspense>
    ),
  },
]);
