import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserStatus, isAuth, loadUser, selectUser } from "../../features/user/userSlice";

const RutaProtegida = ({ children, requiredRoles }) => {

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(isAuth);
  const user = useSelector(selectUser);
  const status = useSelector(getUserStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadUser());
    }
  }, [isAuthenticated, status, dispatch, user]);

  if (status === "loading") {
    return (
      <div className="w-100 text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "succeeded" && isAuthenticated) {
    const userRoles = user.roles.map(role => role.name);
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

    if (hasRequiredRole) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default RutaProtegida;
