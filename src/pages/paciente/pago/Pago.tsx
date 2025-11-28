import PacienteLayout from '../../../components/layout/PacienteLayout';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  CheckCircleIcon,
  GiftIcon,
  ClockIcon,
  SparklesIcon,
  TagIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Pago = () => {
  const [showDescuento, setShowDescuento] = useState(true);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState<'completo' | 'etapa1' | 'etapa2' | null>(null);

  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Plataforma de Pago
          </h1>
          <p className="text-gray-600 mb-6">
            Gestiona tus pagos de consultas médicas y accede a paquetes especiales
          </p>

          {/* Código de Descuento */}
          {showDescuento && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <GiftIcon className="h-8 w-8 text-yellow-600 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    ¡Oferta Especial Disponible!
                  </h2>
                  <p className="text-sm text-gray-700 mb-3">
                    Se ofrece al paciente un descuento especial si decide pagar y continuar con el proceso dentro de la próxima hora. Según preferencias establecidas del médico.
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-white border border-yellow-300 rounded-md p-3">
                      <p className="text-xs text-gray-500 mb-1">Código de Descuento</p>
                      <p className="text-lg font-bold text-yellow-600">DESCUENTO1H</p>
                    </div>
                    <button className="px-4 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 font-medium">
                      Aplicar Descuento
                    </button>
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>Válido por las próximas 60 minutos</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paquete de Atención Médica Funcional */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
            <div className="flex items-start mb-4">
              <SparklesIcon className="h-8 w-8 text-indigo-600 mr-3 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Paquete de Atención Médica Funcional
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  La IA presenta de manera convincente la opción de continuar con el programa mediante el siguiente paquete de servicios:
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Incluye:</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">1. Gestión de agenda</p>
                    <p className="text-sm text-gray-600">Búsqueda y agendamiento con el médico funcional.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">2. Preconsulta</p>
                    <p className="text-sm text-gray-600">El médico y la IA revisan la anamnesis del paciente y prescriben los primeros exámenes paraclínicos.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">3. Consulta médica</p>
                    <p className="text-sm text-gray-600">Puede ser presencial o virtual.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">4. Seguimiento</p>
                    <p className="text-sm text-gray-600">Chatbot para resolver dudas, Centro de asistencia para comunicarse con el médico y Sesiones semanales de empoderamiento del paciente (no incluye wearables).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opciones de Pago */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Opciones de Pago</h3>
              <p className="text-sm text-gray-600 mb-4">
                Pago en dos etapas:
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paqueteSeleccionado === 'etapa1' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => setPaqueteSeleccionado('etapa1')}
                >
                  <div className="flex items-center mb-2">
                    <TagIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">Primera Cuota</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Incluye gestión de agenda y preconsulta (puntos 1-2)
                  </p>
                  <p className="text-xl font-bold text-indigo-600">$150.000</p>
                </div>
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paqueteSeleccionado === 'etapa2' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => setPaqueteSeleccionado('etapa2')}
                >
                  <div className="flex items-center mb-2">
                    <TagIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">Segunda Cuota</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Cubre consulta médica y seguimiento (puntos 3-4)
                  </p>
                  <p className="text-xl font-bold text-indigo-600">$200.000</p>
                </div>
                <div 
                  className={`md:col-span-2 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paqueteSeleccionado === 'completo' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setPaqueteSeleccionado('completo')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <GiftIcon className="h-6 w-6 text-green-600 mr-2" />
                        <h4 className="font-semibold text-gray-900">Paquete Completo</h4>
                        <span className="ml-2 px-2 py-1 bg-green-600 text-white text-xs rounded">Ahorra 10%</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pago completo del paquete (puntos 1-4)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 line-through">$350.000</p>
                      <p className="text-2xl font-bold text-green-600">$315.000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Métodos de Pago */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Métodos de Pago Disponibles
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800">
                <strong>Importante:</strong> No se acepta pago en efectivo. Solo métodos de pago electrónicos.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <CreditCardIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Tarjeta de Crédito</h3>
                <p className="text-sm text-gray-500 mb-3">Visa, Mastercard, Amex</p>
                <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                  Pagar con Tarjeta
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <CreditCardIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Tarjeta Débito</h3>
                <p className="text-sm text-gray-500 mb-3">PSE, Nequi, Daviplata</p>
                <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                  Pagar con Débito
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <BanknotesIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Terceros Aliados</h3>
                <p className="text-sm text-gray-500 mb-3">Seguros y convenios</p>
                <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                  Ver Terceros
                </button>
              </div>
            </div>
          </div>

          {/* Nota sobre Pago */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Nota Importante:</h3>
            <p className="text-sm text-gray-700">
              El paciente paga con su TC, pero el pago no le entra al médico antes de que haya realizado la preconsulta dentro de la fecha límite. Si no logra realizar la preconsulta dentro del tiempo límite, el pago es regresado a la TC del paciente.
            </p>
          </div>

          {/* Pagos Pendientes */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pagos Pendientes
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">Consulta - Dr. Juan Pérez</p>
                    <p className="text-sm text-gray-500">26 de Noviembre, 2025</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      <ClockIcon className="h-4 w-4 inline mr-1" />
                      Fecha límite: 28 de Noviembre, 2025
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">$300.000</p>
                    <button className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                      Pagar Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historial de Pagos */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Historial de Pagos
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 flex items-center">
                      Preconsulta - Dr. Juan Pérez
                      <CheckCircleIcon className="h-5 w-5 text-green-600 ml-2" />
                    </p>
                    <p className="text-sm text-gray-500">15 de Noviembre, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">$150.000</p>
                    <p className="text-xs text-gray-500">Pagado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plataforma de Ingreso desde Terceros */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Plataforma de Ingreso desde Terceros Aliados
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <BanknotesIcon className="h-8 w-8 text-indigo-600 mb-2" />
              <p className="text-sm text-gray-600 mb-3">
                Si tienes seguro médico o convenio, puedes ingresar aquí
              </p>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                Ver Terceros Aliados
              </button>
            </div>
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Pago;
