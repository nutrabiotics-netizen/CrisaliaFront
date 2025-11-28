import AdministrativoLayout from '../../../components/layout/AdministrativoLayout';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  TagIcon,
  GiftIcon,
  ExclamationTriangleIcon,
  BellIcon,
  SparklesIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const GestionAgenda = () => {
  const [activeSection, setActiveSection] = useState<'panel' | 'recursos' | 'espacios' | 'personalizacion' | 'asignacion'>('panel');

  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Módulo: Gestión de Agenda
          </h1>
          <p className="text-gray-600 mb-6">
            Administración completa de agendas médicas con inteligencia artificial
          </p>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveSection('panel')}
                className={`${
                  activeSection === 'panel'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <ChartBarIcon className="h-5 w-5 inline mr-2" />
                Panel Analítico
              </button>
              <button
                onClick={() => setActiveSection('recursos')}
                className={`${
                  activeSection === 'recursos'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <UserGroupIcon className="h-5 w-5 inline mr-2" />
                Gestión Recursos
              </button>
              <button
                onClick={() => setActiveSection('espacios')}
                className={`${
                  activeSection === 'espacios'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <BuildingOfficeIcon className="h-5 w-5 inline mr-2" />
                Optimización Espacios
              </button>
              <button
                onClick={() => setActiveSection('personalizacion')}
                className={`${
                  activeSection === 'personalizacion'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <TagIcon className="h-5 w-5 inline mr-2" />
                Personalización
              </button>
              <button
                onClick={() => setActiveSection('asignacion')}
                className={`${
                  activeSection === 'asignacion'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <MapPinIcon className="h-5 w-5 inline mr-2" />
                Asignación MD/BOX
              </button>
            </nav>
          </div>

          {/* Panel de Gestión Administrativa y Analítica de Citas */}
          {activeSection === 'panel' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Panel de Gestión Administrativa y Analítica de Citas
                </h2>
                <p className="text-gray-600 mb-4">
                  Este módulo permite al perfil administrativo tener una visión clara, actualizada y estratégica del comportamiento de la agenda médica. A través de una interfaz, se accede a datos en tiempo real sobre el estado de las citas y el flujo de pacientes.
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Funcionalidades:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Visualización en tiempo real de citas agendadas, pendientes, confirmadas y pagadas</li>
                    <li>Métricas dinámicas de pacientes contactados, gestionados y con consulta confirmada</li>
                    <li>Filtros por médico, servicio, canal de contacto o fuente de adquisición</li>
                    <li>Paneles estadísticos personalizables según objetivos administrativos</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Nota:</strong> La IA analiza automáticamente los datos recolectados para identificar patrones de comportamiento por tipo de paciente, tiempos de contacto y flujos de conversión. Esto permite anticiparse a posibles temporadas de baja demanda, recomendando estrategias de marketing y promociones segmentadas para mantener la ocupación estable.
                </p>
              </div>

              {/* Métricas en Tiempo Real */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">156</p>
                  <p className="text-sm text-gray-600">Citas Agendadas</p>
                  <p className="text-xs text-green-600 mt-1">+12% vs ayer</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">142</p>
                  <p className="text-sm text-gray-600">Confirmadas</p>
                  <p className="text-xs text-green-600 mt-1">91% tasa</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">134</p>
                  <p className="text-sm text-gray-600">Pagadas</p>
                  <p className="text-xs text-green-600 mt-1">86% tasa</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">89%</p>
                  <p className="text-sm text-gray-600">Tasa Ocupación</p>
                  <p className="text-xs text-green-600 mt-1">+5% vs semana pasada</p>
                </div>
              </div>

              {/* Filtros */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Filtros de Análisis</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Todos los Médicos</option>
                    <option>Dr. Juan Pérez</option>
                    <option>Dr. María González</option>
                  </select>
                  <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Todos los Servicios</option>
                    <option>Consulta Inicial</option>
                    <option>Control</option>
                  </select>
                  <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Todos los Canales</option>
                    <option>Conexión 1</option>
                    <option>Conexión 2</option>
                    <option>Conexión 3</option>
                  </select>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Aplicar Filtros
                  </button>
                </div>
              </div>

              {/* Vista de Citas */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Citas del Día</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paciente</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Médico</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pago</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">08:00 AM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">María González</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. Juan Pérez</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Confirmada
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Pagada
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Gestión Inteligente de Recursos */}
          {activeSection === 'recursos' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Gestión Inteligente de Recursos
                </h2>
                <p className="text-gray-600 mb-4">
                  Este módulo permite proyectar la demanda operativa a partir del análisis continuo de métricas de agenda en tiempo real. Mediante modelos predictivos, la IA estima el comportamiento esperado de la agenda para el día actual y los próximos días (ajustable por intervalos semanales).
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Esto habilita:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Dimensionamiento del personal médico, administrativo y asistencial según demanda proyectada</li>
                    <li>Optimización de turnos y cargas laborales con base en ocupación esperada</li>
                    <li>Reducción de tiempos muertos y sobrecarga de personal</li>
                    <li>Mejora en la eficiencia operativa y la experiencia del paciente</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  El sistema ajusta automáticamente sus recomendaciones según el comportamiento histórico y las variaciones estacionales detectadas, permitiendo decisiones más ágiles y sustentadas para la gestión de talento.
                </p>
              </div>

              {/* Proyección de Demanda */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Hoy</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-1">24</p>
                  <p className="text-sm text-gray-600">Citas proyectadas</p>
                  <p className="text-xs text-gray-500 mt-2">Personal requerido: 3 médicos, 2 enfermeras</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Mañana</h3>
                  <p className="text-3xl font-bold text-green-600 mb-1">28</p>
                  <p className="text-sm text-gray-600">Citas proyectadas</p>
                  <p className="text-xs text-gray-500 mt-2">Personal requerido: 4 médicos, 2 enfermeras</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Esta Semana</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-1">156</p>
                  <p className="text-sm text-gray-600">Citas proyectadas</p>
                  <p className="text-xs text-gray-500 mt-2">Promedio diario: 22 citas</p>
                </div>
              </div>

              {/* Recomendaciones de Personal */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Recomendaciones de Personal por IA</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Personal Médico</p>
                        <p className="text-sm text-gray-600">Recomendado: 4 médicos (actualmente 3)</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        Ajuste Sugerido
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Personal Asistencial</p>
                        <p className="text-sm text-gray-600">Recomendado: 2 enfermeras (actualmente 2)</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        Óptimo
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Personal Administrativo</p>
                        <p className="text-sm text-gray-600">Recomendado: 2 recepcionistas (actualmente 2)</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        Óptimo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Optimización Inteligente de Espacios Físicos */}
          {activeSection === 'espacios' && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Optimización Inteligente de Espacios Físicos
                </h2>
                <p className="text-gray-600 mb-4">
                  Crisal-iA integra una plataforma avanzada de mapeo y gestión de consultorios compartidos, diseñada para maximizar la eficiencia operativa en entornos con múltiples profesionales y espacios clínicos.
                </p>
                <p className="text-gray-600 mb-4">
                  La inteligencia artificial analiza en tiempo real la agenda, los perfiles médicos, la demanda proyectada y los cambios operativos (como cancelaciones o nuevas asignaciones), para realizar una distribución óptima de los consultorios.
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Funcionalidades:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Asignación automática y dinámica de consultorios según compatibilidad clínica y disponibilidad horaria</li>
                    <li>Visualización diaria por parte del perfil administrativo de cada médico asignado a cada box, con horarios disponibles</li>
                    <li>Gestión inmediata de eventualidades: cancelación, cierre temporal o reubicación de consultorios ante contingencias</li>
                    <li>Prevención de subutilización, solapamientos o sobrecarga de espacios</li>
                    <li>Proyección semanal ajustada a la demanda y comportamiento histórico</li>
                  </ul>
                </div>
              </div>

              {/* Vista de Consultorios */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Box 1</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Disponible
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded">
                      <p className="text-sm font-medium text-gray-900">Dr. Juan Pérez</p>
                      <p className="text-xs text-gray-500">08:00 AM - 12:00 PM</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded">
                      <p className="text-sm font-medium text-gray-900">Dr. María González</p>
                      <p className="text-xs text-gray-500">02:00 PM - 06:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Box 2</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                      En Uso
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-indigo-50 rounded">
                      <p className="text-sm font-medium text-gray-900">Dr. Carlos Rodríguez</p>
                      <p className="text-xs text-gray-500">09:00 AM - 05:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Box 3</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      Mantenimiento
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">No disponible temporalmente</p>
                </div>
              </div>

              {/* Sugerencias de IA */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-start">
                  <SparklesIcon className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sugerencias de IA</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      La IA sugiere redistribuir las citas del Box 3 (en mantenimiento) entre Box 1 y Box 2 para optimizar el uso del espacio disponible.
                    </p>
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                      Aplicar Sugerencia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Personalización de Agenda para Disminuir Cancelaciones */}
          {activeSection === 'personalizacion' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Módulo de Personalización de Agenda para Disminuir Cancelaciones
                </h2>
                <p className="text-gray-600 mb-4">
                  Este módulo permitirá establecer promociones, multas e incentivos para optimizar la gestión de citas.
                </p>
              </div>

              {/* Promociones */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <GiftIcon className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Promociones</h3>
                  </div>
                  <button className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Nueva Promoción
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Descuentos en consultas futuras para pacientes que no cancelen citas (dado en %).
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Descuento por Puntualidad</p>
                        <p className="text-sm text-gray-500">10% de descuento en próxima consulta</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multas */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Multas</h3>
                  </div>
                  <button className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Nueva Multa
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Penalización por cancelaciones tardías (posterior al pago se reservará el remanente del pago total restando un % de penalización). Se establece como cancelación tardía el día hábil anterior a la fecha solicitada.
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-red-50 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Multa por Cancelación Tardía</p>
                        <p className="text-sm text-gray-500">20% de penalización sobre el pago</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paquetes de Citas */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <TagIcon className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Paquetes de Citas</h3>
                  </div>
                  <button className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Nuevo Paquete
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Opciones para comprar paquetes de consultas con descuento (ejem. consulta primera vez + control).
                </p>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Paquete Inicial Completo</p>
                        <p className="text-sm text-gray-500">Consulta inicial + Control: 15% descuento</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recordatorios Personalizados */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <BellIcon className="h-6 w-6 text-purple-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Recordatorios Personalizados</h3>
                  </div>
                  <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700">
                    Configurar
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Para reducir la tasa de ausentismo, desde el perfil administrativo se podrán activar o configurar periodicidad y link para confirmar cita manualmente en caso de contingencia por fallo de IA.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600" defaultChecked />
                    <label className="ml-2 text-sm text-gray-700">Recordatorio 24 horas antes</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600" defaultChecked />
                    <label className="ml-2 text-sm text-gray-700">Recordatorio 2 horas antes</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600" />
                    <label className="ml-2 text-sm text-gray-700">Link de confirmación manual disponible</label>
                  </div>
                </div>
              </div>

              {/* Configuración Flexible */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Configuración Flexible</h3>
                <p className="text-sm text-gray-600">
                  Los anteriores ajustes se podrán aplicar para cada médico o de forma general para una IPS o Coworking.
                </p>
                <div className="mt-3 flex space-x-3">
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                    Aplicar a Todos los Médicos
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700">
                    Configurar por Médico
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-gray-600">
                  <strong>Nota:</strong> Las configuraciones por defecto estarán basadas en un análisis con inteligencia artificial del comportamiento de los pacientes teniendo en cuenta un porcentaje de topes mínimos y máximos de descuento o penalización.
                </p>
              </div>
            </div>
          )}

          {/* Gestión de Asignación MD y BOX */}
          {activeSection === 'asignacion' && (
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Módulo de Gestión de Asignación MD y BOX
                </h2>
                <p className="text-gray-600 mb-4">
                  Cristal-iA incorporará una herramienta que permitirá configurar automáticamente desde el módulo IA de agendamiento o manualmente la cantidad de consultas y la asignación de médicos por espacio físico o box de atención. Esta funcionalidad busca brindar control directo a los administradores y adaptabilidad a las variaciones del entorno clínico.
                </p>
                <p className="text-gray-600 mb-4">
                  A su vez, la inteligencia artificial analizará las suscripciones activas y los consultorios o box disponibles para alimentar su base de datos y proponer redistribuciones automáticas cuando sea necesario.
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Se podrá añadir o quitar espacios de atención, así como activar o desactivar médicos según disponibilidad.</li>
                    <li>La IA permitirá reubicar automáticamente recursos humanos y físicos ante cancelaciones, sobredemanda o contingencias.</li>
                    <li>Se visualizarán ajustes sugeridos en tiempo real, facilitando una respuesta rápida ante cambios inesperados.</li>
                  </ul>
                </div>
              </div>

              {/* Gestión de Boxes */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Gestión de Boxes y Médicos
                </h3>
                <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Agregar Box
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Box 1</h4>
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-sm font-medium text-gray-900">Dr. Juan Pérez</p>
                      <div className="flex items-center mt-1">
                        <input type="checkbox" className="h-4 w-4 text-indigo-600" defaultChecked />
                        <span className="ml-2 text-xs text-gray-500">Activo</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 w-full px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
                    Asignar Médico
                  </button>
                </div>
              </div>

              {/* Ejemplo de Uso */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Ejemplo de Uso</h3>
                <p className="text-sm text-gray-600">
                  En un coworking médico, un profesional que normalmente atiende los viernes anuncia una ausencia de último minuto por motivos personales urgentes. El administrador, al recibir la notificación, desactiva su disponibilidad en la plataforma. Cristal-iA detecta la baja, revisa los pacientes agendados y sugiere redistribuirlos entre dos médicos disponibles en horarios cercanos y en box compartidos compatibles (se puede brindar la posibilidad de reagendamiento si paciente lo desea u ofrecer los otros 2 candidatos preasignados a consulta en "Conexión 2"). Además, la IA propone habilitar un consultorio adicional ese día si la demanda lo requiere. El ajuste se realiza en menos de cinco minutos, evitando cancelaciones masivas y optimizando los recursos.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default GestionAgenda;
