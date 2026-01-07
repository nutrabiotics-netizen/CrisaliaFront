import { api } from './api';
import { Anamnesis } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}

export interface CrearInterrogatorioRequest {
  tipo?: 'primera_vez' | 'control';
}

export interface ActualizarRespuestasRequest {
  respuestas: Record<string, any>;
}

export interface CompletarInterrogatorioRequest {
  analisisIA?: string;
  objetivos?: string[];
}

class InterrogatorioService {
  async crearInterrogatorio(data: CrearInterrogatorioRequest): Promise<Anamnesis> {
    const response = await api.post<ApiResponse<Anamnesis>>('/paciente/interrogatorio', data);
    return response.data;
  }

  async obtenerInterrogatorios(tipo?: 'primera_vez' | 'control', estado?: 'en_proceso' | 'completado' | 'pendiente'): Promise<Anamnesis[]> {
    const params = new URLSearchParams();
    if (tipo) params.append('tipo', tipo);
    if (estado) params.append('estado', estado);
    
    const response = await api.get<ApiResponse<Anamnesis[]>>(`/paciente/interrogatorio?${params.toString()}`);
    return response.data;
  }

  async obtenerInterrogatorio(interrogatorioId: string): Promise<Anamnesis> {
    const response = await api.get<ApiResponse<Anamnesis>>(`/paciente/interrogatorio/${interrogatorioId}`);
    return response.data;
  }

  async actualizarRespuestas(interrogatorioId: string, data: ActualizarRespuestasRequest): Promise<Anamnesis> {
    const response = await api.put<ApiResponse<Anamnesis>>(
      `/paciente/interrogatorio/${interrogatorioId}/respuestas`,
      data
    );
    return response.data;
  }

  async completarInterrogatorio(interrogatorioId: string, data?: CompletarInterrogatorioRequest): Promise<Anamnesis> {
    const response = await api.put<ApiResponse<Anamnesis>>(
      `/paciente/interrogatorio/${interrogatorioId}/completar`,
      data || {}
    );
    return response.data;
  }

  async generarAnalisisIA(interrogatorioId: string): Promise<Anamnesis> {
    const response = await api.post<ApiResponse<Anamnesis>>(
      `/paciente/interrogatorio/${interrogatorioId}/analizar`
    );
    return response.data;
  }
}

export default new InterrogatorioService();

