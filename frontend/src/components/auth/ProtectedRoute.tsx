import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { user, token, loading } = useAuth();

  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>

          <h2 className="text-lg font-semibold text-gray-700">
            Authenticating...
          </h2>

          <p className="text-gray-500">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  // User not logged in
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // User authenticated
  return <>{children}</>;
}