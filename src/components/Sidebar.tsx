import { useState, useEffect } from 'react'
import type MenuInfo from '../models/MenuInfo';
import { Link, useLocation, useNavigate } from 'react-router';
import * as Icons from 'lucide-react'
import { ChevronRight, X } from 'lucide-react'
import useAuth from '../auth/store';
import { getMenus } from '../api/services/AuthService';

function MenuItem({ menu, openId, setOpenId }: {
  menu: MenuInfo;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  const location = useLocation();
  const Icon = Icons[menu.icon as keyof typeof Icons] as any;
  const hasChildren = menu.children && menu.children.length > 0;
  const isActive = menu.path === location.pathname;
  const open = openId === menu.menuId;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpenId(open ? null : menu.menuId)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            <span className="text-sm">{menu.title}</span>
          </div>
          <ChevronRight
            className={`w-3 h-3 text-muted-foreground transition-transform duration-800
            ${open ? "rotate-90" : "rotate-0"}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out
    ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="ml-4 border-l border-border pl-3 mt-1 space-y-1">
              {menu.children.map((child) => (
                <MenuItem key={child.menuId} menu={child} openId={null} setOpenId={() => { }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={menu.path!}
      onClick={() => setOpenId(null)}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
        ${isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted text-foreground"}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{menu.title}</span>
    </Link>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const user = useAuth((state) => state.user);
  const [menus, setMenus] = useState<MenuInfo[]>([]);
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menuInfos = await getMenus();
        console.log(menuInfos);
        setMenus(menuInfos);
      } catch (error) {
        console.error("Failed to load menus", error)
      }
    };

    fetchMenus();
  }, []);

  return (
    <>
      {/* overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 z-30 bg-card border-r border-border
        flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:z-auto
      `}>
        {/* logo */}
        <div className="flex items-center justify-between p-4 h-14 border-b border-border">
          <span className="font-semibold text-lg">MyApp</span>
          <button onClick={onClose} className="md:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* user info */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <img
            src={user?.image || "/logos.png"}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">{user?.userName}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* menus */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 no-scrollbar">
          {menus.map((menu) => (
            <MenuItem key={menu.menuId} menu={menu} openId={openId} setOpenId={setOpenId} />
          ))}
        </nav>

        {/* logout */}
        <div className="p-3 border-t border-border">
          <button onClick={() => {
            logout();
            navigate("/");
          }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-muted text-muted-foreground transition-colors cursor-pointer">
            <Icons.LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar
