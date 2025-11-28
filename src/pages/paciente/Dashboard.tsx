import PacienteLayout from '../../components/layout/PacienteLayout';
import { useAuth } from '../../context/AuthContext';
import {
  CalendarIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BellIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Próxima Cita',
      value: '26 Nov',
      icon: CalendarIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    },
    {
      name: 'Consultas Realizadas',
      value: '5',
      icon: DocumentTextIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    },
    {
      name: 'Pagos Pendientes',
      value: '1',
      icon: CreditCardIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    },
    {
      name: 'Notificaciones',
      value: '3',
      icon: BellIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    }
  ];

  return (
    <PacienteLayout>
      <div className="space-y-6">
        {/* Bienvenida */}
        <div className="card">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-ibrand text-2xl">{user?.nombre?.charAt(0)}{user?.apellido?.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-ibrand text-crisal-azul mb-2">
                Bienvenido, {user?.nombre} {user?.apellido}
              </h1>
              <p className="font-poppins text-crisal-azul opacity-70">
                Portal Personal de Gestión Clínica y Seguimiento Funcional
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
              href="/paciente/agendamiento"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <CalendarIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Agendar Cita</span>
            </a>
            <a
              href="/paciente/anamnesis"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <DocumentTextIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Completar Anamnesis</span>
            </a>
            <a
              href="/paciente/consulta"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <DocumentTextIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Mis Consultas</span>
            </a>
            <a
              href="/paciente/seguimiento-ia"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <BellIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Seguimiento IA</span>
            </a>
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Dashboard;

