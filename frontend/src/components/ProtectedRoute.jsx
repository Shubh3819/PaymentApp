import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
  
    if (!token) {
      setChecking(false);
      return;
    }
    setChecking(false);
  }, [token]);

  if (checking) return null; 

  if (!token) return <Navigate to="/signin" replace />;

  return children;
}
