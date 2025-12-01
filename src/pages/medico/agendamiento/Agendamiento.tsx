import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  LinkIcon,
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  MapPinIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Agendamiento = () => {
  const [activeView, setActiveView] = useState<'calendario' | 'conexiones' | 'configuracion'>('calendario');

  return (
    <MedicoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Gestión de Agenda con CRISAL-IA
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Gestión inteligente y automatizada de tu agenda médica
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:space-x-2">
              <button
                onClick={() => setActiveView('calendario')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeView === 'calendario'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Calendario
              </button>
              <button
                onClick={() => setActiveView('conexiones')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeView === 'conexiones'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Conexiones
              </button>
              <button
                onClick={() => setActiveView('configuracion')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeView === 'configuracion'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Configuración
              </button>
            </div>
          </div>

          {/* Vista de Calendario */}
          {activeView === 'calendario' && (
            <div className="space-y-6">
              {/* Estadísticas Rápidas */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-gray-600">Citas Hoy</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-sm text-gray-600">Confirmadas</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                  <p className="text-sm text-gray-600">Pendientes</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-600">89%</p>
                  <p className="text-sm text-gray-600">Ocupación</p>
                </div>
              </div>

              {/* Calendario */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Calendario Semanal</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      ← Anterior
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      Siguiente →
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia) => (
                    <div key={dia} className="text-center font-medium text-gray-700 py-2">
                      {dia}
                    </div>
                  ))}
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div
                      key={i}
                      className="min-h-24 border border-gray-200 rounded p-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="text-sm font-medium text-gray-900">{i + 1}</div>
                      {i === 5 && (
                        <div className="mt-1 text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5">
                          10:00 AM
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Próximas Citas */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Próximas Citas
                </h2>
                <div className="space-y-3">
                  {[
                    { nombre: 'María González', tipo: 'Preconsulta', hora: '10:00 AM', estado: 'confirmada' },
                    { nombre: 'Juan Pérez', tipo: 'Consulta', hora: '11:30 AM', estado: 'pendiente' },
                    { nombre: 'Ana López', tipo: 'Control', hora: '2:00 PM', estado: 'confirmada' }
                  ].map((cita, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <p className="font-medium text-gray-900">{cita.nombre}</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{cita.tipo}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {cita.hora}
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                              cita.estado === 'confirmada'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {cita.estado === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                          </span>
                          <div className="mt-2 flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-700 text-sm">Ver</button>
                            <button className="text-gray-600 hover:text-gray-700 text-sm">Editar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Vista de Conexiones */}
          {activeView === 'conexiones' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Modelos de Conexión Médico-Paciente
                </h2>
                <p className="text-gray-700 mb-6">
                  CRISALIA ofrece tres formas de conexión entre médico y paciente para facilitar el agendamiento y la atención
                </p>
              </div>

              {/* Conexión 1 */}
              <div className="border-l-4 border-orange-500 rounded-lg bg-white shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Conexión 1</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Activa
                  </span>
                </div>
                <div className="ml-13 space-y-3">
                  <p className="text-gray-700">
                    <strong>Paciente contacta a Md y recibe link de Crisal-IA</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    A través de su enlace, el médico se asegura de que el paciente acceda directamente a las funciones de recopilación de información de anamnesis con el médico ya seleccionado.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Secuencia informada al paciente:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      <li>Pago de la preconsulta</li>
                      <li>Anamnesis automatizada</li>
                      <li>Primer análisis del médico</li>
                      <li>Prescripción de paraclínicos</li>
                      <li>Obtención y carga de resultados</li>
                      <li>Propuesta de consulta</li>
                    </ol>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <LinkIcon className="h-5 w-5 text-indigo-600" />
                    <input
                      type="text"
                      readOnly
                      value="https://crisalia.com/md/juan-perez"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm">
                      Copiar Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Conexión 2 */}
              <div className="border-l-4 border-orange-500 rounded-lg bg-white shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Conexión 2</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Activa
                  </span>
                </div>
                <div className="ml-13 space-y-3">
                  <p className="text-gray-700">
                    <strong>En Crisal-iA paciente selecciona Md entre opciones sugeridas (encuentra tu MD)</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    El médico recibe una notificación de Crisal-iA cuando un paciente selecciona su perfil como médico tratante. En esta notificación, podrá visualizar los datos básicos del paciente y sus objetivos principales.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Información recibida:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Datos básicos del paciente</li>
                      <li>Objetivos principales de salud</li>
                      <li>Estado de anamnesis completada</li>
                      <li>Primeras recomendaciones automatizadas recibidas</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    A partir de este momento, el médico podrá comunicarse con el paciente a través de CRISAL-IA.
                  </p>
                </div>
              </div>

              {/* Conexión 3 */}
              <div className="border-l-4 border-orange-500 rounded-lg bg-white shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Conexión 3</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Activa
                  </span>
                </div>
                <div className="ml-13 space-y-3">
                  <p className="text-gray-700">
                    <strong>En Crisa-IA paciente pide agendamiento con MD específico</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    El médico recibe una notificación cuando un paciente busca específicamente su perfil para agendar una consulta. En caso de que el médico no sea usuario de CRISAL-IA, se intentará contactarlo para informarle sobre la búsqueda de su paciente y ofrecerle nuestro software.
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Notificación incluye:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Datos básicos del paciente</li>
                      <li>Objetivos principales</li>
                      <li>Estado de anamnesis completada</li>
                      <li>Recomendaciones automatizadas recibidas</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Notificación de Primer Pago */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <BellIcon className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      El médico es notificado cuando el paciente haya realizado el primer pago
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Este pago activa:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Gestión de agenda</li>
                      <li>Preconsulta</li>
                      <li>Consulta médica</li>
                      <li>Seguimiento IA al paciente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vista de Configuración */}
          {activeView === 'configuracion' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Configuración de Agenda
              </h2>

              {/* Creación Automática de Agenda */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Creación Automática de la Agenda Médica
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Datos Geográficos
                    </label>
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Dirección del consultorio"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Integración con Google Maps para optimización geográfica
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Horarios Disponibles de Atención
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="time" defaultValue="08:00" className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                          <span className="text-gray-500">-</span>
                          <input type="time" defaultValue="18:00" className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Modalidad de Atención por Jornada
                      </label>
                      <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        <option>Presencial</option>
                        <option>Virtual</option>
                        <option>Mixta</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Optimización y Gestión Dinámica:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>La IA manejará la cancelación y modificación de consultas para evitar espacios vacíos</li>
                      <li>Reubicará pacientes según su ubicación geográfica para maximizar la eficiencia</li>
                      <li>La reubicación solo se realizará si la flexibilidad está habilitada</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Confirmación de Agendamiento */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Confirmación de Agendamiento
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Notificación automática al paciente</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Recordatorio 24 horas antes</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Recordatorio 2 horas antes</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Integración con Calendarios */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Integración con Calendarios Externos
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CalendarIcon className="h-6 w-6 text-indigo-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Google Calendar</p>
                        <p className="text-sm text-gray-500">Sincronización automática</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      Configurar
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CalendarIcon className="h-6 w-6 text-indigo-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Outlook</p>
                        <p className="text-sm text-gray-500">Sincronización automática</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Agendamiento;
