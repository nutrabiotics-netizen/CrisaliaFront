import AdministrativoLayout from '../../../components/layout/AdministrativoLayout';
import { 
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  BellIcon,
  MapPinIcon,
  ClipboardDocumentCheckIcon,
  PhoneIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const VisitaPaciente = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  // Datos de ejemplo
  const pacientes = [
    {
      id: '1',
      nombre: 'María González López',
      telefono: '+57 300 123 4567',
      horaCita: '08:00 AM',
      medico: 'Dr. Juan Pérez',
      box: 'Box 1',
      estado: 'confirmada',
      pago: 'pagado',
      progreso: {
        seleccionMedico: true,
        pagoConsulta: true,
        anamnesis: true,
        laboratorios: false,
        recomendaciones: false,
        asistencia: false
      },
      tipoAseguradora: 'Particular',
      requerimientosEspeciales: 'Ninguno',
      tiempoEspera: null,
      llegada: null
    },
    {
      id: '2',
      nombre: 'Carlos Rodríguez',
      telefono: '+57 300 987 6543',
      horaCita: '09:30 AM',
      medico: 'Dr. María González',
      box: 'Box 2',
      estado: 'confirmada',
      pago: 'pagado',
      progreso: {
        seleccionMedico: true,
        pagoConsulta: true,
        anamnesis: true,
        laboratorios: true,
        recomendaciones: true,
        asistencia: false
      },
      tipoAseguradora: 'Medicina Prepagada',
      requerimientosEspeciales: 'Requiere acompañante',
      tiempoEspera: 15,
      llegada: '09:15 AM'
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'en_consulta':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSemaforoColor = (tiempoEspera: number | null) => {
    if (tiempoEspera === null) return 'bg-gray-400';
    if (tiempoEspera <= 10) return 'bg-green-500';
    if (tiempoEspera <= 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Módulo de Ingreso y Gestión de Visita del Paciente
          </h1>
          <p className="text-gray-600 mb-6">
            Gestión eficiente de las citas confirmadas, agendadas y con pago efectuado
          </p>

          {/* Información General */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-gray-600">
              En este módulo, el personal administrativo podrá gestionar de manera eficiente las citas confirmadas, agendadas y con pago efectuado. La pantalla principal de Crisal-iA mostrará la lista de pacientes con su nombre, teléfono y la proximidad en los tiempos de consulta, junto con un sistema de semaforización en colores verde, amarillo y rojo para indicar la puntualidad del paciente.
            </p>
            <p className="text-gray-600 mt-2">
              Se presentará en la pantalla un cuadro de agendamiento de todos los pacientes con los respectivos consultorios y médicos asignados, la IA cruzará la información y en cada paciente mostrará un OK o si hay novedades en cualquiera de los aspectos que se requieren para llevar a cabo la consulta.
            </p>
          </div>

          {/* Vista de Pacientes del Día */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Pacientes del Día - {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Médico/Box</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semaforización</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pacientes.map((paciente) => (
                    <tr 
                      key={paciente.id}
                      className={selectedPatient === paciente.id ? 'bg-indigo-50' : ''}
                      onClick={() => setSelectedPatient(paciente.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{paciente.horaCita}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{paciente.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <PhoneIcon className="h-4 w-4 mr-1" />
                          {paciente.telefono}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{paciente.medico}</div>
                        <div className="text-xs text-gray-500">{paciente.box}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(paciente.estado)}`}>
                          {paciente.estado === 'confirmada' ? 'Confirmada' : paciente.estado}
                        </span>
                        {paciente.pago === 'pagado' && (
                          <span className="ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Pagado
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${getSemaforoColor(paciente.tiempoEspera)}`}></div>
                          {paciente.tiempoEspera !== null && (
                            <span className="ml-2 text-xs text-gray-500">{paciente.tiempoEspera} min</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPatient(paciente.id);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel de Detalles del Paciente */}
          {selectedPatient && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Información Principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Matriz de Estado del Paciente */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Matriz de Estado del Paciente
                  </h3>
                  {(() => {
                    const paciente = pacientes.find(p => p.id === selectedPatient);
                    if (!paciente) return null;
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Tipo de Aseguradora</p>
                          <p className="text-sm text-gray-900 mt-1">{paciente.tipoAseguradora}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Requerimientos Especiales</p>
                          <p className="text-sm text-gray-900 mt-1">{paciente.requerimientosEspeciales}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Médico Asignado</p>
                          <p className="text-sm text-gray-900 mt-1">{paciente.medico}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Box Asignado</p>
                          <p className="text-sm text-gray-900 mt-1">{paciente.box}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Progreso del Paciente */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                    Progreso del Paciente
                  </h3>
                  {(() => {
                    const paciente = pacientes.find(p => p.id === selectedPatient);
                    if (!paciente) return null;
                    const pasos = [
                      { key: 'seleccionMedico', label: 'Selección del médico', completado: paciente.progreso.seleccionMedico },
                      { key: 'pagoConsulta', label: 'Pago de la consulta', completado: paciente.progreso.pagoConsulta },
                      { key: 'anamnesis', label: 'Diligenciamiento de anamnesis virtual', completado: paciente.progreso.anamnesis },
                      { key: 'laboratorios', label: 'Entrega de resultados de laboratorios', completado: paciente.progreso.laboratorios },
                      { key: 'recomendaciones', label: 'Automatización de respuestas con recomendaciones', completado: paciente.progreso.recomendaciones },
                      { key: 'asistencia', label: 'Asistencia al punto de atención', completado: paciente.progreso.asistencia }
                    ];
                    return (
                      <div className="space-y-3">
                        {pasos.map((paso) => (
                          <div key={paso.key} className="flex items-center">
                            {paso.completado ? (
                              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3" />
                            ) : (
                              <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-3"></div>
                            )}
                            <span className={`text-sm ${paso.completado ? 'text-gray-900' : 'text-gray-500'}`}>
                              {paso.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Botón de Confirmación de Llegada */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <BellIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Confirmación de Llegada
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Permite al personal confirmar verbalmente la llegada del paciente, ofreciendo una bienvenida cálida y asegurando que todo esté en orden.
                  </p>
                  {(() => {
                    const paciente = pacientes.find(p => p.id === selectedPatient);
                    if (!paciente || paciente.progreso.asistencia) return null;
                    return (
                      <button className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        Confirmar Llegada del Paciente
                      </button>
                    );
                  })()}
                </div>
              </div>

              {/* Panel Lateral - Gestión de Demoras */}
              <div className="space-y-6">
                {/* Control de Tiempos */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Control de Tiempos
                  </h3>
                  {(() => {
                    const paciente = pacientes.find(p => p.id === selectedPatient);
                    if (!paciente) return null;
                    return (
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">Hora Programada</p>
                          <p className="text-sm font-medium text-gray-900">{paciente.horaCita}</p>
                        </div>
                        {paciente.llegada && (
                          <div>
                            <p className="text-xs text-gray-500">Hora de Llegada</p>
                            <p className="text-sm font-medium text-gray-900">{paciente.llegada}</p>
                          </div>
                        )}
                        {paciente.tiempoEspera !== null && (
                          <div>
                            <p className="text-xs text-gray-500">Tiempo de Espera</p>
                            <p className={`text-sm font-medium ${paciente.tiempoEspera > 20 ? 'text-red-600' : paciente.tiempoEspera > 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                              {paciente.tiempoEspera} minutos
                            </p>
                          </div>
                        )}
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Cronómetro de Consulta</p>
                          <div className="text-center p-3 bg-gray-50 rounded">
                            <p className="text-2xl font-bold text-indigo-600">00:25</p>
                            <p className="text-xs text-gray-500 mt-1">Duración estimada: 60 min</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Gestión de Demoras */}
                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-yellow-600" />
                    Gestión de Demoras
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Crisal-iA presentará en la pantalla administrativa un cronómetro de evolución de la consulta del paciente, ajustándose a los tiempos preconfigurados por el médico para cada interacción presencial.
                  </p>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
                      Notificar Demora al Paciente
                    </button>
                    <button className="w-full px-3 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                      Recalcular Agenda
                    </button>
                  </div>
                </div>

                {/* Gestión de Demoras en Llegada */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Gestión de Demoras en Llegada</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    En caso de demora en la llegada del paciente, Crisal-iA considerará un tiempo máximo de espera preconfigurado tanto a nivel administrativo como médico.
                  </p>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded">
                      <p className="text-xs font-medium text-gray-900">Alertas Anticipadas</p>
                      <p className="text-xs text-gray-600">Crisalida enviará alertas a los pacientes a través del chatbot, sugiriéndoles que lleguen con 15 o 20 minutos de antelación.</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <p className="text-xs font-medium text-gray-900">Gestión de Demoras</p>
                      <p className="text-xs text-gray-600">Si el paciente se retrasa, el sistema le ofrecerá opciones como apresurarse o reagendar la cita.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Información Adicional sobre Gestión de Demoras */}
          {!selectedPatient && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Control de Tiempos y Gestión de Demoras</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Crisal-iA presentará en la pantalla administrativa un cronómetro de evolución de la consulta del paciente, ajustándose a los tiempos preconfigurados por el médico para cada interacción presencial. De este modo, la inteligencia artificial podrá gestionar los tiempos y, en caso de que una consulta se retrase, recalcular y reprogramar las citas siguientes.
                </p>
                <p className="text-sm text-gray-600">
                  A medida que se acumulen demoras, el sistema se conectará con el chatbot de los pacientes para informarles en tiempo real sobre la prolongación de su espera, ofreciéndoles una comunicación amable y empática. Además, brindará opciones de entretenimiento como lecturas sobre medicina funcional o videos para distraer al paciente mientras espera.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Gestión de Demoras en Llegada</h3>
                <p className="text-sm text-gray-600 mb-3">
                  En caso de demora en la llegada del paciente, Crisal-iA considerará un tiempo máximo de espera preconfigurado tanto a nivel administrativo como médico. Se recomendará a los asistentes administrativos contar con una extensión de horario preventiva al final de la jornada, por ejemplo, un rango de 30 minutos a una hora, para reacomodar las citas demoradas.
                </p>
                <p className="text-sm text-gray-600">
                  Esto permitirá definir un límite claro de espera para los pacientes que lleguen tarde.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default VisitaPaciente;

