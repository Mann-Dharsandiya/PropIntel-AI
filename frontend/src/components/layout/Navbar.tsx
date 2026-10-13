  // frontend/src/layouts/Navbar.tsx

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  FileBarChart,
  Heart,
  History,
  LineChart,
  LogOut,
  Menu,
  Search,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  {
    label: "Properties",
    to: "/properties",
  },
  {
    label: "AI Intelligence",
    to: "/predict-price",
  },
  {
    label: "Compare",
    to: "/compare-localities",
  },
];

const AI_ITEMS = [
  {
    label: "AI Price Prediction",
    description: "Predict property prices using AI",
    path: "/predict-price",
    icon: <LineChart size={15} />,
  },
  {
    label: "AI Recommendations",
    description: "Find properties matched to your needs",
    path: "/recommendation",
    icon: <Sparkles size={15} />,
  },
  {
    label: "Locality Intelligence",
    description: "Analyze locality performance and potential",
    path: "/locality",
    icon: <Building2 size={15} />,
  },
  {
    label: "Compare Localities",
    description: "Compare investment opportunities",
    path: "/compare-localities",
    icon: <BarChart3 size={15} />,
  },
];

const INTELLIGENCE_ITEMS = [
  {
    label: "Financial Intelligence",
    description: "EMI, loans, ROI and investment planning",
    path: "/financial",
    icon: <LineChart size={15} />,
  },
  {
    label: "Investment Portfolio",
    description: "Track and manage your investments",
    path: "/portfolio",
    icon: <BriefcaseBusiness size={15} />,
  },
  {
    label: "AI Reports",
    description: "Generate intelligent property reports",
    path: "/reports",
    icon: <FileBarChart size={15} />,
  },
  {
    label: "Market Intelligence",
    description: "Trends, signals and market insights",
    path: "/reports/market",
    icon: <BarChart3 size={15} />,
  },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [activeMenu, setActiveMenu] = useState<
    "ai" | "intelligence" | "profile" | null
  >(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const navbarRef = useRef<HTMLDivElement | null>(null);

  const searchInputRef =
    useRef<HTMLInputElement | null>(null);

  /*
   * IMPORTANT:
   * Never use hard-coded "Test User" here.
   * The profile section is rendered ONLY when user exists.
   */

  const displayName =
    user?.name?.trim() ||
    user?.email?.split("@")[0] ||
    "User";

  const email = user?.email || "";

  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "U";

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(
          event.target as Node
        )
      ) {
        setActiveMenu(null);
        setSearchOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    if (!searchOpen) return;

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchOpen]);

  function handleSearchSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const query = searchValue.trim();

    if (!query) return;

    navigate(
      `/properties?search=${encodeURIComponent(query)}`
    );

    setSearchValue("");
    setSearchOpen(false);
  }

  function handleLogout() {
    /*
     * First clear authentication state.
     * Navbar immediately receives user === null.
     * Therefore no user name can remain visible.
     */
    logout();

    setActiveMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchValue("");

    navigate("/login", { replace: true });
  }

  function goTo(path: string) {
    navigate(path);
    setActiveMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }

  function toggleMenu(
    menu: "ai" | "intelligence" | "profile"
  ) {
    setSearchOpen(false);

    setActiveMenu(
      activeMenu === menu ? null : menu
    );
  }

  return (
    <header
      ref={navbarRef}
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-white/[0.08]
        bg-[#0b172a]/95
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[72px]
          max-w-[1440px]
          items-center
          justify-between
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* =====================================================
            BRAND
        ====================================================== */}

        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
          onClick={() => {
            setActiveMenu(null);
            setMobileOpen(false);
          }}
        >
          <div
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[#c9944d]/50
              bg-[#12233d]
              shadow-[0_0_25px_rgba(201,148,77,0.08)]
              transition-all
              duration-300
              group-hover:border-[#c9944d]
            "
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 5.5L26 12.5V26H6V12.5L16 5.5Z"
                stroke="#c9944d"
                strokeWidth="1.6"
              />

              <path
                d="M12.5 26V17.5H19.5V26"
                stroke="#75b9c8"
                strokeWidth="1.6"
              />

              <path
                d="M10 13.5H22"
                stroke="#c9944d"
                strokeWidth="1.2"
                opacity="0.7"
              />
            </svg>
          </div>

          <div className="hidden sm:block">
            <div
              className="
                font-serif
                text-[17px]
                font-semibold
                tracking-[-0.02em]
                text-white
              "
            >
              PropIntel{" "}
              <span className="text-[#c9944d]">
                AI
              </span>
            </div>

            <div
              className="
                mt-0.5
                font-mono
                text-[7px]
                uppercase
                tracking-[0.28em]
                text-slate-500
              "
            >
              Real Estate Intelligence
            </div>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `
                relative
                py-2
                font-mono
                text-[10px]
                font-medium
                uppercase
                tracking-[0.16em]
                transition-colors
                ${
                  isActive
                    ? "text-[#d5a457]"
                    : "text-slate-400 hover:text-white"
                }
                `
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* AI MENU */}

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("ai")}
              className="
                flex
                items-center
                gap-1.5
                py-2
                font-mono
                text-[10px]
                font-medium
                uppercase
                tracking-[0.16em]
                text-slate-400
                transition-colors
                hover:text-white
              "
            >
              AI Tools

              <ChevronDown
                size={12}
                className={`
                  transition-transform
                  duration-200
                  ${
                    activeMenu === "ai"
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {activeMenu === "ai" && (
              <Dropdown
                title="AI Intelligence"
                subtitle="AI-powered property analysis"
                items={AI_ITEMS}
                onSelect={goTo}
              />
            )}
          </div>

          {/* INTELLIGENCE MENU */}

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                toggleMenu("intelligence")
              }
              className="
                flex
                items-center
                gap-1.5
                py-2
                font-mono
                text-[10px]
                font-medium
                uppercase
                tracking-[0.16em]
                text-slate-400
                transition-colors
                hover:text-white
              "
            >
              Intelligence

              <ChevronDown
                size={12}
                className={`
                  transition-transform
                  duration-200
                  ${
                    activeMenu === "intelligence"
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {activeMenu === "intelligence" && (
              <Dropdown
                title="Intelligence Workspace"
                subtitle="Analysis, planning and reporting"
                items={INTELLIGENCE_ITEMS}
                onSelect={goTo}
              />
            )}
          </div>
        </nav>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="flex items-center gap-2">
          {/* SEARCH */}

          <div className="relative">
            {searchOpen ? (
              <form
                onSubmit={handleSearchSubmit}
                className="
                  absolute
                  right-0
                  top-1/2
                  flex
                  w-[250px]
                  -translate-y-1/2
                  items-center
                  rounded-xl
                  border
                  border-white/[0.1]
                  bg-[#12233d]
                  shadow-xl
                "
              >
                <Search
                  size={14}
                  className="ml-3 shrink-0 text-slate-500"
                />

                <input
                  ref={searchInputRef}
                  value={searchValue}
                  onChange={(event) =>
                    setSearchValue(event.target.value)
                  }
                  placeholder="Search properties..."
                  className="
                    h-10
                    min-w-0
                    flex-1
                    bg-transparent
                    px-3
                    text-xs
                    text-white
                    outline-none
                    placeholder:text-slate-600
                  "
                />

                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchValue("");
                  }}
                  className="
                    mr-2
                    rounded-lg
                    p-1.5
                    text-slate-500
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <X size={14} />
                </button>
              </form>
            ) : (
              <button
                type="button"
                aria-label="Search properties"
                onClick={() => {
                  setActiveMenu(null);
                  setSearchOpen(true);
                }}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  text-slate-400
                  transition
                  hover:border-[#c9944d]/40
                  hover:bg-white/[0.05]
                  hover:text-[#d5a457]
                "
              >
                <Search size={15} />
              </button>
            )}
          </div>

          {/* PROFILE */}

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  toggleMenu("profile")
                }
                className="
                  flex
                  items-center
                  gap-2.5
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.035]
                  px-2
                  py-1.5
                  transition
                  hover:border-[#c9944d]/40
                  hover:bg-white/[0.06]
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
                    bg-gradient-to-br
                    from-[#5fd3c8]
                    to-[#4a90a4]
                    font-mono
                    text-[10px]
                    font-bold
                    text-[#102033]
                  "
                >
                  {initials}
                </div>

                <div className="hidden text-left sm:block">
                  <div
                    className="
                      max-w-[100px]
                      truncate
                      text-[10px]
                      font-semibold
                      leading-none
                      text-slate-200
                    "
                  >
                    {displayName}
                  </div>

                  <div
                    className="
                      mt-1
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-wider
                      text-slate-500
                    "
                  >
                    Account
                  </div>
                </div>

                <ChevronDown
                  size={11}
                  className={`
                    mr-1
                    text-slate-500
                    transition-transform
                    duration-200
                    ${
                      activeMenu === "profile"
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              {activeMenu === "profile" && (
                <ProfileDropdown
                  name={displayName}
                  email={email}
                  initials={initials}
                  onProfile={() =>
                    goTo("/profile")
                  }
                  onFavorites={() =>
                    goTo("/favorites")
                  }
                  onHistory={() =>
                    goTo("/recently-viewed")
                  }
                  onLogout={handleLogout}
                />
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <NavLink
                to="/login"
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-slate-400
                  transition
                  hover:text-white
                "
              >
                Sign In
              </NavLink>

              <NavLink
                to="/register"
                className="
                  rounded-lg
                  border
                  border-[#c9944d]/60
                  bg-[#c9944d]
                  px-4
                  py-2.5
                  font-mono
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#172236]
                  shadow-[0_5px_18px_rgba(201,148,77,0.16)]
                  transition
                  hover:bg-[#d9ad6d]
                "
              >
                Get Started
              </NavLink>
            </div>
          )}

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            onClick={() => {
              setMobileOpen((value) => !value);
              setActiveMenu(null);
              setSearchOpen(false);
            }}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              text-slate-400
              lg:hidden
            "
          >
            {mobileOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      {mobileOpen && (
        <div
          className="
            border-t
            border-white/[0.06]
            bg-[#0d1a2d]
            lg:hidden
          "
        >
          <div className="mx-auto max-w-[1440px] px-5 py-5">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => (
                <MobileNavItem
                  key={link.to}
                  label={link.label}
                  icon={<Building2 size={17} />}
                  onClick={() =>
                    goTo(link.to)
                  }
                />
              ))}

              {AI_ITEMS.map((item) => (
                <MobileNavItem
                  key={item.path}
                  label={item.label}
                  icon={item.icon}
                  onClick={() =>
                    goTo(item.path)
                  }
                />
              ))}

              {INTELLIGENCE_ITEMS.map(
                (item) => (
                  <MobileNavItem
                    key={item.path}
                    label={item.label}
                    icon={item.icon}
                    onClick={() =>
                      goTo(item.path)
                    }
                  />
                )
              )}
            </div>

            {!user && (
              <div
                className="
                  mt-4
                  grid
                  grid-cols-2
                  gap-2
                  border-t
                  border-white/[0.06]
                  pt-4
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    goTo("/login")
                  }
                  className="
                    rounded-xl
                    border
                    border-white/[0.08]
                    py-3
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-wider
                    text-slate-300
                  "
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() =>
                    goTo("/register")
                  }
                  className="
                    rounded-xl
                    bg-[#c9944d]
                    py-3
                    font-mono
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#172236]
                  "
                >
                  Get Started
                </button>
              </div>
            )}

            {user && (
              <div
                className="
                  mt-4
                  border-t
                  border-white/[0.06]
                  pt-4
                "
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-gradient-to-br
                      from-[#5fd3c8]
                      to-[#4a90a4]
                      font-mono
                      text-[10px]
                      font-bold
                      text-[#102033]
                    "
                  >
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <div
                      className="
                        truncate
                        text-xs
                        font-semibold
                        text-white
                      "
                    >
                      {displayName}
                    </div>

                    <div
                      className="
                        truncate
                        text-[9px]
                        text-slate-500
                      "
                    >
                      {email}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-red-400/10
                    bg-red-500/[0.04]
                    px-4
                    py-3
                    text-left
                    text-red-300
                    transition
                    hover:bg-red-500/[0.08]
                  "
                >
                  <LogOut size={16} />

                  <div>
                    <div className="text-xs font-semibold">
                      Sign out
                    </div>

                    <div className="mt-0.5 text-[9px] text-slate-600">
                      End current session
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* =========================================================
   DROPDOWN
========================================================= */

function Dropdown({
  title,
  subtitle,
  items,
  onSelect,
}: {
  title: string;
  subtitle: string;
  items: {
    label: string;
    description: string;
    path: string;
    icon: React.ReactNode;
  }[];
  onSelect: (path: string) => void;
}) {
  return (
    <div
      className="
        absolute
        left-1/2
        top-full
        mt-3
        w-[310px]
        -translate-x-1/2
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-[#101e32]
        shadow-[0_24px_70px_rgba(0,0,0,0.35)]
      "
    >
      <div
        className="
          border-b
          border-white/[0.06]
          px-4
          py-4
        "
      >
        <div
          className="
            font-mono
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#d5a457]
          "
        >
          {title}
        </div>

        <p className="mt-1.5 text-[10px] text-slate-500">
          {subtitle}
        </p>
      </div>

      <div className="p-2">
        {items.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() =>
              onSelect(item.path)
            }
            className="
              group
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-left
              transition
              hover:bg-white/[0.04]
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-[#35516d]
                bg-[#13263d]
                text-slate-400
                transition
                group-hover:border-[#c9944d]/40
                group-hover:text-[#d5a457]
              "
            >
              {item.icon}
            </div>

            <div className="min-w-0 flex-1">
              <div
                className="
                  text-[10px]
                  font-medium
                  text-slate-300
                  group-hover:text-white
                "
              >
                {item.label}
              </div>

              <div
                className="
                  mt-0.5
                  truncate
                  text-[8px]
                  text-slate-600
                "
              >
                {item.description}
              </div>
            </div>

            <span
              className="
                text-[10px]
                text-slate-700
                group-hover:text-[#6faabd]
              "
            >
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE DROPDOWN
========================================================= */

function ProfileDropdown({
  name,
  email,
  initials,
  onProfile,
  onFavorites,
  onHistory,
  onLogout,
}: {
  name: string;
  email: string;
  initials: string;
  onProfile: () => void;
  onFavorites: () => void;
  onHistory: () => void;
  onLogout: () => void;
}) {
  return (
    <div
      className="
        absolute
        right-0
        top-full
        mt-3
        w-[290px]
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-[#101e32]
        shadow-[0_24px_70px_rgba(0,0,0,0.35)]
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-white/[0.06]
          p-4
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-[#5fd3c8]
            to-[#4a90a4]
            font-mono
            text-xs
            font-bold
            text-[#102033]
          "
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-semibold text-white">
            {name}
          </div>

          <div className="mt-0.5 truncate text-[9px] text-slate-500">
            {email}
          </div>
        </div>

        <span
          className="
            rounded-full
            bg-[#12b76a]/10
            px-2
            py-1
            font-mono
            text-[7px]
            uppercase
            tracking-wider
            text-[#12b76a]
          "
        >
          Active
        </span>
      </div>

      <div className="p-2">
        <ProfileMenuItem
          icon={<User size={15} />}
          title="My Profile"
          description="View and manage your profile"
          onClick={onProfile}
        />

        <ProfileMenuItem
          icon={<Heart size={15} />}
          title="Favorites"
          description="Your saved properties"
          onClick={onFavorites}
        />

        <ProfileMenuItem
          icon={<History size={15} />}
          title="Recently Viewed"
          description="Properties you viewed recently"
          onClick={onHistory}
        />
      </div>

      <div
        className="
          border-t
          border-white/[0.06]
          p-2
        "
      >
        <button
          type="button"
          onClick={onLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-3
            text-left
            transition
            hover:bg-red-500/[0.08]
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-red-400/20
              bg-red-500/[0.06]
              text-red-300
            "
          >
            <LogOut size={14} />
          </div>

          <div>
            <div className="text-[10px] font-semibold text-red-300">
              Sign out
            </div>

            <div className="mt-0.5 text-[8px] text-slate-600">
              End current session
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   PROFILE MENU ITEM
========================================================= */

function ProfileMenuItem({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-left
        transition
        hover:bg-[#172b43]
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
          border-white/[0.05]
          bg-white/[0.025]
          text-slate-500
          transition
          group-hover:border-[#35516d]
          group-hover:bg-[#19334d]
          group-hover:text-[#75b9c8]
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div
          className="
            text-[10px]
            font-medium
            text-slate-300
            transition
            group-hover:text-white
          "
        >
          {title}
        </div>

        <div
          className="
            mt-0.5
            truncate
            text-[8px]
            text-slate-600
          "
        >
          {description}
        </div>
      </div>

      <span
        className="
          text-[10px]
          text-slate-700
          transition
          group-hover:text-[#6faabd]
        "
      >
        ↗
      </span>
    </button>
  );
}

/* =========================================================
   MOBILE NAV ITEM
========================================================= */

function MobileNavItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        py-3
        text-left
        transition
        hover:bg-[#172b43]
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
          border
          border-white/[0.05]
          bg-white/[0.025]
          text-slate-500
          transition
          group-hover:border-[#35516d]
          group-hover:bg-[#19334d]
          group-hover:text-[#d5a457]
        "
      >
        {icon}
      </div>

      <span
        className="
          text-xs
          font-medium
          text-slate-300
          transition
          group-hover:text-white
        "
      >
        {label}
      </span>

      <span
        className="
          ml-auto
          text-xs
          text-slate-700
          group-hover:text-[#6faabd]
        "
      >
        →
      </span>
    </button>
  );
}