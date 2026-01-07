import { api } from './api';
import { Cita } from './types';

export interface TiempoInactividad {
  inicio: string;
  fin: string;
  tipo: string;
}

export interface JornadaConfig {
  dia: string;
  activa: boolean;
  horaInicio: string;
  horaFin: string;
  modalidad: 'presencial' | 'virtual' | 'mixta';
  duracionConsulta: number;
  tiemposInactividad: TiempoInactividad[];
}

export interface NotificacionesAgendamiento {
  notificacionAutomaticaPaciente: boolean;
  recordatorio24Horas: boolean;
  recordatorio2Horas: boolean;
  notificacionMedicoPreconsulta: boolean;
  notificacionMedicoConsulta: boolean;
  notificacionMedicoControl: boolean;
}

export interface ConfiguracionAgenda {
  _id?: string;
  medico: string;
  direccionConsultorio: string;
  optimizacionAutomatica: boolean;
  flexibilidadReubicacion: boolean;
  jornadas: JornadaConfig[];
  notificacionesAgendamiento: NotificacionesAgendamiento;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConfiguracionAgendaResponse {
  success: boolean;
  message?: string;
  data: ConfiguracionAgenda;
}

export interface CitasResponse {
  success: boolean;
  data: Cita[];
}

class AgendamientoService {
  async obtenerConfiguracion(): Promise<ConfiguracionAgenda> {
    const response = await api.get<ConfiguracionAgendaResponse>('/medico/agendamiento/configuracion');
    return response.data;
  }

  async guardarConfiguracion(configuracion: Omit<ConfiguracionAgenda, '_id' | 'medico' | 'createdAt' | 'updatedAt'>): Promise<ConfiguracionAgenda> {
    const response = await api.post<ConfiguracionAgendaResponse>('/medico/agendamiento/configuracion', configuracion);
    return response.data;
  }

  async obtenerCitas(fechaInicio?: string, fechaFin?: string): Promise<Cita[]> {
    const params = new URLSearchParams();
    if (fechaInicio) params.append('fechaInicio', fechaInicio);
    if (fechaFin) params.append('fechaFin', fechaFin);
    const queryString = params.toString();
    const url = `/medico/agendamiento/citas${queryString ? `?${queryString}` : ''}`;
    const response = await api.get<CitasResponse>(url);
    return response.data;
  }

  async obtenerCitasHoy(): Promise<Cita[]> {
    const response = await api.get<CitasResponse>('/medico/agendamiento/citas/hoy');
    return response.data;
  }

  async confirmarCita(citaId: string): Promise<Cita> {
    const response = await api.put<{ success: boolean; data: Cita; message?: string }>(`/medico/agendamiento/citas/${citaId}/confirmar`, {});
    return response.data;
  }

  async cancelarCita(citaId: string, motivoCancelacion: string): Promise<Cita> {
    const response = await api.put<{ success: boolean; data: Cita; message?: string }>(
      `/medico/agendamiento/citas/${citaId}/cancelar`, 
      { motivoCancelacion }
    );
    return response.data;
  }
}

export const agendamientoService = new AgendamientoService();

