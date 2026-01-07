import { api } from './api';

export interface ContactoEmergencia {
  nombre: string;
  relacion: string;
  telefono: string;
}

export interface PacientePerfil {
  _id?: string;
  email: string;
  nombre: string;
  apellido: string;
  tipoDocumento?: 'CC' | 'TI' | 'RC' | 'PA' | 'CE';
  numeroDocumento?: string;
  fechaNacimiento?: string;
  sexoBiologico?: 'masculino' | 'femenino' | 'intersexual';
  genero?: 'masculino' | 'femenino' | 'no-binario' | 'otro' | 'prefiero-no-decir';
  estadoCivil?: 'soltero' | 'casado' | 'union-libre' | 'divorciado' | 'viudo';
  nacionalidad?: string;
  lugarResidencia?: string;
  direccion?: string;
  telefono?: string;
  contactoEmergencia?: ContactoEmergencia;
  regimenAfiliacion?: 'contributivo' | 'subsidiado' | 'especial' | 'excepcion';
  eps?: string;
  numeroAfiliacion?: string;
  activo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConfiguracionSeguridad {
  _id?: string;
  paciente: string;
  autenticacionDosFactores: boolean;
  recordarDispositivo: boolean;
  autenticacionBiometrica: boolean;
  tipoBiometrico: 'ninguno' | 'facial' | 'huella';
  visualizarContrasena: boolean;
  metodoNotificacion: 'whatsapp' | 'email' | 'sms';
  aceptaTerminos: boolean;
  aceptaConsentimiento: boolean;
  fechaAceptacionTerminos?: string;
  fechaAceptacionConsentimiento?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PerfilCompleto {
  paciente: PacientePerfil;
  configuracionSeguridad: ConfiguracionSeguridad;
}

export interface ActualizarPerfilData {
  // Datos del paciente
  nombre?: string;
  apellido?: string;
  tipoDocumento?: 'CC' | 'TI' | 'RC' | 'PA' | 'CE';
  numeroDocumento?: string;
  fechaNacimiento?: string;
  sexoBiologico?: 'masculino' | 'femenino' | 'intersexual';
  genero?: 'masculino' | 'femenino' | 'no-binario' | 'otro' | 'prefiero-no-decir';
  estadoCivil?: 'soltero' | 'casado' | 'union-libre' | 'divorciado' | 'viudo';
  nacionalidad?: string;
  lugarResidencia?: string;
  direccion?: string;
  telefono?: string;
  contactoEmergencia?: ContactoEmergencia;
  regimenAfiliacion?: 'contributivo' | 'subsidiado' | 'especial' | 'excepcion';
  eps?: string;
  numeroAfiliacion?: string;
  // Configuración de seguridad
  autenticacionDosFactores?: boolean;
  recordarDispositivo?: boolean;
  autenticacionBiometrica?: boolean;
  tipoBiometrico?: 'ninguno' | 'facial' | 'huella';
  visualizarContrasena?: boolean;
  metodoNotificacion?: 'whatsapp' | 'email' | 'sms';
  aceptaTerminos?: boolean;
  aceptaConsentimiento?: boolean;
}

class PacienteService {
  private readonly BASE_URL = '/paciente/perfil';

  async obtenerPerfil(): Promise<PerfilCompleto> {
    const response = await api.get<{ success: boolean; data: PerfilCompleto }>(this.BASE_URL);
    return response.data;
  }

  async actualizarPerfil(data: ActualizarPerfilData): Promise<PerfilCompleto> {
    const response = await api.put<{ success: boolean; message: string; data: PerfilCompleto }>(this.BASE_URL, data);
    return response.data;
  }
}

export const pacienteService = new PacienteService();

