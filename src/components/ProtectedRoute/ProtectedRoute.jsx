import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
  anonymous = false,
  isLoggedIn,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}
