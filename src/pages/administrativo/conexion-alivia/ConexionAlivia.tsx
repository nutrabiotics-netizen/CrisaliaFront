import AdministrativoLayout from '../../../components/layout/AdministrativoLayout';
import { LinkIcon, CheckCircleIcon, XCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const ConexionAlivia = () => {
  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg mb-6">
            <LinkIcon className="h-12 w-12 text-green-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Modelo de Conexión CRISAL-IA - ALIVIA
            </h1>
            <p className="text-gray-600">
              Integración inteligente para seguimiento de compras prescritas
            </p>
          </div>

          <div className="space-y-6">
            {/* Estado de Conexión */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Estado de Conexión
              </h2>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Conexión Activa</p>
                    <p className="text-sm text-gray-600">
                      Última sincronización: 26 Nov 2025, 10:30 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuración */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Configuración de Conexión
              </h2>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        API Endpoint
                      </h3>
                      <p className="text-sm text-gray-500">
                        https://api.alivia.com/integration
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                      Editar
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        API Key
                      </h3>
                      <p className="text-sm text-gray-500">
                        ••••••••••••••••••••••••••••••••
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                      Cambiar
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Frecuencia de Sincronización
                      </h3>
                      <p className="text-sm text-gray-500">
                        Cada 15 minutos
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas de Integración */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Estadísticas de Integración
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">1,234</p>
                  <p className="text-sm text-gray-600">Compras Sincronizadas</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">99.8%</p>
                  <p className="text-sm text-gray-600">Tasa de Éxito</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">156</p>
                  <p className="text-sm text-gray-600">Productos Únicos</p>
                </div>
              </div>
            </div>

            {/* Logs de Sincronización */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Logs de Sincronización
              </h2>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-900">Sincronización exitosa</span>
                  </div>
                  <span className="text-xs text-gray-500">26 Nov 2025, 10:30 AM</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-900">Sincronización exitosa</span>
                  </div>
                  <span className="text-xs text-gray-500">26 Nov 2025, 10:15 AM</span>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  <Cog6ToothIcon className="h-5 w-5 inline mr-2" />
                  Configurar Conexión
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Probar Conexión
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  Ver Documentación
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default ConexionAlivia;

