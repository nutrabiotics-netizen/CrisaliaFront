import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HistoriaClinicaContextType {
  formData: Record<string, any>;
  sessionData: {
    tipoActividad?: string;
    acompanamiento?: string;
    pagador?: string;
    pacienteSeleccionado?: any;
    citaData?: any;
    doctorData?: any;
  };
  updateFormData: (data: Record<string, any>) => void;
  setTipoActividad: (tipoActividad: string, acompanamiento?: string, pagador?: string) => void;
  setPacienteSeleccionado: (paciente: any) => void;
}

const HistoriaClinicaContext = createContext<HistoriaClinicaContextType | undefined>(undefined);

export const HistoriaClinicaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [sessionData, setSessionData] = useState<HistoriaClinicaContextType['sessionData']>({});

  const updateFormData = (data: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const setTipoActividad = (tipoActividad: string, acompanamiento?: string, pagador?: string) => {
    setSessionData(prev => ({
      ...prev,
      tipoActividad,
      acompanamiento,
      pagador
    }));
    updateFormData({ tipoActividad, acompanamiento, pagador });
  };

  const setPacienteSeleccionado = (paciente: any) => {
    setSessionData(prev => ({
      ...prev,
      pacienteSeleccionado: paciente
    }));
    if (paciente) {
      updateFormData({
        pacienteId: paciente._id,
        pacienteNombre: `${paciente.firstName || paciente.nombre} ${paciente.lastName || paciente.apellido}`,
        numeroIdentificacion: paciente.idNumber || paciente.numeroIdentificacion,
        fechaNacimiento: paciente.birthDate || paciente.fechaNacimiento,
        genero: paciente.gender || paciente.genero,
        telefono1: paciente.phone || paciente.telefono,
        email: paciente.email
      });
    }
  };

  return (
    <HistoriaClinicaContext.Provider
      value={{
        formData,
        sessionData,
        updateFormData,
        setTipoActividad,
        setPacienteSeleccionado
      }}
    >
      {children}
    </HistoriaClinicaContext.Provider>
  );
};

export const useHistoriaClinica = (): HistoriaClinicaContextType => {
  const context = useContext(HistoriaClinicaContext);
  if (!context) {
    throw new Error('useHistoriaClinica debe ser usado dentro de HistoriaClinicaProvider');
  }
  return context;
};

