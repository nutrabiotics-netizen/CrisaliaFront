import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  ShieldExclamationIcon,
  UserCircleIcon,
  ShoppingBagIcon,
  LinkIcon,
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import logoHorizontal from '../../assets/images/LogoHorizontal.png';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/administrativo/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Módulo de Ingreso',
    path: '/administrativo/ingreso',
    icon: UserGroupIcon
  },
  {
    name: 'Terceros Aliados',
    path: '/administrativo/terceros',
    icon: UserGroupIcon
  },
  {
    name: 'Gestión de Agenda',
    path: '/administrativo/gestion-agenda',
    icon: CalendarIcon
  },
  {
    name: 'Visita del Paciente',
    path: '/administrativo/visita-paciente',
    icon: ClipboardDocumentCheckIcon
  },
  {
    name: 'Visión y Estadísticas',
    path: '/administrativo/vision-estadisticas',
    icon: ChartBarIcon
  },
  {
    name: 'Contingencia',
    path: '/administrativo/contingencia',
    icon: ShieldExclamationIcon
  },
  {
    name: 'Experiencia de Usuarios',
    path: '/administrativo/experiencia-usuarios',
    icon: UserCircleIcon
  },
  {
    name: 'Conexión ALIVIA',
    path: '/administrativo/conexion-alivia',
    icon: LinkIcon
  },
  {
    name: 'RIPS y Facturación',
    path: '/administrativo/rips-facturacion',
    icon: DocumentTextIcon
  }
];

interface AdministrativoLayoutProps {
  children: ReactNode;
}

const AdministrativoLayout = ({ children }: AdministrativoLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-crisal-gris">
      {/* Sidebar móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-crisal-azul bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-4 border-b border-crisal-gris bg-gradient-to-r from-crisal-turquesa to-white">
              <img 
                src={logoHorizontal} 
                alt="Crisal IA" 
                className="h-16 w-auto"
              />
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-crisal-azul hover:text-crisal-turquesa transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 bg-white">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-poppins font-medium rounded-lg mb-1 transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-crisal-turquesa bg-opacity-20 text-crisal-azul border-l-4 border-crisal-turquesa'
                      : 'text-crisal-azul hover:bg-crisal-gris'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive(item.path) ? 'text-crisal-turquesa' : 'text-crisal-azul'}`} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-crisal-gris pt-5 pb-4 overflow-y-auto shadow-sm">
          <div className="flex items-center flex-shrink-0 px-4 mb-8 bg-gradient-to-r from-crisal-turquesa to-white py-4 rounded-br-xl">
            <img 
              src={logoHorizontal} 
              alt="Crisal IA" 
              className="h-20 w-auto"
            />
          </div>
          <nav className="flex-1 px-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 text-sm font-poppins font-medium rounded-lg mb-1 transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-crisal-turquesa bg-opacity-20 text-crisal-azul border-l-4 border-crisal-turquesa'
                    : 'text-crisal-azul hover:bg-crisal-gris'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive(item.path) ? 'text-crisal-turquesa' : 'text-crisal-azul'}`} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow-sm border-b border-crisal-gris">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-crisal-azul hover:bg-crisal-gris transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-poppins font-semibold text-crisal-azul">
                  {user?.nombre} {user?.apellido}
                </p>
                <p className="text-xs font-poppins text-crisal-azul opacity-70">Administrativo</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-crisal-turquesa text-sm leading-4 font-poppins font-medium rounded-lg text-crisal-azul bg-white hover:bg-crisal-turquesa hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crisal-turquesa transition-all duration-200"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Salir
              </button>
            </div>
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 bg-crisal-gris">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdministrativoLayout;

