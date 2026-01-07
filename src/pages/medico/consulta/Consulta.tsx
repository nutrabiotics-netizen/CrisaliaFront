import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DocumentTextIcon,
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import HistoriaClinicaCompleta from '../../../components/formulariosConsulta/historiaClinica/HistoriaClinicaCompleta';
import { useAlert } from '../../../context/AlertContext';
import { useAuth } from '../../../context/AuthContext';
import { agendamientoService } from '../../../services/agendamientoService';
import { Cita } from '../../../types';

type TabType = 
  | 'historia-clinica' 
  | 'formula-medica' 
  | 'incapacidad' 
  | 'interconsulta' 
  | 'examenes-laboratorio' 
  | 'apoyo-terapeutico' 
  | 'ayudas-diagnosticas';

const Consulta = () => {
  const { citaId } = useParams<{ citaId: string }>();
  const navigate = useNavigate();
  const { success, error } = useAlert();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<TabType>('historia-clinica');
  const [cita, setCita] = useState<Cita | null>(null);
  const [loading, setLoading] = useState(true);
  const [doctorData, setDoctorData] = useState<any>(null);

  useEffect(() => {
    cargarDatosCita();
  }, [citaId, user]);

  const cargarDatosCita = async () => {
    if (!citaId) {
      error('No se proporcionó un ID de cita');
      navigate('/medico/agendamiento');
      return;
    }

    try {
      setLoading(true);
      // Obtener la cita y datos del médico
      const citas = await agendamientoService.obtenerCitas();
      const citaEncontrada = citas.find(c => c._id === citaId);
      
      if (!citaEncontrada) {
        error('Cita no encontrada');
        navigate('/medico/agendamiento');
        return;
      }

      setCita(citaEncontrada);
      
      // Obtener datos del médico desde el contexto de autenticación
      if (user) {
        setDoctorData({
          _id: user._id,
          name: user.nombre || '',
          lastName: user.apellido || '',
          firstName: user.nombre || '',
          specialty: user.especialidad || '',
          especialidad: user.especialidad || ''
        });
      }
    } catch (err: any) {
      console.error('Error al cargar datos de la cita:', err);
      error('Error al cargar los datos de la consulta');
      navigate('/medico/agendamiento');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: 'historia-clinica' as TabType,
      label: 'Historia Clínica',
      icon: DocumentTextIcon,
      component: HistoriaClinicaCompleta
    },
    {
      id: 'formula-medica' as TabType,
      label: 'Fórmula Médica',
      icon: BeakerIcon,
      component: null // Se implementará después
    },
    {
      id: 'incapacidad' as TabType,
      label: 'Incapacidad',
      icon: ClipboardDocumentCheckIcon,
      component: null
    },
    {
      id: 'interconsulta' as TabType,
      label: 'Interconsulta',
      icon: UserGroupIcon,
      component: null
    },
    {
      id: 'examenes-laboratorio' as TabType,
      label: 'Exámenes de Laboratorio',
      icon: MagnifyingGlassIcon,
      component: null
    },
    {
      id: 'apoyo-terapeutico' as TabType,
      label: 'Apoyo Terapéutico',
      icon: HeartIcon,
      component: null
    },
    {
      id: 'ayudas-diagnosticas' as TabType,
      label: 'Ayudas Diagnósticas',
      icon: SparklesIcon,
      component: null
    }
  ];

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  const handleSave = (data: any) => {
    success('Datos guardados exitosamente');
    console.log('Datos guardados:', data);
  };

  const handleCancel = () => {
    navigate('/medico/agendamiento');
  };

  if (loading) {
    return (
      <MedicoLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </MedicoLayout>
    );
  }

  if (!cita) {
    return (
      <MedicoLayout>
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontró la cita</p>
        </div>
      </MedicoLayout>
    );
  }

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <MedicoLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Consulta Médica</h1>
              <p className="text-sm text-gray-600 mt-1">
                {cita.modalidad === 'presencial' ? 'Consulta Presencial' : 'Consulta Virtual'} - 
                {(() => {
                  let fechaObj: Date;
                  if (typeof cita.fecha === 'string') {
                    const fechaParte = cita.fecha.split('T')[0];
                    if (fechaParte.match(/^\d{4}-\d{2}-\d{2}$/)) {
                      const [year, month, day] = fechaParte.split('-').map(Number);
                      fechaObj = new Date(year, month - 1, day);
                    } else {
                      fechaObj = new Date(cita.fecha);
                    }
                  } else {
                    // Si es un objeto Date, crear uno nuevo con solo año, mes y día
                    fechaObj = new Date(cita.fecha.getFullYear(), cita.fecha.getMonth(), cita.fecha.getDate());
                  }
                  return fechaObj.toLocaleDateString('es-CO', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  });
                })()} - {cita.hora}
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Volver a Agenda
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      ${isActive
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg">
          {ActiveComponent ? (
            <ActiveComponent
              doctorData={doctorData}
              citaData={cita}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-600">
                El formulario de "{tabs.find(tab => tab.id === activeTab)?.label}" estará disponible próximamente.
              </p>
            </div>
          )}
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Consulta;
