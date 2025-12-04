import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);       // mobile drawer
  const [openUser, setOpenUser] = useState(false);       // avatar dropdown
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItem =
    "relative px-2 py-1 text-[15px] font-medium text-slate-600 hover:text-blue-600 transition";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl shadow-md z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Brand Logo */}
        <div
          className="text-[22px] font-bold text-blue-600 tracking-wide cursor-pointer hover:scale-[1.05] duration-300"
          onClick={() => navigate("/home")}
        >
          ✈ Flight<span className="text-slate-900">Booker</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <NavLink
            className={({ isActive }) =>
              `${navItem} ${isActive && "text-blue-600 after:w-full"}`
            }
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${navItem} ${isActive && "text-blue-600 after:w-full"}`
            }
            to="/search"
          >
            Search Flights
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${navItem} ${isActive && "text-blue-600 after:w-full"}`
            }
            to="/bookings"
          >
            Booking History
          </NavLink>
        </div>

        {/* Right Section — avatar + logout */}
        <div className="hidden md:flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
              onClick={() => setOpenUser(!openUser)}
              className="w-9 h-9 rounded-full border-2 border-blue-500 shadow-sm cursor-pointer 
                         object-cover bg-slate-200 hover:ring-2 hover:ring-blue-300 transition"
            />

            {/* Dropdown */}
            {openUser && (
              <div className="absolute right-0 mt-2 w-40 bg-white/90 backdrop-blur-md shadow-lg rounded-lg overflow-hidden border animate-fade">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                  onClick={() => {
                    navigate("/home");
                    setOpenUser(false);
                  }}
                >
                  Dashboard
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                  onClick={() => {
                    navigate("/bookings");
                    setOpenUser(false);
                  }}
                >
                  My Bookings
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setOpenMenu(true)}>
          <svg width="28" fill="#2563eb" viewBox="0 0 20 20">
            <path d="M3 6h14M3 12h14M3 18h14" />
          </svg>
        </button>
      </div>

      {/* =================== MOBILE OVERLAY + DRAWER =================== */}
      {openMenu && (
        <>
          {/* Dark overlay so pure white naa lage */}
          <div
            className="fixed inset-0 bg-black/30 z-[998]"
            onClick={() => setOpenMenu(false)}
          />

          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-[999] animate-slideLeft p-6 flex flex-col">
            {/* Close button */}
            <button className="mb-5 self-end" onClick={() => setOpenMenu(false)}>
              <svg width="26" fill="#ff4757" viewBox="0 0 20 20">
                <path d="M6 6l8 8M6 14L14 6" />
              </svg>
            </button>

            <div className="flex flex-col gap-4 text-[16px] font-medium">
              <NavLink
                to="/home"
                onClick={() => setOpenMenu(false)}
                className="hover:text-blue-600"
              >
                🏠 Home
              </NavLink>
              <NavLink
                to="/search"
                onClick={() => setOpenMenu(false)}
                className="hover:text-blue-600"
              >
                ✈ Search Flights
              </NavLink>
              <NavLink
                to="/bookings"
                onClick={() => setOpenMenu(false)}
                className="hover:text-blue-600"
              >
                📄 Booking History
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-red-600 mt-4 border border-red-500 rounded px-3 py-2 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}

      {/* 🔥 UNDERLINE ANIMATION FOR LINKS */}
      <style>{`
          nav a {
            position: relative;
          }
          nav a::after {
            content: "";
            position: absolute;
            bottom: -3px;
            left: 0;
            height: 2px;
            width: 0;
            background-color: #2563eb;
            transition: .3s;
          }
          nav a:hover::after, nav a.active::after { width: 100%; }

          @keyframes slideLeft {
            from {transform: translateX(100%);} 
            to {transform: translateX(0);}
          }
          .animate-slideLeft { animation: slideLeft .35s ease; }

          @keyframes fade {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade { animation: fade .25s ease; }
      `}</style>
    </nav>
  );
}
