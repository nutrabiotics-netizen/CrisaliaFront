import AdministrativoLayout from '../../components/layout/AdministrativoLayout';
import { useAuth } from '../../context/AuthContext';
import {
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  BellIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Usuarios Activos',
      value: '1,234',
      icon: UserGroupIcon,
      color: 'bg-gradient-to-br from-crisal-primary to-crisal-primary-dark'
    },
    {
      name: 'Citas del Mes',
      value: '456',
      icon: CalendarIcon,
      color: 'bg-gradient-to-br from-crisal-primary to-crisal-primary-dark'
    },
    {
      name: 'Ingresos del Mes',
      value: '$12.5M',
      icon: CurrencyDollarIcon,
      color: 'bg-gradient-to-br from-crisal-primary to-crisal-primary-dark'
    },
    {
      name: 'Terceros Aliados',
      value: '23',
      icon: UserGroupIcon,
      color: 'bg-gradient-to-br from-crisal-primary to-crisal-primary-dark'
    },
    {
      name: 'Alertas',
      value: '8',
      icon: BellIcon,
      color: 'bg-gradient-to-br from-crisal-primary to-crisal-primary-dark'
    },
    {
      name: 'Contingencias',
      value: '2',
      icon: ShieldExclamationIcon,
      color: 'bg-gradient-to-br from-crisal-primary to-crisal-primary-dark'
    }
  ];

  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        {/* Bienvenida */}
        <div className="card">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-ibrand text-2xl">{user?.nombre?.charAt(0)}{user?.apellido?.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-ibrand text-crisal-azul mb-2">
                Bienvenido, {user?.nombre} {user?.apellido}
              </h1>
              <p className="font-poppins text-crisal-azul opacity-70">
                Panel de Control Administrativo - Crisal•IA
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-xl shadow-sm`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-poppins-medium text-crisal-azul opacity-70 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-ibrand text-crisal-azul">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accesos Rápidos */}
        <div className="card">
          <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
            Accesos Rápidos
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/administrativo/ingreso"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <UserGroupIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Módulo de Ingreso</span>
            </a>
            <a
              href="/administrativo/terceros"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <UserGroupIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Terceros Aliados</span>
            </a>
            <a
              href="/administrativo/vision-estadisticas"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <ChartBarIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Estadísticas</span>
            </a>
            <a
              href="/administrativo/contingencia"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <ShieldExclamationIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Contingencia</span>
            </a>
          </div>
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default Dashboard;

