import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/drivers', label: 'Motoristas', icon: '🧑‍✈️' },
  { to: '/orders', label: 'Ordens', icon: '📦' },
];

export function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-gray-700">
        <span className="text-xl font-bold">🚛 TMS</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
              ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}