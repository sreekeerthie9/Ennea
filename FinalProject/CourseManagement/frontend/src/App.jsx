import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "./pages/Root";
import { action as authAction } from "./pages/Authentication";
import "antd/dist/reset.css";
import { tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/logout";
import ConfigStyles from "./components/ConfigStyles";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import CourseContextProvider from "./context/course-context";
import { LoadingOutlined } from "@ant-design/icons";
import CourseDetails from "./pages/CourseDetails";

const AuthForm = lazy(() => import("./components/AuthForm"));
const Courses = lazy(() => import("./pages/Courses"));
const HomePage = lazy(() => import("./pages/Home"));
const NewOrEditCourse = lazy(() => import("./pages/NewOrEditCourse"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const CategoryCourseList = lazy(() => import("./pages/CategoryCourseList"));
const UserCourses = lazy(() => import("./pages/UserCourses"));

const LoadingFallback = <LoadingOutlined spin />;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={LoadingFallback}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/courses",
        element: (
          <Suspense fallback={LoadingFallback}>
            <Courses />
          </Suspense>
        ),
      },
      {
        path: "/courses/category/:categoryName",
        element: (
          <Suspense fallback={LoadingFallback}>
            <CategoryCourseList />
          </Suspense>
        ),
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        path: "/user/mycourses",
        element: (
          <Suspense fallback={LoadingFallback}>
            <UserCourses />
          </Suspense>
        ),
      },
      {
        path: "/user/profile",
        element: (
          <Suspense fallback={LoadingFallback}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "/admin",
        children: [
          {
            path: "/admin/new",
            element: (
              <Suspense fallback={LoadingFallback}>
                <NewOrEditCourse />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/auth",
        element: (
          <Suspense fallback={LoadingFallback}>
            <AuthForm />
          </Suspense>
        ),
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

export default function App() {
  return (
    <ConfigStyles>
      <QueryClientProvider client={queryClient}>
        <CourseContextProvider>
          <RouterProvider router={router} />
        </CourseContextProvider>
      </QueryClientProvider>
    </ConfigStyles>
  );
}
