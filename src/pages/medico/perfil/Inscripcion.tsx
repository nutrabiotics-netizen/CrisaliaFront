import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useAuth } from '../../../context/AuthContext';
import {
  PlayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  UserIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const PerfilInscripcion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showQuestion, setShowQuestion] = useState(true);
  const [wantsToRegister, setWantsToRegister] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState<'intro' | 'registro' | 'simulacion' | 'prueba'>('intro');
  const [videoWatched, setVideoWatched] = useState(false);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [contractSigned, setContractSigned] = useState(false);

  // Verificar si ya completó el onboarding
  useEffect(() => {
    if (user?.role === 'medico') {
      const onboardingCompleted = localStorage.getItem(`medico_onboarding_${user._id}`);
      if (onboardingCompleted === 'true') {
        navigate('/medico/dashboard');
      }
    }
  }, [user, navigate]);

  const handleCompleteOnboarding = () => {
    if (user?.role === 'medico') {
      localStorage.setItem(`medico_onboarding_${user._id}`, 'true');
      navigate('/medico/dashboard');
    }
  };

  // Si el usuario no quiere registrarse, mostrar opción de webinar
  if (showQuestion && wantsToRegister === false) {
    return (
      <MedicoLayout>
        <div className="space-y-6">
          <div className="card">
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-crisal-primary to-crisal-primary-dark mb-6">
                <XMarkIcon className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-ibrand text-crisal-azul mb-4">
                ¿No deseas registrarte ahora?
              </h2>
              <p className="font-poppins text-crisal-azul opacity-80 mb-8 max-w-2xl mx-auto text-lg">
                Entendemos tu decisión. Te invitamos a participar en nuestro webinar gratuito donde podrás conocer más sobre Crisal•IA y sus beneficios.
              </p>
              <div className="space-y-4">
                <button className="btn-primary px-8 py-3 text-lg font-poppins">
                  Acceder a Webinar Gratuito
                </button>
                <div>
                  <button
                    onClick={() => {
                      setShowQuestion(false);
                      setWantsToRegister(null);
                    }}
                    className="font-poppins text-crisal-turquesa hover:text-crisal-azul text-sm transition-colors"
                  >
                    Cambiar de opinión y continuar con el registro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MedicoLayout>
    );
  }

  // Pregunta inicial: ¿Desea continuar con primer registro?
  if (showQuestion && wantsToRegister === null) {
    return (
      <MedicoLayout>
        <div className="space-y-6">
          <div className="card">
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-crisal-primary to-crisal-primary-dark mb-6">
                <UserIcon className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-ibrand text-crisal-azul mb-4">
                ¿Deseas continuar con un primer registro?
              </h2>
              <p className="font-poppins text-crisal-azul opacity-80 mb-8 max-w-2xl mx-auto text-lg">
                Te guiaremos a través del proceso de inscripción en Crisal•IA, donde podrás conocer todas las funcionalidades y comenzar a optimizar tu práctica médica.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setWantsToRegister(true);
                    setShowQuestion(false);
                  }}
                  className="btn-primary px-8 py-3 text-lg font-poppins"
                >
                  Sí, continuar
                </button>
                <button
                  onClick={() => {
                    setWantsToRegister(false);
                  }}
                  className="btn-secondary px-8 py-3 text-lg font-poppins"
                >
                  No, gracias
                </button>
              </div>
            </div>
          </div>
        </div>
      </MedicoLayout>
    );
  }

  return (
    <MedicoLayout>
      <div className="space-y-6">
        {/* Video de Introducción Crisal-iA */}
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-4">
              <VideoCameraIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-ibrand text-crisal-azul">
                Video de Introducción Crisal•IA
              </h1>
              <p className="font-poppins text-crisal-azul opacity-70 mt-1">
                Presentación de Crisal•IA como herramienta integral diseñada para asistir al médico en el ejercicio de la Medicina Funcional
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-crisal-primary/10 to-crisal-primary-dark/10 rounded-xl p-6 mb-6 border border-crisal-gris">
            <div className="aspect-video bg-gradient-to-br from-crisal-primary-dark to-crisal-primary rounded-xl flex items-center justify-center mb-4 relative overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity shadow-lg">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="text-center relative z-10">
                <div className="bg-white bg-opacity-30 rounded-full p-4 mb-4 inline-block group-hover:scale-110 transition-transform">
                  <PlayIcon className="h-20 w-20 text-white" />
                </div>
                <p className="text-white text-xl font-ibrand mb-1">Video de Introducción Crisal•IA</p>
                <p className="text-white/80 text-sm font-poppins">Duración: ~15 minutos</p>
                <p className="text-white text-xs mt-2 opacity-75 font-poppins">Haz clic para reproducir</p>
              </div>
              {/* Botón de reproducción grande */}
              <button
                onClick={() => {
                  // Aquí se podría integrar un reproductor de video real
                  alert('Reproductor de video: En producción se integrará con YouTube, Vimeo o reproductor personalizado');
                  setVideoWatched(true);
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <span className="sr-only">Reproducir video</span>
              </button>
            </div>
            <div className="space-y-2 text-sm font-poppins text-crisal-azul">
              <p><strong className="font-semibold">Objetivo General:</strong> Presentar Crisal•IA como herramienta integral que optimiza el tiempo de consulta y reduce la carga administrativa.</p>
              <p><strong className="font-semibold">Contenido:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Captación de Atención</li>
                <li>Presentación de la Solución</li>
                <li>Demostración del Software</li>
                <li>Testimonios de Expertos</li>
                <li>Compromiso con la Privacidad</li>
              </ul>
            </div>
            <button
              onClick={() => setVideoWatched(true)}
              className="mt-4 btn-primary font-poppins"
            >
              Marcar como Visto
            </button>
          </div>

          {/* Registro y Seguimiento */}
          {videoWatched && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-3">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-ibrand text-crisal-azul">
                  Registro y Seguimiento
                </h2>
              </div>
              <p className="font-poppins text-crisal-azul opacity-80 mb-4">
                Para crear su cuenta y brindarle un mejor seguimiento, solicitamos algunos datos básicos:
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="input-field font-poppins"
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Especialidad
                    </label>
                    <input
                      type="text"
                      className="input-field font-poppins"
                      placeholder="Ej: Medicina Funcional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="input-field font-poppins"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Número de WhatsApp
                    </label>
                    <input
                      type="tel"
                      className="input-field font-poppins"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>
                <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-lg p-4">
                  <p className="text-sm font-poppins text-crisal-azul">
                    <strong className="font-semibold">Nota:</strong> La información proporcionada podrá ser compartida con nuestros aliados internos: Nutrapp, Alivia y AMF.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep('simulacion')}
                  className="btn-primary font-poppins"
                >
                  Continuar
                </button>
              </form>
            </div>
          )}

          {/* SW de Simulación y Demo Instructivo */}
          {currentStep === 'simulacion' && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-3">
                  <AcademicCapIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-ibrand text-crisal-azul">
                  SW de Simulación y Demo Instructivo
                </h2>
              </div>
              <p className="font-poppins text-crisal-azul opacity-80 mb-4">
                El médico entra en un SW de simulación interactiva con todos los componentes nativos de Crisal•IA. Se proporcionan 3 pacientes predeterminados generados por inteligencia artificial.
              </p>
              
              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-4 mb-4">
                <h3 className="font-ibrand font-semibold text-crisal-azul mb-2">Flujo del simulacro:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm font-poppins text-crisal-azul">
                  <li>Simulación de proceso de Automatización inteligente de agenda y llenado de espacios vacíos.</li>
                  <li>Se muestra como funciona el formulario de anamnesis inteligente que se le realiza al paciente previo a consulta</li>
                  <li>Se muestra como el asistente de IA especializado en Medicina Funcional, entrega análisis automatizado, OTCs y semaforización.</li>
                  <li>Se invita a simular una cita presencial mediante una conversación y simulación de examen físico.</li>
                  <li>Se simulará la generación automatizada de procesos administrativos.</li>
                  <li>Simulación de gestión IA de seguimiento a paciente y proceso automatizado de preparación para cita de control</li>
                  <li>Se entrega al MD un análisis y resumen final con el tiempo y recursos ahorrados</li>
                </ol>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="card hover:shadow-md transition-shadow cursor-pointer border-2 border-crisal-gris hover:border-crisal-turquesa">
                    <div className="flex items-center mb-2">
                      <div className="bg-gradient-to-br from-crisal-primary to-crisal-primary-dark text-white rounded-full w-8 h-8 flex items-center justify-center font-poppins font-semibold mr-2">
                        {num}
                      </div>
                      <span className="font-poppins font-medium text-crisal-azul">Paciente Simulado {num}</span>
                    </div>
                    <p className="text-sm font-poppins text-crisal-azul opacity-70">Generado por IA</p>
                    <button className="mt-2 text-sm font-poppins text-crisal-turquesa hover:text-crisal-azul transition-colors">
                      Iniciar Simulación
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSimulationCompleted(true);
                  setCurrentStep('prueba');
                }}
                className="btn-primary font-poppins"
              >
                Completar Simulación
              </button>
            </div>
          )}

          {/* Versión de Prueba - Crisal-iA */}
          {currentStep === 'prueba' && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-3">
                  <CheckCircleIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-ibrand text-crisal-azul">
                  Versión de Prueba - Crisal•IA
                </h2>
              </div>
              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-6 mb-4">
                <p className="font-poppins text-crisal-azul mb-4">
                  En esta versión de prueba, Crisal•IA acompañará sin costo en la configuración inicial de preferencias de atención médica.
                </p>
                <p className="text-lg font-ibrand text-crisal-azul mb-2">
                  Podrás atender hasta <span className="text-crisal-turquesa">3 pacientes de forma gratuita</span>
                </p>
                <p className="text-sm font-poppins text-crisal-azul opacity-80 mb-4">
                  Con el objetivo de que explores las funcionalidades clave de nuestra plataforma antes de decidirte a adquirir una suscripción.
                </p>
                <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                  <h3 className="font-ibrand font-semibold text-crisal-azul mb-2">Prueba funcional completa:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm font-poppins text-crisal-azul">
                    <li>Acceso tanto a la WebApp como a la App Móvil</li>
                    <li>Gestión de agenda, consultas y pacientes de manera automatizada</li>
                    <li>Pacientes gestionados personalmente por el médico</li>
                    <li>Ingreso a través de la Conexión 1</li>
                  </ul>
                </div>
              </div>
              <button className="btn-primary font-poppins">
                Activar Versión de Prueba
              </button>
            </div>
          )}

          {/* Generación de Contrato */}
          <div className="border-t border-crisal-gris pt-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-3">
                <DocumentTextIcon className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-ibrand text-crisal-azul">
                Generación de Contrato
              </h2>
            </div>
            <p className="font-poppins text-crisal-azul opacity-80 mb-4">
              La IA entregará un contrato a cada médico, el cual incluirá cláusulas en las que acepte:
            </p>
            <ul className="list-disc list-inside space-y-2 font-poppins text-crisal-azul mb-4 ml-4">
              <li>Confidencialidad y manejo de datos de pacientes.</li>
              <li>Uso adecuado del software conforme a la normatividad colombiana y Ley 1581 de 2012 sobre protección de datos.</li>
              <li>Exoneración de responsabilidad del software sobre decisiones clínicas (si la IA solo sugiere y no toma decisiones médicas).</li>
            </ul>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setContractSigned(true);
                  handleCompleteOnboarding();
                }}
                className="btn-primary flex items-center font-poppins"
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Generar y Firmar Contrato
              </button>
              <button className="btn-secondary font-poppins">
                Ver Contrato Anterior
              </button>
            </div>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default PerfilInscripcion;
