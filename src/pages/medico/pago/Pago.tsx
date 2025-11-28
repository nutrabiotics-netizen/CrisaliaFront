import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState } from 'react';
import {
  CreditCardIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ReceiptRefundIcon
} from '@heroicons/react/24/outline';

const Pago = () => {
  const [activeTab, setActiveTab] = useState<'preconsulta' | 'consulta' | 'control' | 'terceros'>('preconsulta');

  const pagos = [
    {
      id: '1',
      paciente: 'María González',
      tipo: 'Preconsulta',
      monto: 150000,
      fecha: '2025-11-26',
      estado: 'completado',
      metodo: 'Tarjeta'
    },
    {
      id: '2',
      paciente: 'Juan Pérez',
      tipo: 'Consulta',
      monto: 300000,
      fecha: '2025-11-25',
      estado: 'pendiente',
      metodo: 'Transferencia'
    },
    {
      id: '3',
      paciente: 'Ana López',
      tipo: 'Control',
      monto: 200000,
      fecha: '2025-11-24',
      estado: 'completado',
      metodo: 'Tercero Aliado'
    }
  ];

  return (
    <MedicoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <CreditCardIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Módulo de Pago
            </h1>
          </div>
          <p className="text-gray-600 mb-6">
            Gestión de pagos de preconsulta, consulta y control, incluyendo beneficios de terceros aliados
          </p>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('preconsulta')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'preconsulta'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Preconsulta
              </button>
              <button
                onClick={() => setActiveTab('consulta')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'consulta'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Consulta
              </button>
              <button
                onClick={() => setActiveTab('control')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'control'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Control
              </button>
              <button
                onClick={() => setActiveTab('terceros')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'terceros'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Terceros Aliados
              </button>
            </nav>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Preconsulta</p>
              <p className="text-2xl font-bold text-blue-600">$150.000</p>
              <p className="text-xs text-gray-500 mt-1">Precio base</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Consulta</p>
              <p className="text-2xl font-bold text-green-600">$300.000</p>
              <p className="text-xs text-gray-500 mt-1">Precio base</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Control</p>
              <p className="text-2xl font-bold text-purple-600">$200.000</p>
              <p className="text-xs text-gray-500 mt-1">Precio base</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Mes</p>
              <p className="text-2xl font-bold text-indigo-600">$2.4M</p>
              <p className="text-xs text-gray-500 mt-1">Ingresos</p>
            </div>
          </div>

          {/* Lista de Pagos */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Historial de Pagos
            </h2>
            <div className="space-y-3">
              {pagos.map((pago) => (
                <div key={pago.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-gray-900 mr-3">{pago.paciente}</h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            pago.estado === 'completado'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {pago.estado === 'completado' ? 'Completado' : 'Pendiente'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CreditCardIcon className="h-4 w-4 mr-1" />
                          {pago.tipo}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {new Date(pago.fecha).toLocaleDateString('es-CO')}
                        </div>
                        <div className="flex items-center">
                          <BanknotesIcon className="h-4 w-4 mr-1" />
                          {pago.metodo}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${pago.monto.toLocaleString('es-CO')}
                      </p>
                      {pago.estado === 'completado' && (
                        <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700">
                          Ver Recibo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beneficios de Terceros */}
          {activeTab === 'terceros' && (
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Beneficios de Terceros Aliados
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { nombre: 'Seguro Salud ABC', cobertura: '80%', pacientes: 15 },
                  { nombre: 'Fondo de Pensiones XYZ', cobertura: '70%', pacientes: 8 },
                  { nombre: 'EPS Salud Total', cobertura: '60%', pacientes: 12 }
                ].map((tercero, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{tercero.nombre}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        Activo
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Cobertura:</span>
                        <span className="font-medium text-gray-900">{tercero.cobertura}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pacientes activos:</span>
                        <span className="font-medium text-gray-900">{tercero.pacientes}</span>
                      </div>
                    </div>
                    <button className="mt-3 w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      Ver Detalles
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notificación de Primer Pago */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <div className="flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Notificación de Primer Pago
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  El médico es notificado cuando el paciente haya realizado el primer pago, entendiendo que este activa:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Gestión de agenda</li>
                  <li>Preconsulta</li>
                  <li>Consulta médica</li>
                  <li>Seguimiento IA al paciente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Pago;
