import AdministrativoLayout from '../../../components/layout/AdministrativoLayout';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  UserIcon,
  SparklesIcon,
  ClockIcon,
  BeakerIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const VisionEstadisticas = () => {
  const [activePanel, setActivePanel] = useState<'box' | 'profesional' | 'servicios' | 'personal'>('box');

  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Módulo de Visión y Estadísticas
          </h1>
          <p className="text-gray-600 mb-6">
            Análisis completo del rendimiento operativo y financiero del sistema
          </p>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActivePanel('box')}
                className={`${
                  activePanel === 'box'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <BuildingOfficeIcon className="h-5 w-5 inline mr-2" />
                Rendimiento por Box
              </button>
              <button
                onClick={() => setActivePanel('profesional')}
                className={`${
                  activePanel === 'profesional'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <UserIcon className="h-5 w-5 inline mr-2" />
                Rendimiento Profesional
              </button>
              <button
                onClick={() => setActivePanel('servicios')}
                className={`${
                  activePanel === 'servicios'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <BeakerIcon className="h-5 w-5 inline mr-2" />
                Servicios Complementarios
              </button>
              <button
                onClick={() => setActivePanel('personal')}
                className={`${
                  activePanel === 'personal'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <UserGroupIcon className="h-5 w-5 inline mr-2" />
                Personal Administrativo
              </button>
            </nav>
          </div>

          {/* Panel de Rendimiento por Box */}
          {activePanel === 'box' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Panel de Rendimiento por Box (consultorio)
                </h2>
                <p className="text-gray-600 mb-4">
                  El personal administrativo contará con una herramienta avanzada que permite monitorear fácilmente el rendimiento financiero y operativo del box médico. Este módulo utiliza inteligencia artificial para ofrecer insights claros sobre ingresos y rentabilidad asociados al volumen de pacientes atendidos, proporcionando estadísticas clave que ayudan a identificar áreas potenciales de optimización.
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li><strong>Seguimiento Financiero en Tiempo Real:</strong> Visualización instantánea de ingresos, costos operativos y rentabilidad según número de pacientes atendidos.</li>
                    <li><strong>Reporte Detallado de Estadísticas:</strong> Indicadores gráficos claros sobre eficiencia operativa, tiempos de atención y flujo diario de pacientes.</li>
                    <li><strong>Sugerencias Proactivas Basadas en IA:</strong> Recomendaciones inteligentes sobre oportunidades específicas de mejora, destinadas a incrementar la productividad y rentabilidad del box médico.</li>
                  </ul>
                </div>
              </div>

              {/* Métricas por Box */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Activo
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Box 1</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">$2.5M</p>
                      <p className="text-xs text-gray-500">Ingresos del mes</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">156</p>
                      <p className="text-xs text-gray-500">Pacientes atendidos</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600">89%</p>
                      <p className="text-xs text-gray-500">Tasa de ocupación</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-700 mb-2">Sugerencias IA:</p>
                    <p className="text-xs text-gray-600">
                      Optimizar horarios de menor demanda para aumentar ocupación
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Activo
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Box 2</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">$1.8M</p>
                      <p className="text-xs text-gray-500">Ingresos del mes</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">112</p>
                      <p className="text-xs text-gray-500">Pacientes atendidos</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-yellow-600">72%</p>
                      <p className="text-xs text-gray-500">Tasa de ocupación</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-700 mb-2">Sugerencias IA:</p>
                    <p className="text-xs text-gray-600">
                      Considerar promociones para horarios de menor demanda
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <BuildingOfficeIcon className="h-8 w-8 text-gray-400" />
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      Mantenimiento
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Box 3</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold text-gray-400">$0</p>
                      <p className="text-xs text-gray-500">Ingresos del mes</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-400">0</p>
                      <p className="text-xs text-gray-500">Pacientes atendidos</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">0%</p>
                      <p className="text-xs text-gray-500">Tasa de ocupación</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico de Comparación */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Comparativa de Rendimiento</h3>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <p className="text-gray-500">Gráfico de comparativa de ingresos y ocupación por box</p>
                </div>
              </div>
            </div>
          )}

          {/* Panel de Rendimiento por Profesional */}
          {activePanel === 'profesional' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Panel de Rendimiento por Profesional en Salud
                </h2>
                <p className="text-gray-600 mb-4">
                  Esta herramienta avanzada permite al personal administrativo obtener una visión detallada del rendimiento financiero y operativo individual de cada médico y profesional de la clínica. Gracias al análisis inteligente impulsado por IA, se identifican claramente aspectos como volumen de pacientes atendidos, rentabilidad por consulta, detección de pérdidas económicas, y patrones frecuentes en formulación de tratamientos, facilitando decisiones estratégicas para optimizar la eficiencia global.
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li><strong>Análisis financiero individualizado:</strong> Estadísticas claras sobre pacientes atendidos, ingresos generados, costos asociados y rentabilidad específica por cada profesional.</li>
                    <li><strong>Identificación de ineficiencias operativas:</strong> Detección automática de pérdidas de tiempo y recursos financieros por profesional, destacando oportunidades de mejora.</li>
                    <li><strong>Patrones de prescripción y atención:</strong> Evaluación inteligente de tendencias y patrones recurrentes en formulaciones médicas, permitiendo sugerencias fundamentadas para mejorar la calidad asistencial y reducir gastos innecesarios.</li>
                  </ul>
                </div>
              </div>

              {/* Lista de Profesionales */}
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <UserIcon className="h-8 w-8 text-indigo-600 mr-3" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Dr. Juan Pérez</h3>
                          <p className="text-sm text-gray-500">Medicina Funcional</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-lg font-bold text-indigo-600">156</p>
                          <p className="text-xs text-gray-500">Pacientes atendidos</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-600">$2.5M</p>
                          <p className="text-xs text-gray-500">Ingresos generados</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-purple-600">$16,025</p>
                          <p className="text-xs text-gray-500">Rentabilidad/consulta</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-blue-600">89%</p>
                          <p className="text-xs text-gray-500">Tasa ocupación</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex items-start">
                          <SparklesIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Análisis IA:</p>
                            <p className="text-xs text-gray-600">
                              Patrón detectado: Alta frecuencia de prescripción de suplementos específicos. Sugerencia: Evaluar paquetes promocionales para optimizar costos del paciente.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <UserIcon className="h-8 w-8 text-indigo-600 mr-3" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Dr. María González</h3>
                          <p className="text-sm text-gray-500">Medicina Funcional</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-lg font-bold text-indigo-600">112</p>
                          <p className="text-xs text-gray-500">Pacientes atendidos</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-600">$1.8M</p>
                          <p className="text-xs text-gray-500">Ingresos generados</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-purple-600">$16,071</p>
                          <p className="text-xs text-gray-500">Rentabilidad/consulta</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-yellow-600">72%</p>
                          <p className="text-xs text-gray-500">Tasa ocupación</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex items-start">
                          <SparklesIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Análisis IA:</p>
                            <p className="text-xs text-gray-600">
                              Oportunidad detectada: Tasa de ocupación por debajo del promedio. Sugerencia: Considerar estrategias de marketing dirigidas o ajustar horarios de disponibilidad.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel de Rendimiento en Servicios Complementarios */}
          {activePanel === 'servicios' && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Panel de Rendimiento en Servicios Complementarios de Salud
                </h2>
                <p className="text-gray-600 mb-4">
                  Este módulo de Crisálida proporciona al personal administrativo un informe integral y dinámico sobre el desempeño financiero y operativo de los servicios adicionales en salud, como sauna infrarrojo, sueroterapias, crioterapia, limpieza de colon, presoterapia, terapia neural, neuromodulación y cámara de flotación. La herramienta emplea inteligencia artificial para analizar tendencias de uso, identificar oportunidades de optimización y proponer estrategias específicas para incrementar la demanda y rentabilidad de cada servicio.
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li><strong>Informe integral de rentabilidad:</strong> Análisis visual detallado sobre ingresos, costos operativos y margen de utilidad por cada servicio complementario.</li>
                    <li><strong>Optimización del uso operativo:</strong> Estadísticas claras sobre tasa de ocupación, horarios de mayor demanda y patrones frecuentes en el uso de cada servicio.</li>
                    <li><strong>Estrategias inteligentes para maximizar rendimiento:</strong> Sugerencias basadas en IA para aumentar la rentabilidad y promover un mejor aprovechamiento de los servicios menos utilizados, potenciando su posicionamiento y atractivo.</li>
                  </ul>
                </div>
              </div>

              {/* Servicios Complementarios */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { nombre: 'Sauna Infrarrojo', ingresos: '$450K', ocupacion: '65%', tendencia: 'up' },
                  { nombre: 'Sueroterapias', ingresos: '$680K', ocupacion: '78%', tendencia: 'up' },
                  { nombre: 'Crioterapia', ingresos: '$320K', ocupacion: '45%', tendencia: 'down' },
                  { nombre: 'Limpieza de Colon', ingresos: '$280K', ocupacion: '52%', tendencia: 'stable' },
                  { nombre: 'Presoterapia', ingresos: '$190K', ocupacion: '38%', tendencia: 'down' },
                  { nombre: 'Terapia Neural', ingresos: '$520K', ocupacion: '71%', tendencia: 'up' }
                ].map((servicio, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <BeakerIcon className="h-6 w-6 text-purple-600" />
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        servicio.tendencia === 'up' ? 'bg-green-100 text-green-800' :
                        servicio.tendencia === 'down' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {servicio.tendencia === 'up' ? '↑' : servicio.tendencia === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{servicio.nombre}</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-lg font-bold text-purple-600">{servicio.ingresos}</p>
                        <p className="text-xs text-gray-500">Ingresos del mes</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{servicio.ocupacion}</p>
                        <p className="text-xs text-gray-500">Tasa de ocupación</p>
                      </div>
                    </div>
                    {servicio.ocupacion < '60%' && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-start">
                          <SparklesIcon className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-gray-600">
                            Oportunidad: Considerar promociones para aumentar demanda
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Panel Inteligente de Gestión del Personal Administrativo */}
          {activePanel === 'personal' && (
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Panel Inteligente de Gestión del Personal Administrativo y Operativo
                </h2>
                <p className="text-gray-600 mb-4">
                  Este módulo de Crisálida permite realizar un análisis exhaustivo del desempeño y eficiencia del personal administrativo y de servicios varios, incluyendo áreas clave como aseo, mantenimiento, vigilancia, acompañamiento y contabilidad. Mediante el análisis automatizado de planillas laborales y seguimiento de tareas específicas, la herramienta genera recomendaciones estratégicas sobre la cantidad óptima de personal, identificando posibles excesos o déficits y sugiriendo reestructuraciones o reasignaciones de actividades según criterios gerenciales.
                </p>
                <div className="bg-white rounded p-3 mt-3">
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li><strong>Evaluación eficiente del desempeño:</strong> Informes automáticos sobre cumplimiento de actividades clave y productividad individual o por equipo.</li>
                    <li><strong>Análisis predictivo del recurso humano:</strong> Identificación clara y fundamentada de excesos o déficits en la asignación actual del personal administrativo y operativo.</li>
                    <li><strong>Recomendaciones estratégicas basadas en IA:</strong> Sugerencias inteligentes para la readecuación o reasignación del personal, optimizando los recursos humanos para una gestión más efectiva y económica.</li>
                  </ul>
                </div>
              </div>

              {/* Categorías de Personal */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  { categoria: 'Recepción', actual: 2, recomendado: 2, estado: 'optimo', icon: UserGroupIcon },
                  { categoria: 'Facturación', actual: 1, recomendado: 1, estado: 'optimo', icon: CurrencyDollarIcon },
                  { categoria: 'Aseo', actual: 3, recomendado: 2, estado: 'exceso', icon: WrenchScrewdriverIcon },
                  { categoria: 'Mantenimiento', actual: 1, recomendado: 2, estado: 'deficit', icon: WrenchScrewdriverIcon },
                  { categoria: 'Vigilancia', actual: 2, recomendado: 2, estado: 'optimo', icon: UserGroupIcon },
                  { categoria: 'Contabilidad', actual: 1, recomendado: 1, estado: 'optimo', icon: CurrencyDollarIcon }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Icon className="h-6 w-6 text-indigo-600 mr-2" />
                          <h3 className="font-semibold text-gray-900">{item.categoria}</h3>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          item.estado === 'optimo' ? 'bg-green-100 text-green-800' :
                          item.estado === 'exceso' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.estado === 'optimo' ? 'Óptimo' : item.estado === 'exceso' ? 'Exceso' : 'Déficit'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-lg font-bold text-gray-900">{item.actual}</p>
                          <p className="text-xs text-gray-500">Personal actual</p>
                        </div>
                        <div>
                          <p className={`text-lg font-bold ${
                            item.estado === 'optimo' ? 'text-green-600' :
                            item.estado === 'exceso' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {item.recomendado}
                          </p>
                          <p className="text-xs text-gray-500">Recomendado por IA</p>
                        </div>
                      </div>
                      {item.estado !== 'optimo' && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <div className="flex items-start">
                            <SparklesIcon className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-600">
                              {item.estado === 'exceso' 
                                ? `Sugerencia: Reducir personal en ${item.categoria} para optimizar costos operativos.`
                                : `Sugerencia: Aumentar personal en ${item.categoria} para mejorar eficiencia operativa.`
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Resumen General */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3">Resumen de Análisis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">4</p>
                    <p className="text-sm text-gray-600">Áreas Óptimas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">1</p>
                    <p className="text-sm text-gray-600">Áreas con Exceso</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">1</p>
                    <p className="text-sm text-gray-600">Áreas con Déficit</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default VisionEstadisticas;
