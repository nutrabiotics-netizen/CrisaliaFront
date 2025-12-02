import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useAuth } from '../../../context/AuthContext';

const PerfilGeneral = () => {
  const { user } = useAuth();

  return (
    <MedicoLayout>
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-ibrand text-xl">PG</span>
            </div>
            <div>
              <h1 className="text-3xl font-ibrand text-crisal-azul">
                Perfil General
              </h1>
              <p className="font-poppins text-crisal-azul opacity-70 mt-1">
                Gestiona tu información personal y profesional
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
              </div>
            </div>

            {/* Información Profesional */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                Información Profesional
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                    Especialidad
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.especialidad}
                    className="input-field font-poppins"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                    Número de Colegiatura
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.numeroColegiatura}
                    className="input-field font-poppins"
                  />
                </div>
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
    </MedicoLayout>
  );
};

export default PerfilGeneral;

