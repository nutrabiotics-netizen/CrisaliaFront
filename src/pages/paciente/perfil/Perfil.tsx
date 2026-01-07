import PacienteLayout from '../../../components/layout/PacienteLayout';
import { useAuth } from '../../../context/AuthContext';
import { useAlert } from '../../../context/AlertContext';
import { pacienteService, PerfilCompleto } from '../../../services/pacienteService';
import { 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  LockClosedIcon,
  FingerPrintIcon,
  DevicePhoneMobileIcon,
  BellIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';

const Perfil = () => {
  const { user } = useAuth();
  const { success, error, info } = useAlert();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Estados para datos demográficos
  const [paisNacimiento, setPaisNacimiento] = useState<string>('');
  const [estadoNacimiento, setEstadoNacimiento] = useState<string>('');
  const [ciudadNacimiento, setCiudadNacimiento] = useState<string>('');
  const [paisResidencia, setPaisResidencia] = useState<string>('');
  const [estadoResidencia, setEstadoResidencia] = useState<string>('');
  const [ciudadResidencia, setCiudadResidencia] = useState<string>('');

  // Estados para información personal
  const [formData, setFormData] = useState({
    // Información personal básica
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
                    tipoDocumento: '',
    numeroDocumento: '',
    fechaNacimiento: user?.fechaNacimiento || '',
    sexoBiologico: '',
    genero: '',
    estadoCivil: '',
    nacionalidad: '',
    lugarResidencia: '',
    
    // Datos de contacto
    direccion: user?.direccion || '',
    telefono: user?.telefono || '',
    email: user?.email || '',
    contactoEmergencia: {
      nombre: '',
      relacion: '',
      telefono: ''
    },
    
    // Datos de afiliación
    regimenAfiliacion: '',
    eps: '',
    numeroAfiliacion: '',
    
    // Opciones de seguridad
    autenticacionDosFactores: false,
    recordarDispositivo: false,
    autenticacionBiometrica: false,
    tipoBiometrico: 'ninguno', // 'facial', 'huella', 'ninguno'
    visualizarContrasena: false,
    
    // Preferencias de notificación
    metodoNotificacion: 'whatsapp', // 'whatsapp', 'email', 'sms'
    
    // Términos y condiciones
    aceptaTerminos: false,
    aceptaConsentimiento: false
  });

  // Cargar perfil al montar el componente
  useEffect(() => {
    const cargarPerfil = async () => {
      setLoading(true);
      try {
        const perfilCompleto: PerfilCompleto = await pacienteService.obtenerPerfil();
        const { paciente, configuracionSeguridad } = perfilCompleto;
        
        // Parsear datos demográficos si vienen en formato string separado por comas
        const nacionalidadParts = paciente.nacionalidad?.split(',') || [];
        const residenciaParts = paciente.lugarResidencia?.split(',') || [];
        
        setPaisNacimiento(nacionalidadParts[0] || '');
        setEstadoNacimiento(nacionalidadParts[1] || '');
        setCiudadNacimiento(nacionalidadParts[2] || '');
        setPaisResidencia(residenciaParts[0] || '');
        setEstadoResidencia(residenciaParts[1] || '');
        setCiudadResidencia(residenciaParts[2] || '');
        
        setFormData({
          nombre: paciente.nombre || '',
          apellido: paciente.apellido || '',
          tipoDocumento: paciente.tipoDocumento || '',
          numeroDocumento: paciente.numeroDocumento || '',
          fechaNacimiento: paciente.fechaNacimiento ? paciente.fechaNacimiento.split('T')[0] : '',
          sexoBiologico: paciente.sexoBiologico || '',
          genero: paciente.genero || '',
          estadoCivil: paciente.estadoCivil || '',
          nacionalidad: paciente.nacionalidad || '',
          lugarResidencia: paciente.lugarResidencia || '',
          direccion: paciente.direccion || '',
          telefono: paciente.telefono || '',
          email: paciente.email || '',
          contactoEmergencia: paciente.contactoEmergencia || { nombre: '', relacion: '', telefono: '' },
          regimenAfiliacion: paciente.regimenAfiliacion || '',
          eps: paciente.eps || '',
          numeroAfiliacion: paciente.numeroAfiliacion || '',
          autenticacionDosFactores: configuracionSeguridad?.autenticacionDosFactores || false,
          recordarDispositivo: configuracionSeguridad?.recordarDispositivo || false,
          autenticacionBiometrica: configuracionSeguridad?.autenticacionBiometrica || false,
          tipoBiometrico: configuracionSeguridad?.tipoBiometrico || 'ninguno',
          visualizarContrasena: configuracionSeguridad?.visualizarContrasena || false,
          metodoNotificacion: configuracionSeguridad?.metodoNotificacion || 'whatsapp',
          aceptaTerminos: configuracionSeguridad?.aceptaTerminos || false,
          aceptaConsentimiento: configuracionSeguridad?.aceptaConsentimiento || false
        });
      } catch (err: any) {
        console.error('Error al cargar el perfil:', err);
        error(err.response?.data?.message || 'Error al cargar el perfil', 'Error');
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, [error]);

  if (loading) {
    return (
      <PacienteLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-crisal-turquesa border-crisal-azul mb-4"></div>
            <p className="font-poppins text-crisal-azul">Cargando perfil...</p>
          </div>
        </div>
      </PacienteLayout>
    );
  }

  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-4">
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
            {/* INTRODUCCIÓN */}
            <div className="border-t border-crisal-gris pt-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-ibrand text-crisal-azul">
                  Suite de Introducción a CRISAL-IA y Medicina Funcional
                </h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <VideoCameraIcon className="h-5 w-5 text-green-600 mr-2" />
                  Bienvenida e Inducción por Agente Virtual
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  En el contexto de la información obtenida en la bienvenida del paciente, un agente virtual multimedia, generado y entrenado por IA, guiará la inducción del paciente basándose en un entrenamiento prediseñado por un equipo médico experto.
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  Se explicará al paciente qué es CRISAL-IA y qué es la Medicina Funcional, proporcionando una comprensión clara del enfoque y los beneficios de este sistema de salud integral.
                </p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                  Iniciar Introducción Interactiva
                </button>
              </div>
            </div>

            {/* Información Personal - Datos de Identificación */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                1. Datos de Identificación Personal
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Nombres Completos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                    placeholder="Ingrese sus nombres completos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Apellidos Completos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                    required
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                    placeholder="Ingrese sus apellidos completos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Tipo de Documento <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <select
                    value={formData.tipoDocumento}
                    onChange={(e) => setFormData({...formData, tipoDocumento: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                  >
                    <option value="">Seleccione...</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="RC">Registro Civil</option>
                    <option value="PA">Pasaporte</option>
                    <option value="CE">Cédula de Extranjería</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Número de Documento <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.numeroDocumento}
                    onChange={(e) => setFormData({...formData, numeroDocumento: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                    placeholder="Ej: 1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Fecha de Nacimiento <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Sexo Biológico <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <select
                    value={formData.sexoBiologico}
                    onChange={(e) => setFormData({...formData, sexoBiologico: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                  >
                    <option value="">Seleccione...</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="intersexual">Intersexual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Género (según regulación de inclusión) <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <select
                    value={formData.genero}
                    onChange={(e) => setFormData({...formData, genero: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                  >
                    <option value="">Seleccione...</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="no-binario">No Binario</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero-no-decir">Prefiero no decir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Estado Civil <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <select
                    value={formData.estadoCivil}
                    onChange={(e) => setFormData({...formData, estadoCivil: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                  >
                    <option value="">Seleccione...</option>
                    <option value="soltero">Soltero(a)</option>
                    <option value="casado">Casado(a)</option>
                    <option value="union-libre">Unión Libre</option>
                    <option value="divorciado">Divorciado(a)</option>
                    <option value="viudo">Viudo(a)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    País de Nacimiento <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <select
                    value={paisNacimiento}
                    onChange={(e) => {
                      setPaisNacimiento(e.target.value);
                      setEstadoNacimiento('');
                      setCiudadNacimiento('');
                    }}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                  >
                    <option value="">Seleccione un país</option>
                    {Country.getAllCountries().map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {paisNacimiento && (
                  <div>
                    <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                      Estado/Provincia de Nacimiento <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                    </label>
                    <select
                      value={estadoNacimiento}
                      onChange={(e) => {
                        setEstadoNacimiento(e.target.value);
                        setCiudadNacimiento('');
                      }}
                      className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                    >
                      <option value="">Seleccione un estado/provincia</option>
                      {State.getStatesOfCountry(paisNacimiento).map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {estadoNacimiento && (
                  <div>
                    <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                      Ciudad de Nacimiento <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                    </label>
                    <select
                      value={ciudadNacimiento}
                      onChange={(e) => setCiudadNacimiento(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                    >
                      <option value="">Seleccione una ciudad</option>
                      {City.getCitiesOfState(paisNacimiento, estadoNacimiento).map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    País de Residencia <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <select
                    value={paisResidencia}
                    onChange={(e) => {
                      setPaisResidencia(e.target.value);
                      setEstadoResidencia('');
                      setCiudadResidencia('');
                    }}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                  >
                    <option value="">Seleccione un país</option>
                    {Country.getAllCountries().map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {paisResidencia && (
                  <div>
                    <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                      Estado/Provincia de Residencia <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                    </label>
                    <select
                      value={estadoResidencia}
                      onChange={(e) => {
                        setEstadoResidencia(e.target.value);
                        setCiudadResidencia('');
                      }}
                      className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                    >
                      <option value="">Seleccione un estado/provincia</option>
                      {State.getStatesOfCountry(paisResidencia).map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {estadoResidencia && (
                  <div>
                    <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                      Ciudad de Residencia <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                    </label>
                    <select
                      value={ciudadResidencia}
                      onChange={(e) => setCiudadResidencia(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                    >
                      <option value="">Seleccione una ciudad</option>
                      {City.getCitiesOfState(paisResidencia, estadoResidencia).map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Datos de Contacto */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                2. Datos de Contacto
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Dirección de Residencia <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                    placeholder="Ingrese su dirección completa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Teléfono Fijo o Celular <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                    placeholder="Ej: +57 300 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Correo Electrónico <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="sm:col-span-2 border-t border-gray-200 pt-4 mt-2">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Persona de Contacto en Caso de Emergencia <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={formData.contactoEmergencia.nombre}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactoEmergencia: {...formData.contactoEmergencia, nombre: e.target.value}
                        })}
                        className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                        Relación
                      </label>
                      <input
                        type="text"
                        value={formData.contactoEmergencia.relacion}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactoEmergencia: {...formData.contactoEmergencia, relacion: e.target.value}
                        })}
                        className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                        placeholder="Ej: Familiar, Amigo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.contactoEmergencia.telefono}
                        onChange={(e) => setFormData({
                          ...formData, 
                          contactoEmergencia: {...formData.contactoEmergencia, telefono: e.target.value}
                        })}
                        className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                        placeholder="Ej: +57 300 123 4567"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Datos de Afiliación al Sistema de Salud */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                3. Datos de Afiliación al Sistema de Salud
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Régimen de Afiliación <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <select
                    value={formData.regimenAfiliacion}
                    onChange={(e) => setFormData({...formData, regimenAfiliacion: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                  >
                    <option value="">Seleccione...</option>
                    <option value="contributivo">Contributivo</option>
                    <option value="subsidiado">Subsidiado</option>
                    <option value="especial">Especial</option>
                    <option value="excepcion">Excepción</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    EPS o ARL <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.eps}
                    onChange={(e) => setFormData({...formData, eps: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                    placeholder="Ej: EPS Sura, Coomeva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-semibold text-gray-900 mb-2">
                    Número de Afiliación <span className="text-gray-500 text-xs font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.numeroAfiliacion}
                    onChange={(e) => setFormData({...formData, numeroAfiliacion: e.target.value})}
                    className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins"
                    placeholder="Número de afiliación"
                  />
                </div>
              </div>
            </div>

            {/* Inicio de Sesión y Seguridad de Datos */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <LockClosedIcon className="h-4 w-4 text-white" />
                </div>
                Inicio de Sesión y Seguridad de Datos
              </h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Privacidad y seguridad:</strong> Se garantiza que los datos serán privados y no se venderán a terceros.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Datos biométricos:</strong> Los datos biométricos recolectados en la primera interacción con el paciente están pendientes de definición por la Junta MVP.
                </p>
              </div>

              {/* Opciones de Seguridad en el Inicio de Sesión */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-crisal-azul mb-3">
                  Opciones de Seguridad en el Inicio de Sesión
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="two-factor"
                        checked={formData.autenticacionDosFactores}
                        onChange={(e) => setFormData({...formData, autenticacionDosFactores: e.target.checked})}
                        className="h-5 w-5 text-[#443c92] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 cursor-pointer"
                      />
                      <label htmlFor="two-factor" className="ml-3 block text-sm font-poppins text-crisal-azul">
                        Autenticación de dos factores (2FA)
                      </label>
                    </div>
                    <span className="text-xs text-gray-500">Recomendado</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember-device"
                        checked={formData.recordarDispositivo}
                        onChange={(e) => setFormData({...formData, recordarDispositivo: e.target.checked})}
                        className="h-5 w-5 text-[#443c92] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 cursor-pointer"
                      />
                      <label htmlFor="remember-device" className="ml-3 block text-sm font-poppins text-crisal-azul">
                        Recordar dispositivo
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="biometric-auth"
                        checked={formData.autenticacionBiometrica}
                        onChange={(e) => setFormData({...formData, autenticacionBiometrica: e.target.checked})}
                        className="h-5 w-5 text-[#443c92] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 cursor-pointer"
                      />
                      <label htmlFor="biometric-auth" className="ml-3 block text-sm font-poppins text-crisal-azul">
                        Activar autenticación biométrica
                      </label>
                    </div>
                    <FingerPrintIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  {formData.autenticacionBiometrica && (
                    <div className="ml-7 mb-3">
                      <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                        Tipo de autenticación biométrica
                      </label>
                      <select
                        value={formData.tipoBiometrico}
                        onChange={(e) => setFormData({...formData, tipoBiometrico: e.target.value})}
                        className="w-full px-4 py-3 text-sm bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 shadow-sm hover:border-gray-300 font-poppins cursor-pointer"
                      >
                        <option value="ninguno">Seleccione...</option>
                        <option value="facial">Reconocimiento Facial (Dispositivos Móviles)</option>
                        <option value="huella">Huella Dactilar (Computadoras)</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="show-password"
                        checked={formData.visualizarContrasena}
                        onChange={(e) => setFormData({...formData, visualizarContrasena: e.target.checked})}
                        className="h-5 w-5 text-[#443c92] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 cursor-pointer"
                      />
                      <label htmlFor="show-password" className="ml-3 block text-sm font-poppins text-crisal-azul flex items-center">
                        Visualizar contraseña al escribir
                        {formData.visualizarContrasena ? (
                          <EyeIcon className="h-4 w-4 ml-2 text-gray-500" />
                        ) : (
                          <EyeSlashIcon className="h-4 w-4 ml-2 text-gray-500" />
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferencias de Notificación */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-crisal-azul mb-3 flex items-center">
                  <BellIcon className="h-5 w-5 text-crisal-turquesa mr-2" />
                  Preferencias de Notificación
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> Por el momento, en esta primera versión, por defecto la comunicación principal con el paciente será por medio de WhatsApp.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="notificacion"
                      value="whatsapp"
                      checked={formData.metodoNotificacion === 'whatsapp'}
                      onChange={(e) => setFormData({...formData, metodoNotificacion: e.target.value})}
                      className="h-5 w-5 text-[#443c92] border-2 border-gray-300 focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 cursor-pointer"
                    />
                    <DevicePhoneMobileIcon className="h-5 w-5 text-green-600 ml-3 mr-2" />
                    <span className="text-sm font-poppins text-crisal-azul">WhatsApp (Por defecto)</span>
                  </label>
                  <label className="flex items-center p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="notificacion"
                      value="email"
                      checked={formData.metodoNotificacion === 'email'}
                      onChange={(e) => setFormData({...formData, metodoNotificacion: e.target.value})}
                      className="h-5 w-5 text-[#443c92] border-2 border-gray-300 focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 cursor-pointer"
                    />
                    <span className="text-sm font-poppins text-crisal-azul ml-3">Correo Electrónico</span>
                  </label>
                  <label className="flex items-center p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="notificacion"
                      value="sms"
                      checked={formData.metodoNotificacion === 'sms'}
                      onChange={(e) => setFormData({...formData, metodoNotificacion: e.target.value})}
                      className="h-5 w-5 text-[#443c92] border-2 border-gray-300 focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 cursor-pointer"
                    />
                    <span className="text-sm font-poppins text-crisal-azul ml-3">SMS</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Términos y Condiciones */}
            <div className="border-t border-crisal-gris pt-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-crisal-primary to-crisal-primary-dark rounded-full flex items-center justify-center mr-3">
                  <DocumentTextIcon className="h-4 w-4 text-white" />
                </div>
                Términos y Condiciones
              </h2>
              <div className="space-y-3">
                <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.aceptaTerminos}
                      onChange={(e) => setFormData({...formData, aceptaTerminos: e.target.checked})}
                      className="h-5 w-5 text-[#443c92] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 cursor-pointer mt-1"
                    />
                  <label htmlFor="terms" className="ml-2 block text-sm font-poppins text-crisal-azul">
                    He leído y acepto los términos y condiciones
                  </label>
                </div>
                <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.aceptaConsentimiento}
                      onChange={(e) => setFormData({...formData, aceptaConsentimiento: e.target.checked})}
                      className="h-5 w-5 text-[#443c92] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#443c92]/20 focus:border-[#443c92] transition-all duration-200 cursor-pointer mt-1"
                    />
                  <label htmlFor="consent" className="ml-2 block text-sm font-poppins text-crisal-azul">
                    Acepto el consentimiento informado para el tratamiento de datos
                  </label>
                </div>
              </div>
            </div>

            {/* Almacenamiento de Datos */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-ibrand text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <ShieldCheckIcon className="h-4 w-4 text-white" />
                </div>
                Almacenamiento de Datos en el Perfil del Paciente
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 mb-3">
                  Los datos ingresados se guardarán en el perfil del usuario para evitar reprocesos en futuras consultas.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Privacidad y seguridad:</strong> Se garantiza que los datos serán privados y no se venderán a terceros.
                </p>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <span className="text-red-500">*</span> Campos obligatorios
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => {
                    // Recargar datos del servidor
                    window.location.reload();
                  }}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-poppins font-medium shadow-sm"
                >
                  Cancelar
                </button>
                <button 
                  onClick={async () => {
                    // Validar campos obligatorios
                    if (!formData.nombre.trim() || !formData.apellido.trim()) {
                      error('Los campos nombre y apellido son obligatorios', 'Campos requeridos');
                      return;
                    }

                    setSaving(true);
                    try {
                      await pacienteService.actualizarPerfil({
                        nombre: formData.nombre,
                        apellido: formData.apellido,
                        tipoDocumento: formData.tipoDocumento || undefined,
                        numeroDocumento: formData.numeroDocumento || undefined,
                        fechaNacimiento: formData.fechaNacimiento || undefined,
                        sexoBiologico: formData.sexoBiologico || undefined,
                        genero: formData.genero || undefined,
                        estadoCivil: formData.estadoCivil || undefined,
                        nacionalidad: [paisNacimiento, estadoNacimiento, ciudadNacimiento].filter(Boolean).join(',') || undefined,
                        lugarResidencia: [paisResidencia, estadoResidencia, ciudadResidencia].filter(Boolean).join(',') || undefined,
                        direccion: formData.direccion || undefined,
                        telefono: formData.telefono || undefined,
                        contactoEmergencia: formData.contactoEmergencia || undefined,
                        regimenAfiliacion: formData.regimenAfiliacion || undefined,
                        eps: formData.eps || undefined,
                        numeroAfiliacion: formData.numeroAfiliacion || undefined,
                        autenticacionDosFactores: formData.autenticacionDosFactores,
                        recordarDispositivo: formData.recordarDispositivo,
                        autenticacionBiometrica: formData.autenticacionBiometrica,
                        tipoBiometrico: formData.tipoBiometrico,
                        visualizarContrasena: formData.visualizarContrasena,
                        metodoNotificacion: formData.metodoNotificacion,
                        aceptaTerminos: formData.aceptaTerminos,
                        aceptaConsentimiento: formData.aceptaConsentimiento
                      });
                      success('Perfil actualizado exitosamente', 'Éxito');
                    } catch (err: any) {
                      console.error('Error al guardar el perfil:', err);
                      error(err.response?.data?.message || 'Error al guardar el perfil', 'Error');
                    } finally {
                      setSaving(false);
                    }
                  }}
                  disabled={saving}
                  className="px-6 py-3 bg-gradient-to-r from-[#443c92] to-[#5a4fa0] text-white rounded-lg hover:from-[#443c92]/90 hover:to-[#5a4fa0]/90 focus:outline-none focus:ring-2 focus:ring-[#443c92] focus:ring-offset-2 transition-all duration-200 font-poppins font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
                >
                  {saving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </span>
                  ) : (
                    'Guardar Cambios'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Perfil;

