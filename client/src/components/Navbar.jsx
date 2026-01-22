import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-gray-900 font-semibold"
      : "text-gray-500 hover:text-gray-900";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm fade-in">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Blog<span className="text-gray-500">Space</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`${isActive("/")} transition-all duration-300 hover:scale-105`}
          >
            Home
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                className={`${isActive("/login")} transition-all duration-300 hover:scale-105`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 active:scale-95"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to="/create"
                className={`${isActive("/create")} transition-all duration-300 hover:scale-105`}
              >
                Create Post
              </Link>
              <Link
                to="/myposts"
                className={`${isActive("/myposts")} transition-all duration-300 hover:scale-105`}
              >
                My Posts
              </Link>

              <div className="flex items-center gap-3 ml-4">
                <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold uppercase">
                  {user.username?.charAt(0)}
                </div>

                <span className="text-sm font-medium">
                  {user.username}
                </span>

                <button
                  onClick={logout}
                  className="ml-2 text-sm text-red-500 hover:underline transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
