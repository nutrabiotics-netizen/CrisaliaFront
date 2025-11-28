import AdministrativoLayout from '../../../components/layout/AdministrativoLayout';
import { UserGroupIcon, PlusIcon, LinkIcon } from '@heroicons/react/24/outline';

const Terceros = () => {
  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Terceros Aliados
          </h1>
          <p className="text-gray-600 mb-6">
            Gestión de terceros aliados, seguros y convenios
          </p>

          <div className="space-y-6">
            {/* Acciones */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Terceros Registrados
              </h2>
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <PlusIcon className="h-5 w-5 mr-2" />
                Agregar Tercero
              </button>
            </div>

            {/* Lista de Terceros */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <UserGroupIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Seguro Salud ABC
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Convenio activo - 150 pacientes
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded hover:bg-indigo-200">
                    Ver Detalles
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                    Editar
                  </button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <UserGroupIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Fondo de Pensiones XYZ
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Convenio activo - 89 pacientes
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded hover:bg-indigo-200">
                    Ver Detalles
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">
                    Editar
                  </button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <LinkIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  ALIVIA
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Integración activa - Seguimiento de compras
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded hover:bg-indigo-200">
                    Ver Detalles
                  </button>
                  <button className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200">
                    Conectado
                  </button>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Estadísticas de Terceros
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">23</p>
                  <p className="text-sm text-gray-600">Terceros Activos</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">1,234</p>
                  <p className="text-sm text-gray-600">Pacientes con Convenio</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">$45M</p>
                  <p className="text-sm text-gray-600">Ingresos por Terceros</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default Terceros;

