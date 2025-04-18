import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;