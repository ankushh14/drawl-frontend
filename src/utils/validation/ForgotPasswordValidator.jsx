import { useAuth } from "../../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function ForgotPasswordValidator() {
  const { forgotPassword } = useAuth();
  return forgotPassword ? <Outlet /> : <Navigate to={"/404"} replace />;
}
