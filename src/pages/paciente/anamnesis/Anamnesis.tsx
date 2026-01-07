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
import { useState, useEffect } from 'react';
import InterrogatorioFormulario from './InterrogatorioFormulario';
import interrogatorioService from '../../../services/interrogatorioService';
import { useAlert } from '../../../context/AlertContext';

const Anamnesis = () => {
  const { error, success } = useAlert();
  const [activeTab, setActiveTab] = useState<'interrogatorio' | 'recomendaciones' | 'paraclinicos'>('interrogatorio');
  const [interrogatorioCompletado, setInterrogatorioCompletado] = useState(false);
  const [progresoInterrogatorio, setProgresoInterrogatorio] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [interrogatorioId, setInterrogatorioId] = useState<string | undefined>();
  const [interrogatorioData, setInterrogatorioData] = useState<any>(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    cargarInterrogatorioActivo();
  }, []);

  useEffect(() => {
    if (interrogatorioCompletado && interrogatorioId && (!interrogatorioData?.analisisIA)) {
      cargarInterrogatorioCompleto();
    }
  }, [interrogatorioCompletado, interrogatorioId]);

  const cargarInterrogatorioActivo = async () => {
    try {
      const interrogatorios = await interrogatorioService.obtenerInterrogatorios('primera_vez');
      const completados = interrogatorios.filter(i => i.estado === 'completado');
      const enProceso = interrogatorios.filter(i => i.estado === 'en_proceso');
      
      if (completados.length > 0) {
        const completado = completados[0];
        setInterrogatorioId(completado._id);
        setProgresoInterrogatorio(completado.progreso || 100);
        setInterrogatorioCompletado(true);
        // Si ya tiene análisis IA, usar esos datos directamente
        if (completado.analisisIA) {
          setInterrogatorioData(completado);
        } else {
          // Si no tiene análisis, cargar el completo para asegurarnos
          setInterrogatorioData(completado);
          cargarInterrogatorioCompleto();
        }
      } else if (enProceso.length > 0) {
        const activo = enProceso[0];
        setInterrogatorioId(activo._id);
        setProgresoInterrogatorio(activo.progreso || 0);
      }
    } catch (err: any) {
      // No mostrar error si no hay interrogatorios
      console.log('No hay interrogatorios activos');
    }
  };

  const cargarInterrogatorioCompleto = async () => {
    if (!interrogatorioId) return;
    
    try {
      const data = await interrogatorioService.obtenerInterrogatorio(interrogatorioId);
      setInterrogatorioData(data);
    } catch (err: any) {
      console.error('Error al cargar interrogatorio completo:', err);
    }
  };

  const handleComenzarInterrogatorio = async () => {
    try {
      const data = await interrogatorioService.crearInterrogatorio({ tipo: 'primera_vez' });
      setInterrogatorioId(data._id);
      setMostrarFormulario(true);
      setProgresoInterrogatorio(0);
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al iniciar el interrogatorio');
    }
  };

  const handleCompletarInterrogatorio = () => {
    setInterrogatorioCompletado(true);
    setProgresoInterrogatorio(100);
    setMostrarFormulario(false);
    cargarInterrogatorioActivo();
  };

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false);
  };

  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Anamnesis y Formulario
          </h1>

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
              {mostrarFormulario ? (
                <InterrogatorioFormulario
                  interrogatorioId={interrogatorioId}
                  onCompletar={handleCompletarInterrogatorio}
                  onCancelar={handleCancelarFormulario}
                />
              ) : (
                <>
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
                      {interrogatorioCompletado ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          <span className="font-medium">Completado</span>
                        </div>
                      ) : (
                        <button 
                          onClick={handleComenzarInterrogatorio}
                          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
                        >
                          {interrogatorioId ? 'Continuar Interrogatorio' : 'Comenzar Interrogatorio Escrito'}
                        </button>
                      )}
                    </div>

                    <div className="p-6 border-2 border-indigo-200 rounded-lg bg-indigo-50">
                      <PhoneIcon className="h-12 w-12 text-indigo-600 mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                        Interrogatorio con Llamada IA Mozart
                      </h3>
                      <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                        Iniciar Llamada con IA Mozart
                      </button>
                    </div>
                  </div>
                </>
              )}

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
                  {progresoInterrogatorio === 100 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <CheckCircleIcon className="h-5 w-5 inline mr-2" />
                        Interrogatorio completado
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* Tab: Recomendaciones Automatizadas */}
          {activeTab === 'recomendaciones' && (
            <div className="space-y-6">

              {interrogatorioCompletado && interrogatorioData?.analisisIA ? (
                <>
                  {/* Análisis de la IA */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start mb-4">
                      <SparklesIcon className="h-8 w-8 text-indigo-600 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Análisis Generado por Crisal-IA
                        </h3>
                        <div className="prose max-w-none">
                          <p className="text-gray-700 whitespace-pre-wrap">
                            {interrogatorioData.analisisIA}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Objetivos */}
                  {interrogatorioData.objetivos && interrogatorioData.objetivos.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
                        Objetivos de Salud Identificados
                      </h3>
                      <ul className="space-y-2">
                        {interrogatorioData.objetivos.map((objetivo: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{objetivo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Observaciones */}
                  {interrogatorioData.observacionesIA && interrogatorioData.observacionesIA.length > 0 && (
                    <div className="border border-yellow-200 rounded-lg p-6 bg-yellow-50">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-2" />
                        Observaciones de la IA
                      </h3>
                      <ul className="space-y-2">
                        {interrogatorioData.observacionesIA.map((obs: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{obs}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : interrogatorioCompletado ? (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="text-center py-8">
                    <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">El análisis con IA aún no está disponible</p>
                    <button
                      onClick={async () => {
                        if (!interrogatorioId) return;
                        try {
                          setGuardando(true);
                          const data = await interrogatorioService.generarAnalisisIA(interrogatorioId);
                          setInterrogatorioData(data);
                          success('Análisis generado exitosamente');
                        } catch (err: any) {
                          error(err.response?.data?.message || 'Error al generar el análisis');
                        } finally {
                          setGuardando(false);
                        }
                      }}
                      disabled={guardando}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {guardando ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                          Generando análisis...
                        </>
                      ) : (
                        <>
                          <SparklesIcon className="h-5 w-5 inline mr-2" />
                          Analizar con IA
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="text-center py-8">
                    <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Completa el interrogatorio para ver el análisis automatizado</p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Tab: Carga de Paraclínicos */}
          {activeTab === 'paraclinicos' && (
            <div className="space-y-6">
              <div className="border-2 border-indigo-300 rounded-lg p-6 bg-indigo-50">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <button className="p-4 bg-white border-2 border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all">
                    <CloudArrowUpIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Cargar un archivo</p>
                  </button>
                  <button className="p-4 bg-white border-2 border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all">
                    <ChatBubbleLeftRightIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Tomar una foto</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Anamnesis;
