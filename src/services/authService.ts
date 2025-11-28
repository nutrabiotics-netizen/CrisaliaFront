import type { Medico, Paciente } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
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
  role: 'medico' | 'paciente' | 'administrativo';
}

// Credenciales hardcodeadas (temporal hasta integrar backend)
const HARDCODED_CREDENTIALS = {
  medico: {
    email: 'medico@crisalia.com',
    password: 'medico123'
  },
  paciente: {
    email: 'paciente@crisalia.com',
    password: 'paciente123'
  },
  administrativo: {
    email: 'admin@crisalia.com',
    password: 'admin123'
  }
};

const HARDCODED_MEDICO: AuthUser = {
  _id: '1',
  email: 'medico@crisalia.com',
  nombre: 'Juan Carlos',
  apellido: 'Pérez García',
  especialidad: 'Medicina Funcional',
  numeroColegiatura: '12345',
  telefono: '+57 300 123 4567',
  role: 'medico'
};

const HARDCODED_PACIENTE: AuthUser = {
  _id: '2',
  email: 'paciente@crisalia.com',
  nombre: 'María',
  apellido: 'González López',
  fechaNacimiento: '1990-05-15',
  telefono: '+57 300 987 6543',
  direccion: 'Calle 123 #45-67, Bogotá',
  role: 'paciente'
};

const HARDCODED_ADMINISTRATIVO: AuthUser = {
  _id: '3',
  email: 'admin@crisalia.com',
  nombre: 'Carlos',
  apellido: 'Rodríguez Martínez',
  telefono: '+57 300 555 1234',
  role: 'administrativo'
};

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Autenticación hardcodeada (temporal)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let user: AuthUser | null = null;
    
    // Verificar médico
    if (
      credentials.email === HARDCODED_CREDENTIALS.medico.email &&
      credentials.password === HARDCODED_CREDENTIALS.medico.password
    ) {
      user = HARDCODED_MEDICO;
    }
    // Verificar paciente
    else if (
      credentials.email === HARDCODED_CREDENTIALS.paciente.email &&
      credentials.password === HARDCODED_CREDENTIALS.paciente.password
    ) {
      user = HARDCODED_PACIENTE;
    }
    // Verificar administrativo
    else if (
      credentials.email === HARDCODED_CREDENTIALS.administrativo.email &&
      credentials.password === HARDCODED_CREDENTIALS.administrativo.password
    ) {
      user = HARDCODED_ADMINISTRATIVO;
    }
    
    if (user) {
      const token = 'hardcoded-token-' + Date.now();
      
      return {
        success: true,
        message: 'Login exitoso',
        data: {
          token,
          user: user as any
        }
      };
    } else {
      throw new Error('Credenciales inválidas');
    }
  }

  async getCurrentUser(): Promise<AuthUser> {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    const storedUser = this.getUser();
    if (storedUser) {
      return storedUser;
    }
    // Fallback (no debería llegar aquí)
    return HARDCODED_MEDICO;
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

