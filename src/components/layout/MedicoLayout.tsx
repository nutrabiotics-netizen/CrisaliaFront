import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentTextIcon,
  CreditCardIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import logoHorizontal from '../../assets/images/LogoHorizontal.png';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/medico/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Perfil Médico',
    path: '/medico/perfil',
    icon: UserCircleIcon,
    children: [
      { name: 'Inscripción y Datos', path: '/medico/perfil/inscripcion', icon: DocumentTextIcon },
      { name: 'Recopilación de Información', path: '/medico/perfil/recopilacion', icon: DocumentTextIcon },
      { name: 'Personalización', path: '/medico/perfil/personalizacion', icon: Cog6ToothIcon },
      { name: 'Perfil General', path: '/medico/perfil/general', icon: UserCircleIcon },
      { name: 'Registro y Seguimiento', path: '/medico/perfil/seguimiento', icon: DocumentTextIcon }
    ]
  },
  {
    name: 'Agendamiento',
    path: '/medico/agendamiento',
    icon: CalendarIcon
  },
  {
    name: 'Anamnesis y Formulario',
    path: '/medico/anamnesis',
    icon: DocumentTextIcon
  },
  {
    name: 'Pago',
    path: '/medico/pago',
    icon: CreditCardIcon
  },
  // Consulta se accede desde Agendamiento, no necesita estar en el sidebar
  {
    name: 'IA Entrenada',
    path: '/medico/ia-entrenada',
    icon: SparklesIcon
  },
  {
    name: 'Seguimiento IA',
    path: '/medico/seguimiento-ia',
    icon: BellIcon
  },
  {
    name: 'Administrativo IA',
    path: '/medico/administrativo',
    icon: Cog6ToothIcon
  }
];

interface MedicoLayoutProps {
  children: ReactNode;
}

const MedicoLayout = ({ children }: MedicoLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleExpanded = (path: string) => {
    setExpandedItems(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

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
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-gray-50 shadow-xl">
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-[#443c92] to-[#5a4fa0]">
              <img 
                src={logoHorizontal} 
                alt="Crisal IA" 
                className="h-12 w-auto"
              />
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:text-white/80 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {navigation.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => !item.children && setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-poppins font-medium rounded-lg mb-1 transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-[#443c92]/20 text-[#443c92] border-l-4 border-[#443c92]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive(item.path) ? 'text-[#443c92]' : 'text-gray-600'}`} />
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar desktop */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}>
        <div className={`flex flex-col flex-grow bg-gray-50 border-r border-gray-200 pb-4 overflow-y-auto shadow-sm ${sidebarCollapsed ? 'pt-5' : 'pt-5'}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center flex-shrink-0 px-4 mb-8 bg-gradient-to-r from-[#443c92] to-[#5a4fa0] py-4 rounded-br-xl">
              <img 
                src={logoHorizontal} 
                alt="Crisal IA" 
                className="h-12 w-auto transition-opacity duration-300"
              />
            </div>
          )}
          <nav className="flex-1 px-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-poppins font-medium rounded-lg mb-1 transition-all duration-200 group ${
                    isActive(item.path)
                      ? 'bg-[#443c92]/20 text-[#443c92] border-l-4 border-[#443c92]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className={`${sidebarCollapsed ? 'h-6 w-6' : 'mr-3 h-5 w-5'} ${isActive(item.path) ? 'text-[#443c92]' : 'text-gray-600 group-hover:text-[#443c92]'}`} />
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-50 shadow-sm border-b border-gray-200">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="hidden lg:inline-flex -ml-0.5 -mt-0.5 h-12 w-12 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label={sidebarCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-poppins font-semibold text-gray-900">
                  Dr. {user?.nombre} {user?.apellido}
                </p>
                <p className="text-xs font-poppins text-gray-600">{user?.especialidad}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-[#443c92] text-sm leading-4 font-poppins font-medium rounded-lg text-[#443c92] bg-white hover:bg-[#443c92] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#443c92] transition-all duration-200"
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

export default MedicoLayout;

