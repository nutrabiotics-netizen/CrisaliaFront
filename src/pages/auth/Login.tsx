import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import type { LoginCredentials } from '../../services/authService';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import backgroundImage from '../../assets/images/Background.png';
import logoImage from '../../assets/images/Crisalia.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Mostrar mensaje de éxito si viene de Welcome después de registrarse
    if (searchParams.get('registered') === 'true') {
      setShowSuccessMessage(true);
      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
    
    // Prellenar email si viene de Welcome
    const emailParam = searchParams.get('email');
    if (emailParam) {
      // Prellenar el campo de email usando setValue de react-hook-form
      // Necesitamos acceder al setValue del formulario
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginCredentials>({
    defaultValues: {
      email: searchParams.get('email') || ''
    }
  });

  useEffect(() => {
    // Prellenar email si viene de Welcome
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setValue('email', emailParam);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: LoginCredentials) => {
    setError('');
    setLoading(true);

    try {
      await login(data);
      // Redirigir según el rol del usuario
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'paciente') {
        navigate('/paciente/dashboard');
      } else if (user.role === 'administrativo') {
        navigate('/administrativo/dashboard');
      } else {
        navigate('/medico/dashboard');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Error al iniciar sesión. Verifica tus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: window.innerWidth >= 1024 ? 'fixed' : 'scroll'
      }}
    >
      {/* Overlay con gradiente de marca - más sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#29536D]/15 via-[#60EFDB]/8 to-transparent z-0"></div>
      
      {/* Efectos de partículas decorativas */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#60EFDB]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#29536D]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="w-full min-h-screen flex flex-col lg:flex-row relative z-10">
        {/* Panel izquierdo - Formulario de Login con efecto glassmorphism */}
        <div className="w-full lg:w-1/2 min-h-screen flex flex-col items-center justify-center backdrop-blur-xl lg:border-r border-white/20 py-4 sm:py-6 lg:py-12 relative">
          <div className="w-full flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16">
            {/* Logo visible en móvil */}
            <div className="lg:hidden mb-4 sm:mb-6 md:mb-8 flex justify-center w-full">
              <div className="text-center animate-float w-full">
                <div className="relative inline-block w-full max-w-[180px] sm:max-w-[220px] md:max-w-[250px]">
                  <div className="absolute inset-0 animate-glow"></div>
                  <img 
                    src={logoImage} 
                    alt="CRISALIA" 
                    className="mx-auto w-full h-auto block relative z-10 animate-shine"
                    style={{ 
                      filter: 'drop-shadow(0 0 20px rgba(41, 83, 109, 0.8)) drop-shadow(0 0 40px rgba(41, 83, 109, 0.6))',
                      maxWidth: '100%',
                      width: '100%',
                      height: 'auto'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Formulario de login */}
            <div className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/30 shadow-[0_8px_32px_0_rgba(41,83,109,0.37)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:pointer-events-none animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Mensaje de éxito si viene de Welcome */}
              {showSuccessMessage && (
                <div className="mb-4 sm:mb-6 rounded-xl bg-gradient-to-r from-[#60EFDB]/20 to-[#60EFDB]/10 backdrop-blur-md border border-[#60EFDB]/60 p-3 sm:p-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="rounded-full bg-[#60EFDB]/30 p-1">
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5 text-[#29536D]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                      <div className="ml-2 sm:ml-3 flex-1">
                        <p className="text-xs sm:text-sm font-poppins-medium text-white drop-shadow-md leading-tight">
                          ¡Registro completado exitosamente! Ahora puedes iniciar sesión.
                        </p>
                      </div>
                  </div>
                </div>
              )}

              <form className="space-y-4 sm:space-y-5 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                  <div className="rounded-xl bg-gradient-to-r from-red-500/20 to-red-500/10 backdrop-blur-md border border-red-400/60 p-3 sm:p-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="rounded-full bg-red-500/30 p-1">
                          <svg
                            className="h-4 w-4 sm:h-5 sm:w-5 text-red-200"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-2 sm:ml-3 flex-1">
                        <p className="text-xs sm:text-sm font-poppins-medium text-white drop-shadow-md leading-tight">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 sm:space-y-5">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-poppins-semibold text-white mb-1.5 sm:mb-2 drop-shadow-md">
                      Correo electrónico
                    </label>
                    <input
                      {...register('email', {
                        required: 'El email es requerido',
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: 'Email inválido'
                        }
                      })}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white/15 backdrop-blur-md border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#60EFDB]/50 focus:border-[#60EFDB] focus:bg-white/20 focus:shadow-[0_0_0_4px_rgba(96,239,219,0.1)] transition-all duration-300 font-poppins shadow-lg hover:border-white/50 hover:bg-white/18"
                      placeholder="Correo electrónico"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs sm:text-sm font-poppins text-red-300 drop-shadow-md animate-in fade-in slide-in-from-top-1 duration-200">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-xs sm:text-sm font-poppins-semibold text-white mb-1.5 sm:mb-2 drop-shadow-md">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        {...register('password', {
                          required: 'La contraseña es requerida',
                          minLength: {
                            value: 6,
                            message: 'La contraseña debe tener al menos 6 caracteres'
                          }
                        })}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base bg-white/15 backdrop-blur-md border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#60EFDB]/50 focus:border-[#60EFDB] focus:bg-white/20 focus:shadow-[0_0_0_4px_rgba(96,239,219,0.1)] transition-all duration-300 font-poppins shadow-lg hover:border-white/50 hover:bg-white/18"
                        placeholder="Contraseña"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center touch-manipulation group"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white/70 group-hover:text-[#60EFDB] transition-all duration-200 group-hover:scale-110" />
                        ) : (
                          <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white/70 group-hover:text-[#60EFDB] transition-all duration-200 group-hover:scale-110" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs sm:text-sm font-poppins text-red-300 drop-shadow-md animate-in fade-in slide-in-from-top-1 duration-200">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                {/* Recordar y Olvidar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex items-center group">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 sm:h-4 sm:w-4 text-[#60EFDB] focus:ring-[#60EFDB] focus:ring-2 border-white/40 rounded cursor-pointer transition-all duration-200 checked:bg-[#60EFDB] checked:border-[#60EFDB] hover:border-[#60EFDB]/70"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm font-poppins text-white drop-shadow-md cursor-pointer group-hover:text-[#60EFDB]/90 transition-colors duration-200">
                      Recordar sesión
                    </label>
                  </div>

                  <div className="text-xs sm:text-sm">
                    <a
                      href="#"
                      className="font-poppins-semibold text-white hover:text-[#60EFDB] transition-all duration-200 drop-shadow-md hover:underline underline-offset-2"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>

                {/* Botón Submit con degradado de marca */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-poppins-semibold rounded-xl text-white bg-gradient-to-r from-[#60EFDB] via-[#4DD4C4] to-[#29536D] hover:from-[#60EFDB] hover:via-[#60EFDB] hover:to-[#3A7A9A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#60EFDB] focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(96,239,219,0.4)] hover:scale-[1.02] active:scale-[0.98] touch-manipulation relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-xs sm:text-base">Iniciando sesión...</span>
                    </span>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>

              {/* Enlace médico nuevo */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/30 text-center">
                <p className="text-xs sm:text-sm font-poppins text-white/90 drop-shadow-md leading-relaxed">
                  ¿Eres médico nuevo?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/medico/welcome')}
                    className="font-poppins-semibold text-white hover:text-[#60EFDB] transition-all duration-200 underline underline-offset-2 drop-shadow-md touch-manipulation hover:underline-offset-4"
                  >
                    Comienza tu registro aquí
                  </button>
                </p>
              </div>

              {/* Footer - Copyright */}
              <div className="text-center mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 border-t border-white/30">
                <p className="text-[10px] sm:text-xs font-poppins text-white/80 drop-shadow-md leading-relaxed px-2">
                  Copyright © CRISALIA: Médico con inteligencia Artificial
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Logo */}
        <div className="hidden lg:flex lg:w-1/2 min-h-screen items-center justify-center px-8 relative">
          <div className="flex flex-col items-center justify-center w-full h-full relative z-10">
            {/* Logo principal centrado con animación y brillos */}
            <div className="text-center animate-float">
              <div className="relative inline-block">
                {/* Efecto de brillo detrás del logo */}
                <div className="absolute inset-0 animate-glow"></div>
                <img 
                  src={logoImage} 
                  alt="CRISALIA" 
                  className="mx-auto h-auto block relative z-10 animate-shine"
                  style={{ 
                    filter: 'drop-shadow(0 0 40px rgba(41, 83, 109, 0.8)) drop-shadow(0 0 80px rgba(41, 83, 109, 0.6)) drop-shadow(0 0 120px rgba(41, 83, 109, 0.4))',
                    maxWidth: '100%',
                    width: 'auto',
                    height: 'auto',
                    maxHeight: '70vh'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

