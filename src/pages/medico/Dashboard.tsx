import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MedicoLayout from '../../components/layout/MedicoLayout';
import { useAuth } from '../../context/AuthContext';
import simulationService from '../../services/simulationService';
import {
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  BellIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('30:00');
  const [patientId, setPatientId] = useState<number | null>(null);

  // Verificar si está en modo simulación
  useEffect(() => {
    const simulationMode = simulationService.isSimulationMode();
    const urlSimulation = searchParams.get('simulation') === 'true';
    const urlPatient = searchParams.get('patient');
    
    if (simulationMode || urlSimulation) {
      setIsSimulationMode(true);
      if (urlPatient) {
        setPatientId(parseInt(urlPatient));
      } else {
        const token = simulationService.getSimulationToken();
        if (token) {
          setPatientId(token.patientId);
        }
      }
      
      // Actualizar cronómetro cada segundo
      const interval = setInterval(() => {
        const remaining = simulationService.getTimeRemaining();
        setTimeRemaining(simulationService.formatTimeRemaining());
        
        if (remaining <= 0) {
          // Token expirado, redirigir a Welcome
          simulationService.clearSimulationToken();
          setIsSimulationMode(false);
          alert('La simulación ha expirado. Serás redirigido a la página de registro.');
          navigate('/medico/welcome');
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [searchParams, navigate]);

  const stats = [
    {
      name: 'Citas Hoy',
      value: '12',
      icon: CalendarIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    },
    {
      name: 'Pacientes Activos',
      value: '45',
      icon: UserGroupIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    },
    {
      name: 'Consultas Pendientes',
      value: '8',
      icon: DocumentTextIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    },
    {
      name: 'Ingresos del Mes',
      value: '$2.4M',
      icon: CurrencyDollarIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    },
    {
      name: 'Análisis IA',
      value: '24',
      icon: SparklesIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    },
    {
      name: 'Notificaciones',
      value: '5',
      icon: BellIcon,
      color: 'bg-gradient-to-br from-crisal-turquesa to-crisal-azul'
    }
  ];

  return (
    <MedicoLayout>
      <div className="space-y-6">
        {/* Banner de Modo Simulación */}
        {isSimulationMode && (
          <div className="bg-gradient-to-r from-crisal-turquesa to-crisal-azul rounded-xl shadow-lg p-3 sm:p-4 mb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                <div className="bg-white bg-opacity-20 rounded-full p-2 flex-shrink-0">
                  <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-ibrand font-bold text-white truncate">
                    Modo Simulación - Paciente {patientId}
                  </h3>
                  <p className="text-xs sm:text-sm font-poppins text-white opacity-90">
                    Tiempo restante: <span className="font-mono font-bold text-base sm:text-lg">{timeRemaining}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (confirm('¿Deseas salir del modo simulación?')) {
                    simulationService.clearSimulationToken();
                    setIsSimulationMode(false);
                    navigate('/medico/welcome?step=simulacion');
                  }
                }}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors flex-shrink-0 self-end sm:self-auto"
              >
                <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-white border-opacity-20">
              <p className="text-xs font-poppins text-white opacity-90">
                Estás explorando el panel del médico con datos simulados. Al finalizar el tiempo, serás redirigido automáticamente.
              </p>
            </div>
          </div>
        )}

        {/* Bienvenida */}
        <div className="card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-ibrand text-xl sm:text-2xl">Dr</span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-ibrand text-crisal-azul mb-2 break-words">
                {isSimulationMode ? 'Panel de Simulación' : `Bienvenido, Dr. ${user?.nombre} ${user?.apellido}`}
              </h1>
              <p className="text-sm sm:text-base font-poppins text-crisal-azul opacity-70 break-words">
                {isSimulationMode 
                  ? `Explorando funcionalidades con Paciente Simulado ${patientId}` 
                  : `${user?.especialidad} • Colegiatura: ${user?.numeroColegiatura}`
                }
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
              <div className="p-4 sm:p-5">
                <div className="flex items-center">
                  <div className={`${stat.color} p-2.5 sm:p-3 rounded-xl shadow-sm flex-shrink-0`}>
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-5 w-0 flex-1 min-w-0">
                    <dl>
                      <dt className="text-xs sm:text-sm font-poppins-medium text-crisal-azul opacity-70 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-base sm:text-lg font-ibrand text-crisal-azul truncate">
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
          <h2 className="text-lg sm:text-xl font-ibrand text-crisal-azul mb-3 sm:mb-4">
            Accesos Rápidos
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/medico/agendamiento"
              className="flex items-center p-3 sm:p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-crisal-turquesa mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-poppins-medium text-crisal-azul truncate">Agendamiento</span>
            </a>
            <a
              href="/medico/consulta"
              className="flex items-center p-3 sm:p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <DocumentTextIcon className="h-5 w-5 sm:h-6 sm:w-6 text-crisal-turquesa mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-poppins-medium text-crisal-azul truncate">Nueva Consulta</span>
            </a>
            <a
              href="/medico/anamnesis"
              className="flex items-center p-3 sm:p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <DocumentTextIcon className="h-5 w-5 sm:h-6 sm:w-6 text-crisal-turquesa mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-poppins font-medium text-crisal-azul truncate">Anamnesis</span>
            </a>
            <a
              href="/medico/seguimiento-ia"
              className="flex items-center p-3 sm:p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <BellIcon className="h-5 w-5 sm:h-6 sm:w-6 text-crisal-turquesa mr-2 sm:mr-3 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-poppins font-medium text-crisal-azul truncate">Seguimiento IA</span>
            </a>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Dashboard;

