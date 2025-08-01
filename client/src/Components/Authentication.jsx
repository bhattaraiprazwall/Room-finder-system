import { Navigate } from 'react-router-dom';

export default function AuthorizationGuard({ children, allowedRoles = ['admin', 'user', ] }) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    console.log("decode token", decoded);
    const userRole = decoded?.role || decoded?.user?.role;
    console.log("decode ", userRole);

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error("Token decode error:", err);
    sessionStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
}
