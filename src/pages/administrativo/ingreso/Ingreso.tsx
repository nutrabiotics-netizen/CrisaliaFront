import AdministrativoLayout from '../../../components/layout/AdministrativoLayout';
import { 
  UserGroupIcon, 
  UserPlusIcon, 
  DocumentCheckIcon,
  KeyIcon,
  FingerPrintIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UserIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const Ingreso = () => {
  const [activeTab, setActiveTab] = useState<'accesos' | 'personal' | 'registro'>('accesos');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'medico' | 'asistencial' | 'administrativo'>('medico');

  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-4">
              <UserGroupIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-ibrand text-crisal-azul mb-2">
                Módulo de Ingreso
              </h1>
              <p className="font-poppins text-crisal-azul opacity-70">
                Gestión de accesos, personal y registro de ingreso/salida institucional
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-crisal-gris mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('accesos')}
                className={`${
                  activeTab === 'accesos'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                } whitespace-nowrap py-4 px-1 border-b-2 font-poppins font-medium text-sm transition-colors`}
              >
                <KeyIcon className="h-5 w-5 inline mr-2" />
                Accesos Personalizados
              </button>
              <button
                onClick={() => setActiveTab('personal')}
                className={`${
                  activeTab === 'personal'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                } whitespace-nowrap py-4 px-1 border-b-2 font-poppins font-medium text-sm transition-colors`}
              >
                <UserGroupIcon className="h-5 w-5 inline mr-2" />
                Gestión de Personal
              </button>
              <button
                onClick={() => setActiveTab('registro')}
                className={`${
                  activeTab === 'registro'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                } whitespace-nowrap py-4 px-1 border-b-2 font-poppins font-medium text-sm transition-colors`}
              >
                <ClockIcon className="h-5 w-5 inline mr-2" />
                Registro Ingreso/Salida
              </button>
            </nav>
          </div>

          {/* Tab Content: Accesos Personalizados */}
          {activeTab === 'accesos' && (
            <div className="space-y-6">
              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-4">
                <h2 className="text-xl font-ibrand text-crisal-azul mb-2">
                  Acceso Seguro y Personalizado para el Perfil Médico en Crisal•IA
                </h2>
                <p className="font-poppins text-crisal-azul opacity-80 mb-4">
                  Crisal•IA proporcionará al perfil administrativo la posibilidad de crear hasta tres accesos personalizados mediante usuario y contraseña. Cada uno de estos accesos podrá estar destinado a diferentes roles de apoyo:
                </p>
                <ul className="list-disc list-inside font-poppins text-crisal-azul opacity-80 space-y-1 mb-4">
                  <li>Personal administrativo de recepción</li>
                  <li>Personal de facturación</li>
                  <li>Personal de gerencia</li>
                </ul>
                <p className="font-poppins text-crisal-azul opacity-80 mb-2">
                  Además, para facilitar el uso en dispositivos móviles, se habilitará la opción de autenticación (huella dactilar o reconocimiento facial) en la AppMóvil.
                </p>
                <p className="text-sm font-poppins text-crisal-azul opacity-70">
                  En caso de requerirse más de tres usuarios asociados a un mismo perfil médico, se deberá realizar una solicitud formal desde el módulo administrativo de la plataforma.
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-xl font-ibrand text-crisal-azul">
                  Accesos Configurados
                </h3>
                <button 
                  onClick={() => {
                    setShowForm(true);
                    setFormType('medico');
                  }}
                  className="btn-primary font-poppins"
                >
                  <UserPlusIcon className="h-5 w-5 mr-2" />
                  Crear Nuevo Acceso
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-xl flex items-center justify-center">
                      <KeyIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-2 py-1 text-xs font-poppins font-medium bg-green-100 text-green-800 rounded">
                      Activo
                    </span>
                  </div>
                  <h4 className="font-ibrand font-semibold text-crisal-azul mb-1">Recepción</h4>
                  <p className="text-sm font-poppins text-crisal-azul opacity-70 mb-2">Usuario: recepcion@crisalia.com</p>
                  <p className="text-xs font-poppins text-crisal-azul opacity-60 mb-3">Creado: 15 Nov 2025</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-crisal-gris text-crisal-azul text-xs rounded-lg hover:bg-crisal-turquesa/20 font-poppins transition-colors">
                      <PencilIcon className="h-4 w-4 inline mr-1" />
                      Editar
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-lg hover:bg-red-200 font-poppins transition-colors">
                      <TrashIcon className="h-4 w-4 inline mr-1" />
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-xl flex items-center justify-center">
                      <KeyIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-2 py-1 text-xs font-poppins font-medium bg-green-100 text-green-800 rounded">
                      Activo
                    </span>
                  </div>
                  <h4 className="font-ibrand font-semibold text-crisal-azul mb-1">Facturación</h4>
                  <p className="text-sm font-poppins text-crisal-azul opacity-70 mb-2">Usuario: facturacion@crisalia.com</p>
                  <p className="text-xs font-poppins text-crisal-azul opacity-60 mb-3">Creado: 20 Nov 2025</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-crisal-gris text-crisal-azul text-xs rounded-lg hover:bg-crisal-turquesa/20 font-poppins transition-colors">
                      <PencilIcon className="h-4 w-4 inline mr-1" />
                      Editar
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-lg hover:bg-red-200 font-poppins transition-colors">
                      <TrashIcon className="h-4 w-4 inline mr-1" />
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-xl flex items-center justify-center">
                      <FingerPrintIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="px-2 py-1 text-xs font-poppins font-medium bg-crisal-turquesa/20 text-crisal-azul rounded">
                      Biométrico
                    </span>
                  </div>
                  <h4 className="font-ibrand font-semibold text-crisal-azul mb-1">Gerencia</h4>
                  <p className="text-sm font-poppins text-crisal-azul opacity-70 mb-2">Autenticación biométrica habilitada</p>
                  <p className="text-xs font-poppins text-crisal-azul opacity-60 mb-3">Configurado: 25 Nov 2025</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-crisal-gris text-crisal-azul text-xs rounded-lg hover:bg-crisal-turquesa/20 font-poppins transition-colors">
                      <PencilIcon className="h-4 w-4 inline mr-1" />
                      Configurar
                    </button>
                  </div>
                </div>
              </div>

              {showForm && (
                <div className="fixed inset-0 bg-crisal-azul bg-opacity-50 flex items-center justify-center z-50">
                  <div className="card max-w-md w-full">
                    <h3 className="text-xl font-ibrand text-crisal-azul mb-4">
                      Crear Nuevo Acceso
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-poppins font-medium text-crisal-azul mb-1">
                          Rol
                        </label>
                        <select className="input-field focus:border-crisal-turquesa focus:ring-crisal-turquesa">
                          <option>Recepción</option>
                          <option>Facturación</option>
                          <option>Gerencia</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-poppins font-medium text-crisal-azul mb-1">
                          Usuario
                        </label>
                        <input
                          type="text"
                          className="input-field focus:border-crisal-turquesa focus:ring-crisal-turquesa"
                          placeholder="usuario@crisalia.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-poppins font-medium text-crisal-azul mb-1">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          className="input-field focus:border-crisal-turquesa focus:ring-crisal-turquesa"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="biometrico"
                          className="h-4 w-4 text-crisal-turquesa focus:ring-crisal-turquesa border-crisal-gris rounded"
                        />
                        <label htmlFor="biometrico" className="ml-2 block text-sm font-poppins text-crisal-azul">
                          Habilitar autenticación biométrica
                        </label>
                      </div>
                      <div className="flex space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="flex-1 px-4 py-2 bg-crisal-gris text-crisal-azul rounded-lg hover:bg-crisal-gris/80 font-poppins transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="flex-1 btn-primary font-poppins"
                        >
                          Crear Acceso
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content: Gestión de Personal */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Módulo de Gestión de Personal Médico y Administrativo
                </h2>
                <p className="text-gray-600 mb-4">
                  En el perfil administrativo se desplegarán interfaces específicas (ventanas de gestión) para controlar en tiempo real el registro de ingreso y salida del personal institucional.
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Nota:</strong> Estos perfiles servirán como base de datos a Crisal-iA únicamente para gestionar eficiencia de espacios y evitar sobrecarga o déficit de personal en base a la agenda obtenida semanalmente.
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Registrado
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setFormType('medico');
                    }}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <UserPlusIcon className="h-5 w-5 mr-2" />
                    Agregar Médico
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setFormType('asistencial');
                    }}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <UserPlusIcon className="h-5 w-5 mr-2" />
                    Agregar Personal Asistencial
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setFormType('administrativo');
                    }}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <UserPlusIcon className="h-5 w-5 mr-2" />
                    Agregar Personal Administrativo
                  </button>
                </div>
              </div>

              {/* Categorías de Personal */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Administración Médicos */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <UserIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">Administración Médicos</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-medium text-gray-900 text-sm">Dr. Juan Pérez</p>
                      <p className="text-xs text-gray-500">Medicina Funcional</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="text-xs text-indigo-600 hover:text-indigo-800">
                          <PencilIcon className="h-4 w-4 inline" /> Editar
                        </button>
                        <button className="text-xs text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4 inline" /> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Administración Personal Asistencial */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <UserGroupIcon className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">Personal Asistencial</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-medium text-gray-900 text-sm">Enfermera María López</p>
                      <p className="text-xs text-gray-500">Enfermería General</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="text-xs text-indigo-600 hover:text-indigo-800">
                          <PencilIcon className="h-4 w-4 inline" /> Editar
                        </button>
                        <button className="text-xs text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4 inline" /> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Administrativo y General */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <BuildingOfficeIcon className="h-6 w-6 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">Personal Administrativo</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded">
                      <p className="font-medium text-gray-900 text-sm">Carlos Rodríguez</p>
                      <p className="text-xs text-gray-500">Recepción</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="text-xs text-indigo-600 hover:text-indigo-800">
                          <PencilIcon className="h-4 w-4 inline" /> Editar
                        </button>
                        <button className="text-xs text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4 inline" /> Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integración con IA */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Integración con IA
                </h3>
                <p className="text-gray-600 mb-2">
                  Una vez actualizados los datos, el motor de IA realizará un análisis cruzado con la disponibilidad de agenda médica y asistencial, con el objetivo de:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Sugerir distribución óptima del recurso humano (médico, administrativo, asistencial y servicios generales).</li>
                  <li>Prevenir cuellos de botella, sobrecarga de funciones o ausencia de personal clave en franjas críticas de atención.</li>
                </ul>
                <p className="text-sm font-semibold text-gray-900 mt-3">
                  Objetivo principal: Establecer según la disponibilidad de agenda la cantidad mínima y máxima de personal que se requiere.
                </p>
              </div>

              {/* Restricción de activación */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Restricción de Activación del Módulo Administrativo
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Cristal-iA condiciona la activación de los perfiles administrativos</strong> a la inscripción previa y completa de al menos un perfil médico con licencia individual activa.
                </p>
                <p className="text-sm text-gray-600">
                  Esta restricción garantiza que se genere la estructura inicial de datos clínicos, se habilite la vinculación directa con la agenda médica y se permita la gestión dinámica de personal basada en necesidades reales de atención.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content: Registro Ingreso/Salida */}
          {activeTab === 'registro' && (
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Registro de Ingreso y Salida del Personal Institucional
                </h2>
                <p className="text-gray-600">
                  Control en tiempo real del registro de ingreso y salida del personal. Todas las operaciones deberán ser gestionadas de forma manual por el administrador del sistema y serán actualizadas directamente en la base de datos.
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Registros del Día
                </h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="date"
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Filtrar
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Personal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cargo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingreso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Salida
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <UserIcon className="h-8 w-8 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">Dr. Juan Pérez</div>
                            <div className="text-sm text-gray-500">Médico</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Medicina Funcional
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        08:00 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        -
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <CheckCircleIcon className="h-4 w-4 inline mr-1" />
                          En Turno
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          Registrar Salida
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <UserGroupIcon className="h-8 w-8 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">María López</div>
                            <div className="text-sm text-gray-500">Enfermera</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Enfermería General
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        07:30 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        05:00 PM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          <XCircleIcon className="h-4 w-4 inline mr-1" />
                          Fuera de Turno
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-gray-400 cursor-not-allowed">
                          -
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default Ingreso;
