import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../pages/Login";
import { useLocation, useParams } from "react-router-dom";

declare type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  let location = useLocation();
  if (!user) {
    if (location.pathname == `/myProfile/${id}`) {
      return (
        <>
          <div className="d-flex justify-content-center">
            <h3>You have to be logged in!</h3>
          </div>
          <Login></Login>
        </>
      );
    } else if (location.pathname == "/posts") {
      return (
        <div style={{ fontSize: "2vh" }} className=" text-muted">
          <p className="mb-0">Login to read and add comments</p>
        </div>
      );
    }
  }
  return <div>{children}</div>;
}

export default ProtectedRoute;
