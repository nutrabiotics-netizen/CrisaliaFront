import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { useForm } from 'react-hook-form';
import type { LoginCredentials } from '../../services/authService';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import backgroundImage from '../../assets/images/Background.png';
import logoImage from '../../assets/images/Crisalia.png';

// Función para obtener la ruta del logo con fallback
const getLogoPath = () => {
  // En desarrollo, usar la importación
  // En producción, Vite procesará la imagen y devolverá la URL correcta
  return logoImage || '/images/Crisalia.png';
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { success, error: showError } = useAlert();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Mostrar mensaje de éxito si viene de Welcome después de registrarse
    if (searchParams.get('registered') === 'true') {
      success('Ahora puedes iniciar sesión.', '¡Registro completado exitosamente!');
    }
  }, [searchParams, success]);

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
    setLoading(true);

    try {
      await login(data);
      
      // Esperar un momento para que el contexto se actualice
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Obtener el usuario del localStorage después del login
      const loggedUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!loggedUser || !loggedUser.role) {
        throw new Error('No se pudo obtener la información del usuario');
      }
      
      // Redirigir según el rol del usuario
      if (loggedUser.role === 'paciente') {
        navigate('/paciente/dashboard');
      } else if (loggedUser.role === 'administrativo') {
        navigate('/administrativo/dashboard');
      } else if (loggedUser.role === 'medico') {
        navigate('/medico/dashboard');
      } else {
        // Si no tiene rol válido, redirigir al dashboard del médico por defecto
        console.warn('Usuario sin rol definido, redirigiendo al dashboard del médico');
        navigate('/medico/dashboard');
      }
    } catch (err: any) {
      console.error('Error en login:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Error al iniciar sesión. Verifica tus credenciales.';
      showError(errorMessage, 'Error de autenticación');
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
      {/* Overlay con gradiente de marca mejorado */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#443c92]/20 via-[#ff9d9d]/10 to-[#1d1d6d]/15 z-0"></div>
      
      {/* Efectos de partículas decorativas mejorados */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#443c92]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1d1d6d]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#ff9d9d]/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="w-full h-screen flex flex-col lg:flex-row relative z-10 overflow-hidden">
        {/* Panel izquierdo - Formulario de Login */}
        <div className="w-full lg:w-1/2 h-screen flex flex-col items-center justify-center py-4 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative overflow-y-auto scrollbar-hide">
          <div className="w-full max-w-md mx-auto">
            {/* Logo visible en móvil */}
            <div className="lg:hidden mb-3 sm:mb-4 flex justify-center w-full">
              <div className="text-center animate-float w-full max-w-[140px] sm:max-w-[160px] mx-auto">
                <div className="relative inline-block w-full">
                  <div className="absolute inset-0 animate-glow opacity-60 -z-10 pointer-events-none"></div>
                  <img 
                    src={getLogoPath()} 
                    alt="CRISALIA" 
                    className="relative z-10 w-full h-auto block animate-shine"
                    style={{ 
                      filter: 'drop-shadow(0 0 20px rgba(68, 60, 146, 0.8)) drop-shadow(0 0 40px rgba(68, 60, 146, 0.6))',
                      maxWidth: '100%',
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'contain'
                    }}
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      console.error('Error loading logo image, trying fallback');
                      const target = e.currentTarget;
                      const currentSrc = target.src;
                      if (!currentSrc.includes('/images/Crisalia.png')) {
                        target.src = '/images/Crisalia.png';
                      } else if (!currentSrc.includes('assets')) {
                        target.src = '/src/assets/images/Crisalia.png';
                      }
                    }}
                    onLoad={() => {
                      console.log('Logo loaded successfully');
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Título y subtítulo */}
            <div className="mb-6 sm:mb-7 text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-3xl font-ibrand text-white mb-2 drop-shadow-lg">
                Bienvenido de nuevo
              </h1>
              <p className="text-sm sm:text-base font-poppins text-white/90 drop-shadow-md">
                Inicia sesión para continuar
              </p>
            </div>

            {/* Formulario de login */}
            <div className="w-full bg-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 md:p-8 border border-white/30 shadow-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-[#443c92]/5 after:via-transparent after:to-transparent after:pointer-events-none animate-in fade-in slide-in-from-top-2 duration-300">
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-poppins-semibold text-white mb-2 drop-shadow-lg">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
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
                        className="w-full pl-11 pr-4 py-3 text-sm bg-white/15 backdrop-blur-xl border-2 border-white/25 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#443c92]/70 focus:border-[#443c92]/80 focus:bg-white/30 focus:shadow-[0_0_0_4px_rgba(68,60,146,0.2)] transition-all duration-300 font-poppins shadow-xl hover:border-white/50 hover:bg-white/20 hover:shadow-2xl"
                        placeholder="tu@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs font-poppins text-red-300 drop-shadow-md animate-in fade-in slide-in-from-top-1 duration-200 flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-poppins-semibold text-white mb-2 drop-shadow-lg">
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
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
                        className="w-full pl-11 pr-11 py-3 text-sm bg-white/15 backdrop-blur-xl border-2 border-white/25 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#443c92]/70 focus:border-[#443c92]/80 focus:bg-white/30 focus:shadow-[0_0_0_4px_rgba(68,60,146,0.2)] transition-all duration-300 font-poppins shadow-xl hover:border-white/50 hover:bg-white/20 hover:shadow-2xl"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center touch-manipulation group"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-white/60 group-hover:text-[#443c92] transition-all duration-200 group-hover:scale-110" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-white/60 group-hover:text-[#443c92] transition-all duration-200 group-hover:scale-110" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs font-poppins text-red-300 drop-shadow-md animate-in fade-in slide-in-from-top-1 duration-200 flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Recordar y Olvidar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center group">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#443c92] focus:ring-[#443c92] focus:ring-2 border-white/40 rounded cursor-pointer transition-all duration-200 checked:bg-[#443c92] checked:border-[#443c92] hover:border-[#443c92]/80 hover:scale-110"
                    />
                    <label htmlFor="remember-me" className="ml-2.5 block text-sm font-poppins-medium text-white drop-shadow-md cursor-pointer group-hover:text-white/95 transition-colors duration-200">
                      Recordar sesión
                    </label>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="text-sm font-poppins-semibold text-white/90 hover:text-white transition-all duration-200 drop-shadow-md hover:underline underline-offset-3 decoration-white/50 hover:decoration-white"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>

                {/* Botón Submit mejorado */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3.5 px-6 border border-transparent text-sm sm:text-base font-poppins-bold rounded-xl text-white bg-gradient-to-r from-[#443c92] via-[#5a4fa0] to-[#1d1d6d] hover:from-[#4d459f] hover:via-[#443c92] hover:to-[#2d2d7d] focus:outline-none focus:ring-4 focus:ring-[#443c92]/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-[0_10px_40px_rgba(68,60,146,0.4)] hover:scale-[1.02] active:scale-[0.98] touch-manipulation relative overflow-hidden group mt-2"
                >
                  <span className="relative z-10 flex items-center">
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        <span>Iniciando sesión...</span>
                      </>
                    ) : (
                      <>
                        <span>Iniciar Sesión</span>
                        <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </form>

              {/* Enlace médico nuevo */}
              <div className="mt-4 pt-4 border-t border-white/20 text-center">
                <p className="text-xs font-poppins text-white/90 drop-shadow-md">
                  ¿Eres médico nuevo?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/medico/welcome')}
                    className="font-poppins-bold text-white hover:text-[#ffb501] transition-all duration-200 underline underline-offset-2 drop-shadow-md touch-manipulation hover:underline-offset-4"
                  >
                    Comienza tu registro aquí
                  </button>
                </p>
              </div>

              {/* Footer - Copyright */}
              <div className="text-center mt-4 pt-4 border-t border-white/20">
                <p className="text-[10px] sm:text-xs font-poppins text-white/70 drop-shadow-md">
                  Copyright © CRISALIA: Médico con inteligencia Artificial
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Branding y mensaje */}
        <div className="hidden lg:flex lg:w-1/2 h-screen items-center justify-center px-6 xl:px-8 relative overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full max-w-lg relative z-10 space-y-6">
            {/* Logo principal con animación mejorada */}
            <div className="text-center animate-float">
              <div className="relative inline-block">
                <div className="absolute inset-0 animate-glow opacity-70"></div>
                <img 
                  src={getLogoPath()} 
                  alt="CRISALIA" 
                  className="mx-auto h-auto block relative z-10 animate-shine"
                  style={{ 
                    filter: 'drop-shadow(0 0 40px rgba(68, 60, 146, 0.8)) drop-shadow(0 0 80px rgba(68, 60, 146, 0.6)) drop-shadow(0 0 120px rgba(68, 60, 146, 0.4))',
                    maxWidth: '100%',
                    width: 'auto',
                    height: 'auto',
                    maxHeight: '55vh',
                    objectFit: 'contain'
                  }}
                  loading="eager"
                  onError={(e) => {
                    console.error('Error loading logo image, trying fallback');
                    const target = e.currentTarget;
                    if (target.src !== '/images/Crisalia.png') {
                      target.src = '/images/Crisalia.png';
                    }
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

