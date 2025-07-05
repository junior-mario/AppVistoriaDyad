import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, ListChecks, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <aside className="hidden w-64 flex-shrink-0 border-r bg-white dark:bg-gray-800 md:flex md:flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">VistoriaPro</h2>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700",
                isActive && "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              )
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/todas-vistorias"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700",
                isActive && "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              )
            }
          >
            <ListChecks className="h-4 w-4" />
            Todas as Vistorias
          </NavLink>
          <NavLink
            to="/nova-vistoria"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700",
                isActive && "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
              )
            }
          >
            <PlusSquare className="h-4 w-4" />
            Nova Vistoria
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;