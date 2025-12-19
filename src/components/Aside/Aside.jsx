import {
  Home,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  MonitorCog,
  MapPinPlus,
} from "lucide-react";
import { NavLink } from "react-router";

export default function Aside() {
  return (
    <aside className="h-screen w-64 sticky top-0 text-white flex flex-col bg-linear-to-b from-cyan-900 to-red-900">
      {/* Logo / Header */}
      <div className="h-16 flex items-center px-6">
        <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <SidebarLink
          to="/dashboard"
          icon={<Home size={18} />}
          label="Dashboard"
        />
        <SidebarLink
          to="/dashboard/users"
          icon={<Users size={18} />}
          label="Users"
        />
        <SidebarLink
          to="/dashboard/add-request"
          icon={<MapPinPlus size={18} />}
          label="Add Request"
        />
        <SidebarLink
          to="/dashboard/manage-product"
          icon={<MonitorCog size={18} />}
          label="Manage Products"
        />
        <SidebarLink
          to="/dashboard/orders"
          icon={<ShoppingCart size={18} />}
          label="Orders"
        />
        <SidebarLink
          to="/dashboard/reports"
          icon={<BarChart3 size={18} />}
          label="Reports"
        />
        <SidebarLink
          to="/dashboard/settings"
          icon={<Settings size={18} />}
          label="Settings"
        />
      </nav>

      {/* Footer */}
      <div className="p-4">
        <button className="flex items-center gap-3 text-sm text-yellow-300 hover:text-red-400 w-full px-3 py-2 rounded-xl hover:bg-cyan-700 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200 \
        ${
          isActive
            ? "bg-white text-cyan-900 font-semibold shadow"
            : "text-cyan-100 hover:bg-cyan-700 hover:text-white"
        }`
      }
    >
      <span className="group-hover:scale-110 transition">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
