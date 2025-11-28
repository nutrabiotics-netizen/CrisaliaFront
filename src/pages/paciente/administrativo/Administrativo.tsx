import PacienteLayout from '../../../components/layout/PacienteLayout';
import { SparklesIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

const Administrativo = () => {
  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="card">
          <div className="p-6 bg-gradient-to-r from-crisal-turquesa/10 to-crisal-azul/10 rounded-xl mb-6 border border-crisal-gris">
            <div className="w-16 h-16 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center mb-4">
              <SparklesIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-ibrand text-crisal-azul mb-2">
              Portal Personal de Gestión Clínica
            </h1>
            <p className="font-poppins text-crisal-azul opacity-80">
              Acceso rápido del Paciente en Crisal•IA: Portal Personal de Gestión Clínica y Seguimiento Funcional
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-xl flex items-center justify-center mb-3">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-ibrand font-semibold text-crisal-azul mb-2">
                Historial Clínico
              </h3>
              <p className="text-sm font-poppins text-crisal-azul opacity-70 mb-3">
                Accede a tu historial médico completo
              </p>
              <button className="btn-primary text-sm font-poppins">
                Ver Historial
              </button>
            </div>

            <div className="p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-xl flex items-center justify-center mb-3">
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-ibrand font-semibold text-crisal-azul mb-2">
                Próximas Citas
              </h3>
              <p className="text-sm font-poppins text-crisal-azul opacity-70 mb-3">
                Gestiona tus citas médicas
              </p>
              <button className="btn-primary text-sm font-poppins">
                Ver Citas
              </button>
            </div>

            <div className="p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-xl flex items-center justify-center mb-3">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-ibrand font-semibold text-crisal-azul mb-2">
                Documentos Médicos
              </h3>
              <p className="text-sm font-poppins text-crisal-azul opacity-70 mb-3">
                Descarga tus recetas y documentos
              </p>
              <button className="btn-primary text-sm font-poppins">
                Ver Documentos
              </button>
            </div>

            <div className="p-4 border-2 border-crisal-gris rounded-xl hover:border-crisal-turquesa hover:bg-crisal-turquesa/5 transition-all duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-xl flex items-center justify-center mb-3">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-ibrand font-semibold text-crisal-azul mb-2">
                Seguimiento Funcional
              </h3>
              <p className="text-sm font-poppins text-crisal-azul opacity-70 mb-3">
                Monitorea tu progreso de salud
              </p>
              <button className="btn-primary text-sm font-poppins">
                Ver Seguimiento
              </button>
            </div>
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Administrativo;

