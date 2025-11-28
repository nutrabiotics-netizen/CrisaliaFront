import PacienteLayout from '../../../components/layout/PacienteLayout';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  XMarkIcon, 
  CheckIcon, 
  SparklesIcon,
  LinkIcon,
  MapPinIcon,
  VideoCameraIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Agendamiento = () => {
  const [conexionSeleccionada, setConexionSeleccionada] = useState<'1' | '2' | '3' | null>(null);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState<string | null>(null);

  const medicos = [
    { id: '1', nombre: 'Dr. Juan Pérez', especialidad: 'Medicina Funcional', disponibilidad: 'Lun-Vie 8AM-6PM' },
    { id: '2', nombre: 'Dr. María González', especialidad: 'Medicina Funcional', disponibilidad: 'Mar-Jue 9AM-5PM' },
    { id: '3', nombre: 'Dr. Carlos Rodríguez', especialidad: 'Medicina Funcional', disponibilidad: 'Mié-Vie 10AM-4PM' }
  ];

  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Suite de Agendamiento
          </h1>
          <p className="text-gray-600 mb-6">
            Gestiona tus citas médicas de forma inteligente con asistencia de IA
          </p>

          {/* Información sobre Conexiones */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Acceso del Paciente
            </h2>
            <p className="text-sm text-gray-700">
              El paciente accede a la plataforma por una de las tres conexiones predefinidas. Cada conexión ofrece diferentes formas de encontrar y conectarse con tu médico ideal.
            </p>
          </div>

          {/* Selección de Conexión */}
          {!conexionSeleccionada && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Selecciona tu Forma de Conexión
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div 
                  className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-indigo-300 transition-all"
                  onClick={() => setConexionSeleccionada('1')}
                >
                  <LinkIcon className="h-12 w-12 text-indigo-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Conexión 1
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Paciente contacta a MD y recibe link de Crisal-IA
                  </p>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Seleccionar
                  </button>
                </div>

                <div 
                  className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-indigo-300 transition-all"
                  onClick={() => setConexionSeleccionada('2')}
                >
                  <SparklesIcon className="h-12 w-12 text-indigo-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Conexión 2
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    En Crisal-IA paciente selecciona MD entre opciones sugeridas por IA
                  </p>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Seleccionar
                  </button>
                </div>

                <div 
                  className="border-2 border-indigo-300 rounded-lg p-6 bg-indigo-50 cursor-pointer hover:border-indigo-400 transition-all"
                  onClick={() => setConexionSeleccionada('3')}
                >
                  <UserIcon className="h-12 w-12 text-indigo-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Conexión 3
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    En Crisal-IA paciente pide agendamiento con MD específico
                  </p>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Seleccionar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Selección de Médico */}
          {conexionSeleccionada && !medicoSeleccionado && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {conexionSeleccionada === '1' && 'Médico que te compartió el link'}
                  {conexionSeleccionada === '2' && 'Médicos Sugeridos por IA'}
                  {conexionSeleccionada === '3' && 'Buscar Médico Específico'}
                </h2>
                <button 
                  onClick={() => setConexionSeleccionada(null)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Cambiar Conexión
                </button>
              </div>

              {conexionSeleccionada === '2' && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                  <SparklesIcon className="h-6 w-6 text-purple-600 mb-2" />
                  <p className="text-sm text-gray-700">
                    La IA analiza tu perfil y necesidades de salud para sugerirte los médicos más adecuados para tu caso.
                  </p>
                </div>
              )}

              {conexionSeleccionada === '3' && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Buscar médico por nombre o especialidad..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {medicos.map((medico) => (
                  <div
                    key={medico.id}
                    className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-indigo-300 transition-all"
                    onClick={() => setMedicoSeleccionado(medico.id)}
                  >
                    <div className="flex items-center mb-3">
                      <UserIcon className="h-10 w-10 text-indigo-600 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{medico.nombre}</h3>
                        <p className="text-xs text-gray-500">{medico.especialidad}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{medico.disponibilidad}</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                      Seleccionar Médico
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendario y Selección de Fecha */}
          {medicoSeleccionado && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Selecciona Fecha y Hora
                </h2>
                <button 
                  onClick={() => setMedicoSeleccionado(null)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Cambiar Médico
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Calendario</h3>
                  <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                    <CalendarIcon className="h-12 w-12 text-gray-400" />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Horarios Disponibles</h3>
                  <div className="space-y-2">
                    {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'].map((hora) => (
                      <button
                        key={hora}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-indigo-50 hover:border-indigo-300 text-sm"
                      >
                        {hora}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tipo de Consulta */}
              <div className="mt-6 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Tipo de Consulta</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-indigo-300">
                    <BuildingOfficeIcon className="h-8 w-8 text-indigo-600 mb-2" />
                    <h4 className="font-medium text-gray-900">Presencial</h4>
                    <p className="text-xs text-gray-500">En nuestras instalaciones</p>
                  </div>
                  <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-indigo-300">
                    <VideoCameraIcon className="h-8 w-8 text-indigo-600 mb-2" />
                    <h4 className="font-medium text-gray-900">Virtual</h4>
                    <p className="text-xs text-gray-500">Videollamada desde tu hogar</p>
                  </div>
                </div>
              </div>

              {/* Botón de Confirmación */}
              <div className="mt-6">
                <button className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-lg">
                  Confirmar Agendamiento
                </button>
              </div>
            </div>
          )}

          {/* Integración con Calendarios Externos */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Integración con Calendarios Externos
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <CalendarIcon className="h-8 w-8 text-indigo-600 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Nota:</strong> Se hará integración con calendarios externos (Google Calendar, Outlook) para facilitar la sincronización de tus citas.
                  </p>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm flex items-center justify-center">
                      <span className="mr-2">📅</span>
                      Conectar Google Calendar
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm flex items-center justify-center">
                      <span className="mr-2">📅</span>
                      Conectar Outlook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Próximas Citas */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Mis Citas
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Dr. Juan Pérez</p>
                    <p className="text-sm text-gray-500">Preconsulta</p>
                    <p className="text-sm text-gray-500 mt-1">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      26 de Noviembre, 2025 - 10:00 AM
                    </p>
                    <p className="text-xs text-blue-700 mt-2">
                      <MapPinIcon className="h-4 w-4 inline mr-1" />
                      Presencial - Box 1
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Dr. María González</p>
                    <p className="text-sm text-gray-500">Consulta de Control</p>
                    <p className="text-sm text-gray-500 mt-1">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      10 de Diciembre, 2025 - 02:00 PM
                    </p>
                    <p className="text-xs text-green-700 mt-2">
                      <VideoCameraIcon className="h-4 w-4 inline mr-1" />
                      Virtual - Google Meet
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded">
                      <LinkIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                Agendar Primera Consulta
              </button>
              <button className="px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium">
                Agendar Consulta de Control
              </button>
              <button className="px-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium">
                Cancelar Consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Agendamiento;
