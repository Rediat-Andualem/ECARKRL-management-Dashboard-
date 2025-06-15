import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const PrivateRoute = () => {
  const auth = useAuthUser(); 
  if (!auth) {
    return <Navigate to="/logIn" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
