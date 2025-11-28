import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState } from 'react';
import {
  SparklesIcon,
  BookOpenIcon,
  HeartIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const IAEntrenada = () => {
  const [activeTab, setActiveTab] = useState<'repositorios' | 'impacto' | 'versiculos'>('repositorios');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MedicoLayout>
      <div className="space-y-6">
        {/* Repositorios Inteligentes */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <SparklesIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Repositorios Inteligentes de Medicina Funcional
            </h1>
          </div>
          <p className="text-gray-600 mb-6">
            Sistema avanzado de organización y administración de contenidos audiovisuales provenientes de congresos, conferencias y charlas impartidas por médicos funcionales de alto nivel.
          </p>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('repositorios')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'repositorios'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Repositorios
              </button>
              <button
                onClick={() => setActiveTab('impacto')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'impacto'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Análisis de Impacto
              </button>
              <button
                onClick={() => setActiveTab('versiculos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'versiculos'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Versículos Bíblicos
              </button>
            </nav>
          </div>

          {/* Repositorios */}
          {activeTab === 'repositorios' && (
            <div className="space-y-6">
              {/* Búsqueda */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Búsqueda Inteligente en Repositorios
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  La IA analizará las búsquedas del médico y entregará material específico: clips, transcripciones, artículos y referencias relacionadas al tema consultado.
                </p>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar por tema, disfunción, sistema corporal..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Buscar
                  </button>
                </div>
              </div>

              {/* Categorías */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Categorías de Contenido</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    'Disfunción Mitocondrial',
                    'Salud Hormonal',
                    'Salud Digestiva',
                    'Inflamación Crónica',
                    'Estrés y Cortisol',
                    'Detoxificación',
                    'Sistema Inmune',
                    'Neurotransmisores',
                    'Metabolismo'
                  ].map((categoria) => (
                    <div key={categoria} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <AcademicCapIcon className="h-6 w-6 text-indigo-600 mb-2" />
                      <p className="font-medium text-gray-900">{categoria}</p>
                      <p className="text-xs text-gray-500 mt-1">12 conferencias</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contenido Reciente */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contenido Reciente</h3>
                <div className="space-y-3">
                  {[
                    { titulo: 'Disfunción Mitocondrial en Medicina Funcional', autor: 'Dr. Mark Hyman', tipo: 'Conferencia', duracion: '45 min' },
                    { titulo: 'Estrategias Terapéuticas para Inflamación Crónica', autor: 'Dr. Amy Myers', tipo: 'Charla', duracion: '30 min' },
                    { titulo: 'Optimización Hormonal con Enfoque Funcional', autor: 'Dr. Sara Gottfried', tipo: 'Webinar', duracion: '60 min' }
                  ].map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <VideoCameraIcon className="h-5 w-5 text-indigo-600 mr-2" />
                            <h4 className="font-medium text-gray-900">{item.titulo}</h4>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{item.autor}</span>
                            <span>•</span>
                            <span>{item.tipo}</span>
                            <span>•</span>
                            <span>{item.duracion}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded">
                            <PlayIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                            <DocumentTextIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Información del Sistema */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Características del Sistema:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Segmentación del contenido por categoría clínica, modelo de disfunción, sistema corporal afectado o marco terapéutico</li>
                  <li>Etiquetas inteligentes que identifican a cada conferencista, su área de expertise y la relevancia del contenido</li>
                  <li>Acceso directo a fragmentos clave, sin necesidad de revisar horas completas de conferencias</li>
                  <li>Visualización rápida del extracto desde el cual la IA saca la información pertinente</li>
                </ul>
              </div>
            </div>
          )}

          {/* Análisis de Impacto Terapéutico */}
          {activeTab === 'impacto' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Análisis de Impacto Terapéutico Basado en Disfunciones Identificadas
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  El sistema analiza el impacto potencial de diferentes estrategias terapéuticas basándose en las disfunciones identificadas en el paciente.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Disfunciones Identificadas */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Disfunciones Identificadas</h3>
                  <div className="space-y-2">
                    {[
                      { nombre: 'Disfunción Digestiva', severidad: 'Alta', impacto: 85 },
                      { nombre: 'Desequilibrio Hormonal', severidad: 'Media', impacto: 70 },
                      { nombre: 'Inflamación Crónica', severidad: 'Alta', impacto: 90 }
                    ].map((disfuncion, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{disfuncion.nombre}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            disfuncion.severidad === 'Alta' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {disfuncion.severidad}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${disfuncion.impacto}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{disfuncion.impacto}% impacto</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estrategias Terapéuticas Recomendadas */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Estrategias Terapéuticas Recomendadas</h3>
                  <div className="space-y-2">
                    {[
                      { estrategia: 'Probióticos específicos', efectividad: 90, evidencia: 'Alta' },
                      { estrategia: 'Dieta de eliminación', efectividad: 85, evidencia: 'Alta' },
                      { estrategia: 'Suplementación de magnesio', efectividad: 75, evidencia: 'Media' }
                    ].map((estrategia, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{estrategia.estrategia}</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {estrategia.evidencia} evidencia
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${estrategia.efectividad}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{estrategia.efectividad}% efectividad</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Versículos Bíblicos */}
          {activeTab === 'versiculos' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <BookOpenIcon className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Integración de Versículos Bíblicos Relacionados con la Salud
                  </h2>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Crisal-IA puede proporcionar versículos bíblicos de la Nueva Traducción Viviente (NTV) relacionados con los hallazgos en el interrogatorio y las disfunciones identificadas en el paciente.
                </p>
                <p className="text-sm text-gray-700">
                  Esta funcionalidad permitirá ofrecer un enfoque integral que incluya apoyo espiritual, alineando los principios de la fe con el proceso de sanación y bienestar del paciente.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    referencia: 'Proverbios 17:22',
                    texto: 'El corazón alegre es una buena medicina, pero el espíritu quebrantado seca los huesos.',
                    relacionado: 'Estrés y bienestar emocional'
                  },
                  {
                    referencia: '1 Corintios 6:19-20',
                    texto: '¿No saben que su cuerpo es templo del Espíritu Santo, quien está en ustedes y al que han recibido de parte de Dios?',
                    relacionado: 'Cuidado del cuerpo'
                  },
                  {
                    referencia: 'Salmos 103:2-3',
                    texto: 'Alaba, alma mía, al Señor y no olvides ninguno de sus beneficios. Él perdona todos tus pecados y sana todas tus dolencias.',
                    relacionado: 'Sanación y restauración'
                  }
                ].map((versiculo, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{versiculo.referencia}</p>
                        <p className="text-sm text-gray-600 mt-1">{versiculo.relacionado}</p>
                      </div>
                      <HeartIcon className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-gray-700 italic mt-2">"{versiculo.texto}"</p>
                    <p className="text-xs text-gray-500 mt-2">Nueva Traducción Viviente (NTV)</p>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  El sistema podrá vincular automáticamente los versículos pertinentes según el diagnóstico y las preocupaciones del paciente, brindando una herramienta de reflexión y fortaleza en su proceso de recuperación.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MedicoLayout>
  );
};

export default IAEntrenada;
