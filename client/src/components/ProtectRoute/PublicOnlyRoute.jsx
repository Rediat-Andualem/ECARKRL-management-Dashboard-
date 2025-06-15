import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const PublicOnlyRoute = () => {
  const auth = useAuthUser()
  if (auth) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
