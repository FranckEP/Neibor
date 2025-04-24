import { Link, useLocation } from 'react-router-dom';
import { Home, LogOut, User } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { label: 'Inicio', path: '/home', icon: <Home size={20} /> },
    { label: 'Perfil', path: '/perfil', icon: <User size={20} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-[#023047] text-white flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold p-6 border-b border-white/10">Neibor</div>
        <nav className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#219EBC] transition ${
                location.pathname === item.path ? 'bg-[#219EBC]' : ''
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={() => console.log('Cerrar sesión')}
        className="flex items-center gap-2 p-4 hover:bg-red-600 transition w-full text-left"
      >
        <LogOut size={20} />
        Cerrar sesión
      </button>
    </aside>
  );
}
