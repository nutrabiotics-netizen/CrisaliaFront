import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useAlert } from '../../context/AlertContext';
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
import { KeyIcon as KeyIconSolid } from '@heroicons/react/24/solid';
import simulationService from '../../services/simulationService';
import authService, { RegisterMedicoData } from '../../services/authService';
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
  const [isRegistering, setIsRegistering] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string>('');
  const { success, error: showError, info } = useAlert();

  // Especialidades preestablecidas
  const especialidades = [
    'Medicina Funcional',
    'Medicina Homeopática',
    'Medicina General',
    'Medicina Interna',
    'Cardiología',
    'Endocrinología',
    'Gastroenterología',
    'Neurología',
    'Psiquiatría',
    'Medicina del Deporte',
    'Medicina Estética',
    'Medicina Anti-envejecimiento',
    'Nutrición Clínica',
    'Medicina Integrativa',
    'Otra'
  ];

  // Función para generar contraseña segura
  const generateSecurePassword = (): string => {
    const length = 16;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = uppercase + lowercase + numbers + symbols;
    
    let password = '';
    
    // Asegurar al menos un carácter de cada tipo
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Completar el resto de la contraseña
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Mezclar la contraseña
    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch
  } = useForm<RegisterMedicoData>({
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      especialidad: '',
      whatsapp: ''
    }
  });

  const passwordValue = watch('password');

  // Si viene de salir de simulación, mostrar directamente el paso de simulación
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam === 'simulacion') {
      setShowQuestion(false);
      setWantsToRegister(true);
      setCurrentStep('simulacion');
      setVideoWatched(true); // Asumir que ya vio el video si viene de simulación
    }
    
    // Cargar credenciales guardadas si existen
    const savedCredentials = localStorage.getItem('medico_pending_credentials');
    if (savedCredentials) {
      try {
        const credentials = JSON.parse(savedCredentials);
        setGeneratedCredentials(credentials);
      } catch (error) {
        console.error('Error al cargar credenciales guardadas:', error);
      }
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#443c92]/20 via-[#443c92]/10 to-transparent"></div>
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
              <button className="w-full bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white px-8 py-3 rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 font-poppins-semibold text-lg shadow-lg transition-all">
                Acceder a Webinar Gratuito
              </button>
              <div>
                <button
                  onClick={() => {
                    setShowQuestion(false);
                    setWantsToRegister(null);
                  }}
                  className="font-poppins-semibold text-[#443c92] hover:text-[#443c92] text-sm transition-colors"
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#443c92]/20 via-[#443c92]/10 to-transparent"></div>
        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8 relative z-10">
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#443c92] to-[#1d1d6d] mb-4">
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
                className="bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white px-8 py-3 rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 font-poppins-semibold text-lg shadow-lg transition-all"
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#443c92]/20 via-[#443c92]/10 to-transparent"></div>
      
      {/* Header con logo y botón de login */}
      <div className="max-w-4xl mx-auto mb-6 relative z-10">
        <div className="flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg p-4">
          <div className="flex items-center">
            <img 
              src={logoHorizontal} 
              alt="Crisal IA" 
              className="h-10 w-auto mr-3"
            />
            <span className="text-sm font-poppins text-white/90 drop-shadow-md">Registro para Médicos</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-poppins-semibold text-white hover:text-white/80 transition-colors drop-shadow-md"
          >
            ¿Ya tienes cuenta? Iniciar Sesión →
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Video de Introducción Crisal-iA */}
        <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg p-6 border border-white/20">
          <div className="flex items-center mb-4">
            <VideoCameraIcon className="h-8 w-8 text-[#443c92] mr-3" />
            <h1 className="text-2xl font-ibrand text-crisal-azul">
              Video de Introducción Crisal-iA
            </h1>
          </div>
          <p className="font-poppins text-crisal-azul/70 mb-6">
            Presentación de Crisal-iA como herramienta integral diseñada para asistir al médico en el ejercicio de la Medicina Funcional
          </p>

          <div className="bg-gradient-to-r from-[#443c92]/20 to-[#1d1d6d]/20 rounded-lg p-6 mb-6 border border-[#443c92]/30">
            <div className="aspect-video bg-gradient-to-br from-[#443c92] to-[#1d1d6d] rounded-lg flex items-center justify-center mb-4 relative overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity">
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
                  info('En producción se integrará con YouTube, Vimeo o reproductor personalizado', 'Información');
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
                className="mt-4 bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white px-6 py-2 rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 font-poppins-semibold shadow-lg transition-all"
              >
                Marcar como Visto
              </button>
            )}
          </div>

          {/* Registro y Seguimiento */}
          {videoWatched && currentStep === 'intro' && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <UserIcon className="h-6 w-6 text-[#443c92] mr-2" />
                <h2 className="text-lg font-ibrand text-crisal-azul">
                  Registro y Seguimiento
                </h2>
              </div>
              <p className="font-poppins text-crisal-azul/70 mb-4">
                Para crear su cuenta y brindarle un mejor seguimiento, solicitamos algunos datos básicos:
              </p>
              <form 
                onSubmit={handleSubmit(async (data) => {
                  setIsRegistering(true);
                  try {
                    const registerData: RegisterMedicoData = {
                      nombre: data.nombre,
                      apellido: data.apellido,
                      email: data.email,
                      password: data.password,
                      especialidad: data.especialidad || undefined,
                      whatsapp: phoneValue || undefined
                    };

                    const response = await authService.registerMedico(registerData);
                    
                    // Guardar credenciales generadas
                    const credentials = {
                      email: data.email,
                      password: data.password
                    };
                    setGeneratedCredentials(credentials);
                    
                    // Guardar credenciales en localStorage para que estén disponibles en el paso final
                    localStorage.setItem('medico_pending_credentials', JSON.stringify(credentials));
                    localStorage.setItem('medico_registration_completed', 'true');
                    
                    // Mostrar alerta de éxito
                    success('Tu registro se ha completado exitosamente. Continúa con el siguiente paso.', '¡Registro exitoso!');
                    
                    // Continuar al siguiente paso
                    setCurrentStep('simulacion');
                  } catch (error: any) {
                    const errorMessage = error.message || 'Error al registrar. Por favor intenta nuevamente.';
                    showError(errorMessage, 'Error en el registro');
                  } finally {
                    setIsRegistering(false);
                  }
                })}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('nombre', {
                        required: 'El nombre es requerido',
                        minLength: {
                          value: 2,
                          message: 'El nombre debe tener al menos 2 caracteres'
                        }
                      })}
                      type="text"
                      className={`w-full rounded-lg border shadow-sm focus:ring-2 sm:text-sm font-poppins ${
                        errors.nombre 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-crisal-gris focus:border-[#443c92] focus:ring-[#443c92]'
                      }`}
                      placeholder="Nombre completo"
                    />
                    {errors.nombre && (
                      <p className="mt-1 text-xs text-red-600 font-poppins">{errors.nombre.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Apellido <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('apellido', {
                        required: 'El apellido es requerido',
                        minLength: {
                          value: 2,
                          message: 'El apellido debe tener al menos 2 caracteres'
                        }
                      })}
                      type="text"
                      className={`w-full rounded-lg border shadow-sm focus:ring-2 sm:text-sm font-poppins ${
                        errors.apellido 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-crisal-gris focus:border-[#443c92] focus:ring-[#443c92]'
                      }`}
                      placeholder="Apellido completo"
                    />
                    {errors.apellido && (
                      <p className="mt-1 text-xs text-red-600 font-poppins">{errors.apellido.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('email', {
                        required: 'El correo electrónico es requerido',
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: 'Debe ser un email válido'
                        }
                      })}
                      type="email"
                      className={`w-full rounded-lg border shadow-sm focus:ring-2 sm:text-sm font-poppins ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-crisal-gris focus:border-[#443c92] focus:ring-[#443c92]'
                      }`}
                      placeholder="correo@ejemplo.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 font-poppins">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Especialidad
                    </label>
                    <select
                      {...register('especialidad')}
                      className="w-full rounded-lg border border-crisal-gris shadow-sm focus:border-[#443c92] focus:ring-2 focus:ring-[#443c92] sm:text-sm font-poppins bg-white"
                    >
                      <option value="">Seleccione una especialidad</option>
                      {especialidades.map((esp) => (
                        <option key={esp} value={esp}>
                          {esp}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Número de WhatsApp
                    </label>
                    <div className="[&_.PhoneInput]:flex [&_.PhoneInput]:gap-2 [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:rounded-lg [&_.PhoneInputInput]:border [&_.PhoneInputInput]:border-crisal-gris [&_.PhoneInputInput]:shadow-sm [&_.PhoneInputInput]:focus:border-[#443c92] [&_.PhoneInputInput]:focus:ring-2 [&_.PhoneInputInput]:focus:ring-[#443c92] [&_.PhoneInputInput]:sm:text-sm [&_.PhoneInputInput]:font-poppins [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:py-2 [&_.PhoneInputCountry]:rounded-l-lg [&_.PhoneInputCountry]:border [&_.PhoneInputCountry]:border-crisal-gris [&_.PhoneInputCountry]:border-r-0 [&_.PhoneInputCountry]:bg-white [&_.PhoneInputCountrySelect]:border-none [&_.PhoneInputCountrySelect]:bg-transparent [&_.PhoneInputCountrySelect]:text-sm">
                      <PhoneInput
                        international
                        defaultCountry="CO"
                        value={phoneValue}
                        onChange={(value) => {
                          setPhoneValue(value || '');
                          setValue('whatsapp', value || '');
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-poppins-semibold text-crisal-azul mb-1">
                      Contraseña <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          {...register('password', {
                            required: 'La contraseña es requerida',
                            minLength: {
                              value: 8,
                              message: 'La contraseña debe tener al menos 8 caracteres'
                            },
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                              message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
                            }
                          })}
                          type={showPassword ? 'text' : 'password'}
                          className={`w-full rounded-lg border shadow-sm focus:ring-2 sm:text-sm font-poppins pr-10 ${
                            errors.password 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                              : 'border-crisal-gris focus:border-[#443c92] focus:ring-[#443c92]'
                          }`}
                          placeholder="Ingrese una contraseña segura"
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
                        type="button"
                        onClick={() => {
                          const newPassword = generateSecurePassword();
                          setValue('password', newPassword);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 font-poppins-semibold text-sm shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
                        title="Generar contraseña segura"
                      >
                        <KeyIconSolid className="h-4 w-4" />
                        Generar
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-600 font-poppins">{errors.password.message}</p>
                    )}
                    <p className="mt-1 text-xs text-crisal-azul/60 font-poppins">
                      La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales
                    </p>
                  </div>
                </div>
                <div className="bg-[#443c92]/20 border border-[#443c92]/40 rounded-lg p-3">
                  <p className="text-sm font-poppins text-[#443c92]">
                    <strong className="font-poppins-semibold">Nota:</strong> La información proporcionada podrá ser compartida con nuestros aliados internos: Nutrapp, Alivia y AMF.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white px-6 py-2 rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 flex items-center font-poppins-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRegistering ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registrando...
                    </>
                  ) : (
                    <>
                      Continuar
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </>
                  )}
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
                        ? 'border-[#443c92] bg-[#443c92]/20' 
                        : 'border-crisal-gris hover:bg-crisal-gris/50'
                    }`}
                    onClick={() => setSelectedPatient(num)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="bg-gradient-to-br from-[#443c92] to-[#1d1d6d] text-white rounded-full w-8 h-8 flex items-center justify-center font-poppins-semibold mr-2">
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
                      className="w-full mt-2 bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white px-4 py-2 rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 text-sm font-poppins-semibold shadow-lg transition-all"
                    >
                      Iniciar Simulación
                    </button>
                  </div>
                ))}
              </div>
              
              {selectedPatient && (
                <div className="bg-[#443c92]/20 border border-[#443c92]/40 rounded-lg p-4 mb-4">
                  <p className="text-sm font-poppins text-[#443c92]">
                    <strong className="font-poppins-semibold">Paciente {selectedPatient} seleccionado.</strong> Al iniciar la simulación, tendrás acceso temporal de 30 minutos al panel del médico.
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setSimulationCompleted(true);
                  setCurrentStep('prueba');
                }}
                className="bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white px-6 py-2 rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 font-poppins-semibold shadow-lg transition-all"
              >
                Completar Simulación
              </button>
            </div>
          )}

          {/* Versión de Prueba - Crisal-iA */}
          {currentStep === 'prueba' && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <CheckCircleIcon className="h-6 w-6 text-[#443c92] mr-2" />
                <h2 className="text-lg font-ibrand text-crisal-azul">
                  Versión de Prueba - Crisal-iA
                </h2>
              </div>
              <div className="bg-[#443c92]/20 border border-[#443c92]/40 rounded-lg p-6 mb-4">
                <p className="font-poppins text-crisal-azul mb-4">
                  En esta versión de prueba, Crisal-iA acompañará sin costo en la configuración inicial de preferencias de atención médica.
                </p>
                <p className="text-lg font-poppins-semibold text-crisal-azul mb-2">
                  Podrás atender hasta <span className="text-[#443c92]">3 pacientes de forma gratuita</span>
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
                className="bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white px-6 py-2 rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 font-poppins-semibold shadow-lg transition-all"
              >
                Activar Versión de Prueba y Continuar
              </button>
            </div>
          )}

          {/* Generación de Contrato */}
          {currentStep === 'contrato' && (
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-[#443c92] mr-2" />
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
                  className="bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white px-6 py-2 rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 flex items-center font-poppins-semibold shadow-lg transition-all"
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
                <KeyIcon className="h-6 w-6 text-[#443c92] mr-2" />
                <h2 className="text-lg font-ibrand text-crisal-azul">
                  Tus Credenciales de Acceso
                </h2>
              </div>
              <div className="bg-[#443c92]/20 border border-[#443c92]/40 rounded-lg p-6 mb-4">
                <p className="text-sm font-poppins text-[#443c92] mb-4">
                  <strong className="font-poppins-semibold">¡Felicitaciones!</strong> Has completado el proceso de inscripción. Se han generado tus credenciales de acceso.
                </p>
                
                {!generatedCredentials && (
                  <div className="bg-[#443c92]/20 border border-[#443c92]/40 rounded-lg p-4">
                    <p className="text-sm font-poppins text-[#443c92] mb-2">
                      Las credenciales se generarán automáticamente después del registro inicial.
                    </p>
                    <p className="text-xs font-poppins text-[#443c92]/70">
                      Si ya completaste el registro, las credenciales aparecerán aquí.
                    </p>
                  </div>
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
                          className="flex-1 rounded-lg border border-crisal-gris shadow-sm focus:border-[#443c92] focus:ring-2 focus:ring-[#443c92] sm:text-sm bg-crisal-gris font-poppins"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(generatedCredentials.email);
                            success('Email copiado al portapapeles');
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
                            className="w-full rounded-lg border border-crisal-gris shadow-sm focus:border-[#443c92] focus:ring-2 focus:ring-[#443c92] sm:text-sm bg-crisal-gris pr-10 font-poppins"
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
                            success('Contraseña copiada al portapapeles');
                          }}
                          className="ml-2 px-3 py-2 bg-crisal-gris text-crisal-azul rounded-lg hover:bg-crisal-gris/80 text-sm font-poppins-semibold transition-all"
                        >
                          Copiar
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#443c92]/20 border border-[#443c92]/40 rounded-lg p-3">
                      <p className="text-xs font-poppins text-[#443c92]">
                        <strong className="font-poppins-semibold">⚠️ Importante:</strong> Guarda estas credenciales en un lugar seguro. Necesitarás usarlas para iniciar sesión en Crisal-iA.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        // Redirigir al login con las credenciales prellenadas
                        navigate(`/login?email=${encodeURIComponent(generatedCredentials.email)}&registered=true`);
                      }}
                      className="w-full bg-gradient-to-r from-[#443c92] to-[#1d1d6d] text-white px-6 py-2 rounded-lg hover:from-[#443c92]/90 hover:to-[#1d1d6d]/90 font-poppins-semibold shadow-lg transition-all"
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

