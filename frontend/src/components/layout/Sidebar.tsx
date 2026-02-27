import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const links = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/drivers", label: "Motoristas", icon: "🧑‍✈️" },
  { to: "/orders", label: "Ordens", icon: "📦" },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white flex items-center justify-between px-4 py-3">
        <span className="text-lg font-bold">🚛 TMS</span>
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl leading-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
        fixed md:static top-0 left-0 h-full z-40
        w-60 min-h-screen bg-gray-900 text-white flex flex-col
        transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div className="hidden md:flex px-6 py-5 border-b border-gray-700">
          <span className="text-xl font-bold">🚛 TMS</span>
        </div>
        <nav className="flex-1 px-3 py-4 mt-14 md:mt-0 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
                ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`
              }
            >
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 px-4 mb-2 truncate">
            {user?.name}
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 transition"
          >
            <span>🚪</span> Sair
          </button>
        </div>
      </aside>
    </>
  );
}
