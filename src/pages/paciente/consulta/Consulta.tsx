import PacienteLayout from '../../../components/layout/PacienteLayout';
import { 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon, 
  VideoCameraIcon,
  ClipboardDocumentCheckIcon,
  SparklesIcon,
  UserGroupIcon,
  CheckCircleIcon,
  FingerPrintIcon,
  BeakerIcon,
  HeartIcon,
  FireIcon,
  SunIcon,
  UserIcon,
  ShoppingBagIcon,
  LinkIcon,
  BellIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Consulta = () => {
  const [tipoConsulta, setTipoConsulta] = useState<'presencial' | 'virtual' | null>(null);
  const [consentimientoAceptado, setConsentimientoAceptado] = useState(false);
  const [etSeleccionada, setEtSeleccionada] = useState<string | null>(null);

  const estrategiasTerapeuticas = [
    { id: 'prescripcion', nombre: 'Prescripción', icon: BeakerIcon, subcategorias: ['Medicamentos', 'Nutraceuticos', 'Suplementos'] },
    { id: 'ejercicios', nombre: 'Ejercicios', icon: FireIcon, subcategorias: ['Respiración', 'Cardiovasculares', 'Hipertrofia', 'Deporte', 'Estiramientos', 'Yoga'] },
    { id: 'hidratacion', nombre: 'Hidratación', icon: HeartIcon, subcategorias: ['Pautas de consumo'] },
    { id: 'alimentacion', nombre: 'Alimentación', icon: SunIcon, subcategorias: ['Recetas saludables'] },
    { id: 'espiritual', nombre: 'Oración y Bienestar Espiritual', icon: UserIcon, subcategorias: ['Prácticas espirituales'] },
    { id: 'social', nombre: 'Ejercicios Sociales', icon: UserGroupIcon, subcategorias: ['Interacción social'] },
    { id: 'habitos', nombre: 'Modificación de Hábitos', icon: SparklesIcon, subcategorias: ['Compras saludables', 'Cambios socio-familiares', 'Gestión emocional'] },
    { id: 'adicionales', nombre: 'Recomendaciones Adicionales', icon: DocumentTextIcon, subcategorias: ['Lecturas', 'Acupresión', 'Saunoterapia'] },
    { id: 'paraclinicos', nombre: 'Próximos Exámenes', icon: ClipboardDocumentCheckIcon, subcategorias: ['Paraclínicos', 'Monitoreo glucosa'] },
    { id: 'seguimiento', nombre: 'Seguimiento', icon: BellIcon, subcategorias: ['Fecha próxima consulta', 'Wearables'] }
  ];

  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Consulta Médica
          </h1>
          <p className="text-gray-600 mb-6">
            Accede a diferentes tipos de consultas y servicios médicos personalizados
          </p>

          {/* Nota sobre Activación */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <BellIcon className="h-5 w-5 inline mr-2 text-blue-600" />
              <strong>Nota:</strong> Se notifica a paciente que está lista ET (Estrategia Terapéutica) para que ingrese a Crisal-IA.
            </p>
          </div>

          {/* Selección de Tipo de Consulta */}
          {!tipoConsulta && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Selecciona el Tipo de Consulta
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div 
                  className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-indigo-300 transition-all"
                  onClick={() => setTipoConsulta('presencial')}
                >
                  <UserGroupIcon className="h-12 w-12 text-indigo-600 mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Consulta Presencial
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Asiste a una valoración con el médico funcional en nuestras instalaciones
                  </p>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Seleccionar Presencial
                  </button>
                </div>

                <div 
                  className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-indigo-300 transition-all"
                  onClick={() => setTipoConsulta('virtual')}
                >
                  <VideoCameraIcon className="h-12 w-12 text-indigo-600 mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Teleconsulta Virtual
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Consulta médica desde la comodidad de tu hogar mediante videollamada
                  </p>
                  <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Seleccionar Virtual
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Consulta Presencial */}
          {tipoConsulta === 'presencial' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Consulta Presencial
                </h2>
                <p className="text-gray-700 mb-4">
                  El paciente asiste a una valoración con el médico funcional, donde se lleva a cabo:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Interacción personalizada, adaptada a su historial clínico y necesidades y área espiritual.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Examen físico, según la evaluación clínica requerida y asesorada por IA.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Análisis detallado de signos, síntomas y resultados previos.</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Resultados y Recomendaciones</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Tras la consulta, el paciente recibe a través de los canales de comunicación autorizados:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Prescripción de estrategias terapéuticas basadas en el enfoque funcional.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Recomendaciones personalizadas de estilo de vida, nutrición y suplementación.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Orden de exámenes adicionales o de control, si es necesario.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Remisiones a otros especialistas o servicios de apoyo, en caso de requerirse.</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Esta información se entrega de manera clara y accesible para garantizar la continuidad del tratamiento y el seguimiento adecuado.
                </p>
              </div>
            </div>
          )}

          {/* Consulta Virtual */}
          {tipoConsulta === 'virtual' && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Teleconsulta Virtual
                </h2>
                <p className="text-gray-700 mb-4">
                  El paciente accede al enlace de la herramienta para teleconsulta mediante videollamada.
                </p>
              </div>

              {/* Consentimiento Informado */}
              {!consentimientoAceptado && (
                <div className="border-2 border-yellow-300 rounded-lg p-6 bg-yellow-50">
                  <div className="flex items-start mb-4">
                    <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Consentimiento Informado Antes de la Consulta
                      </h3>
                      <p className="text-sm text-gray-700 mb-4">
                        10 minutos antes del inicio de la teleconsulta, se solicitará al paciente la aceptación del consentimiento informado, el cual incluirá:
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Explicación detallada sobre el funcionamiento de la consulta mediante Tecnologías de la Información y Comunicación (TIC).</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Alcance, riesgos y beneficios del servicio.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Responsabilidades del paciente y del médico en la teleconsulta.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Privacidad, confidencialidad y tratamiento de datos personales.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Registro del consentimiento en la historia clínica mediante:</span>
                      </li>
                      <li className="ml-7 flex items-start">
                        <span className="mr-2">•</span>
                        <span>Aprobación por medios biométricos (reconocimiento facial o huella digital).</span>
                      </li>
                      <li className="ml-7 flex items-start">
                        <span className="mr-2">•</span>
                        <span>Firma digital del paciente.</span>
                      </li>
                      <li className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>En caso de negativa, se redireccionará al paciente a una consulta presencial, reactivando automáticamente el módulo de agendamiento.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setConsentimientoAceptado(true)}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium flex items-center justify-center"
                    >
                      <FingerPrintIcon className="h-5 w-5 mr-2" />
                      Aceptar con Biométrico
                    </button>
                    <button
                      onClick={() => setConsentimientoAceptado(true)}
                      className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium flex items-center justify-center"
                    >
                      <DocumentTextIcon className="h-5 w-5 mr-2" />
                      Firmar Digitalmente
                    </button>
                  </div>
                </div>
              )}

              {/* Ejecución de Teleconsulta */}
              {consentimientoAceptado && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 mb-2" />
                    <p className="font-medium text-gray-900">Consentimiento Aceptado</p>
                    <p className="text-sm text-gray-600 mt-1">Puedes proceder con la teleconsulta</p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Ejecución de la Teleconsulta</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      La consulta se realizará a través de plataformas de videollamada compatibles con la Resolución 2654 de 2019 del Ministerio de Salud y Protección Social, como:
                    </p>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <p className="font-medium text-gray-900">Google Meet</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <p className="font-medium text-gray-900">Zoom</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <p className="font-medium text-gray-900">Otras plataformas compatibles</p>
                      </div>
                    </div>
                    <button className="mt-4 w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
                      Iniciar Videollamada
                    </button>
                  </div>

                  {/* Sala de Espera Digital */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Sala de Espera Digital</h3>
                    <p className="text-sm text-gray-700">
                      En la herramienta de teleconsulta se presentará una sala de espera digital que permitirá gestionar a los pacientes agendas, en caso de que el enlace del médico se demore en la atención de la consulta anterior, la IA entregará explicaciones al paciente y le solicitará ser paciente, suministrará videos educativos.
                    </p>
                  </div>
                </div>
              )}

              {/* Resultados y Recomendaciones Virtual */}
              {consentimientoAceptado && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Resultados y Recomendaciones</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Al finalizar la consulta, el paciente recibirá a través de los canales de comunicación autorizados:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Prescripción de estrategias terapéuticas adaptadas a su caso.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Recomendaciones personalizadas en salud y bienestar.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Órdenes de exámenes adicionales o de control, si es necesario.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Remisiones a otros especialistas o servicios de apoyo, en caso de requerirse.</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">
                    Esta información será enviada de manera clara y segura para garantizar la continuidad del tratamiento y el seguimiento adecuado.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Menú de Estrategias Terapéuticas */}
          {(tipoConsulta === 'presencial' || consentimientoAceptado) && (
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Menú de Estrategias Terapéuticas (ET) Personalizadas
                </h2>
                <p className="text-sm text-gray-700">
                  Cada rubro del menú abre una descripción detallada correspondiente a la Estrategia Terapéutica (ET) recomendada para el paciente.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {estrategiasTerapeuticas.map((et) => {
                  const Icon = et.icon;
                  return (
                    <div
                      key={et.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        etSeleccionada === et.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => setEtSeleccionada(etSeleccionada === et.id ? null : et.id)}
                    >
                      <div className="flex items-center mb-3">
                        <Icon className="h-6 w-6 text-indigo-600 mr-2" />
                        <h3 className="font-semibold text-gray-900">{et.nombre}</h3>
                      </div>
                      {etSeleccionada === et.id && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs font-medium text-gray-700 mb-2">Incluye:</p>
                          <ul className="space-y-1">
                            {et.subcategorias.map((sub, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-start">
                                <span className="mr-1">•</span>
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                          {et.id === 'prescripcion' && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center text-xs text-indigo-600">
                                <LinkIcon className="h-4 w-4 mr-1" />
                                <span>Links para compra online vía ALIVIA, AMF, Fundanatura</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Integración con ALIVIA */}
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ShoppingBagIcon className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Integración de Crisal-iA con la plataforma ALIVIA
                    </h3>
                    <p className="text-sm text-gray-700">
                      Crisal-iA se integra con ALIVIA, permitiendo que desde el módulo de formulación se redireccione automáticamente al carrito de compras de esta plataforma. De esta manera, el paciente puede realizar el pago y gestionar la logística de sus productos directamente dentro de la WebApp de ALIVIA.
                    </p>
                    <button className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
                      Ir a ALIVIA
                    </button>
                  </div>
                </div>
              </div>

              {/* Seguimiento con Wearables */}
              <div className="mt-6 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Seguimiento con Wearables</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Se podrá recomendar la adquisición de un wearable para el seguimiento de ciertos parámetros fisiológicos, según indicación del médico.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>El médico tendrá la posibilidad de agregar estrategias personalizadas según las necesidades específicas del paciente.</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  Dentro de cada rubro habrá además de la descripción detallada de las recomendaciones correspondientes, links de interés para compra online vía ALIVIA, AMF, Fundanatura y otros aliados.
                </p>
              </div>
            </div>
          )}

          {/* Otras Opciones */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Otros Servicios
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-200 rounded-lg">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Asesorías Médicas Rápidas
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Resuelve dudas puntuales con nuestros médicos
                </p>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                  Solicitar Asesoría
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <DocumentTextIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Prescripción de Exámenes
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Visualiza y descarga tus prescripciones médicas
                </p>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                  Ver Exámenes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Consulta;
