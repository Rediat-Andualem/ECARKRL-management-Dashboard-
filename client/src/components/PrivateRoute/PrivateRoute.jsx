import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const PrivateRoute = () => {
  const auth = useAuthUser();

   console.log(auth)
  // If user is not authenticated, redirect to login
  if (!auth?.userID) {
    return <Navigate to="/login" replace />;
  }
  // If user is authenticated but not verified, redirect to verification page
  // if (auth?.token && auth?.verification !== true) {
  //   return <Navigate to="/verifyLogIn" replace />;
  // }
  return <Outlet />;
};

export default PrivateRoute;