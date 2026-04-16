import { useState } from 'react';
import useAuth from '../../auth/store';
import { Navigate, Outlet, useNavigate } from 'react-router';
import Sidebar from '../../components/Sidebar';
import { LogOut, Menu } from 'lucide-react';

function Userlayout() {
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (!checkLogin()) return <Navigate to={"/login"} />;

  return (
    <div className="h-full bg-background text-foreground flex overflow-hidden">

      {/* sidebar — shared across all pages */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 h-full">

        {/* topbar */}
        <header className="flex-shrink-0 h-14 border-b border-border flex items-center px-4 gap-4 bg-card sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-medium text-lg flex-1">MyApp</span>
          <img
            src={user?.image || "/logos.png"}
            className="w-8 h-8 rounded-full object-cover"
          />
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </header>

        {/* each page renders here */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Userlayout
