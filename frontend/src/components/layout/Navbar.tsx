 import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  User,
  LayoutDashboard,
  Heart,
  History,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { label: "Properties", to: "/properties" },
  { label: "AI Prediction", to: "/predict-price" },
  { label: "AI Recommendation", to: "/recommendation" },
  { label: "Locality AI", to: "/locality" },
  { label: "Compare AI", to: "/compare-localities" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  function handleLogout() {
    logout();
    setProfileOpen(false);
    setOpen(false);
    navigate("/");
  }

  function closeMenus() {
    setProfileOpen(false);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blueprint-700/60 bg-blueprint-900/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2.5"
        >
          <svg width="26" height="26" viewBox="0 0 32 32">
            <rect
              width="32"
              height="32"
              rx="6"
              fill="#0F1B2E"
            />

            <path
              d="M16 6 L26 13 V26 H6 V13 Z"
              fill="none"
              stroke="#C08B3E"
              strokeWidth="1.6"
            />

            <path
              d="M13 26 V18 H19 V26"
              fill="none"
              stroke="#4A90A4"
              strokeWidth="1.6"
            />
          </svg>

          <span className="font-display text-lg tracking-tight text-paper">
            PropIntel <span className="text-brass-400">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-[0.15em] transition ${
                  isActive
                    ? "text-brass-300"
                    : "text-slate-300 hover:text-brass-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right */}

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="font-mono text-xs uppercase tracking-[0.2em] text-slate-300 hover:text-brass-300"
              >
                Sign In
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-sm border border-brass-500 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-brass-300 transition hover:bg-brass-500 hover:text-blueprint-900"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div
              className="relative"
              ref={profileRef}
            >
              <button
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                className="flex items-center gap-3 rounded-full border border-slate-600 px-2 py-1 transition hover:bg-blueprint-800"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {initials}
                  </div>
                )}

                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    {user.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    View Profile ▼
                  </p>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border bg-white shadow-xl">
                  <div className="border-b p-4">
                    <div className="flex items-center gap-3">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                          {initials}
                        </div>
                      )}

                      <div>
                        <h3 className="font-bold">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={closeMenus}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={closeMenus}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <Link
                    to="/favorites"
                    onClick={closeMenus}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <Heart size={18} />
                    Favorites
                  </Link>

                  <Link
                    to="/recently-viewed"
                    onClick={closeMenus}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <History size={18} />
                    Recently Viewed
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t border-blueprint-700/60 bg-blueprint-900 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={closeMenus}
                className="text-slate-300"
              >
                {link.label}
              </NavLink>
            ))}

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenus}
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={closeMenus}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  onClick={closeMenus}
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/dashboard"
                  onClick={closeMenus}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/favorites"
                  onClick={closeMenus}
                >
                  Favorites
                </NavLink>

                <NavLink
                  to="/recently-viewed"
                  onClick={closeMenus}
                >
                  Recently Viewed
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-400"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}