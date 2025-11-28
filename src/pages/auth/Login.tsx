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
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay con gradiente de marca - más sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#29536D]/10 via-[#60EFDB]/5 to-transparent z-0"></div>
      
      <div className="w-full h-screen flex relative z-10">
        {/* Panel izquierdo - Formulario de Login con efecto glassmorphism */}
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center backdrop-blur-xl border-r border-white/10">
          <div className="w-full flex-1 flex flex-col items-center justify-center px-8 lg:px-16 py-12">
            {/* Logo visible en móvil */}
            <div className="lg:hidden mb-8 flex justify-center">
              <div className="text-center animate-float">
                <div className="relative inline-block">
                  <div className="absolute inset-0 animate-glow"></div>
                  <img 
                    src={logoImage} 
                    alt="CRISALIA" 
                    className="mx-auto h-auto block relative z-10 animate-shine"
                    style={{ 
                      filter: 'drop-shadow(0 0 30px rgba(41, 83, 109, 0.8)) drop-shadow(0 0 60px rgba(41, 83, 109, 0.6))',
                      maxWidth: '200px',
                      width: 'auto',
                      height: 'auto'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Título con tipografía Ibrand Regular */}
           
           
            <div className="w-full max-w-md mx-auto bg-white/3 backdrop-blur-xl rounded-2xl p-8 lg:p-10 border border-white/20 shadow-2xl">
              {/* Mensaje de éxito si viene de Welcome */}
              {showSuccessMessage && (
                <div className="mb-6 rounded-lg bg-[#60EFDB]/30 backdrop-blur-sm border border-[#60EFDB]/60 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-[#29536D]"
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
                      <div className="ml-3">
                        <p className="text-sm font-poppins-medium text-white drop-shadow-md">
                          ¡Registro completado exitosamente! Ahora puedes iniciar sesión.
                        </p>
                      </div>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                  <div className="rounded-lg bg-red-500/30 backdrop-blur-sm border border-red-400/60 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-600"
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
                      <div className="ml-3">
                        <p className="text-sm font-poppins-medium text-white drop-shadow-md">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-poppins-semibold text-white mb-2 drop-shadow-md">
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
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#60EFDB] focus:border-[#60EFDB] transition-all font-poppins shadow-lg"
                      placeholder="Correo electrónico"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm font-poppins text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-poppins-semibold text-white mb-2 drop-shadow-md">
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
                        className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#60EFDB] focus:border-[#60EFDB] transition-all font-poppins shadow-lg"
                        placeholder="Contraseña"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm font-poppins text-red-600">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                {/* Recordar y Olvidar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#60EFDB] focus:ring-[#60EFDB] border-crisal-gris rounded checked:bg-[#60EFDB] checked:border-[#60EFDB]"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm font-poppins text-white drop-shadow-md">
                      Recordar sesión
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-poppins-semibold text-white hover:text-[#60EFDB] transition-colors drop-shadow-md"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>

                {/* Botón Submit con degradado de marca */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-poppins-semibold rounded-lg text-white bg-gradient-to-r from-[#60EFDB] to-[#29536D] hover:from-[#60EFDB]/90 hover:to-[#29536D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#60EFDB] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Iniciando sesión...
                    </span>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>

              {/* Enlace médico nuevo */}
              <div className="mt-6 pt-6 border-t border-white/30 text-center">
                <p className="text-sm font-poppins text-white/90 drop-shadow-md">
                  ¿Eres médico nuevo?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/medico/welcome')}
                    className="font-poppins-semibold text-white hover:text-[#60EFDB] transition-colors underline drop-shadow-md"
                  >
                    Comienza tu registro aquí
                  </button>
                </p>
              </div>

              {/* Footer - Copyright */}
              <div className="text-center mt-8 pt-6 border-t border-white/30">
                <p className="text-xs font-poppins text-white/80 drop-shadow-md">
                  Copyright © CRISALIA: Médico con inteligencia Artificial
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Logo */}
        <div className="hidden lg:flex lg:w-1/2 h-full items-center justify-center px-8 relative">
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

