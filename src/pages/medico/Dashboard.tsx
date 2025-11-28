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
          <div className="bg-gradient-to-r from-crisal-turquesa to-crisal-azul rounded-xl shadow-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <ClockIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-ibrand font-bold text-white">
                    Modo Simulación - Paciente {patientId}
                  </h3>
                  <p className="text-sm font-poppins text-white opacity-90">
                    Tiempo restante: <span className="font-mono font-bold text-lg">{timeRemaining}</span>
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
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-white" />
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
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-ibrand text-2xl">Dr</span>
            </div>
            <div>
              <h1 className="text-3xl font-ibrand text-crisal-azul mb-2">
                {isSimulationMode ? 'Panel de Simulación' : `Bienvenido, Dr. ${user?.nombre} ${user?.apellido}`}
              </h1>
              <p className="font-poppins text-crisal-azul opacity-70">
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
              href="/medico/agendamiento"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <CalendarIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Agendamiento</span>
            </a>
            <a
              href="/medico/consulta"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <DocumentTextIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins-medium text-crisal-azul">Nueva Consulta</span>
            </a>
            <a
              href="/medico/anamnesis"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <DocumentTextIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins font-medium text-crisal-azul">Anamnesis</span>
            </a>
            <a
              href="/medico/seguimiento-ia"
              className="flex items-center p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200"
            >
              <BellIcon className="h-6 w-6 text-crisal-turquesa mr-3" />
              <span className="text-sm font-poppins font-medium text-crisal-azul">Seguimiento IA</span>
            </a>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Dashboard;

