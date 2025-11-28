import PacienteLayout from '../../../components/layout/PacienteLayout';
import { 
  BellIcon, 
  ShoppingBagIcon, 
  DevicePhoneMobileIcon,
  SparklesIcon,
  CameraIcon,
  LightBulbIcon,
  CalendarIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LinkIcon,
  ChartBarIcon,
  ClockIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const SeguimientoIA = () => {
  const [activeSection, setActiveSection] = useState<'preventivo' | 'activo' | 'control' | 'continuidad'>('preventivo');

  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Seguimiento IA
          </h1>
          <p className="text-gray-600 mb-6">
            Herramientas inteligentes para tu seguimiento de salud y bienestar
          </p>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveSection('preventivo')}
                className={`${
                  activeSection === 'preventivo'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <BellIcon className="h-5 w-5 inline mr-2" />
                Seguimiento Preventivo
              </button>
              <button
                onClick={() => setActiveSection('activo')}
                className={`${
                  activeSection === 'activo'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <ShoppingBagIcon className="h-5 w-5 inline mr-2" />
                Paciente Activo
              </button>
              <button
                onClick={() => setActiveSection('control')}
                className={`${
                  activeSection === 'control'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <CalendarIcon className="h-5 w-5 inline mr-2" />
                Cita de Control
              </button>
              <button
                onClick={() => setActiveSection('continuidad')}
                className={`${
                  activeSection === 'continuidad'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <SparklesIcon className="h-5 w-5 inline mr-2" />
                Continuidad
              </button>
            </nav>
          </div>

          {/* Seguimiento Preventivo */}
          {activeSection === 'preventivo' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Módulo de Seguimiento Preventivo a Pacientes
                </h2>
                <p className="text-sm text-gray-700">
                  Sistema inteligente que mantiene contacto continuo con los pacientes para garantizar su bienestar y adherencia al tratamiento.
                </p>
              </div>

              {/* Notificaciones */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <BellIcon className="h-8 w-8 text-indigo-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Notificaciones a Médico y Paciente
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Desde este punto es obligatorio la activación de notificaciones a paciente y médico por medio AppMóvil y WebApp vinculadas sincrónicamente con Chat de WhatsApp (comunicación en tiempo real).
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-gray-900">Notificación: Recordatorio de Cita</p>
                    <p className="text-sm text-gray-600 mt-1">Tu cita de control está programada para el 10 de Diciembre</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-gray-900">Notificación: Análisis Completado</p>
                    <p className="text-sm text-gray-600 mt-1">La IA ha analizado tu evolución. Revisa las recomendaciones.</p>
                  </div>
                </div>
              </div>

              {/* Integraciones */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <ShoppingBagIcon className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Integración con Alivia
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Seguimiento de compra de productos prescritos
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                    Ver Compras
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <DevicePhoneMobileIcon className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Seguimiento de Wearables
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Conecta tus dispositivos inteligentes
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                    Conectar Dispositivo
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-indigo-50">
                  <SparklesIcon className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Agente Cuidador IA
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Tu coach digital personalizado
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                    Activar Coach
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <CameraIcon className="h-8 w-8 text-indigo-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Evaluación Visual de Alimentos IA
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Analiza tus alimentos con inteligencia artificial
                  </p>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                    Evaluar Alimento
                  </button>
                </div>
              </div>

              {/* Seguimiento Inteligente */}
              <div className="border-t border-gray-200 pt-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <SparklesIcon className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Seguimiento Inteligente y Predictivo
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Crisal-IA analiza tus datos para predecir y prevenir problemas de salud:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Predicciones basadas en tu historial clínico</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Alertas preventivas personalizadas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sugerencias para mantener tu salud óptima</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sugerencias Preventivas */}
              <div className="border-t border-gray-200 pt-6">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <LightBulbIcon className="h-8 w-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Sugerencias Preventivas
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Recibe recomendaciones personalizadas para mantener tu salud:
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="font-medium text-gray-900 text-sm">Recomendación de Ejercicio</p>
                      <p className="text-xs text-gray-600 mt-1">Basado en tu perfil, se sugiere caminar 30 minutos diarios</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="font-medium text-gray-900 text-sm">Recordatorio de Hidratación</p>
                      <p className="text-xs text-gray-600 mt-1">Mantén una hidratación adecuada durante el día</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paciente Activo */}
          {activeSection === 'activo' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Paciente Activo
                </h2>
                <p className="text-sm text-gray-700">
                  Gestiona tus compras, dispositivos y seguimiento activo de tu tratamiento.
                </p>
              </div>

              {/* Compras */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ShoppingBagIcon className="h-8 w-8 text-indigo-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Compras de Productos Prescritos</h3>
                      <p className="text-sm text-gray-600">Paciente compra suplementos, nutraceuticos, alimentos funcionales o medicamentos</p>
                    </div>
                  </div>
                  <LinkIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Omega-3 Premium</p>
                        <p className="text-xs text-gray-500">Prescrito por Dr. Juan Pérez</p>
                      </div>
                      <button className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700">
                        Comprar en ALIVIA
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Multivitamínico Funcional</p>
                        <p className="text-xs text-gray-500">Prescrito por Dr. Juan Pérez</p>
                      </div>
                      <button className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700">
                        Comprar en ALIVIA
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wearables */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <DevicePhoneMobileIcon className="h-8 w-8 text-indigo-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Wearables Conectados</h3>
                      <p className="text-sm text-gray-600">Paciente compra wearable indicado y lo conecta con el software</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Apple Watch Series 9</p>
                        <p className="text-xs text-gray-500">Conectado - Monitoreo activo</p>
                      </div>
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Lista de wearables compatibles con Crisal-IA:</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Apple Watch</li>
                      <li>• Fitbit</li>
                      <li>• Garmin</li>
                      <li>• Samsung Galaxy Watch</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Integración ALIVIA */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <LinkIcon className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Integración con ALIVIA
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Crisal-iA se integra con ALIVIA, permitiendo que desde el módulo de formulación se redireccione automáticamente al carrito de compras de esta plataforma. De esta manera, el paciente puede realizar el pago y gestionar la logística de sus productos directamente dentro de la WebApp de ALIVIA.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
                      Ir a ALIVIA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cita de Control */}
          {activeSection === 'control' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Seguimiento y Recordatorio para la Cita de Control
                </h2>
                <p className="text-sm text-gray-700">
                  Después de terminar la primera cita, CRISAL-IA iniciará un conteo y faltando 2 semanas se pondrá en contacto con el paciente para recordarle que se acerca la fecha de su cita de control, invitando de manera voluntaria, a activar el módulo de agendamiento para seleccionar la fecha de su segunda consulta, facilitará la programación de la nueva cita para garantizar la continuidad del tratamiento (en caso de negativa será insistente hasta que se desactiven las notificaciones).
                </p>
              </div>

              {/* Recordatorios */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <BellIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  Recordatorios de Cita de Control
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start">
                      <ClockIcon className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Recordatorio: 2 semanas antes</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Tu cita de control está programada para el 10 de Diciembre, 2025. Te recomendamos agendar tu cita ahora.
                        </p>
                        <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                          Agendar Ahora
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Recordatorio: 1 semana antes</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Faltan 7 días para tu cita de control. Recuerda cargar tus exámenes paraclínicos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carga de Paraclínicos de Control */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CloudArrowUpIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  Carga de Paraclínicos de Control
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Requisito:</strong> Si el médico indicó toma de paraclínicos de control, es deber del paciente cargar en la plataforma los resultados marcados como obligatorios para que se active la opción de agendar nueva cita de seguimiento.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Hemograma Completo</p>
                        <p className="text-xs text-gray-500">Obligatorio - Pendiente</p>
                      </div>
                      <button className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700">
                        Subir Resultado
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Perfil Lipídico</p>
                        <p className="text-xs text-gray-500">Obligatorio - Completado</p>
                      </div>
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Análisis de Proceso */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <ChartBarIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  Análisis de Proceso
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  La IA ofrece segundo paquete de cita de seguimiento a paciente, sugiriendo ventajas y la importancia de seguimiento:
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <p className="font-medium text-gray-900">1. Análisis de proceso</p>
                    <p className="text-sm text-gray-600">Para lograr que paciente entienda cómo ha evolucionado su proceso (antes y después).</p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <p className="font-medium text-gray-900">2. Cita médica de control</p>
                    <p className="text-sm text-gray-600">Para ajustar el tratamiento según tu evolución.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continuidad del Ciclo */}
          {activeSection === 'continuidad' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Continuidad del Ciclo de Atención
                </h2>
                <p className="text-sm text-gray-700">
                  El sistema está diseñado para mantener un ciclo continuo de atención y seguimiento de tu salud.
                </p>
              </div>

              {/* Notas Importantes */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Notas Importantes:</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">Tiempo Límite para Control</p>
                    <p className="text-sm text-gray-700">
                      Se indica a paciente fecha límite de tiempo para asistir a control, en caso de sobrepasar "x" tiempo se indica que será necesario revaloración inicial con un costo diferente. Paciente recibe notificaciones que le recuerdan pagar su control y agendar a tiempo, y si aplica, enviar a tiempo sus resultados de paraclínicos de control.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">Inconformidad con Componente IA</p>
                    <p className="text-sm text-gray-700">
                      En caso de inconformidad de paciente con el componente IA: se activará solicitud a médico para evaluar la situación de manera personal en preconsulta o primera cita médica.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">Inconformidad con Médico</p>
                    <p className="text-sm text-gray-700">
                      En caso de inconformidad del paciente con médico seleccionado: se ofrecerá segunda opinión o valoración con otro médico.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">Inconformidad con Sistema</p>
                    <p className="text-sm text-gray-700">
                      En caso de inconformidad del paciente con sistema Crisal-IA: se activará ChatBot de soporte, si aún continúa el inconveniente se redireccionará a administradores del SW.
                    </p>
                  </div>
                </div>
              </div>

              {/* Medicina Preventiva */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Medicina Preventiva</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Crisal-iA entenderá medicina preventiva para este paciente que no continuó, mediante su ChatBot le recordará estar haciendo chequeos de control, esto servirá para reconquistar.
                </p>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <SparklesIcon className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Recordatorio Preventivo</p>
                      <p className="text-sm text-gray-600">Te recordamos la importancia de mantener chequeos regulares de salud</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Oferta de Segundo Paquete */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                <div className="flex items-start">
                  <GiftIcon className="h-8 w-8 text-yellow-600 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      ¿Deseas Continuar con tu Seguimiento?
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      La IA ofrece segundo paquete de cita de seguimiento a paciente, sugiriendo ventajas y la importancia de seguimiento:
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Análisis de proceso para lograr que paciente entienda cómo ha evolucionado su proceso (antes y después).</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">Cita médica de control.</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium">
                        Sí, Continuar
                      </button>
                      <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 font-medium">
                        No, Gracias
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PacienteLayout>
  );
};

export default SeguimientoIA;
