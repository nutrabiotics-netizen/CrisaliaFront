import PacienteLayout from '../../../components/layout/PacienteLayout';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  XMarkIcon,
  SparklesIcon,
  LinkIcon,
  VideoCameraIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { pacienteAgendamientoService, MedicoDisponible, HorarioDisponible } from '../../../services/pacienteAgendamientoService';
import { Cita } from '../../../types';
import { useAlert } from '../../../context/AlertContext';
import { showCancelReasonDialog } from '../../../utils/swalConfig';

const Agendamiento = () => {
  const { success, error } = useAlert();
  
  const [conexionSeleccionada, setConexionSeleccionada] = useState<'1' | '2' | '3' | null>(null);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState<string | null>(null);
  const [medicos, setMedicos] = useState<MedicoDisponible[]>([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState<MedicoDisponible[]>([]);
  const [busquedaMedico, setBusquedaMedico] = useState('');
  const [cargandoMedicos, setCargandoMedicos] = useState(false);
  
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>('');
  const [horariosDisponibles, setHorariosDisponibles] = useState<HorarioDisponible[]>([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  
  const [tipoConsulta, setTipoConsulta] = useState<'preconsulta' | 'consulta' | 'control' | null>(null);
  const [modalidadConsulta, setModalidadConsulta] = useState<'presencial' | 'virtual' | null>(null);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [cargandoCitas, setCargandoCitas] = useState(false);
  const [creandoCita, setCreandoCita] = useState(false);

  useEffect(() => {
    cargarMedicos();
    cargarCitas();
  }, []);

  useEffect(() => {
    if (busquedaMedico) {
      const filtrados = medicos.filter(medico => 
        `${medico.nombre} ${medico.apellido}`.toLowerCase().includes(busquedaMedico.toLowerCase()) ||
        medico.especialidad?.toLowerCase().includes(busquedaMedico.toLowerCase())
      );
      setMedicosFiltrados(filtrados);
    } else {
      setMedicosFiltrados(medicos);
    }
  }, [busquedaMedico, medicos]);

  useEffect(() => {
    if (medicoSeleccionado && fechaSeleccionada) {
      cargarHorariosDisponibles();
    }
  }, [medicoSeleccionado, fechaSeleccionada]);

  const cargarMedicos = async () => {
    try {
      setCargandoMedicos(true);
      const medicosData = await pacienteAgendamientoService.obtenerMedicosDisponibles();
      setMedicos(medicosData);
      setMedicosFiltrados(medicosData);
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al cargar médicos');
    } finally {
      setCargandoMedicos(false);
    }
  };

  const cargarCitas = async () => {
    try {
      setCargandoCitas(true);
      const citasData = await pacienteAgendamientoService.obtenerCitas();
      setCitas(citasData);
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al cargar citas');
    } finally {
      setCargandoCitas(false);
    }
  };

  const cargarHorariosDisponibles = async () => {
    if (!medicoSeleccionado || !fechaSeleccionada) return;
    
    try {
      setCargandoHorarios(true);
      const horarios = await pacienteAgendamientoService.obtenerHorariosDisponibles(
        medicoSeleccionado,
        fechaSeleccionada
      );
      setHorariosDisponibles(horarios);
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al cargar horarios disponibles');
    } finally {
      setCargandoHorarios(false);
    }
  };

  const handleCrearCita = async () => {
    if (!medicoSeleccionado || !fechaSeleccionada || !horaSeleccionada || !tipoConsulta || !modalidadConsulta) {
      error('Por favor completa todos los campos');
      return;
    }

    try {
      setCreandoCita(true);
      await pacienteAgendamientoService.crearCita({
        medicoId: medicoSeleccionado,
        fecha: fechaSeleccionada,
        hora: horaSeleccionada,
        tipo: tipoConsulta,
        modalidad: modalidadConsulta
      });
      
      success('Cita agendada exitosamente');
      
      setMedicoSeleccionado(null);
      setFechaSeleccionada('');
      setHoraSeleccionada('');
      setTipoConsulta(null);
      setModalidadConsulta(null);
      setConexionSeleccionada(null);
      
      cargarCitas();
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al crear la cita');
    } finally {
      setCreandoCita(false);
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
      await pacienteAgendamientoService.cancelarCita(citaId, motivo);
      success('Cita cancelada exitosamente');
      cargarCitas();
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al cancelar la cita');
    }
  };

  const handleIniciarAgendamiento = (tipo: 'preconsulta' | 'consulta' | 'control') => {
    setTipoConsulta(tipo);
    setConexionSeleccionada('3');
  };

  const obtenerFechaMinima = () => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    return hoy.toISOString().split('T')[0];
  };

  const formatearFecha = (fecha: string) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-CO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const obtenerNombreMedico = (medicoId: string) => {
    const medico = medicos.find(m => m._id === medicoId);
    return medico ? `Dr. ${medico.nombre} ${medico.apellido}` : 'Médico';
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

  return (
    <PacienteLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Suite de Agendamiento
          </h1>

          {/* Acciones Rápidas */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button 
                onClick={() => handleIniciarAgendamiento('consulta')}
                className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
              >
                Agendar Primera Consulta
              </button>
              <button 
                onClick={() => handleIniciarAgendamiento('control')}
                className="px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
              >
                Agendar Consulta de Control
              </button>
              <button 
                onClick={() => handleIniciarAgendamiento('preconsulta')}
                className="px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium"
              >
                Agendar Preconsulta
              </button>
            </div>
          </div>

          {/* Selección de Conexión */}
          {conexionSeleccionada && !medicoSeleccionado && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {conexionSeleccionada === '1' && 'Médico que te compartió el link'}
                  {conexionSeleccionada === '2' && 'Médicos Sugeridos por IA'}
                  {conexionSeleccionada === '3' && 'Buscar Médico'}
                </h2>
                <button 
                  onClick={() => {
                    setConexionSeleccionada(null);
                    setTipoConsulta(null);
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Cancelar
                </button>
              </div>

              {conexionSeleccionada === '3' && (
                <div className="mb-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar médico por nombre o especialidad..."
                      value={busquedaMedico}
                      onChange={(e) => setBusquedaMedico(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {cargandoMedicos ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <p className="mt-2 text-gray-600">Cargando médicos...</p>
                </div>
              ) : medicosFiltrados.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron médicos disponibles
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {medicosFiltrados.map((medico) => (
                    <div
                      key={medico._id}
                      className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-indigo-300 transition-all"
                      onClick={() => setMedicoSeleccionado(medico._id)}
                    >
                      <div className="flex items-center mb-3">
                        <UserIcon className="h-10 w-10 text-indigo-600 mr-3" />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Dr. {medico.nombre} {medico.apellido}
                          </h3>
                          <p className="text-xs text-gray-500">{medico.especialidad || 'Medicina Funcional'}</p>
                        </div>
                      </div>
                      <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700">
                        Seleccionar Médico
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Selección de Fecha, Hora y Tipo */}
          {medicoSeleccionado && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Selecciona Fecha y Hora
                </h2>
                <button 
                  onClick={() => {
                    setMedicoSeleccionado(null);
                    setFechaSeleccionada('');
                    setHoraSeleccionada('');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Cambiar Médico
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Fecha</h3>
                  <input
                    type="date"
                    min={obtenerFechaMinima()}
                    value={fechaSeleccionada}
                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {fechaSeleccionada && (
                    <p className="mt-2 text-sm text-gray-600">
                      {formatearFecha(fechaSeleccionada)}
                    </p>
                  )}
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Horarios Disponibles</h3>
                  {!fechaSeleccionada ? (
                    <p className="text-sm text-gray-500">Selecciona una fecha primero</p>
                  ) : cargandoHorarios ? (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : horariosDisponibles.length === 0 ? (
                    <p className="text-sm text-gray-500">No hay horarios disponibles para esta fecha</p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {horariosDisponibles.map((horario, index) => (
                        <button
                          key={index}
                          onClick={() => setHoraSeleccionada(horario.hora)}
                          disabled={!horario.disponible}
                          className={`w-full px-4 py-2 border rounded-md text-sm transition-all ${
                            horario.disponible
                              ? horario.hora === horaSeleccionada
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'border-gray-300 hover:bg-indigo-50 hover:border-indigo-300'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {horario.hora}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tipo de Consulta */}
              <div className="mt-6 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Tipo de Consulta</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <button
                    onClick={() => setTipoConsulta('preconsulta')}
                    className={`border-2 rounded-lg p-4 text-left transition-all ${
                      tipoConsulta === 'preconsulta'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <h4 className="font-medium text-gray-900">Preconsulta</h4>
                  </button>
                  <button
                    onClick={() => setTipoConsulta('consulta')}
                    className={`border-2 rounded-lg p-4 text-left transition-all ${
                      tipoConsulta === 'consulta'
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <h4 className="font-medium text-gray-900">Primera Consulta</h4>
                  </button>
                  <button
                    onClick={() => setTipoConsulta('control')}
                    className={`border-2 rounded-lg p-4 text-left transition-all ${
                      tipoConsulta === 'control'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <h4 className="font-medium text-gray-900">Consulta de Control</h4>
                  </button>
                </div>
              </div>

              {/* Modalidad de Consulta */}
              {tipoConsulta && (
                <div className="mt-6 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Modalidad de Consulta</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <button
                      onClick={() => setModalidadConsulta('presencial')}
                      className={`border-2 rounded-lg p-4 text-left transition-all flex items-center ${
                        modalidadConsulta === 'presencial'
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <BuildingOfficeIcon className="h-8 w-8 text-indigo-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Presencial</h4>
                        <p className="text-sm text-gray-600">Consulta en nuestras instalaciones</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setModalidadConsulta('virtual')}
                      className={`border-2 rounded-lg p-4 text-left transition-all flex items-center ${
                        modalidadConsulta === 'virtual'
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <VideoCameraIcon className="h-8 w-8 text-indigo-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-gray-900">Virtual</h4>
                        <p className="text-sm text-gray-600">Consulta por videollamada</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Botón de Confirmación */}
              <div className="mt-6">
                <button 
                  onClick={handleCrearCita}
                  disabled={creandoCita || !medicoSeleccionado || !fechaSeleccionada || !horaSeleccionada || !tipoConsulta || !modalidadConsulta}
                  className={`w-full px-6 py-3 rounded-md font-medium text-lg transition-all ${
                    creandoCita || !medicoSeleccionado || !fechaSeleccionada || !horaSeleccionada || !tipoConsulta || !modalidadConsulta
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {creandoCita ? 'Agendando...' : 'Confirmar Agendamiento'}
                </button>
              </div>
            </div>
          )}

          {/* Mis Citas */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Mis Citas
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
                  const esCancelada = cita.estado === 'cancelada';
                  const esCompletada = cita.estado === 'completada';
                  const puedeCancelar = !esCancelada && !esCompletada;
                  
                  return (
                    <div
                      key={cita._id}
                      className={`p-4 border rounded-lg ${
                        esCancelada
                          ? 'bg-gray-50 border-gray-200'
                          : esCompletada
                          ? 'bg-green-50 border-green-200'
                          : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {obtenerNombreMedico(cita.medicoId)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {obtenerTipoConsultaTexto(cita.tipo)}
                          </p>
                          <p className="text-sm text-gray-500 mt-1 flex items-center">
                            {cita.modalidad === 'presencial' ? (
                              <BuildingOfficeIcon className="h-4 w-4 inline mr-1" />
                            ) : (
                              <VideoCameraIcon className="h-4 w-4 inline mr-1" />
                            )}
                            <span className="mr-2">{obtenerModalidadTexto(cita.modalidad)}</span>
                            <ClockIcon className="h-4 w-4 inline mr-1" />
                            {formatearFecha(cita.fecha)} - {cita.hora}
                          </p>
                          <p className={`text-xs mt-2 ${
                            esCancelada ? 'text-gray-600' : 'text-blue-700'
                          }`}>
                            Estado: {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                          </p>
                        </div>
                        {puedeCancelar && (
                          <button
                            onClick={() => cita._id && handleCancelarCita(cita._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-all"
                            title="Cancelar cita"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </PacienteLayout>
  );
};

export default Agendamiento;
