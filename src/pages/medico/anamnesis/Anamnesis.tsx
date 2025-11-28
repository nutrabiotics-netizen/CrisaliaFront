import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState } from 'react';
import {
  DocumentTextIcon,
  BellIcon,
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  SpeakerWaveIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Anamnesis = () => {
  const [selectedAnamnesis, setSelectedAnamnesis] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'red' | 'yellow' | 'green'>('all');

  const anamnesisList = [
    {
      id: '1',
      paciente: 'María González',
      porcentaje: 100,
      fecha: '2025-11-26',
      semaforo: { rojo: 3, amarillo: 5, verde: 12 },
      objetivos: ['Mejorar digestión', 'Reducir inflamación', 'Aumentar energía'],
      estado: 'completa'
    },
    {
      id: '2',
      paciente: 'Juan Pérez',
      porcentaje: 50,
      fecha: '2025-11-25',
      semaforo: { rojo: 2, amarillo: 3, verde: 8 },
      objetivos: ['Control de peso', 'Mejorar sueño'],
      estado: 'en-proceso'
    },
    {
      id: '3',
      paciente: 'Ana López',
      porcentaje: 100,
      fecha: '2025-11-24',
      semaforo: { rojo: 1, amarillo: 4, verde: 15 },
      objetivos: ['Optimizar hormonas', 'Mejorar estado de ánimo'],
      estado: 'completa'
    }
  ];

  return (
    <MedicoLayout>
      <div className="space-y-6">
        {/* Notificaciones y Seguimiento */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <BellIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Notificaciones y Seguimiento de Anamnesis Automatizada
            </h1>
          </div>
          <p className="text-gray-600 mb-6">
            El médico recibe notificaciones cuando el paciente ha completado diferentes porcentajes de la anamnesis
          </p>

          {/* Notificaciones */}
          <div className="space-y-3 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <BellIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Notificación al 50%</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Se notifica al médico cuando el paciente ha completado el 50% de la anamnesis automatizada
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Notificación al 100%</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Al alcanzar el 100%, la IA presenta al médico un resumen con los objetivos principales del paciente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recepción y Gestión de Anamnesis */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recepción y Gestión de la Anamnesis en CRISAL-IA
          </h2>
          <p className="text-gray-600 mb-6">
            El médico recibe la anamnesis completa en un formato resumido, con un sistema de semaforización inicial que clasifica los principales hallazgos en rojo, amarillo y verde.
          </p>

          {/* Filtros de Semaforización */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('red')}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                filter === 'red'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
              Rojo ({anamnesisList.reduce((sum, a) => sum + a.semaforo.rojo, 0)})
            </button>
            <button
              onClick={() => setFilter('yellow')}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                filter === 'yellow'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              Amarillo ({anamnesisList.reduce((sum, a) => sum + a.semaforo.amarillo, 0)})
            </button>
            <button
              onClick={() => setFilter('green')}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                filter === 'green'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              Verde ({anamnesisList.reduce((sum, a) => sum + a.semaforo.verde, 0)})
            </button>
          </div>

          {/* Lista de Anamnesis */}
          <div className="space-y-4">
            {anamnesisList.map((anamnesis) => (
              <div
                key={anamnesis.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedAnamnesis(anamnesis.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold text-gray-900 mr-3">{anamnesis.paciente}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          anamnesis.estado === 'completa'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {anamnesis.estado === 'completa' ? 'Completa' : `${anamnesis.porcentaje}%`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {new Date(anamnesis.fecha).toLocaleDateString('es-CO')}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-600 rounded-full mr-1"></div>
                          <span>{anamnesis.semaforo.rojo}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                          <span>{anamnesis.semaforo.amarillo}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-600 rounded-full mr-1"></div>
                          <span>{anamnesis.semaforo.verde}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Objetivos principales:</p>
                      <div className="flex flex-wrap gap-2">
                        {anamnesis.objetivos.map((obj, idx) => (
                          <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                            {obj}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Funcionalidades de Anamnesis */}
          {selectedAnamnesis && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Funcionalidades Disponibles
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                  <EyeIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Leer Información</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                  <SpeakerWaveIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Escuchar Información</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                  <PencilIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Editar Hallazgos</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                  <ChartBarIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Modificar Semaforización</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Análisis IA de Información */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <SparklesIcon className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">
              Análisis IA de Información
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            CRISAL-IA realiza un análisis detallado basado en la información previa del paciente
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Análisis de Preconsulta */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Análisis de Preconsulta</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Detección de cambios en la evolución clínica</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Identificación de nuevas conductas lesivas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Análisis de perpetuadores no controlados</span>
                </li>
              </ul>
            </div>

            {/* Análisis de Consulta */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Análisis de Consulta</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Detección de nuevos síntomas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Evaluación de adherencia terapéutica</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Recopilación de datos de wearables</span>
                </li>
              </ul>
            </div>

            {/* Análisis de Examen Físico */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Análisis de Examen Físico</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Análisis de exámenes paraclínicos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Actualización basada en tabla de disfunciones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sugerencia de tiempos para control médico</span>
                </li>
              </ul>
            </div>

            {/* Análisis de Control */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Análisis de Control</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Generación de informes gráficos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Representación visual de evolución</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Gráfico final de progreso general</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Segundo Cuestionario en Preconsulta de Control */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Segundo Cuestionario en Preconsulta de Control
          </h2>
          <p className="text-gray-600 mb-4">
            CRISAL-IA realiza un segundo cuestionario de control y lleva a cabo un análisis detallado basado en la información previa del paciente
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              El sistema genera automáticamente un nuevo formulario de anamnesis de control que incluye preguntas específicas basadas en la evolución del paciente y los objetivos terapéuticos establecidos.
            </p>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Anamnesis;
