import { api } from './api';
import { Cita } from './types';

export interface MedicoDisponible {
  _id: string;
  nombre: string;
  apellido: string;
  especialidad?: string;
  disponibilidad?: string;
}

export interface HorarioDisponible {
  fecha: string;
  hora: string;
  disponible: boolean;
}

export interface CrearCitaRequest {
  medicoId: string;
  fecha: string;
  hora: string;
  tipo: 'preconsulta' | 'consulta' | 'control';
  modalidad: 'presencial' | 'virtual';
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

class PacienteAgendamientoService {
  async obtenerMedicosDisponibles(busqueda?: string): Promise<MedicoDisponible[]> {
    const params = busqueda ? `?busqueda=${encodeURIComponent(busqueda)}` : '';
    const response = await api.get<ApiResponse<MedicoDisponible[]>>(`/paciente/agendamiento/medicos${params}`);
    return response.data;
  }

  async obtenerMedicoPorId(medicoId: string): Promise<MedicoDisponible> {
    const response = await api.get<ApiResponse<MedicoDisponible>>(`/paciente/agendamiento/medicos/${medicoId}`);
    return response.data;
  }

  async obtenerHorariosDisponibles(medicoId: string, fecha: string): Promise<HorarioDisponible[]> {
    const response = await api.get<ApiResponse<HorarioDisponible[]>>(
      `/paciente/agendamiento/medicos/${medicoId}/horarios?fecha=${encodeURIComponent(fecha)}`
    );
    return response.data;
  }

  async obtenerCitas(): Promise<Cita[]> {
    const response = await api.get<ApiResponse<Cita[]>>('/paciente/agendamiento/citas');
    return response.data;
  }

  async crearCita(citaData: CrearCitaRequest): Promise<Cita> {
    const response = await api.post<ApiResponse<Cita>>('/paciente/agendamiento/citas', citaData);
    return response.data;
  }

  async cancelarCita(citaId: string, motivoCancelacion: string): Promise<Cita> {
    const response = await api.put<ApiResponse<Cita>>(
      `/paciente/agendamiento/citas/${citaId}/cancelar`, 
      { motivoCancelacion }
    );
    return response.data;
  }
}

export const pacienteAgendamientoService = new PacienteAgendamientoService();

