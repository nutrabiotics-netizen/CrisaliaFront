import AdministrativoLayout from '../../../components/layout/AdministrativoLayout';
import { UserCircleIcon, ShoppingBagIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/outline';

const ExperienciaUsuarios = () => {
  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Módulo de Experiencia de Usuarios
          </h1>
          <p className="text-gray-600 mb-6">
            Gestión y análisis de la experiencia de usuarios en el sistema
          </p>

          <div className="space-y-6">
            {/* Seguimiento Inteligente */}
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <SparklesIcon className="h-12 w-12 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Seguimiento Inteligente de Compras Prescritas con IA
              </h2>
              <p className="text-gray-600 mb-4">
                Sistema inteligente que rastrea y analiza las compras de productos prescritos por los médicos
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-indigo-600">234</p>
                  <p className="text-sm text-gray-600">Compras Rastreadas</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-green-600">89%</p>
                  <p className="text-sm text-gray-600">Tasa de Cumplimiento</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">156</p>
                  <p className="text-sm text-gray-600">Productos Únicos</p>
                </div>
              </div>
            </div>

            {/* Métricas de Experiencia */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Métricas de Experiencia
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <StarIcon className="h-8 w-8 text-yellow-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                  <p className="text-sm text-gray-600">Calificación Promedio</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <UserCircleIcon className="h-8 w-8 text-indigo-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-sm text-gray-600">Satisfacción</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <ShoppingBagIcon className="h-8 w-8 text-green-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <p className="text-sm text-gray-600">Compras Totales</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <SparklesIcon className="h-8 w-8 text-purple-600 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                  <p className="text-sm text-gray-600">Uso de IA</p>
                </div>
              </div>
            </div>

            {/* Análisis de Compras */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Análisis de Compras Prescritas
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">Productos más prescritos</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Análisis basado en prescripciones médicas
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded hover:bg-indigo-200">
                      Ver Reporte
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">Tasa de cumplimiento</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Porcentaje de pacientes que completan sus compras
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded hover:bg-indigo-200">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default ExperienciaUsuarios;

