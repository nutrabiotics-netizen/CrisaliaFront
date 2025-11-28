import PacienteLayout from '../../../components/layout/PacienteLayout';
import { 
  DocumentTextIcon, 
  PhoneIcon, 
  BellIcon, 
  CloudArrowUpIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Anamnesis = () => {
  const [activeTab, setActiveTab] = useState<'interrogatorio' | 'recomendaciones' | 'paraclinicos'>('interrogatorio');
  const [interrogatorioCompletado, setInterrogatorioCompletado] = useState(false);
  const [progresoInterrogatorio, setProgresoInterrogatorio] = useState(0);

  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Anamnesis y Formulario
          </h1>
          <p className="text-gray-600 mb-6">
            Completa tus cuestionarios médicos de forma interactiva con asistencia de IA
          </p>

          {/* Nota sobre IA */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> La IA buscará incoherencias en la información suministrada durante todo el interrogatorio y solicitará al paciente aclarar la información. La IA actualizará su memoria para cada paciente con cada interacción, aprendiendo cada vez más, de tal manera que el paciente sienta que se establece una relación con Crisal-iA.
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('interrogatorio')}
                className={`${
                  activeTab === 'interrogatorio'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                Interrogatorio
              </button>
              <button
                onClick={() => setActiveTab('recomendaciones')}
                className={`${
                  activeTab === 'recomendaciones'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <SparklesIcon className="h-5 w-5 inline mr-2" />
                Recomendaciones IA
              </button>
              <button
                onClick={() => setActiveTab('paraclinicos')}
                className={`${
                  activeTab === 'paraclinicos'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <CloudArrowUpIcon className="h-5 w-5 inline mr-2" />
                Paraclínicos
              </button>
            </nav>
          </div>

          {/* Tab: Interrogatorio */}
          {activeTab === 'interrogatorio' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Opciones de Interrogatorio
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Elige la forma en que prefieres completar tu anamnesis médica. Puedes hacerlo de forma escrita o mediante una llamada con nuestra IA Mozart.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className={`p-6 border-2 rounded-lg transition-all ${
                  !interrogatorioCompletado 
                    ? 'border-gray-200 hover:border-indigo-300' 
                    : 'border-green-300 bg-green-50'
                }`}>
                  <DocumentTextIcon className={`h-12 w-12 mb-4 ${
                    interrogatorioCompletado ? 'text-green-600' : 'text-indigo-600'
                  }`} />
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    Interrogatorio en Formulario Escrito
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Completa el cuestionario de forma escrita paso a paso. La IA te guiará y verificará la coherencia de tus respuestas.
                  </p>
                  {interrogatorioCompletado ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      <span className="font-medium">Completado</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        setInterrogatorioCompletado(true);
                        setProgresoInterrogatorio(100);
                      }}
                      className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
                    >
                      Comenzar Interrogatorio Escrito
                    </button>
                  )}
                </div>

                <div className="p-6 border-2 border-indigo-200 rounded-lg bg-indigo-50">
                  <PhoneIcon className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    Interrogatorio con Llamada IA Mozart
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Responde las preguntas mediante una llamada telefónica con nuestra IA especializada. La conversación será natural y fluida.
                  </p>
                  <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                    Iniciar Llamada con IA Mozart
                  </button>
                </div>
              </div>

              {/* Barra de Progreso */}
              {progresoInterrogatorio > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Progreso del Interrogatorio</span>
                    <span className="font-medium text-indigo-600">{progresoInterrogatorio}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progresoInterrogatorio}%` }}
                    ></div>
                  </div>
                  {progresoInterrogatorio === 50 && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <ExclamationTriangleIcon className="h-5 w-5 inline mr-2" />
                        Has completado el 50% del interrogatorio. La IA ha identificado tus objetivos principales.
                      </p>
                    </div>
                  )}
                  {progresoInterrogatorio === 100 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <CheckCircleIcon className="h-5 w-5 inline mr-2" />
                        ¡Interrogatorio completado! Revisa tus recomendaciones automatizadas.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Notificaciones */}
              {interrogatorioCompletado && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BellIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    Notificaciones de Análisis
                  </h2>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start">
                        <SparklesIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Análisis completado por Crisal-IA</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Tu cuestionario ha sido analizado. Revisa las recomendaciones automatizadas basadas en Medicina Funcional.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: Recomendaciones Automatizadas */}
          {activeTab === 'recomendaciones' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Recomendación Automatizada
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Como parte de su labor social y primer atractivo para el paciente (que aún no ha pagado), la IA procesa la información suministrada, utilizando su entrenamiento en Medicina Funcional y considerando el contexto social, cultural y demográfico del paciente.
                </p>
              </div>

              {/* Análisis de la IA */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <SparklesIcon className="h-8 w-8 text-indigo-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      A partir de este análisis, la IA genera:
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span><strong>Primeras observaciones</strong> sobre posibles disfunciones y posibles rutas terapéuticas recomendadas.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span><strong>Sugerencias de OTC</strong> (opción que podrá ser modificada por el médico elegido).</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span><strong>Recomendaciones de estilo de vida</strong> adaptadas a las necesidades del paciente.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span><strong>Estrategias funcionales personalizadas</strong> para la mejora de su estado de salud (Fundanatura).</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Enfoque y Seguimiento */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Enfoque y Seguimiento:</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Se indicará al paciente <strong>INICIAR</strong> una estrategia con OTC, pero se le sugerirá <strong>CONTINUAR</strong> con una consulta con su médico funcional para monitoreo y ajuste del tratamiento.
                </p>
                <p className="text-sm text-gray-700">
                  Como parte del compromiso social de CRISAL-IA, todos los pacientes tendrán la oportunidad de actualizar su interrogatorio cada mes, permitiéndoles obtener nuevas recomendaciones automatizadas en función de su evolución y necesidades.
                </p>
              </div>

              {/* Llamado a la Acción */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  ¿Quieres pagar y agendar tu cita?
                </h3>
                <p className="text-center text-gray-700 mb-4">
                  "Tu salud merece un enfoque integral. Continúa con tu médico funcional y transforma tu bienestar."
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium">
                    Sí, Continuar
                  </button>
                  <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 font-medium">
                    No, Gracias
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Carga de Paraclínicos */}
          {activeTab === 'paraclinicos' && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Carga de Paraclínicos Anteriores
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Disponibilidad:</strong> La plataforma de carga de documentos se desbloquea posterior al pago.
                </p>
                <p className="text-sm text-gray-600">
                  Si el paciente cuenta con resultados de laboratorios recientes, imágenes diagnósticas u otros estudios paraclínicos, la IA habilitará una herramienta intuitiva para la carga de estos documentos.
                </p>
              </div>

              {/* Formatos Soportados */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Formatos Soportados:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                    PDF, documentos escaneados o digitalizados
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                    Fotografías de documentos impresos o capturas de pantalla
                  </li>
                </ul>
              </div>

              {/* Gestión y Organización */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Gestión y Organización de Documentos:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Los documentos serán organizados cronológicamente en la Historia Clínica Electrónica.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>La IA verificará y cotejará los resultados con los rangos y notaciones utilizados en Medicina Funcional.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>En caso de incompatibilidad, el sistema realizará conversiones automáticas para presentar los resultados en las unidades de medida utilizadas en el país de residencia del médico tratante.</span>
                  </li>
                </ul>
              </div>

              {/* Análisis y Seguimiento */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Análisis y Seguimiento de la Evolución:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>La IA analizará la información y la vinculará con la anamnesis y el enfoque funcional del paciente.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Se implementará una herramienta de seguimiento y comparación de la evolución del paciente.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Se mostrarán los datos en tablas y gráficos interactivos, permitiendo visualizar tendencias en los valores de los exámenes.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Se utilizará un sistema de semaforización para indicar cambios relevantes en los resultados nuevos y previos, facilitando la interpretación clínica.</span>
                  </li>
                </ul>
              </div>

              {/* Opciones de Carga */}
              <div className="border-2 border-indigo-300 rounded-lg p-6 bg-indigo-50">
                <h3 className="font-semibold text-gray-900 mb-4">Opciones de Carga de Documentos</h3>
                <p className="text-sm text-gray-600 mb-4">
                  El sistema será muy intuitivo y ofrecerá dos opciones para subir los archivos:
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <button className="p-4 bg-white border-2 border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all">
                    <CloudArrowUpIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Cargar un archivo</p>
                    <p className="text-sm text-gray-500 mt-1">(en cualquier formato compatible)</p>
                  </button>
                  <button className="p-4 bg-white border-2 border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all">
                    <ChatBubbleLeftRightIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Tomar una foto</p>
                    <p className="text-sm text-gray-500 mt-1">del documento impreso o captura de pantalla</p>
                  </button>
                </div>
              </div>

              {/* Requisito para Agendamiento */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Requisito para Agendamiento de Cita</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Se informará al paciente que es completamente necesario entregar los resultados de los exámenes paraclínicos obligatorios en formato digital.</span>
                  </li>
                  <li className="flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Solo después de la carga y verificación de estos documentos en la plataforma, se podrá continuar con el agendamiento de la cita de control.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Segundo Cuestionario de Control */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Segundo Cuestionario en Preconsulta de Control
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                CRISAL-IA realiza un segundo cuestionario de control y lleva a cabo un análisis detallado basado en la información previa del paciente.
              </p>
              <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                Completar Cuestionario de Control
              </button>
            </div>
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Anamnesis;
