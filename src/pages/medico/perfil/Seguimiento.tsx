import MedicoLayout from '../../../components/layout/MedicoLayout';

const PerfilSeguimiento = () => {
  return (
    <MedicoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Registro y Seguimiento
          </h1>
          <p className="text-gray-600 mb-6">
            Historial de actividades y seguimiento de tu perfil médico
          </p>

          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Actividades Recientes
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Inscripción completada</p>
                    <p className="text-xs text-gray-500">26 de Noviembre, 2025</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                    Completado
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Perfil actualizado</p>
                    <p className="text-xs text-gray-500">25 de Noviembre, 2025</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                    Completado
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Estadísticas
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">45</p>
                  <p className="text-sm text-gray-600">Pacientes Totales</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">128</p>
                  <p className="text-sm text-gray-600">Consultas Realizadas</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">24</p>
                  <p className="text-sm text-gray-600">Análisis IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default PerfilSeguimiento;

