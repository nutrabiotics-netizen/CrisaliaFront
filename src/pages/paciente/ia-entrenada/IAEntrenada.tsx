import PacienteLayout from '../../../components/layout/PacienteLayout';
import { SparklesIcon, LightBulbIcon, QuestionMarkCircleIcon, HeartIcon } from '@heroicons/react/24/outline';

const IAEntrenada = () => {
  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            IA Entrenada
          </h1>
          <p className="text-gray-600 mb-6">
            Accede a herramientas inteligentes diseñadas para tu bienestar
          </p>

          <div className="space-y-6">
            {/* Módulo de Introducción */}
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <SparklesIcon className="h-12 w-12 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Módulo de Introducción
              </h2>
              <p className="text-gray-600">
                Conoce cómo Crisal-IA puede ayudarte en tu proceso de salud
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-200 rounded-lg">
                <LightBulbIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Recomendaciones Automatizadas
                </h3>
                <p className="text-sm text-gray-500">
                  Recibe sugerencias personalizadas basadas en tu perfil de salud
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <SparklesIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Promoción de Crisal-IA
                </h3>
                <p className="text-sm text-gray-500">
                  Descubre todas las funcionalidades disponibles
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <QuestionMarkCircleIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Resolución de Preguntas
                </h3>
                <p className="text-sm text-gray-500">
                  Asistencia al paciente con respuestas inteligentes
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg bg-indigo-50">
                <HeartIcon className="h-8 w-8 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Análisis de Impacto Terapéutico
                </h3>
                <p className="text-sm text-gray-500">
                  Basado en disfunciones identificadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default IAEntrenada;

