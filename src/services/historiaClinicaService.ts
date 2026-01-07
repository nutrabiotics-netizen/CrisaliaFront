import { api } from './api';

export interface HistoriaClinica {
  _id?: string;
  pacienteId: string;
  medicoId: string;
  citaId: string;
  fechaRegistro: Date | string;
  tipoActividad: string;
  acompanamientoEnConsulta?: string;
  pagador?: string;
  [key: string]: any; // Para permitir campos adicionales dinámicos
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}

class HistoriaClinicaService {
  async createHistoriaClinica(data: Partial<HistoriaClinica>): Promise<{ success: boolean; historiaClinica: HistoriaClinica; message?: string }> {
    const response = await api.post<ApiResponse<HistoriaClinica>>('/medico/historia-clinica', data);
    return {
      success: response.data.success,
      historiaClinica: response.data.data,
      message: response.data.message
    };
  }

  async updateHistoriaClinica(historiaId: string, data: Partial<HistoriaClinica>): Promise<{ success: boolean; historiaClinica: HistoriaClinica; message?: string }> {
    const response = await api.put<ApiResponse<HistoriaClinica>>(`/medico/historia-clinica/${historiaId}`, data);
    return {
      success: response.data.success,
      historiaClinica: response.data.data,
      message: response.data.message
    };
  }

  async getHistoriaClinicaByCita(citaId: string): Promise<{ success: boolean; historiaClinica?: HistoriaClinica; message?: string }> {
    try {
      const response = await api.get<ApiResponse<HistoriaClinica>>(`/medico/historia-clinica/cita/${citaId}`);
      return {
        success: response.data.success,
        historiaClinica: response.data.data || undefined,
        message: response.data.message
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          success: false,
          message: 'No se encontró historia clínica para esta cita'
        };
      }
      throw error;
    }
  }

  async getHistoriaClinica(historiaId: string): Promise<{ success: boolean; historiaClinica: HistoriaClinica; message?: string }> {
    const response = await api.get<ApiResponse<HistoriaClinica>>(`/medico/historia-clinica/${historiaId}`);
    return {
      success: response.data.success,
      historiaClinica: response.data.data,
      message: response.data.message
    };
  }

  async getHistoriasClinicasByPaciente(pacienteId: string): Promise<{ success: boolean; historiasClinicas: HistoriaClinica[]; message?: string }> {
    const response = await api.get<ApiResponse<HistoriaClinica[]>>(`/medico/historia-clinica/paciente/${pacienteId}`);
    return {
      success: response.data.success,
      historiasClinicas: response.data.data,
      message: response.data.message
    };
  }
}

export const HistoriaClinicaService = new HistoriaClinicaService();

