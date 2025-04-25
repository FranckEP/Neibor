import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LogOut, User} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// Define the props interface
interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Inicio", path: "/home", icon: Home },
    { label: "Perfil", path: "/perfil", icon: User },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-16"
      } h-screen bg-[#023047] text-white flex flex-col justify-between fixed transition-all duration-400 z-50`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 p-4 border-b border-white/10">
        <img
          src="public\assets\logo2.svg"
          alt="Logo Empresa"
          className="h-10 object-contain"
        />
        {isExpanded && <span className="text-2xl font-bold">Neibor</span>}
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col p-2 gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-[#219EBC] transition ${
                location.pathname === item.path ? "bg-[#219EBC]" : ""
              }`}
            >
              <Icon size={20} />
              {isExpanded && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 px-4 py-3 hover:bg-red-600 transition w-full text-left"
      >
        <LogOut size={20} />
        {isExpanded && <span>Cerrar sesión</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
