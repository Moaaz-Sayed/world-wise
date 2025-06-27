import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FaceAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthantceted } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthantceted) navigate("/");
  }, [navigate, isAuthantceted]);

  return isAuthantceted ? children : null;
}

export default ProtectedRoute;
