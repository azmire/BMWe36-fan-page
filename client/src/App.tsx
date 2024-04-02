import FrontPage from "./pages/FrontPage.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import NavbarComponent from "./Components/Navbar.tsx";
import Posts from "./pages/Posts.tsx";
import Signup from "./pages/Signup.tsx";
import Parts from "./pages/Parts.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
import OtherUsersProfileProfilePage from "./pages/OtherUsersProfilePage.tsx";
import MyProfile from "./pages/MyProfile.tsx";

const router = createBrowserRouter([
  {
    element: <NavbarComponent />,
    children: [
      {
        path: "/",
        element: <FrontPage />,
      },
      {
        path: "/myProfile/:id",
        element: (
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/otherUserProfile/:id",
        element: <OtherUsersProfileProfilePage />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/parts",
        element: <Parts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
