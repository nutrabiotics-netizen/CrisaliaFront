import AdministrativoLayout from '../../../components/layout/AdministrativoLayout';
import { ShieldExclamationIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Contingencia = () => {
  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Módulo de Contingencia
          </h1>
          <p className="text-gray-600 mb-6">
            Planes de respaldo y gestión de emergencias del sistema
          </p>

          <div className="space-y-6">
            {/* Estado del Sistema */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Estado del Sistema
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircleIcon className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Sistema Principal
                  </h3>
                  <p className="text-sm text-gray-600">Operativo</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircleIcon className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Base de Datos
                  </h3>
                  <p className="text-sm text-gray-600">Operativa</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircleIcon className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Servicios de IA
                  </h3>
                  <p className="text-sm text-gray-600">Operativos</p>
                </div>
              </div>
            </div>

            {/* Planes de Respaldo */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Planes de Respaldo
              </h2>
              <div className="space-y-3">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">Respaldo Diario</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Último respaldo: 26 Nov 2025, 02:00 AM
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Completado
                    </span>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">Respaldo Semanal</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Último respaldo: 24 Nov 2025, 03:00 AM
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Completado
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas de Contingencia */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Alertas de Contingencia
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Espacio en disco bajo</p>
                      <p className="text-sm text-gray-600 mt-1">
                        El espacio en disco está al 85% de capacidad
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h2>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Crear Respaldo Manual
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  Ver Historial de Respaldos
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                  Probar Restauración
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default Contingencia;

