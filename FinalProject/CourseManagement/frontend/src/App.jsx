import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import { action as authAction } from "./pages/Authentication";
import "antd/dist/reset.css";
import { tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/logout";
import AuthForm from "./components/AuthForm";
import Courses from "./pages/Courses";
import HomePage from "./pages/Home";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import CourseDetails from "./pages/CourseDetails";
import NewOrEditCourse from "./pages/NewOrEditCourse";
import ConfigStyles from "./components/ConfigStyles";
import CourseContextProvider from "./context/course-context";
import CategoryCourseList from "./pages/categoryCourseList";
import ProfilePage from "./pages/Profile";
import UserCourses from "./pages/UserCourses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/category/:categoryName",
        element: <CategoryCourseList />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        path:"/user/mycourses",
        element: <UserCourses/>
      },
      {
        path:"/profile",
        element: <ProfilePage/>
      },
      {
        path: "/admin",
        children: [
          {
            path: "/admin/new",
            element: <NewOrEditCourse />,
          },
        ],
      },

      {
        path: "/auth",
        element: <AuthForm />,
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
