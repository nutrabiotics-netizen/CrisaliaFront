import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState } from 'react';
import {
  BellIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
  DevicePhoneMobileIcon,
  CameraIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const SeguimientoIA = () => {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: '1',
      tipo: 'preconsulta',
      titulo: 'Acercamiento al tiempo límite para responder una preconsulta',
      paciente: 'Juan Pérez',
      prioridad: 'alta',
      fecha: '2025-11-26',
      hora: '10:30'
    },
    {
      id: '2',
      tipo: 'agenda',
      titulo: 'Agenda confirmada para el siguiente día',
      paciente: 'María González',
      prioridad: 'media',
      fecha: '2025-11-27',
      hora: '09:00'
    },
    {
      id: '3',
      tipo: 'concepto',
      titulo: 'Solicitud urgente de concepto adicional',
      paciente: 'Ana López',
      prioridad: 'alta',
      fecha: '2025-11-26',
      hora: '14:00'
    }
  ]);

  return (
    <MedicoLayout>
      <div className="space-y-6">
        {/* Centro de Notificaciones Prioritarias */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Centro de Notificaciones Prioritarias
              </h1>
              <p className="text-gray-600 mt-1">
                Crisal-IA activa centro de notificaciones PRIORITARIAS e insistirá hasta que sean ejecutadas o desactivadas
              </p>
            </div>
          </div>

          {/* Notificaciones Prioritarias */}
          <div className="space-y-3">
            {notificaciones.map((notif) => (
              <div
                key={notif.id}
                className={`border-2 rounded-lg p-4 ${
                  notif.prioridad === 'alta'
                    ? 'border-red-300 bg-red-50'
                    : 'border-yellow-300 bg-yellow-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <BellIcon className={`h-5 w-5 mr-2 ${
                        notif.prioridad === 'alta' ? 'text-red-600' : 'text-yellow-600'
                      }`} />
                      <h3 className="font-semibold text-gray-900">{notif.titulo}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 ml-7">
                      <span>{notif.paciente}</span>
                      <span>•</span>
                      <span>{new Date(notif.fecha).toLocaleDateString('es-CO')}</span>
                      <span>•</span>
                      <span>{notif.hora}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                      Ejecutar
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                      Desactivar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tipos de Notificaciones */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Tipos de Notificaciones Prioritarias
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  numero: '1',
                  titulo: 'Acercamiento al tiempo límite para responder una preconsulta',
                  descripcion: 'Notificación cuando se acerca el tiempo máximo configurado para responder'
                },
                {
                  numero: '2',
                  titulo: 'Agenda confirmada para el siguiente día',
                  descripcion: 'Recordatorio de citas confirmadas para el día siguiente'
                },
                {
                  numero: '3',
                  titulo: 'Solicitud urgente de concepto adicional',
                  descripcion: 'Paciente solicita concepto adicional pagado'
                },
                {
                  numero: '4',
                  titulo: 'Eventos de actualización o seguimiento del SW',
                  descripcion: 'Crisal-iA se gestiona a sí misma y presenta material instructivo de actualización'
                }
              ].map((tipo) => (
                <div key={tipo.numero} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                      {tipo.numero}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{tipo.titulo}</h3>
                      <p className="text-sm text-gray-600">{tipo.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ruta Automatizada para el Seguimiento */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              Ruta Automatizada para el Seguimiento de Pacientes en Consultas de Control
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Tras el diligenciamiento del nuevo formulario de anamnesis de control por parte del paciente, se activa un flujo automatizado que permite optimizar la segunda preconsulta médica y la consulta presencial.
          </p>

          <div className="space-y-4">
            {/* Flujo del Proceso */}
            <div className="border-l-4 border-indigo-500 pl-4 space-y-4">
              <div className="flex items-start">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Respuesta Automatizada con Sugerencias
                  </h3>
                  <p className="text-sm text-gray-600">
                    Se genera una respuesta automatizada que incluye sugerencias personalizadas para el paciente y una prescripción preliminar de laboratorios de control.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Resumen Clínico para el Médico
                  </h3>
                  <p className="text-sm text-gray-600">
                    El médico recibe esta información junto con un resumen clínico en formato plano, con un semáforo general de evolución que destaca adherencia, nuevas disfunciones, hábitos lesivos u oportunidades terapéuticas.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Prescripción de Laboratorios
                  </h3>
                  <p className="text-sm text-gray-600">
                    El médico define qué laboratorios facultativos y opcionales prescribir, los cuales el paciente deberá realizar dos semanas antes de la consulta de control.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Nuevo Resumen Clínico Automatizado
                  </h3>
                  <p className="text-sm text-gray-600">
                    Una vez el paciente presenta los resultados a CRISAL-IA, se activa el sistema de agendamiento y se genera un nuevo resumen clínico automatizado que integra anamnesis, resultados de laboratorio y un nuevo análisis semaforizado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CRISAL-IA Análisis Detallado */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            CRISAL-IA realiza un segundo cuestionario de control y lleva a cabo un análisis detallado
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { numero: '1', descripcion: 'Detección de cambios en la evolución clínica' },
              { numero: '2', descripcion: 'Identificación de nuevas conductas lesivas' },
              { numero: '3', descripcion: 'Análisis de perpetuadores no controlados' },
              { numero: '4', descripcion: 'Detección de nuevos síntomas' },
              { numero: '5', descripcion: 'Evaluación de adherencia terapéutica' },
              { numero: '6', descripcion: 'Recopilación de datos de wearables' },
              { numero: '7', descripcion: 'Análisis de exámenes paraclínicos' },
              { numero: '8', descripcion: 'Actualización basada en tabla de disfunciones' },
              { numero: '9', descripcion: 'Sugerencia de tiempos para control médico' },
              { numero: '10', descripcion: 'Generación de informes gráficos' }
            ].map((item) => (
              <div key={item.numero} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">
                    {item.numero}
                  </div>
                  <p className="text-sm text-gray-700">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Herramienta de Análisis y Estrategia */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <SparklesIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              Herramienta de Análisis y Estrategia para el MD
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Esta herramienta proporciona al médico (MD) métricas detalladas sobre los productos vendidos y los servicios que generan mayor facturación.
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Métricas Clave */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Análisis de Métricas Clave</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Productos más rentables</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">85%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Servicios con mayor demanda</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">72%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Comportamiento de población atendida</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">68%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Estrategias de Optimización */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Estrategias de Optimización</h3>
              <div className="space-y-3">
                {[
                  'Aumentar facturación mediante optimización de servicios',
                  'Optimizar atención de principales motivos de consulta',
                  'Mejorar adherencia de pacientes',
                  'Identificar oportunidades de crecimiento'
                ].map((estrategia, idx) => (
                  <div key={idx} className="flex items-start">
                    <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{estrategia}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Además, discrimina la información por principales motivos de consulta, edades, diagnósticos más frecuentes y pacientes con mayor adherencia.
            </p>
          </div>
        </div>

        {/* Integraciones */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Integraciones de Seguimiento
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Integración con ALIVIA */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <ShoppingBagIcon className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Integración con ALIVIA</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Integración de Crisal-IA con Alivia o terceros para seguimiento de compra de productos prescritos
              </p>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  Conectado
                </span>
                <span className="text-xs text-gray-500">234 compras rastreadas</span>
              </div>
            </div>

            {/* Seguimiento de Wearables */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <DevicePhoneMobileIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Seguimiento de Wearables</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Monitoreo continuo de parámetros mediante dispositivos portátiles
              </p>
              <div className="space-y-2">
                {['Apple Watch', 'Fitbit', 'CGM'].map((device) => (
                  <div key={device} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{device}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      Activo
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agente Cuidador IA */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <SparklesIcon className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Agente Cuidador IA (Coach Digital)</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Asistente virtual que acompaña al paciente en su proceso de recuperación
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-xs text-gray-700">
                  El agente proporciona recordatorios, motivación y seguimiento continuo de objetivos terapéuticos
                </p>
              </div>
            </div>

            {/* Evaluación Visual Inteligente */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <CameraIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Evaluación Visual Inteligente de Alimentos IA</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Sistema que analiza fotografías de alimentos para evaluar adherencia dietética
              </p>
              <button className="text-sm text-indigo-600 hover:text-indigo-700">
                Ver Análisis Recientes →
              </button>
            </div>
          </div>
        </div>

        {/* Seguimiento Inteligente y Predictivo */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Seguimiento Inteligente y Predictivo con Crisal-IA
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Predicciones y Alertas</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Predicción de riesgo de recaída</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Alertas tempranas de desviaciones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Optimización de tiempos de control</span>
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Sugerencias Preventivas</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sugerencias preventivas a pacientes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Recaptación de antiguos o no activos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Estrategias de re-engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default SeguimientoIA;
