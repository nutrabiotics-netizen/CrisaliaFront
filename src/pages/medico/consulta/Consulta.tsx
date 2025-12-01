import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState } from 'react';
import {
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  DocumentTextIcon,
  MicrophoneIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Consulta = () => {
  const [activeStep, setActiveStep] = useState<'transcripcion' | 'examen' | 'analisis' | 'diagnosticos' | 'prescripcion'>('transcripcion');
  const [semaforizacion, setSemaforizacion] = useState<'all' | 'red' | 'yellow' | 'green'>('all');

  return (
    <MedicoLayout>
      <div className="space-y-6">
        {/* Header de Consulta */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Primera Consulta
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 break-words">
                María González • 26 Nov 2025, 10:00 AM
              </p>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs sm:text-sm font-medium rounded whitespace-nowrap">
                En Proceso
              </span>
            </div>
          </div>
        </div>

        {/* Navegación de Pasos */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-6 min-w-max sm:min-w-0">
            {[
              { id: 'transcripcion', label: 'Transcripción', icon: MicrophoneIcon },
              { id: 'examen', label: 'Examen Físico', icon: ClipboardDocumentCheckIcon },
              { id: 'analisis', label: 'Análisis IA', icon: SparklesIcon },
              { id: 'diagnosticos', label: 'Diagnósticos', icon: DocumentTextIcon },
              { id: 'prescripcion', label: 'Prescripción', icon: ClipboardDocumentListIcon }
            ].map((step, index) => (
              <div key={step.id} className="flex items-center flex-1 min-w-[80px] sm:min-w-0">
                <button
                  onClick={() => setActiveStep(step.id as any)}
                  className={`flex flex-col items-center flex-1 px-1 sm:px-0 ${
                    activeStep === step.id ? 'text-indigo-600' : 'text-gray-400'
                  }`}
                >
                  <step.icon className={`h-6 w-6 sm:h-8 sm:w-8 mb-1 sm:mb-2 flex-shrink-0 ${activeStep === step.id ? 'text-indigo-600' : ''}`} />
                  <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">{step.label}</span>
                </button>
                {index < 4 && (
                  <div className={`h-0.5 flex-1 mx-1 sm:mx-2 hidden sm:block ${activeStep === step.id ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Transcripción y Organización Automática */}
        {activeStep === 'transcripcion' && (
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            <div className="flex items-start sm:items-center mb-4 gap-2 sm:gap-2">
              <MicrophoneIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 flex-shrink-0 mt-0.5 sm:mt-0" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Transcripción y Organización Automática de la Consulta Médica
              </h2>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Si el médico dispone del hardware adecuado (micrófono inalámbrico Md-Pte), Crisal-IA ofrecerá una herramienta de inteligencia artificial que escuchará toda la conversación, la organizará en un documento plano y la integrará al análisis general.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de Transcripción
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2">
                  <div className="flex-1 bg-gray-100 rounded-lg p-3 sm:p-4 min-w-0">
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">Grabación en curso...</span>
                      <span className="text-xs text-gray-500 flex-shrink-0">15:32</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 w-3/4"></div>
                    </div>
                  </div>
                  <button className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm whitespace-nowrap">
                    Detener
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transcripción en Tiempo Real
                </label>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-48">
                  <p className="text-sm text-gray-700">
                    "...el paciente refiere dolor abdominal desde hace dos semanas, principalmente después de las comidas. También menciona fatiga constante y dificultad para dormir..."
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveStep('examen')}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Continuar al Examen Físico
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interacción del Médico con la IA */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Interacción del Médico con la IA en la Consulta
          </h2>
          <p className="text-gray-600 mb-4">
            El médico realiza la entrevista de manera libre, lo que le permite conectar y comunicarse mejor con el paciente.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              La IA procesa la información en tiempo real y está disponible para asistir cuando el médico lo requiera, sin interrumpir el flujo natural de la conversación.
            </p>
          </div>
        </div>

        {/* Asistencia de Crisal-IA en el Examen Físico */}
        {activeStep === 'examen' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ClipboardDocumentCheckIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">
                Asistencia de Crisal-IA en el Examen Físico
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-3">
                  Crisal-IA sugiere una rutina de examen físico basada en la anamnesis y los resultados de los exámenes paraclínicos. Esta sugerencia se presenta tanto por escrito como en formato de audio.
                </p>
                <div className="space-y-2">
                  {[
                    'Inspección general',
                    'Signos vitales',
                    'Examen de cabeza y cuello',
                    'Examen cardiovascular',
                    'Examen respiratorio',
                    'Examen abdominal',
                    'Examen neurológico'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="ml-3 text-sm text-gray-700">{item}</span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                        <MicrophoneIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  La IA analiza la información en tiempo real y puede recomendar ampliaciones según los hallazgos obtenidos.
                </p>
                <p className="text-sm text-gray-700">
                  El médico tiene la libertad de seguir las sugerencias, ajustarlas o realizar un examen más detallado según su criterio clínico.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveStep('analisis')}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Continuar al Análisis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Personalización de la Semaforización */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Personalización de la Semaforización y Notas en la Evaluación Clínica
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              El médico puede modificar en cualquier momento la semaforización de los formularios de anamnesis y examen físico, así como agregar notas adicionales según su criterio.
            </p>
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setSemaforizacion('red')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  semaforizacion === 'red'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                Rojo (3)
              </button>
              <button
                onClick={() => setSemaforizacion('yellow')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  semaforizacion === 'yellow'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
              >
                Amarillo (5)
              </button>
              <button
                onClick={() => setSemaforizacion('green')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  semaforizacion === 'green'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Verde (12)
              </button>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-2">
                {[
                  { texto: 'Dolor abdominal recurrente', color: 'red' },
                  { texto: 'Fatiga moderada', color: 'yellow' },
                  { texto: 'Sueño mejorado', color: 'green' }
                ].filter(item => semaforizacion === 'all' || semaforizacion === item.color).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        item.color === 'red' ? 'bg-red-600' :
                        item.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-600'
                      }`}></div>
                      <span className="text-sm text-gray-700">{item.texto}</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Análisis Integral del Paciente */}
        {activeStep === 'analisis' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <SparklesIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">
                Análisis Integral del Paciente y Estrategias Terapéuticas con IA
              </h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
                <p className="text-sm text-gray-700 mb-4">
                  Posterior a la entrega de la información del médico resultado de primer contacto con paciente:
                </p>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Crisal-IA presenta al médico una línea de tiempo del paciente en formato vertical, junto con un árbol de causas y estrategias terapéuticas.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>La IA analiza los signos y síntomas del paciente en tiempo real para generar simultáneamente diagnósticos de disfunción, diagnósticos semejantes según la clasificación CIE-10 y oportunidades terapéuticas.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>El enfoque de análisis de la IA se basa en un proceso inverso: inicia desde las soluciones terapéuticas hacia los signos y síntomas.</span>
                  </li>
                </ul>
              </div>

              {/* Línea de Tiempo */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Línea de Tiempo del Paciente</h3>
                <div className="space-y-3">
                  {[
                    { fecha: '2025-11-26', evento: 'Consulta actual', tipo: 'consulta' },
                    { fecha: '2025-11-20', evento: 'Inicio de síntomas', tipo: 'sintoma' },
                    { fecha: '2025-11-15', evento: 'Última consulta previa', tipo: 'consulta' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-3 h-3 rounded-full ${
                          item.tipo === 'consulta' ? 'bg-indigo-600' : 'bg-yellow-500'
                        }`}></div>
                        {idx < 2 && <div className="w-0.5 h-8 bg-gray-300 mt-1"></div>}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.evento}</p>
                        <p className="text-xs text-gray-500">{new Date(item.fecha).toLocaleDateString('es-CO')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Árbol de Causas */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Árbol de Causas y Estrategias Terapéuticas</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="font-medium text-gray-900">Disfunción Principal: Digestiva</div>
                    <div className="ml-4 space-y-1">
                      <div>→ Causa: Desequilibrio microbiota</div>
                      <div className="ml-4">→ Estrategia: Probióticos + Prebióticos</div>
                      <div>→ Causa: Sensibilidad alimentaria</div>
                      <div className="ml-4">→ Estrategia: Dieta de eliminación</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rastreo del Proceso Analítico */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Rastreo del Proceso Analítico hacia AMF
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  El médico puede rastrear el proceso analítico de la IA, lo que orienta hacia materiales de AMF y demás. (explicación del hilo conductor)
                </p>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  Ver Hilo Conductor del Análisis →
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveStep('diagnosticos')}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Continuar a Diagnósticos
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toma de Decisiones del Médico */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Toma de Decisiones del Médico y Estrategias Terapéuticas Personalizadas
          </h2>
          <p className="text-gray-600 mb-4">
            El médico analiza la información proporcionada por la IA y tiene la capacidad de aceptarla, rechazarla o editarla según su criterio clínico.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              'Prescripción de medicamentos y nutracéuticos',
              'Ejercicios de respiración e hidratación',
              'Pautas de alimentación con recetas',
              'Rutinas de ejercicio adaptadas',
              'Recomendaciones sobre hábitos de compra',
              'Estrategias de comportamiento',
              'Terapias complementarias',
              'Uso de dispositivos de monitoreo (CGM)',
              'Dispositivos portátiles (wearables)'
            ].map((estrategia, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{estrategia}</span>
                  <div className="flex space-x-1">
                    <button className="text-green-600 hover:text-green-700">
                      <CheckCircleIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gestión de Diagnósticos */}
        {activeStep === 'diagnosticos' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">
                Gestión de Diagnósticos por el Médico
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  El médico puede aceptar, rechazar o modificar los diagnósticos sugeridos por la IA mediante una lista de selección. Al activar un diagnóstico, asume plena responsabilidad como profesional tratante, validándolo según la Clasificación Internacional de Enfermedades (CIE-10) y los códigos de procedimientos y servicios (CUPS) con fines de facturación.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { codigo: 'K59.0', descripcion: 'Estreñimiento', tipo: 'CIE-10', sugerido: true },
                  { codigo: 'R53.1', descripcion: 'Debilidad', tipo: 'CIE-10', sugerido: true },
                  { codigo: 'G93.1', descripcion: 'Disfunción mitocondrial', tipo: 'CIE-10', sugerido: false }
                ].map((dx, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-mono text-sm font-medium text-gray-900 mr-2">{dx.codigo}</span>
                          {dx.sugerido && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              Sugerido por IA
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{dx.descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1">Tipo: {dx.tipo}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200">
                          Aceptar
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200">
                          Rechazar
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  <strong>Importante:</strong> El médico firma digitalmente conforme a los requisitos normativos de HC.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveStep('prescripcion')}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Continuar a Prescripción
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Registro y Trazabilidad de Procedimientos */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Registro y Trazabilidad de Procedimientos Médicos
          </h2>
          <p className="text-gray-600 mb-4">
            Si el médico realiza procedimientos dentro de su institución, como sueroterapia, toma de laboratorios u otros, estos deben registrarse conforme a la normativa vigente.
          </p>
          <div className="space-y-3">
            <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Registrar Procedimiento</p>
                  <p className="text-sm text-gray-500">Sueroterapia, toma de laboratorios, etc.</p>
                </div>
                <BeakerIcon className="h-6 w-6 text-indigo-600" />
              </div>
            </button>
            <p className="text-sm text-gray-600">
              Para garantizar la trazabilidad y el cumplimiento de los estándares clínicos y legales, se deben adicionar las notas correspondientes y las firmas digitales del personal de salud involucrado en cada proceso.
            </p>
          </div>
        </div>

        {/* Flujo para Prescripción */}
        {activeStep === 'prescripcion' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">
                Flujo para Prescripción
              </h2>
            </div>
            <div className="space-y-6">
              {/* Caja de Formulación */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Caja de Formulación de Medicamentos POS y NO POS
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Cristal-IA integrará una herramienta de formulación de medicamentos alopáticos, tanto POS como NO POS, con información completa y actualizada.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Buscar medicamento..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                      Buscar
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <strong>Búsqueda avanzada:</strong> Permite localizar medicamentos por nombre genérico, principio activo o nombre comercial.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recomendaciones Alopáticas */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Recomendaciones Alopáticas Basadas en Guías Clínicas
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Cristal-IA deberá proporcionar recomendaciones alopáticas para patologías que representen un riesgo vital, basándose en guías de práctica clínica oficiales.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <strong>Autonomía del médico:</strong> La herramienta permitirá al profesional revisar y seleccionar las recomendaciones para decidir si las adopta en la atención del paciente.
                  </p>
                </div>
              </div>

              {/* Prescripción de Nutrabiotics */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Prescripción de Nutrabiotics y OTCs
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  El médico puede prescribir nutracéuticos y productos de venta libre (OTCs) que serán redirigidos a ALIVIA para su compra.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> Se debe notificar al médico que la prescripción automatizada de OTC redirecciona a ALIVIA.
                  </p>
                </div>
              </div>

              {/* Conexión con ALIVIA */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Conexión Md-Pte con ALIVIA
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  La ET conecta al paciente y el Md con el dispensario para que pueda comprar sus fórmulas NB prescritas y gestionar beneficios.
                </p>
                <p className="text-sm text-gray-700">
                  Médico es informado de lo que compró el paciente en su cuenta del dispensario y podría hacer seguimiento de sus ingresos por paciente y beneficios por aliados mes a mes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botones de Acción Final */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Guardar Borrador
            </button>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Revisar Antes de Finalizar
              </button>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                Finalizar Consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Consulta;
