import PacienteLayout from '../../../components/layout/PacienteLayout';
import { useAuth } from '../../../context/AuthContext';
import { ShieldCheckIcon, DocumentTextIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Perfil = () => {
  const { user } = useAuth();

  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-ibrand text-xl">PP</span>
            </div>
            <div>
              <h1 className="text-3xl font-ibrand text-crisal-azul">
                Perfil General
              </h1>
              <p className="font-poppins text-crisal-azul opacity-70 mt-1">
                Gestiona tu información personal y seguridad
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Información Personal */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                Información Personal
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.nombre}
                    className="input-field font-poppins"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.apellido}
                    className="input-field font-poppins"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="input-field font-poppins"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue={user?.telefono}
                    className="input-field font-poppins"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    defaultValue={user?.fechaNacimiento}
                    className="input-field font-poppins"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.direccion}
                    className="input-field font-poppins"
                  />
                </div>
              </div>
            </div>

            {/* Seguridad */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center mr-3">
                  <LockClosedIcon className="h-4 w-4 text-white" />
                </div>
                Opciones de Seguridad en el Inicio de Sesión
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="two-factor"
                    className="h-4 w-4 text-crisal-turquesa focus:ring-crisal-turquesa border-crisal-gris rounded"
                  />
                  <label htmlFor="two-factor" className="ml-2 block text-sm font-poppins text-crisal-azul">
                    Autenticación de dos factores
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-device"
                    className="h-4 w-4 text-crisal-turquesa focus:ring-crisal-turquesa border-crisal-gris rounded"
                  />
                  <label htmlFor="remember-device" className="ml-2 block text-sm font-poppins text-crisal-azul">
                    Recordar dispositivo
                  </label>
                </div>
              </div>
            </div>

            {/* Términos y Condiciones */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center mr-3">
                  <DocumentTextIcon className="h-4 w-4 text-white" />
                </div>
                Términos y Condiciones
              </h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-crisal-turquesa focus:ring-crisal-turquesa border-crisal-gris rounded mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm font-poppins text-crisal-azul">
                    He leído y acepto los términos y condiciones
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    className="h-4 w-4 text-crisal-turquesa focus:ring-crisal-turquesa border-crisal-gris rounded mt-1"
                  />
                  <label htmlFor="consent" className="ml-2 block text-sm font-poppins text-crisal-azul">
                    Acepto el consentimiento informado para el tratamiento de datos
                  </label>
                </div>
              </div>
            </div>

            {/* Almacenamiento de Datos */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center mr-3">
                  <ShieldCheckIcon className="h-4 w-4 text-white" />
                </div>
                Almacenamiento de Datos en el Perfil del Paciente
              </h2>
              <p className="text-sm font-poppins text-crisal-azul opacity-80 mb-4">
                Tus datos están protegidos y almacenados de forma segura según las normativas de protección de datos personales (Ley 1581 de 2012 y Decreto 1377 de 2013).
              </p>
              
              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-4 mb-4">
                <h3 className="font-ibrand font-semibold text-crisal-azul mb-2">Información Almacenada</h3>
                <ul className="text-sm font-poppins text-crisal-azul space-y-1 list-disc list-inside">
                  <li>Datos personales básicos (nombre, identificación, contacto)</li>
                  <li>Historial médico y consultas</li>
                  <li>Resultados de exámenes y pruebas</li>
                  <li>Prescripciones y tratamientos</li>
                  <li>Información de pagos y facturación</li>
                  <li>Preferencias y configuraciones de cuenta</li>
                </ul>
              </div>

              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-4 mb-4">
                <h3 className="font-ibrand font-semibold text-crisal-azul mb-2">Medidas de Seguridad</h3>
                <ul className="text-sm font-poppins text-crisal-azul space-y-1 list-disc list-inside">
                  <li>Encriptación de datos sensibles</li>
                  <li>Acceso restringido solo a personal autorizado</li>
                  <li>Auditoría de accesos a tu información</li>
                  <li>Cumplimiento con normativas de protección de datos</li>
                  <li>Respaldo seguro de información</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button className="w-full btn-primary font-poppins">
                  Descargar Mis Datos
                </button>
                <button className="w-full btn-secondary font-poppins">
                  Solicitar Eliminación de Datos
                </button>
                <button className="text-sm font-poppins text-crisal-turquesa hover:text-crisal-azul transition-colors">
                  Ver política de privacidad completa
                </button>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-crisal-gris">
              <button className="btn-secondary font-poppins">
                Cancelar
              </button>
              <button className="btn-primary font-poppins">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Perfil;

