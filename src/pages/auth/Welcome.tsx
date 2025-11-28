import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  PlayIcon,
  UserIcon,
  XMarkIcon,
  VideoCameraIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import simulationService from '../../services/simulationService';
import backgroundImage from '../../assets/images/Background.png';
import logoHorizontal from '../../assets/images/LogoHorizontal.png';

const Welcome = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showQuestion, setShowQuestion] = useState(true);
  const [wantsToRegister, setWantsToRegister] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState<'intro' | 'registro' | 'simulacion' | 'prueba' | 'contrato' | 'credenciales'>('intro');
  const [videoWatched, setVideoWatched] = useState(false);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [contractSigned, setContractSigned] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{ email: string; password: string } | null>(null);

  // Si viene de salir de simulación, mostrar directamente el paso de simulación
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam === 'simulacion') {
      setShowQuestion(false);
      setWantsToRegister(true);
      setCurrentStep('simulacion');
      setVideoWatched(true); // Asumir que ya vio el video si viene de simulación
    }
  }, [searchParams]);

  // Si el usuario no quiere registrarse, mostrar opción de webinar
  if (showQuestion && wantsToRegister === false) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#29536D]/20 via-[#60EFDB]/10 to-transparent"></div>
        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8 relative z-10">
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <XMarkIcon className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-ibrand text-crisal-azul mb-4">
              ¿No deseas registrarte ahora?
            </h2>
            <p className="font-poppins text-crisal-azul/70 mb-6">
              Entendemos tu decisión. Te invitamos a participar en nuestro webinar gratuito donde podrás conocer más sobre Crisal-iA y sus beneficios.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-8 py-3 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 font-poppins-semibold text-lg shadow-lg transition-all">
                Acceder a Webinar Gratuito
              </button>
              <div>
                <button
                  onClick={() => {
                    setShowQuestion(false);
                    setWantsToRegister(null);
                  }}
                  className="font-poppins-semibold text-[#29536D] hover:text-[#60EFDB] text-sm transition-colors"
                >
                  Cambiar de opinión y continuar con el registro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pregunta inicial: ¿Desea continuar con primer registro?
  if (showQuestion && wantsToRegister === null) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#29536D]/20 via-[#60EFDB]/10 to-transparent"></div>
        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8 relative z-10">
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#60EFDB] to-[#29536D] mb-4">
              <UserIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-ibrand text-crisal-azul mb-4">
              ¿Deseas continuar con un primer registro?
            </h2>
            <p className="font-poppins text-crisal-azul/70 mb-8">
              Te guiaremos a través del proceso de inscripción en Crisal-iA, donde podrás conocer todas las funcionalidades y comenzar a optimizar tu práctica médica.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setWantsToRegister(true);
                  setShowQuestion(false);
                }}
                className="bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-8 py-3 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 font-poppins-semibold text-lg shadow-lg transition-all"
              >
                Sí, continuar
              </button>
              <button
                onClick={() => {
                  setWantsToRegister(false);
                }}
                className="bg-crisal-gris text-crisal-azul px-8 py-3 rounded-lg hover:bg-crisal-gris/80 font-poppins-semibold text-lg transition-all"
              >
                No, gracias
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay con gradiente de marca */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#29536D]/20 via-[#60EFDB]/10 to-transparent"></div>
      
      {/* Header con logo y botón de login */}
      <div className="max-w-4xl mx-auto mb-6 relative z-10">
        <div className="flex items-center justify-between bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <div className="flex items-center">
            <img 
              src={logoHorizontal} 
              alt="Crisal IA" 
              className="h-10 w-auto mr-3"
            />
            <span className="text-sm font-poppins text-crisal-azul/70">Registro para Médicos</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-poppins-semibold text-[#29536D] hover:text-[#60EFDB] transition-colors"
          >
            ¿Ya tienes cuenta? Iniciar Sesión →
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Video de Introducción Crisal-iA */}
        <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg p-6 border border-white/20">
          <div className="flex items-center mb-4">
            <VideoCameraIcon className="h-8 w-8 text-[#60EFDB] mr-3" />
            <h1 className="text-2xl font-ibrand text-crisal-azul">
              Video de Introducción Crisal-iA
            </h1>
          </div>
          <p className="font-poppins text-crisal-azul/70 mb-6">
            Presentación de Crisal-iA como herramienta integral diseñada para asistir al médico en el ejercicio de la Medicina Funcional
          </p>

          <div className="bg-gradient-to-r from-[#60EFDB]/20 to-[#29536D]/20 rounded-lg p-6 mb-6 border border-[#60EFDB]/30">
            <div className="aspect-video bg-gradient-to-br from-[#29536D] to-[#60EFDB] rounded-lg flex items-center justify-center mb-4 relative overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity">
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="text-center relative z-10">
                <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4 inline-block group-hover:scale-110 transition-transform">
                  <PlayIcon className="h-20 w-20 text-white" />
                </div>
                <p className="text-white text-xl font-poppins-semibold mb-1">Video de Introducción Crisal-iA</p>
                <p className="text-white/80 text-sm font-poppins">Duración: ~15 minutos</p>
                <p className="text-white text-xs mt-2 opacity-75 font-poppins">Haz clic para reproducir</p>
              </div>
              <button
                onClick={() => {
                  alert('Reproductor de video: En producción se integrará con YouTube, Vimeo o reproductor personalizado');
                  setVideoWatched(true);
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <span className="sr-only">Reproducir video</span>
              </button>
            </div>
            <div className="space-y-2 text-sm font-poppins text-crisal-azul">
              <p><strong className="font-poppins-semibold">Objetivo General:</strong> Presentar Crisal-iA como herramienta integral que optimiza el tiempo de consulta y reduce la carga administrativa.</p>
              <p><strong className="font-poppins-semibold">Contenido:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Captación de Atención</li>
                <li>Presentación de la Solución</li>
                <li>Demostración del Software</li>
                <li>Testimonios de Expertos</li>
                <li>Compromiso con la Privacidad</li>
              </ul>
            </div>
            {!videoWatched && (
              <button
                onClick={() => setVideoWatched(true)}
                className="mt-4 bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-6 py-2 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 font-poppins-semibold shadow-lg transition-all"
              >
                Marcar como Visto
              </button>
            )}
          </div>

          {/* Registro y Seguimiento */}
          {videoWatched && currentStep === 'intro' && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <UserIcon className="h-6 w-6 text-[#60EFDB] mr-2" />
                <h2 className="text-lg font-ibrand text-crisal-azul">
                  Registro y Seguimiento
                </h2>
              </div>
              <p className="font-poppins text-crisal-azul/70 mb-4">
                Para crear su cuenta y brindarle un mejor seguimiento, solicitamos algunos datos básicos:
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-crisal-gris shadow-sm focus:border-[#60EFDB] focus:ring-2 focus:ring-[#60EFDB] sm:text-sm font-poppins"
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Especialidad
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-crisal-gris shadow-sm focus:border-[#60EFDB] focus:ring-2 focus:ring-[#60EFDB] sm:text-sm font-poppins"
                      placeholder="Ej: Medicina Funcional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-crisal-gris shadow-sm focus:border-[#60EFDB] focus:ring-2 focus:ring-[#60EFDB] sm:text-sm font-poppins"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Número de WhatsApp
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-lg border border-crisal-gris shadow-sm focus:border-[#60EFDB] focus:ring-2 focus:ring-[#60EFDB] sm:text-sm font-poppins"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                </div>
                <div className="bg-[#60EFDB]/20 border border-[#60EFDB]/40 rounded-lg p-3">
                  <p className="text-sm font-poppins text-[#29536D]">
                    <strong className="font-poppins-semibold">Nota:</strong> La información proporcionada podrá ser compartida con nuestros aliados internos: Nutrapp, Alivia y AMF.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep('simulacion')}
                  className="bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-6 py-2 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 flex items-center font-poppins-semibold shadow-lg transition-all"
                >
                  Continuar
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </form>
            </div>
          )}

          {/* SW de Simulación y Demo Instructivo */}
          {currentStep === 'simulacion' && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <AcademicCapIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  SW de Simulación y Demo Instructivo
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                El médico entra en un SW de simulación interactiva con todos los componentes nativos de Crisal-iA. Se proporcionan 3 pacientes predeterminados generados por inteligencia artificial.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Flujo del simulacro:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
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
                  <div 
                    key={num} 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPatient === num 
                        ? 'border-[#60EFDB] bg-[#60EFDB]/20' 
                        : 'border-crisal-gris hover:bg-crisal-gris/50'
                    }`}
                    onClick={() => setSelectedPatient(num)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="bg-gradient-to-br from-[#60EFDB] to-[#29536D] text-white rounded-full w-8 h-8 flex items-center justify-center font-poppins-semibold mr-2">
                        {num}
                      </div>
                      <span className="font-poppins-medium text-crisal-azul">Paciente Simulado {num}</span>
                    </div>
                    <p className="text-sm font-poppins text-crisal-azul/60 mb-2">Generado por IA</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Crear token temporal de simulación
                        const simToken = simulationService.createSimulationToken(num);
                        // Redirigir al dashboard del médico en modo simulación
                        navigate('/medico/dashboard?simulation=true&patient=' + num);
                      }}
                      className="w-full mt-2 bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-4 py-2 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 text-sm font-poppins-semibold shadow-lg transition-all"
                    >
                      Iniciar Simulación
                    </button>
                  </div>
                ))}
              </div>
              
              {selectedPatient && (
                <div className="bg-[#60EFDB]/20 border border-[#60EFDB]/40 rounded-lg p-4 mb-4">
                  <p className="text-sm font-poppins text-[#29536D]">
                    <strong className="font-poppins-semibold">Paciente {selectedPatient} seleccionado.</strong> Al iniciar la simulación, tendrás acceso temporal de 30 minutos al panel del médico.
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setSimulationCompleted(true);
                  setCurrentStep('prueba');
                }}
                className="bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-6 py-2 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 font-poppins-semibold shadow-lg transition-all"
              >
                Completar Simulación
              </button>
            </div>
          )}

          {/* Versión de Prueba - Crisal-iA */}
          {currentStep === 'prueba' && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <CheckCircleIcon className="h-6 w-6 text-[#60EFDB] mr-2" />
                <h2 className="text-lg font-ibrand text-crisal-azul">
                  Versión de Prueba - Crisal-iA
                </h2>
              </div>
              <div className="bg-[#60EFDB]/20 border border-[#60EFDB]/40 rounded-lg p-6 mb-4">
                <p className="font-poppins text-crisal-azul mb-4">
                  En esta versión de prueba, Crisal-iA acompañará sin costo en la configuración inicial de preferencias de atención médica.
                </p>
                <p className="text-lg font-poppins-semibold text-crisal-azul mb-2">
                  Podrás atender hasta <span className="text-[#60EFDB]">3 pacientes de forma gratuita</span>
                </p>
                <p className="text-sm font-poppins text-crisal-azul/70 mb-4">
                  Con el objetivo de que explores las funcionalidades clave de nuestra plataforma antes de decidirte a adquirir una suscripción.
                </p>
                <div className="bg-white/80 rounded-lg p-4">
                  <h3 className="font-poppins-semibold text-crisal-azul mb-2">Prueba funcional completa:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm font-poppins text-crisal-azul">
                    <li>Acceso tanto a la WebApp como a la App Móvil</li>
                    <li>Gestión de agenda, consultas y pacientes de manera automatizada</li>
                    <li>Pacientes gestionados personalmente por el médico</li>
                    <li>Ingreso a través de la Conexión 1</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep('contrato')}
                className="bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-6 py-2 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 font-poppins-semibold shadow-lg transition-all"
              >
                Activar Versión de Prueba y Continuar
              </button>
            </div>
          )}

          {/* Generación de Contrato */}
          {currentStep === 'contrato' && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-[#60EFDB] mr-2" />
                <h2 className="text-lg font-ibrand text-crisal-azul">
                  Generación de Contrato
                </h2>
              </div>
              <p className="font-poppins text-crisal-azul/70 mb-4">
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
                    setCurrentStep('credenciales');
                  }}
                  className="bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-6 py-2 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 flex items-center font-poppins-semibold shadow-lg transition-all"
                >
                  <DocumentTextIcon className="h-5 w-5 mr-2" />
                  Generar y Firmar Contrato
                </button>
                <button className="bg-crisal-gris text-crisal-azul px-6 py-2 rounded-lg hover:bg-crisal-gris/80 font-poppins-semibold transition-all">
                  Ver Contrato Anterior
                </button>
              </div>
            </div>
          )}

          {/* Generación de Credenciales */}
          {currentStep === 'credenciales' && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <KeyIcon className="h-6 w-6 text-[#60EFDB] mr-2" />
                <h2 className="text-lg font-ibrand text-crisal-azul">
                  Tus Credenciales de Acceso
                </h2>
              </div>
              <div className="bg-[#60EFDB]/20 border border-[#60EFDB]/40 rounded-lg p-6 mb-4">
                <p className="text-sm font-poppins text-[#29536D] mb-4">
                  <strong className="font-poppins-semibold">¡Felicitaciones!</strong> Has completado el proceso de inscripción. Se han generado tus credenciales de acceso.
                </p>
                
                {!generatedCredentials && (
                  <button
                    onClick={() => {
                      // Generar credenciales únicas basadas en timestamp
                      const timestamp = Date.now();
                      const email = `medico.${timestamp}@crisalia.com`;
                      const password = `Med${timestamp.toString().slice(-6)}!`;
                      
                      const credentials = { email, password };
                      setGeneratedCredentials(credentials);
                      
                      // Guardar credenciales temporalmente (en producción esto se haría en el backend)
                      localStorage.setItem('medico_pending_credentials', JSON.stringify(credentials));
                      localStorage.setItem('medico_registration_completed', 'true');
                    }}
                    className="bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-6 py-2 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 font-poppins-semibold shadow-lg transition-all"
                  >
                    Generar Credenciales
                  </button>
                )}

                {generatedCredentials && (
                  <div className="bg-white/80 rounded-lg p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                        Correo Electrónico
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          readOnly
                          value={generatedCredentials.email}
                          className="flex-1 rounded-lg border border-crisal-gris shadow-sm focus:border-[#60EFDB] focus:ring-2 focus:ring-[#60EFDB] sm:text-sm bg-crisal-gris font-poppins"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(generatedCredentials.email);
                            alert('Email copiado al portapapeles');
                          }}
                          className="ml-2 px-3 py-2 bg-crisal-gris text-crisal-azul rounded-lg hover:bg-crisal-gris/80 text-sm font-poppins-semibold transition-all"
                        >
                          Copiar
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                        Contraseña
                      </label>
                      <div className="flex items-center">
                        <div className="relative flex-1">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            readOnly
                            value={generatedCredentials.password}
                            className="w-full rounded-lg border border-crisal-gris shadow-sm focus:border-[#60EFDB] focus:ring-2 focus:ring-[#60EFDB] sm:text-sm bg-crisal-gris pr-10 font-poppins"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? (
                              <EyeSlashIcon className="h-5 w-5 text-crisal-azul/60" />
                            ) : (
                              <EyeIcon className="h-5 w-5 text-crisal-azul/60" />
                            )}
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(generatedCredentials.password);
                            alert('Contraseña copiada al portapapeles');
                          }}
                          className="ml-2 px-3 py-2 bg-crisal-gris text-crisal-azul rounded-lg hover:bg-crisal-gris/80 text-sm font-poppins-semibold transition-all"
                        >
                          Copiar
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#60EFDB]/20 border border-[#60EFDB]/40 rounded-lg p-3">
                      <p className="text-xs font-poppins text-[#29536D]">
                        <strong className="font-poppins-semibold">⚠️ Importante:</strong> Guarda estas credenciales en un lugar seguro. Necesitarás usarlas para iniciar sesión en Crisal-iA.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        // Redirigir al login con las credenciales prellenadas
                        navigate(`/login?email=${encodeURIComponent(generatedCredentials.email)}&registered=true`);
                      }}
                      className="w-full bg-gradient-to-r from-[#60EFDB] to-[#29536D] text-white px-6 py-2 rounded-lg hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 font-poppins-semibold shadow-lg transition-all"
                    >
                      Ir al Inicio de Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;

