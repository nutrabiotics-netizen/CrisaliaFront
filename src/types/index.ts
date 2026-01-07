// Tipos base para usuarios
export enum UserRole {
  MEDICO = 'medico',
  PACIENTE = 'paciente',
  ADMINISTRATIVO = 'administrativo'
}

export interface User {
  _id?: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

// Tipos para Médico
export interface Medico extends User {
  role: UserRole.MEDICO;
  nombre: string;
  apellido: string;
  especialidad?: string;
  numeroColegiatura?: string;
  telefono?: string;
}

// Tipos para Paciente
export interface Paciente extends User {
  role: UserRole.PACIENTE;
  nombre: string;
  apellido: string;
  fechaNacimiento?: string;
  telefono?: string;
  direccion?: string;
}

// Tipos para Administrativo
export interface Administrativo extends User {
  role: UserRole.ADMINISTRATIVO;
  nombre: string;
  apellido: string;
  cargo?: string;
}

// Tipos para Agendamiento
export interface Cita {
  _id?: string;
  pacienteId: string;
  medicoId: string;
  fecha: Date | string;
  hora: string;
  tipo: 'preconsulta' | 'consulta' | 'control';
  modalidad: 'presencial' | 'virtual';
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  motivoCancelacion?: string;
  creadoPor?: string;
  creadoPorRol?: string;
  actualizadoPor?: string;
  actualizadoPorRol?: string;
  canceladoPor?: string;
  canceladoPorRol?: string;
  pacienteNombre?: string;
  pacienteApellido?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// Tipos para Anamnesis
export interface Anamnesis {
  _id?: string;
  pacienteId: string;
  medicoId?: string;
  citaId?: string;
  tipo?: 'primera_vez' | 'control';
  estado?: 'en_proceso' | 'completado' | 'pendiente';
  progreso?: number;
  respuestas: Record<string, any>;
  observacionesIA?: string[];
  analisisIA?: string;
  objetivos?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Tipos para Consulta
export interface Consulta {
  _id?: string;
  pacienteId: string;
  medicoId: string;
  citaId: string;
  diagnostico?: string[];
  tratamiento?: string;
  notas?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tipos para Pago
export interface Pago {
  _id?: string;
  pacienteId: string;
  medicoId: string;
  citaId: string;
  monto: number;
  metodoPago: string;
  estado: 'pendiente' | 'completado' | 'rechazado';
  createdAt?: string;
  updatedAt?: string;
}

