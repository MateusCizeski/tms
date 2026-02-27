import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando...
      </div>
    );

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
