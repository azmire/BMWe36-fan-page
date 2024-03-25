import FrontPage from "./pages/FrontPage.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Profile.tsx";
import Login from "./pages/Login.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import NavbarComponent from "./Components/Navbar.tsx";
import Posts from "./pages/Posts.tsx";
import Signup from "./pages/Signup.tsx";
import Parts from "./pages/Parts.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

const router = createBrowserRouter([
  {
    element: <NavbarComponent />,
    children: [
      {
        path: "/",
        element: <FrontPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
