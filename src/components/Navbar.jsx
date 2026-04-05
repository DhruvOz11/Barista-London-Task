import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <span className="text-base font-semibold text-gray-800 tracking-tight">
        Task Management App
      </span>
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="text-xs text-gray-400 hover:text-red-500 font-medium transition"
        >
          Log out
        </button>
      )}
    </nav>
  );
}
