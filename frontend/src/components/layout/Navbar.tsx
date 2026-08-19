 import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  User,
  LayoutDashboard,
  Heart,
  History,
  LogOut,
  BriefcaseBusiness,
  FileText,
  TrendingUp,
  Brain,
  Wallet,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

// =========================================================
// Main Application Navigation
// =========================================================

const NAV_LINKS = [
  {
    label: "Properties",
    to: "/properties",
  },
  {
    label: "AI Prediction",
    to: "/predict-price",
  },
  {
    label: "AI Recommendation",
    to: "/recommendation",
  },
  {
    label: "Locality AI",
    to: "/locality",
  },
  {
    label: "Compare AI",
    to: "/compare-localities",
  },
];

// =========================================================
// Additional Intelligence Navigation
// =========================================================

const INTELLIGENCE_LINKS = [
  {
    label: "AI Advisor",
    to: "/ai-advisor",
    icon: Brain,
  },
  {
    label: "Financial AI",
    to: "/financial",
    icon: Wallet,
  },
  {
    label: "Portfolio",
    to: "/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    label: "AI Reports",
    to: "/reports",
    icon: FileText,
  },
  {
    label: "Market Intelligence",
    to: "/market-intelligence",
    icon: TrendingUp,
  },
];

// =========================================================
// Navbar
// =========================================================

export default function Navbar() {

  const [open, setOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileRef =
    useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  // =========================================================
  // Close profile dropdown when clicking outside
  // =========================================================

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {

        setProfileOpen(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  // =========================================================
  // User Initials
  // =========================================================

  const initials =
    user?.name
      ?.split(" ")
      .map(
        (namePart) =>
          namePart[0]
      )
      .join("")
      .toUpperCase() || "U";

  // =========================================================
  // Logout
  // =========================================================

  function handleLogout() {

    logout();

    setProfileOpen(false);

    setOpen(false);

    navigate("/");

  }

  // =========================================================
  // Close Menus
  // =========================================================

  function closeMenus() {

    setProfileOpen(false);

    setOpen(false);

  }

  // =========================================================
  // Shared NavLink Classes
  // =========================================================

  function navClass({
    isActive,
  }: {
    isActive: boolean;
  }) {

    return `
      font-mono
      text-[10px]
      uppercase
      tracking-[0.14em]
      whitespace-nowrap
      transition
      duration-200
      ${
        isActive
          ? "text-brass-300"
          : "text-slate-300 hover:text-brass-300"
      }
    `;

  }

  return (

    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-blueprint-700/60
        bg-blueprint-900/95
        backdrop-blur-xl
      "
    >

      <nav
        className="
          mx-auto
          flex
          min-h-16
          max-w-7xl
          items-center
          justify-between
          gap-5
          px-6
        "
      >

        {/* ================================================= */}
        {/* Logo */}
        {/* ================================================= */}

        <Link
          to="/"
          onClick={closeMenus}
          className="
            flex
            shrink-0
            items-center
            gap-2.5
          "
        >

          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >

            <rect
              width="32"
              height="32"
              rx="7"
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

          <span
            className="
              font-display
              text-lg
              tracking-tight
              text-paper
            "
          >
            PropIntel{" "}

            <span className="text-brass-400">
              AI
            </span>

          </span>

        </Link>

        {/* ================================================= */}
        {/* Desktop Navigation */}
        {/* ================================================= */}

        <div
          className="
            hidden
            min-w-0
            flex-1
            items-center
            justify-center
            gap-5
            lg:flex
          "
        >

          {NAV_LINKS.map(
            (link) => (

              <NavLink
                key={link.label}
                to={link.to}
                className={navClass}
              >
                {link.label}
              </NavLink>

            )
          )}

          {/* Divider */}

          <span
            className="
              h-5
              w-px
              bg-slate-700
            "
          />

          {/* AI Advisor */}

          <NavLink
            to="/ai-advisor"
            className={navClass}
          >
            AI Advisor
          </NavLink>

          {/* Phase 12 Dropdown */}

          <div className="group relative">

            <button
              type="button"
              className="
                flex
                items-center
                gap-1.5
                font-mono
                text-[10px]
                uppercase
                tracking-[0.14em]
                text-slate-300
                transition
                hover:text-brass-300
              "
            >

              Intelligence

              <span className="text-[9px]">
                ▾
              </span>

            </button>

            {/* Dropdown */}

            <div
              className="
                invisible
                absolute
                left-1/2
                top-full
                mt-3
                w-64
                -translate-x-1/2
                translate-y-1
                rounded-xl
                border
                border-slate-700
                bg-blueprint-900
                p-2
                opacity-0
                shadow-2xl
                transition-all
                duration-200
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >

              <div className="px-3 pb-2 pt-2">

                <p
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-brass-300
                  "
                >
                  AI Intelligence Suite
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Advanced property and market intelligence
                </p>

              </div>

              {INTELLIGENCE_LINKS.map(
                (item) => {

                  const Icon =
                    item.icon;

                  return (

                    <NavLink
                      key={item.label}
                      to={item.to}
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-slate-300
                        transition
                        hover:bg-blueprint-800
                        hover:text-brass-300
                      "
                    >

                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-slate-700
                          bg-blueprint-800
                        "
                      >

                        <Icon
                          size={15}
                          className="text-brass-300"
                        />

                      </div>

                      <div>

                        <p
                          className="
                            text-xs
                            font-semibold
                          "
                        >
                          {item.label}
                        </p>

                        {item.label ===
                          "AI Reports" && (
                          <p className="text-[10px] text-slate-500">
                            AI generated reports
                          </p>
                        )}

                        {item.label ===
                          "Market Intelligence" && (
                          <p className="text-[10px] text-slate-500">
                            Trends & locality insights
                          </p>
                        )}

                        {item.label ===
                          "Portfolio" && (
                          <p className="text-[10px] text-slate-500">
                            Track investments
                          </p>
                        )}

                        {item.label ===
                          "Financial AI" && (
                          <p className="text-[10px] text-slate-500">
                            Financial planning
                          </p>
                        )}

                        {item.label ===
                          "AI Advisor" && (
                          <p className="text-[10px] text-slate-500">
                            Smart investment guidance
                          </p>
                        )}

                      </div>

                    </NavLink>

                  );

                }
              )}

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* Desktop Right Side */}
        {/* ================================================= */}

        <div
          className="
            hidden
            shrink-0
            items-center
            gap-4
            md:flex
          "
        >

          {!user ? (

            <>

              {/* Sign In */}

              <NavLink
                to="/login"
                className="
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-slate-300
                  transition
                  hover:text-brass-300
                "
              >
                Sign In
              </NavLink>

              {/* Register */}

              <NavLink
                to="/register"
                className="
                  rounded-md
                  border
                  border-brass-500
                  px-4
                  py-2
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  text-brass-300
                  transition
                  hover:bg-brass-500
                  hover:text-blueprint-900
                "
              >
                Register
              </NavLink>

            </>

          ) : (

            <div
              className="relative"
              ref={profileRef}
            >

              {/* Profile Button */}

              <button
                type="button"
                onClick={() =>
                  setProfileOpen(
                    !profileOpen
                  )
                }
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-slate-600
                  px-2
                  py-1
                  transition
                  hover:border-brass-500
                  hover:bg-blueprint-800
                "
              >

                {user.profileImage ? (

                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="
                      h-9
                      w-9
                      rounded-full
                      object-cover
                    "
                  />

                ) : (

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-600
                      font-bold
                      text-white
                    "
                  >
                    {initials}
                  </div>

                )}

                <div className="text-left">

                  <p
                    className="
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    {user.name}
                  </p>

                  <p
                    className="
                      text-[10px]
                      text-slate-400
                    "
                  >
                    View Profile ▼
                  </p>

                </div>

              </button>

              {/* ================================================= */}
              {/* Profile Dropdown */}
              {/* ================================================= */}

              {profileOpen && (

                <div
                  className="
                    absolute
                    right-0
                    mt-3
                    w-80
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    shadow-2xl
                  "
                >

                  {/* User Header */}

                  <div className="border-b p-4">

                    <div className="flex items-center gap-3">

                      {user.profileImage ? (

                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="
                            h-14
                            w-14
                            rounded-full
                            object-cover
                          "
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-600
                            text-xl
                            font-bold
                            text-white
                          "
                        >
                          {initials}
                        </div>

                      )}

                      <div className="min-w-0">

                        <h3
                          className="
                            truncate
                            font-bold
                            text-slate-900
                          "
                        >
                          {user.name}
                        </h3>

                        <p
                          className="
                            truncate
                            text-sm
                            text-gray-500
                          "
                        >
                          {user.email}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* My Profile */}

                  <Link
                    to="/profile"
                    onClick={closeMenus}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-slate-700
                      transition
                      hover:bg-gray-100
                    "
                  >

                    <User size={18} />

                    <span>
                      My Profile
                    </span>

                  </Link>

                  {/* Dashboard */}

                  <Link
                    to="/dashboard"
                    onClick={closeMenus}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-slate-700
                      transition
                      hover:bg-gray-100
                    "
                  >

                    <LayoutDashboard
                      size={18}
                    />

                    <span>
                      Dashboard
                    </span>

                  </Link>

                  {/* ================================================= */}
                  {/* AI Reports */}
                  {/* ================================================= */}

                  <Link
                    to="/reports"
                    onClick={closeMenus}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-slate-700
                      transition
                      hover:bg-blue-50
                      hover:text-blue-700
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-purple-50
                        text-purple-600
                      "
                    >

                      <FileText size={18} />

                    </div>

                    <div>

                      <p className="font-semibold">
                        AI Reports
                      </p>

                      <p className="text-xs text-slate-500">
                        Property & portfolio reports
                      </p>

                    </div>

                  </Link>

                  {/* ================================================= */}
                  {/* Market Intelligence */}
                  {/* ================================================= */}

                  <Link
                    to="/market-intelligence"
                    onClick={closeMenus}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-slate-700
                      transition
                      hover:bg-green-50
                      hover:text-green-700
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-green-50
                        text-green-600
                      "
                    >

                      <TrendingUp size={18} />

                    </div>

                    <div>

                      <p className="font-semibold">
                        Market Intelligence
                      </p>

                      <p className="text-xs text-slate-500">
                        Trends & locality analysis
                      </p>

                    </div>

                  </Link>

                  {/* ================================================= */}
                  {/* Investment Portfolio */}
                  {/* ================================================= */}

                  <Link
                    to="/portfolio"
                    onClick={closeMenus}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-slate-700
                      transition
                      hover:bg-blue-50
                      hover:text-blue-700
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                      "
                    >

                      <BriefcaseBusiness
                        size={18}
                      />

                    </div>

                    <div>

                      <p className="font-semibold">
                        Investment Portfolio
                      </p>

                      <p className="text-xs text-slate-500">
                        Manage your investments
                      </p>

                    </div>

                  </Link>

                  {/* Favorites */}

                  <Link
                    to="/favorites"
                    onClick={closeMenus}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-slate-700
                      transition
                      hover:bg-gray-100
                    "
                  >

                    <Heart size={18} />

                    <span>
                      Favorites
                    </span>

                  </Link>

                  {/* Recently Viewed */}

                  <Link
                    to="/recently-viewed"
                    onClick={closeMenus}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-slate-700
                      transition
                      hover:bg-gray-100
                    "
                  >

                    <History size={18} />

                    <span>
                      Recently Viewed
                    </span>

                  </Link>

                  {/* Logout */}

                  <div className="border-t">

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-red-600
                        transition
                        hover:bg-red-50
                      "
                    >

                      <LogOut
                        size={18}
                      />

                      <span>
                        Logout
                      </span>

                    </button>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>

        {/* ================================================= */}
        {/* Mobile Menu Button */}
        {/* ================================================= */}

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="
            rounded-lg
            border
            border-slate-700
            px-3
            py-2
            text-white
            transition
            hover:border-brass-500
            hover:text-brass-300
            lg:hidden
          "
          onClick={() =>
            setOpen(!open)
          }
        >
          ☰
        </button>

      </nav>

      {/* ===================================================== */}
      {/* Mobile Menu */}
      {/* ===================================================== */}

      {open && (

        <div
          className="
            border-t
            border-blueprint-700/60
            bg-blueprint-900
            px-6
            py-5
            lg:hidden
          "
        >

          <div className="flex flex-col gap-3">

            {/* Main Navigation */}

            {NAV_LINKS.map(
              (link) => (

                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={closeMenus}
                  className="
                    rounded-lg
                    px-3
                    py-2
                    font-mono
                    text-xs
                    uppercase
                    tracking-wider
                    text-slate-300
                    transition
                    hover:bg-blueprint-800
                    hover:text-brass-300
                  "
                >
                  {link.label}
                </NavLink>

              )
            )}

            {/* Divider */}

            <div className="my-2 h-px bg-slate-800" />

            {/* Intelligence Section */}

            <p
              className="
                px-3
                font-mono
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-brass-300
              "
            >
              Intelligence Suite
            </p>

            {INTELLIGENCE_LINKS.map(
              (item) => {

                const Icon =
                  item.icon;

                return (

                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={closeMenus}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-slate-300
                      transition
                      hover:bg-blueprint-800
                      hover:text-brass-300
                    "
                  >

                    <Icon size={17} />

                    <span>
                      {item.label}
                    </span>

                  </NavLink>

                );

              }
            )}

            {/* Divider */}

            <div className="my-2 h-px bg-slate-800" />

            {!user ? (

              <>

                <NavLink
                  to="/login"
                  onClick={closeMenus}
                  className="
                    rounded-lg
                    px-3
                    py-2
                    text-slate-300
                    transition
                    hover:bg-blueprint-800
                    hover:text-brass-300
                  "
                >
                  Sign In
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={closeMenus}
                  className="
                    rounded-lg
                    border
                    border-brass-500
                    px-3
                    py-2
                    text-center
                    text-brass-300
                  "
                >
                  Register
                </NavLink>

              </>

            ) : (

              <>

                {/* Profile */}

                <NavLink
                  to="/profile"
                  onClick={closeMenus}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    text-slate-300
                    hover:bg-blueprint-800
                  "
                >

                  <User size={18} />

                  Profile

                </NavLink>

                {/* Dashboard */}

                <NavLink
                  to="/dashboard"
                  onClick={closeMenus}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    text-slate-300
                    hover:bg-blueprint-800
                  "
                >

                  <LayoutDashboard
                    size={18}
                  />

                  Dashboard

                </NavLink>

                {/* Favorites */}

                <NavLink
                  to="/favorites"
                  onClick={closeMenus}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    text-slate-300
                    hover:bg-blueprint-800
                  "
                >

                  <Heart size={18} />

                  Favorites

                </NavLink>

                {/* Recently Viewed */}

                <NavLink
                  to="/recently-viewed"
                  onClick={closeMenus}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    text-slate-300
                    hover:bg-blueprint-800
                  "
                >

                  <History size={18} />

                  Recently Viewed

                </NavLink>

                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2
                    text-left
                    text-red-400
                    transition
                    hover:bg-red-950/30
                  "
                >

                  <LogOut size={18} />

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