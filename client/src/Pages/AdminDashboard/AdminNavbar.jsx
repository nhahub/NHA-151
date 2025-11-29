import { useState } from "react";
import { Menu, User, X, Home, LogOut } from "lucide-react";
import { logout } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
    setMenuOpen(false);
  };

  const goToHomepage = () => {
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 shadow-sm bg-lime-50 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: menu toggle & title */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen((s) => !s)}
              className="inline-flex p-2 md:hidden rounded-xl hover:bg-primary/20 focus:outline-none"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>

          {/* Right side: user info + buttons */}
          <div className="relative flex items-center gap-3">
            {/* Desktop buttons */}
            <div className="items-center hidden gap-2 md:flex">
              <button
                onClick={goToHomepage}
                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white rounded-lg bg-primary hover:bg-lime-700 focus:outline-none"
              >
                <Home size={16} />
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                <LogOut size={16} />
              </button>
            </div>

            {/* Mobile dropdown */}
            <div className="relative md:hidden">
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="flex items-center p-2 rounded-xl hover:bg-primary/20 focus:outline-none"
                aria-label="Open menu"
              >
                <User />
              </button>
              {menuOpen && (
                <div className="absolute right-0 flex flex-col w-40 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <button
                    onClick={goToHomepage}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <Home size={16} />
                    Homepage
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* User info */}
            <div className="items-center hidden gap-2 md:flex">
              <div className="flex items-center justify-center rounded-full w-9 h-9 bg-primary/30">
                <User />
              </div>
              <div className="text-sm">{user.name}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
