import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistoriaClinica } from '../../../context/HistoriaClinicaContext';
// TODO: Implementar servicio de especialidades cuando sea necesario
// import { SpecialtyService } from '../../../services/specialtyService';

// Estilos del formulario
const styles = {
  formLabel: "block text-sm font-semibold text-gray-700 mb-1",
  formInput: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150",
  formInputReadOnly: "mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium",
  formInputError: "mt-1 block w-full px-3 py-2 bg-white border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500",
  sectionTitle: "text-lg text-indigo-700 font-bold mb-4 border-l-4 border-indigo-500 pl-3 py-1 bg-indigo-50 rounded-r-md",
  dataSection: "bg-white p-5 rounded-lg mb-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300",
  errorMessage: "mt-1 text-sm text-red-600",
  successMessage: "mt-1 text-sm text-green-600",
  grid2Cols: "grid grid-cols-1 md:grid-cols-2 gap-4"
};

interface SeccionRecomendacionesProps {
  onDataChange: (data: any) => void;
  initialData?: any;
  appointmentData?: {
    especialidad?: string; // ID de la especialidad
    [key: string]: any;
  };
  doctorData?: {
    name?: string;
    lastName?: string;
    firstName?: string;
    specialty?: string;
    especialidad?: string | { name: string };
    [key: string]: any;
  };
}

const SeccionRecomendaciones: React.FC<SeccionRecomendacionesProps> = ({ 
  onDataChange, 
  initialData = {},
  appointmentData,
  doctorData
}) => {
  // Usar contexto global para persistencia
  const { formData, updateFormData } = useHistoriaClinica();
  
  // Estado para la especialidad obtenida por ID
  const [especialidadNombre, setEspecialidadNombre] = useState<string>('');
  const [cargandoEspecialidad, setCargandoEspecialidad] = useState<boolean>(false);
  
  // Combinar datos iniciales con datos del contexto
  const combinedInitialData = { ...initialData, ...formData };
  
  const { register, watch, setValue, formState: { errors }, getValues } = useForm({
    defaultValues: combinedInitialData
  });

  // Efecto para sincronizar cambios del contexto con el formulario (optimizado)
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      // Solo actualizar campos específicos que necesitamos para esta sección
      const fieldsToUpdate = ['recomendaciones', 'profesional', 'especialidad'];
      
      fieldsToUpdate.forEach(fieldKey => {
        if (formData[fieldKey] !== undefined && formData[fieldKey] !== null && formData[fieldKey] !== '') {
          setValue(fieldKey, formData[fieldKey], { shouldValidate: false, shouldDirty: false });
        }
      });
    }
  }, [formData.recomendaciones, formData.profesional, formData.especialidad, setValue]);

  // Efecto para sincronizar cambios del formulario con el contexto en tiempo real (optimizado)
  useEffect(() => {
    const subscription = watch((value) => {
      if (value && Object.keys(value).length > 0) {
        // Solo procesar campos específicos de esta sección
        const sectionFields = ['recomendaciones', 'profesional', 'especialidad'];
        const filteredValue = Object.fromEntries(
          Object.entries(value).filter(([fieldKey, val]) => 
            sectionFields.includes(fieldKey) && val !== undefined && val !== null && val !== ''
          )
        );
        
        if (Object.keys(filteredValue).length > 0) {
          updateFormData(filteredValue);
          onDataChange(filteredValue);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData, onDataChange]);

  // Efecto para sincronizar datos al montar el componente (optimizado)
  useEffect(() => {
    const currentValues = getValues();
    if (currentValues && Object.keys(currentValues).length > 0) {
      // Solo procesar campos específicos de esta sección
      const sectionFields = ['recomendaciones', 'profesional', 'especialidad'];
      const filteredValues = Object.fromEntries(
        Object.entries(currentValues).filter(([fieldKey, val]) => 
          sectionFields.includes(fieldKey) && val !== undefined && val !== null && val !== ''
        )
      );
      
      if (Object.keys(filteredValues).length > 0) {
        updateFormData(filteredValues);
      }
    }
  }, []); // Solo se ejecuta al montar

  // Efecto para obtener la especialidad desde appointmentData o doctorData
  useEffect(() => {
    const obtenerEspecialidad = () => {
      // Si appointmentData tiene especialidad como string (nombre), usarla directamente
      if (appointmentData?.especialidad && typeof appointmentData.especialidad === 'string') {
        setEspecialidadNombre(appointmentData.especialidad);
        if (!formData.especialidad) {
          setValue('especialidad', appointmentData.especialidad);
          updateFormData({ especialidad: appointmentData.especialidad });
        }
        setCargandoEspecialidad(false);
        return;
      }

      // Si appointmentData tiene especialidad como objeto con name
      if (appointmentData?.especialidad && typeof appointmentData.especialidad === 'object' && appointmentData.especialidad.name) {
        setEspecialidadNombre(appointmentData.especialidad.name);
        if (!formData.especialidad) {
          setValue('especialidad', appointmentData.especialidad.name);
          updateFormData({ especialidad: appointmentData.especialidad.name });
        }
        setCargandoEspecialidad(false);
        return;
      }

      // TODO: Si appointmentData tiene especialidad como ID, implementar servicio cuando sea necesario
      // Por ahora, usar especialidad del doctor si está disponible
      if (formData.doctorData?.especialidad) {
        if (typeof formData.doctorData.especialidad === 'object' && formData.doctorData.especialidad.name) {
          setEspecialidadNombre(formData.doctorData.especialidad.name);
          if (!formData.especialidad) {
            setValue('especialidad', formData.doctorData.especialidad.name);
            updateFormData({ especialidad: formData.doctorData.especialidad.name });
          }
        } else if (typeof formData.doctorData.especialidad === 'string') {
          setEspecialidadNombre(formData.doctorData.especialidad);
          if (!formData.especialidad) {
            setValue('especialidad', formData.doctorData.especialidad);
            updateFormData({ especialidad: formData.doctorData.especialidad });
          }
        }
      }
      
      setCargandoEspecialidad(false);
    };

    obtenerEspecialidad();
  }, [appointmentData?.especialidad, formData.doctorData?.especialidad, formData.especialidad, setValue, updateFormData]);

  // Efecto para llenar automáticamente los datos del doctor desde doctorData prop o formData
  useEffect(() => {
    const doctor = doctorData || formData.doctorData;
    
    if (doctor) {
      // Llenar nombre del profesional (siempre que haya datos y no esté ya lleno)
      const nombreCompleto = doctor.name && doctor.lastName 
        ? `${doctor.name} ${doctor.lastName}`
        : doctor.firstName && doctor.lastName
        ? `${doctor.firstName} ${doctor.lastName}`
        : doctor.name || doctor.firstName || '';
      
      if (nombreCompleto) {
        const valorActual = getValues('profesional');
        if (!valorActual || valorActual.trim() === '') {
          setValue('profesional', nombreCompleto);
          updateFormData({ profesional: nombreCompleto });
        }
      }
      
      // Llenar especialidad (priorizar doctorData sobre appointmentData)
      const valorActualEspecialidad = getValues('especialidad');
      if (!valorActualEspecialidad || valorActualEspecialidad.trim() === '' || valorActualEspecialidad === 'Especialidad médica') {
        let especialidad = '';
        
        // Prioridad: doctorData > formData.doctorData
        if (doctor.specialty) {
          especialidad = doctor.specialty;
        } else if (doctor.especialidad) {
          if (typeof doctor.especialidad === 'object' && doctor.especialidad.name) {
            especialidad = doctor.especialidad.name;
          } else if (typeof doctor.especialidad === 'string') {
            especialidad = doctor.especialidad;
          }
        }
        
        if (especialidad) {
          setValue('especialidad', especialidad);
          updateFormData({ especialidad });
          setEspecialidadNombre(especialidad);
        }
      }
    }
  }, [doctorData, formData.doctorData, setValue, updateFormData, getValues]);

  // Función helper para obtener el mensaje de error
  const getErrorMessage = (error: any) => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'Campo requerido';
  };

  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Recomendaciones</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Complete las recomendaciones finales y datos del profesional que atiende.
      </p>
      
      <div className="space-y-4">
        {/* Recomendaciones */}
        <div>
          <label className={styles.formLabel}>
            Recomendaciones
          </label>
          <textarea
            {...register('recomendaciones', { 
              maxLength: { value: 2000, message: 'Máximo 2000 caracteres' }
            })}
            rows={6}
            maxLength={2000}
            placeholder="Ingrese las recomendaciones finales para el paciente"
            className={styles.formInput}
          />
          {errors.recomendaciones && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.recomendaciones)}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Incluya recomendaciones sobre seguimiento, cuidados especiales, citas de control, etc.
          </p>
        </div>

        {/* Datos del Profesional */}
        <div className={styles.grid2Cols}>
          {/* Profesional */}
          <div>
            <label className={styles.formLabel}>
              Profesional <span className="text-red-500">*</span>
            </label>
            <input
              {...register('profesional', { 
                required: 'Profesional es requerido',
                maxLength: { value: 100, message: 'Máximo 100 caracteres' }
              })}
              type="text"
              maxLength={100}
              placeholder="Nombre del profesional"
              className={styles.formInputReadOnly}
              readOnly
            />
            {errors.profesional && (
              <p className={styles.errorMessage}>{getErrorMessage(errors.profesional)}</p>
            )}
          </div>

          {/* Especialidad */}
          <div>
            <label className={styles.formLabel}>
              Especialidad <span className="text-red-500">*</span>
            </label>
            <input
              {...register('especialidad', { 
                required: 'Especialidad es requerida',
                maxLength: { value: 100, message: 'Máximo 100 caracteres' }
              })}
              type="text"
              maxLength={100}
              placeholder={
                cargandoEspecialidad 
                  ? 'Cargando especialidad...' 
                  : especialidadNombre
                    ? `Especialidad: ${especialidadNombre}`
                    : 'Especialidad médica'
              }
              className={styles.formInputReadOnly}
              readOnly
            />
            {cargandoEspecialidad && (
              <p className="text-sm text-blue-600 mt-1">
                🔄 Obteniendo especialidad desde la cita...
              </p>
            )}
            {especialidadNombre && (
              <p className="text-sm text-green-600 mt-1">
                ✅ Especialidad precargada desde la cita: {especialidadNombre}
              </p>
            )}
            {errors.especialidad && (
              <p className={styles.errorMessage}>{getErrorMessage(errors.especialidad)}</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SeccionRecomendaciones;
