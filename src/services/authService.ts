import { api } from './api';
import type { Medico, Paciente } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterMedicoData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  especialidad?: string;
  whatsapp?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: Medico | Paciente;
  };
}

export interface AuthUser {
  _id: string;
  email: string;
  nombre: string;
  apellido: string;
  especialidad?: string;
  numeroColegiatura?: string;
  telefono?: string;
  fechaNacimiento?: string;
  direccion?: string;
  cargo?: string;
  role: 'medico' | 'paciente' | 'administrativo';
}

class AuthService {
  async registerMedico(data: RegisterMedicoData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/register', data);
      return response;
    } catch (error: any) {
      // Manejar errores de la API
      const errorMessage = error.response?.data?.message || error.message || 'Error al registrar médico';
      throw new Error(errorMessage);
    }
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      return response;
    } catch (error: any) {
      // Manejar errores de la API
      const errorMessage = error.response?.data?.message || error.message || 'Error al iniciar sesión';
      throw new Error(errorMessage);
    }
  }

  async getCurrentUser(): Promise<AuthUser> {
    try {
      const response = await api.get<{ success: boolean; data: AuthUser }>('/auth/me');
      return response.data;
    } catch (error: any) {
      // Si falla, intentar obtener del localStorage
      const storedUser = this.getUser();
      if (storedUser) {
        return storedUser;
      }
      throw new Error('No se pudo obtener el usuario actual');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUser(): AuthUser | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  setUser(user: AuthUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();

