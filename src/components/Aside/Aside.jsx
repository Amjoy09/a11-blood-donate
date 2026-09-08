import {
  Users,
  LogOut,
  Menu,
  X,
  UserPen,
  LayoutDashboard,
  Hand,
  CopyPlus,
  House,
  ScrollText,
} from "lucide-react";

import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { signOut } from "firebase/auth";

import auth from "../../firebase/firebase.config";
import { AuthContext } from "../../provider/AuthContext";

import logoImg from "../../assets/bloodlogo.webp";

export default function Aside() {
  const [open, setOpen] = useState(false);

  const { role, user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* MOBILE TOPBAR */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-[60] bg-gray-950 border-b border-gray-800 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="BloodBond Logo"
            className="w-9 h-9 rounded-full border border-red-500"
          />

          <h1 className="text-xl font-black text-white">
            Blood<span className="text-red-500">Bond</span>
          </h1>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white cursor-pointer"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* OVERLAY */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-80
        bg-gradient-to-b from-gray-950 via-gray-900 to-red-950
        border-r border-gray-800 text-white shadow-2xl
        flex flex-col
        transform transition-transform duration-300

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0`}
      >
        {/* LOGO */}

        <div className="h-20 border-b border-gray-800 flex items-center px-6 mt-16 lg:mt-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-md">
              <img
                src={logoImg}
                alt="BloodBond Logo"
                className="w-10 h-10 rounded-full"
              />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Blood<span className="text-red-500">Bond</span>
              </h1>

              <p className="text-xs text-gray-400">Donor Dashboard</p>
            </div>
          </div>
        </div>

        {/* USER INFO */}

        <div className="px-4 py-5 border-b border-gray-800">
          <div className="flex items-center gap-4 rounded-2xl p-4 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 shadow-lg">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="User"
              className="w-16 h-16 rounded-full border-2 border-red-500 object-cover"
            />

            <div className="overflow-hidden">
              <h3 className="font-semibold text-white truncate">
                {user?.displayName || "Unknown User"}
              </h3>

              <p className="text-xs text-gray-400 truncate">{user?.email}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-[11px] font-semibold ${
                  role === "admin"
                    ? "bg-red-600 text-white"
                    : role === "volunteer"
                      ? "bg-yellow-400 text-black"
                      : "bg-green-600 text-white"
                }`}
              >
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}

        <div className="px-4 pt-4">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            Navigation
          </p>
        </div>

        <div className="flex-1 overflow-hidden">
          <nav className="h-full overflow-y-auto px-4 py-4 space-y-2">
            <SidebarLink
              to="/"
              icon={<House size={19} />}
              label="Homepage"
              setOpen={setOpen}
            />

            <SidebarLink
              to="/dashboard"
              icon={<LayoutDashboard size={19} />}
              label="Dashboard"
              setOpen={setOpen}
            />

            {role === "admin" && (
              <SidebarLink
                to="/dashboard/all-users"
                icon={<Users size={19} />}
                label="All Users"
                setOpen={setOpen}
              />
            )}

            {role === "volunteer" && (
              <SidebarLink
                to="/dashboard/add-request"
                icon={<CopyPlus size={19} />}
                label="Add Request"
                setOpen={setOpen}
              />
            )}

            {role === "volunteer" && (
              <SidebarLink
                to="/dashboard/my-request"
                icon={<Hand size={19} />}
                label="My Requests"
                setOpen={setOpen}
              />
            )}
            <SidebarLink
              to="/dashboard/all-requests"
              icon={<ScrollText size={19} />}
              label="All Requests"
              setOpen={setOpen}
            />

            <SidebarLink
              to="/dashboard/user-profile"
              icon={<UserPen size={19} />}
              label="Profile"
              setOpen={setOpen}
            />
          </nav>
        </div>

        {/* FOOTER */}

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="
            group
            flex items-center gap-3
            w-full
            px-4 py-3
            rounded-2xl
            bg-red-500/10
            border border-red-500/20
            hover:bg-red-600
            text-red-400
            hover:text-white
            transition-all duration-300
            cursor-pointer
            "
          >
            <div className="group-hover:rotate-12 transition duration-300">
              <LogOut size={19} />
            </div>

            <span className="font-semibold">Logout</span>
          </button>

          <p className="text-center text-[11px] text-gray-500 mt-4">
            Saving lives through voluntary blood donation ❤️
          </p>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({ to, icon, label, setOpen }) {
  return (
    <NavLink
      to={to}
      end
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/40"
            : "text-gray-300 hover:bg-gray-800 hover:text-red-400"
        }`
      }
    >
      <span className="group-hover:scale-110 transition duration-300">
        {icon}
      </span>

      <span className="font-medium tracking-wide">{label}</span>
    </NavLink>
  );
}
