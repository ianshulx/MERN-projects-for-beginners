import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectMsgRoute({ children }) {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
export const ProtectAuthRoute = ({ children }) => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};
