import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  LinkIcon,
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  MapPinIcon,
  SparklesIcon,
  PlusIcon,
  TrashIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
  VideoCameraIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useAlert } from '../../../context/AlertContext';
import { agendamientoService, JornadaConfig, NotificacionesAgendamiento } from '../../../services/agendamientoService';
import { Cita } from '../../../types';
import { showConfirmDialog, showCancelReasonDialog } from '../../../utils/swalConfig';

interface JornadaConfig {
  dia: string;
  activa: boolean;
  horaInicio: string;
  horaFin: string;
  modalidad: 'presencial' | 'virtual' | 'mixta';
  duracionConsulta: number; // en minutos
  tiemposInactividad: Array<{ inicio: string; fin: string; tipo: string }>;
}

const Agendamiento = () => {
  const { success, error } = useAlert();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'calendario' | 'conexiones' | 'configuracion'>('calendario');
  const [loading, setLoading] = useState(false);
  const [cargandoConfiguracion, setCargandoConfiguracion] = useState(true);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [citasHoy, setCitasHoy] = useState<Cita[]>([]);
  const [cargandoCitas, setCargandoCitas] = useState(false);
  
  // Estado para configuración de agenda
  const [direccionConsultorio, setDireccionConsultorio] = useState('');
  const [optimizacionAutomatica, setOptimizacionAutomatica] = useState(true);
  const [flexibilidadReubicacion, setFlexibilidadReubicacion] = useState(false);
  const [notificacionesAgendamiento, setNotificacionesAgendamiento] = useState<NotificacionesAgendamiento>({
    notificacionAutomaticaPaciente: true,
    recordatorio24Horas: true,
    recordatorio2Horas: true,
    notificacionMedicoPreconsulta: true,
    notificacionMedicoConsulta: true,
    notificacionMedicoControl: true
  });
  const [jornadas, setJornadas] = useState<JornadaConfig[]>([
    { dia: 'Lunes', activa: true, horaInicio: '08:00', horaFin: '18:00', modalidad: 'presencial', duracionConsulta: 30, tiemposInactividad: [{ inicio: '12:00', fin: '13:00', tipo: 'Almuerzo' }] },
    { dia: 'Martes', activa: true, horaInicio: '08:00', horaFin: '18:00', modalidad: 'presencial', duracionConsulta: 30, tiemposInactividad: [{ inicio: '12:00', fin: '13:00', tipo: 'Almuerzo' }] },
    { dia: 'Miércoles', activa: true, horaInicio: '08:00', horaFin: '18:00', modalidad: 'presencial', duracionConsulta: 30, tiemposInactividad: [{ inicio: '12:00', fin: '13:00', tipo: 'Almuerzo' }] },
    { dia: 'Jueves', activa: true, horaInicio: '08:00', horaFin: '18:00', modalidad: 'presencial', duracionConsulta: 30, tiemposInactividad: [{ inicio: '12:00', fin: '13:00', tipo: 'Almuerzo' }] },
    { dia: 'Viernes', activa: true, horaInicio: '08:00', horaFin: '18:00', modalidad: 'presencial', duracionConsulta: 30, tiemposInactividad: [{ inicio: '12:00', fin: '13:00', tipo: 'Almuerzo' }] },
    { dia: 'Sábado', activa: false, horaInicio: '08:00', horaFin: '13:00', modalidad: 'presencial', duracionConsulta: 30, tiemposInactividad: [] },
    { dia: 'Domingo', activa: false, horaInicio: '08:00', horaFin: '13:00', modalidad: 'presencial', duracionConsulta: 30, tiemposInactividad: [] },
  ]);

  // Cargar citas al montar el componente y cuando cambia la vista
  useEffect(() => {
    const cargarCitas = async () => {
      if (activeView === 'calendario') {
        try {
          setCargandoCitas(true);
          const [todasLasCitas, citasDelDia] = await Promise.all([
            agendamientoService.obtenerCitas(),
            agendamientoService.obtenerCitasHoy()
          ]);
          setCitas(todasLasCitas);
          setCitasHoy(citasDelDia);
        } catch (err: any) {
          console.error('Error al cargar citas:', err);
          error('Error al cargar las citas', 'Error de carga');
        } finally {
          setCargandoCitas(false);
        }
      }
    };

    cargarCitas();
  }, [activeView, error]);

  // Cargar configuración al montar el componente
  useEffect(() => {
    const cargarConfiguracion = async () => {
      try {
        setCargandoConfiguracion(true);
        const configuracion = await agendamientoService.obtenerConfiguracion();
        setDireccionConsultorio(configuracion.direccionConsultorio || '');
        setOptimizacionAutomatica(configuracion.optimizacionAutomatica);
        setFlexibilidadReubicacion(configuracion.flexibilidadReubicacion);
        if (configuracion.jornadas && configuracion.jornadas.length > 0) {
          setJornadas(configuracion.jornadas);
        }
        if (configuracion.notificacionesAgendamiento) {
          setNotificacionesAgendamiento(configuracion.notificacionesAgendamiento);
        }
      } catch (err: any) {
        console.error('Error al cargar configuración:', err);
        error('Error al cargar la configuración de agenda', 'Error de carga');
      } finally {
        setCargandoConfiguracion(false);
      }
    };

    if (activeView === 'configuracion') {
      cargarConfiguracion();
    }
  }, [activeView, error]);

  const handleConfirmarCita = async (citaId: string) => {
    try {
      await agendamientoService.confirmarCita(citaId);
      success('Cita confirmada exitosamente');
      // Recargar citas
      const [todasLasCitas, citasDelDia] = await Promise.all([
        agendamientoService.obtenerCitas(),
        agendamientoService.obtenerCitasHoy()
      ]);
      setCitas(todasLasCitas);
      setCitasHoy(citasDelDia);
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al confirmar la cita');
    }
  };

  const handleCancelarCita = async (citaId: string) => {
    const motivo = await showCancelReasonDialog(
      '¿Cancelar cita?',
      'Por favor, indica el motivo de la cancelación de esta cita'
    );

    if (!motivo) {
      return;
    }

    try {
      await agendamientoService.cancelarCita(citaId, motivo);
      success('Cita cancelada exitosamente');
      // Recargar citas
      const [todasLasCitas, citasDelDia] = await Promise.all([
        agendamientoService.obtenerCitas(),
        agendamientoService.obtenerCitasHoy()
      ]);
      setCitas(todasLasCitas);
      setCitasHoy(citasDelDia);
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al cancelar la cita');
    }
  };

  const obtenerEstadisticas = () => {
    const citasConfirmadas = citasHoy.filter(c => c.estado === 'confirmada').length;
    const citasPendientes = citasHoy.filter(c => c.estado === 'pendiente').length;
    const totalCitas = citasHoy.length;
    const ocupacion = totalCitas > 0 ? Math.round((citasConfirmadas / totalCitas) * 100) : 0;
    
    return {
      totalHoy: totalCitas,
      confirmadas: citasConfirmadas,
      pendientes: citasPendientes,
      ocupacion
    };
  };

  const formatearFecha = (fecha: string | Date) => {
    let fechaObj: Date;
    
    if (typeof fecha === 'string') {
      // Si la fecha viene como string ISO (YYYY-MM-DD o YYYY-MM-DDTHH:mm:ss...)
      // Extraer solo la parte de la fecha para evitar problemas de zona horaria
      const fechaParte = fecha.split('T')[0]; // Obtener solo YYYY-MM-DD
      if (fechaParte.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = fechaParte.split('-').map(Number);
        // Crear fecha en zona horaria local (no UTC)
        fechaObj = new Date(year, month - 1, day);
      } else {
        fechaObj = new Date(fecha);
      }
    } else {
      // Si es un objeto Date, crear uno nuevo con solo año, mes y día
      // para evitar problemas de zona horaria
      fechaObj = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    }
    
    return fechaObj.toLocaleDateString('es-CO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  const obtenerTipoConsultaTexto = (tipo: string) => {
    const tipos: Record<string, string> = {
      preconsulta: 'Preconsulta',
      consulta: 'Primera Consulta',
      control: 'Consulta de Control'
    };
    return tipos[tipo] || tipo;
  };

  const obtenerModalidadTexto = (modalidad: string) => {
    return modalidad === 'presencial' ? 'Presencial' : 'Virtual';
  };

  const handleIngresarConsulta = (citaId: string) => {
    navigate(`/medico/consulta/${citaId}`);
  };

  const stats = obtenerEstadisticas();

  const actualizarJornada = (index: number, campo: keyof JornadaConfig, valor: any) => {
    const nuevasJornadas = [...jornadas];
    if (campo === 'activa' || campo === 'horaInicio' || campo === 'horaFin' || campo === 'modalidad' || campo === 'duracionConsulta') {
      (nuevasJornadas[index] as any)[campo] = valor;
    }
    setJornadas(nuevasJornadas);
  };

  const agregarTiempoInactividad = (index: number) => {
    const nuevasJornadas = [...jornadas];
    nuevasJornadas[index].tiemposInactividad.push({ inicio: '12:00', fin: '13:00', tipo: 'Descanso' });
    setJornadas(nuevasJornadas);
  };

  const eliminarTiempoInactividad = (indexJornada: number, indexInactividad: number) => {
    const nuevasJornadas = [...jornadas];
    nuevasJornadas[indexJornada].tiemposInactividad.splice(indexInactividad, 1);
    setJornadas(nuevasJornadas);
  };

  const actualizarTiempoInactividad = (indexJornada: number, indexInactividad: number, campo: string, valor: string) => {
    const nuevasJornadas = [...jornadas];
    (nuevasJornadas[indexJornada].tiemposInactividad[indexInactividad] as any)[campo] = valor;
    setJornadas(nuevasJornadas);
  };

  const buscarEnMaps = () => {
    if (!direccionConsultorio.trim()) {
      error('Por favor ingresa una dirección antes de buscar en Maps', 'Dirección requerida');
      return;
    }
    
    // Abrir Google Maps en una nueva pestaña con la dirección ingresada
    const direccionCodificada = encodeURIComponent(direccionConsultorio);
    const urlMaps = `https://www.google.com/maps/search/?api=1&query=${direccionCodificada}`;
    window.open(urlMaps, '_blank');
    
    success('Abriendo Google Maps con la dirección ingresada', 'Buscando en Maps');
  };

  const guardarConfiguracion = async () => {
    try {
      setLoading(true);
      await agendamientoService.guardarConfiguracion({
        direccionConsultorio,
        optimizacionAutomatica,
        flexibilidadReubicacion,
        jornadas,
        notificacionesAgendamiento
      });
      success('Configuración de agenda guardada exitosamente', 'Configuración guardada');
    } catch (err: any) {
      console.error('Error al guardar configuración:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Error al guardar la configuración';
      error(errorMessage, 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MedicoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Gestión de Agenda con CRISAL-IA
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Gestión inteligente y automatizada de tu agenda médica
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:space-x-2">
              <button
                onClick={() => setActiveView('calendario')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeView === 'calendario'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Calendario
              </button>
              <button
                onClick={() => setActiveView('conexiones')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeView === 'conexiones'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Conexiones
              </button>
              <button
                onClick={() => setActiveView('configuracion')}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap ${
                  activeView === 'configuracion'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Configuración
              </button>
            </div>
          </div>

          {/* Vista de Calendario */}
          {activeView === 'calendario' && (
            <div className="space-y-6">
              {/* Estadísticas Rápidas */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-600">{stats.totalHoy}</p>
                  <p className="text-sm text-gray-600">Citas Hoy</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-green-600">{stats.confirmadas}</p>
                  <p className="text-sm text-gray-600">Confirmadas</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendientes}</p>
                  <p className="text-sm text-gray-600">Pendientes</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-600">{stats.ocupacion}%</p>
                  <p className="text-sm text-gray-600">Ocupación</p>
                </div>
              </div>


              {/* Próximas Citas */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Próximas Citas
                </h2>
                {cargandoCitas ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="mt-2 text-gray-600">Cargando citas...</p>
                  </div>
                ) : citas.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No tienes citas agendadas
                  </div>
                ) : (
                  <div className="space-y-3">
                    {citas.map((cita) => {
                      const puedeConfirmar = cita.estado === 'pendiente';
                      const puedeCancelar = cita.estado !== 'cancelada' && cita.estado !== 'completada';
                      
                      return (
                        <div key={cita._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center">
                                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                                <p className="font-medium text-gray-900">
                                  {(cita as any).pacienteNombre && (cita as any).pacienteApellido
                                    ? `${(cita as any).pacienteNombre} ${(cita as any).pacienteApellido}`
                                    : `Paciente ID: ${cita.pacienteId}`}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{obtenerTipoConsultaTexto(cita.tipo)}</p>
                              <div className="flex items-center mt-2 text-sm text-gray-600 flex-wrap gap-2">
                                {cita.modalidad === 'presencial' ? (
                                  <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                                ) : (
                                  <VideoCameraIcon className="h-4 w-4 mr-1" />
                                )}
                                <span className="mr-2">{obtenerModalidadTexto(cita.modalidad)}</span>
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {formatearFecha(cita.fecha)} - {cita.hora}
                              </div>
                            </div>
                            <div className="text-right">
                              <span
                                className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                                  cita.estado === 'confirmada'
                                    ? 'bg-green-100 text-green-800'
                                    : cita.estado === 'pendiente'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : cita.estado === 'completada'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                              </span>
                              <div className="mt-2 flex flex-col items-end space-y-2">
                                {cita.modalidad === 'presencial' && cita.estado === 'confirmada' && (
                                  <button 
                                    onClick={() => cita._id && handleIngresarConsulta(cita._id)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium flex items-center space-x-1"
                                  >
                                    <ArrowRightIcon className="h-4 w-4" />
                                    <span>Ingresar</span>
                                  </button>
                                )}
                                <div className="flex space-x-2">
                                  {puedeConfirmar && (
                                    <button 
                                      onClick={() => cita._id && handleConfirmarCita(cita._id)}
                                      className="text-green-600 hover:text-green-700 text-sm"
                                    >
                                      Confirmar
                                    </button>
                                  )}
                                  {puedeCancelar && (
                                    <button 
                                      onClick={() => cita._id && handleCancelarCita(cita._id)}
                                      className="text-red-600 hover:text-red-700 text-sm"
                                    >
                                      Cancelar
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Vista de Conexiones */}
          {activeView === 'conexiones' && (
            <div className="space-y-6">

              {/* Conexión 1 */}
              <div className="border-l-4 border-orange-500 rounded-lg bg-white shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Conexión 1</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Activa
                  </span>
                </div>
                <div className="ml-13 space-y-3">
                  <p className="text-gray-700">
                    <strong>Paciente contacta a Md y recibe link de Crisal-IA</strong>
                  </p>
                  <div className="flex items-center space-x-2 mt-4">
                    <LinkIcon className="h-5 w-5 text-indigo-600" />
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}/paciente/agendamiento?medico=${encodeURIComponent('tu-id')}`}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button 
                      onClick={() => {
                        const link = `${window.location.origin}/paciente/agendamiento?medico=${encodeURIComponent('tu-id')}`;
                        navigator.clipboard.writeText(link);
                        success('Link copiado al portapapeles');
                      }}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"
                    >
                      Copiar Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Conexión 2 */}
              <div className="border-l-4 border-orange-500 rounded-lg bg-white shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Conexión 2</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Activa
                  </span>
                </div>
                <div className="ml-13 space-y-3">
                  <p className="text-gray-700">
                    <strong>En Crisal-iA paciente selecciona Md entre opciones sugeridas (encuentra tu MD)</strong>
                  </p>
                </div>
              </div>

              {/* Conexión 3 */}
              <div className="border-l-4 border-orange-500 rounded-lg bg-white shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Conexión 3</h3>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                    Activa
                  </span>
                </div>
                <div className="ml-13 space-y-3">
                  <p className="text-gray-700">
                    <strong>En Crisa-IA paciente pide agendamiento con MD específico</strong>
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* Vista de Configuración */}
          {activeView === 'configuracion' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Configuración y Personalización de Agenda
                  </h2>
                  <p className="text-sm text-gray-600">
                    Creación automática de la agenda médica con optimización inteligente
                  </p>
                </div>
                <button
                  onClick={guardarConfiguracion}
                  disabled={loading || cargandoConfiguracion}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium flex items-center space-x-2 transition-colors duration-200"
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                  <span>{loading ? 'Guardando...' : 'Guardar Configuración'}</span>
                </button>
              </div>

              {/* Creación Automática de Agenda */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-center space-x-2 mb-4">
                  <SparklesIcon className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Creación Automática de la Agenda Médica
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {/* Datos Geográficos */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Datos Geográficos
                    </label>
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={direccionConsultorio}
                        onChange={(e) => setDireccionConsultorio(e.target.value)}
                        placeholder="Dirección del consultorio (ej: Calle 123 #45-67, Bogotá)"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button 
                        onClick={buscarEnMaps}
                        className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                      >
                        <MapPinIcon className="h-4 w-4" />
                        <span>Buscar en Maps</span>
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>Integración con Google Maps para optimización geográfica y reubicación de pacientes</span>
                    </p>
                  </div>

                  {/* Configuración de Jornadas Semanales */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      Horarios Disponibles de Atención por Día
                    </h4>
                    <div className="space-y-4">
                      {jornadas.map((jornada, index) => (
                        <div key={jornada.dia} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={jornada.activa}
                                onChange={(e) => actualizarJornada(index, 'activa', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="font-medium text-gray-900">{jornada.dia}</span>
                            </div>
                          </div>
                          
                          {jornada.activa && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                              {/* Horarios */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Horario de Atención
                                </label>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="time"
                                    value={jornada.horaInicio}
                                    onChange={(e) => actualizarJornada(index, 'horaInicio', e.target.value)}
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                  />
                                  <span className="text-gray-500">-</span>
                                  <input
                                    type="time"
                                    value={jornada.horaFin}
                                    onChange={(e) => actualizarJornada(index, 'horaFin', e.target.value)}
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                  />
                                </div>
                              </div>

                              {/* Modalidad */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Modalidad de Atención
                                </label>
                                <select
                                  value={jornada.modalidad}
                                  onChange={(e) => actualizarJornada(index, 'modalidad', e.target.value)}
                                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                >
                                  <option value="presencial">Presencial</option>
                                  <option value="virtual">Virtual</option>
                                  <option value="mixta">Mixta</option>
                                </select>
                              </div>

                              {/* Duración de Consulta */}
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Duración de Consulta (minutos)
                                </label>
                                <select
                                  value={jornada.duracionConsulta}
                                  onChange={(e) => actualizarJornada(index, 'duracionConsulta', parseInt(e.target.value))}
                                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                >
                                  <option value={15}>15 minutos</option>
                                  <option value={30}>30 minutos</option>
                                  <option value={45}>45 minutos</option>
                                  <option value={60}>60 minutos</option>
                                </select>
                              </div>

                              {/* Tiempos de Inactividad */}
                              <div className="md:col-span-2">
                                <div className="flex items-center justify-between mb-2">
                                  <label className="block text-xs font-medium text-gray-700">
                                    Tiempos de Inactividad
                                  </label>
                                  <button
                                    onClick={() => agregarTiempoInactividad(index)}
                                    className="flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-700"
                                  >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Agregar</span>
                                  </button>
                                </div>
                                <div className="space-y-2">
                                  {jornada.tiemposInactividad.map((inactividad, idx) => (
                                    <div key={idx} className="flex items-center space-x-2 bg-white p-2 rounded border border-gray-200">
                                      <input
                                        type="time"
                                        value={inactividad.inicio}
                                        onChange={(e) => actualizarTiempoInactividad(index, idx, 'inicio', e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs"
                                      />
                                      <span className="text-gray-500">-</span>
                                      <input
                                        type="time"
                                        value={inactividad.fin}
                                        onChange={(e) => actualizarTiempoInactividad(index, idx, 'fin', e.target.value)}
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs"
                                      />
                                      <input
                                        type="text"
                                        value={inactividad.tipo}
                                        onChange={(e) => actualizarTiempoInactividad(index, idx, 'tipo', e.target.value)}
                                        placeholder="Tipo (ej: Almuerzo)"
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs"
                                      />
                                      <button
                                        onClick={() => eliminarTiempoInactividad(index, idx)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <TrashIcon className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                  {jornada.tiemposInactividad.length === 0 && (
                                    <p className="text-xs text-gray-500 italic">No hay tiempos de inactividad configurados</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optimización y Gestión Dinámica */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      Optimización y Gestión Dinámica de la Agenda
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={optimizacionAutomatica}
                          onChange={(e) => setOptimizacionAutomatica(e.target.checked)}
                          className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-900">
                            Optimización Automática Habilitada
                          </label>
                          <p className="text-xs text-gray-600 mt-1">
                            La IA manejará automáticamente la cancelación y modificación de consultas para evitar espacios vacíos en la agenda
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={flexibilidadReubicacion}
                          onChange={(e) => setFlexibilidadReubicacion(e.target.checked)}
                          disabled={!optimizacionAutomatica}
                          className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                        />
                        <div className="flex-1">
                          <label className={`block text-sm font-medium ${flexibilidadReubicacion ? 'text-gray-900' : 'text-gray-500'}`}>
                            Flexibilidad para Reubicación Geográfica
                          </label>
                          <p className="text-xs text-gray-600 mt-1">
                            Permite que la IA reubique pacientes según su ubicación geográfica para maximizar la eficiencia. 
                            Solo se aplicará si la optimización automática está habilitada.
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <p className="text-xs text-gray-700">
                          <strong>Nota:</strong> La IA tendrá la capacidad de notificar oportunamente al paciente sobre la cancelación 
                          programada o inesperada de la agenda del médico y ofrecerá alternativas más próximas disponibles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmación de Agendamiento */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-orange-50 to-yellow-50">
                <div className="flex items-center space-x-2 mb-4">
                  <BellIcon className="h-6 w-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Confirmación de Agendamiento: Preconsulta, Consulta y Control
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {/* Notificaciones al Médico */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Notificaciones al Médico
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Recibe notificaciones cuando se agendan citas
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={notificacionesAgendamiento.notificacionMedicoPreconsulta}
                            onChange={(e) => setNotificacionesAgendamiento({
                              ...notificacionesAgendamiento,
                              notificacionMedicoPreconsulta: e.target.checked
                            })}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Notificación cuando se agenda una <strong>Preconsulta</strong>
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={notificacionesAgendamiento.notificacionMedicoConsulta}
                            onChange={(e) => setNotificacionesAgendamiento({
                              ...notificacionesAgendamiento,
                              notificacionMedicoConsulta: e.target.checked
                            })}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Notificación cuando se agenda una <strong>Consulta</strong> (presencial o virtual)
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={notificacionesAgendamiento.notificacionMedicoControl}
                            onChange={(e) => setNotificacionesAgendamiento({
                              ...notificacionesAgendamiento,
                              notificacionMedicoControl: e.target.checked
                            })}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Notificación cuando se agenda una <strong>Cita de Control</strong>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Notificaciones y Recordatorios al Paciente */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Notificaciones y Recordatorios al Paciente
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Configura los recordatorios automáticos que se enviarán a los pacientes
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={notificacionesAgendamiento.notificacionAutomaticaPaciente}
                            onChange={(e) => setNotificacionesAgendamiento({
                              ...notificacionesAgendamiento,
                              notificacionAutomaticaPaciente: e.target.checked
                            })}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Notificación automática al paciente cuando se confirma el agendamiento
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={notificacionesAgendamiento.recordatorio24Horas}
                            onChange={(e) => setNotificacionesAgendamiento({
                              ...notificacionesAgendamiento,
                              recordatorio24Horas: e.target.checked
                            })}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Recordatorio <strong>24 horas antes</strong> de la cita
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={notificacionesAgendamiento.recordatorio2Horas}
                            onChange={(e) => setNotificacionesAgendamiento({
                              ...notificacionesAgendamiento,
                              recordatorio2Horas: e.target.checked
                            })}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Recordatorio <strong>2 horas antes</strong> de la cita
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-gray-700">
                        <strong>Nota:</strong> Estas configuraciones ayudan a reducir ausencias y mejorar la puntualidad mediante recordatorios automáticos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integración con Calendarios */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Integración con Calendarios Externos
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CalendarIcon className="h-6 w-6 text-indigo-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Google Calendar</p>
                        <p className="text-sm text-gray-500">Sincronización automática</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      Configurar
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CalendarIcon className="h-6 w-6 text-indigo-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">Outlook</p>
                        <p className="text-sm text-gray-500">Sincronización automática</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Agendamiento;
