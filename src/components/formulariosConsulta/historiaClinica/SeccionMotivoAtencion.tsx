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
  successMessage: "mt-1 text-sm text-green-600"
};

interface SeccionMotivoAtencionProps {
  onDataChange: (data: any) => void;
  initialData?: any;
  especialidadDoctor?: string;
  motivoCita?: string;
  appointmentData?: {
    especialidad?: string; // ID de la especialidad
    [key: string]: any;
  };
}

const SeccionMotivoAtencion: React.FC<SeccionMotivoAtencionProps> = ({ 
  onDataChange, 
  initialData = {},
  especialidadDoctor = '',
  motivoCita = '',
  appointmentData
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

  // Opciones para los selects
  const motivoAtencionOptions = [
    { valor: "", texto: "Seleccione motivo de atención" },
    { valor: "21_Accidente de trabajo", texto: "21 - Accidente de trabajo" },
    { valor: "22_Accidente en el hogar", texto: "22 - Accidente en el hogar" },
    { valor: "23_Accidente de tránsito de origen común", texto: "23 - Accidente de tránsito de origen común" },
    { valor: "24_Accidente de tránsito de origen laboral", texto: "24 - Accidente de tránsito de origen laboral" },
    { valor: "25_Accidente en el entorno educativo", texto: "25 - Accidente en el entorno educativo" },
    { valor: "26_Otro tipo de accidente", texto: "26 - Otro tipo de accidente" },
    { valor: "27_Evento catastrófico de origen natural", texto: "27 - Evento catastrófico de origen natural" },
    { valor: "28_Lesión por agresión", texto: "28 - Lesión por agresión" },
    { valor: "29_Lesión auto infligida", texto: "29 - Lesión auto infligida" },
    { valor: "30_Sospecha de violencia física", texto: "30 - Sospecha de violencia física" },
    { valor: "31_Sospecha de violencia psicológica", texto: "31 - Sospecha de violencia psicológica" },
    { valor: "32_Sospecha de violencia sexual", texto: "32 - Sospecha de violencia sexual" },
    { valor: "33_Sospecha de negligencia y abandono", texto: "33 - Sospecha de negligencia y abandono" },
    { valor: "34_IVE relacionado con peligro a la Salud o vida de la mujer", texto: "34 - IVE relacionado con peligro a la Salud o vida de la mujer" },
    { valor: "35_IVE por malformación congénita incompatible con la vida", texto: "35 - IVE por malformación congénita incompatible con la vida" },
    { valor: "36_IVE por violencia sexual, incesto o por inseminación artificial o transferencia de ovulo fecundado no consentida", texto: "36 - IVE por violencia sexual, incesto o por inseminación artificial o transferencia de ovulo fecundado no consentida" },
    { valor: "37_Evento adverso en salud", texto: "37 - Evento adverso en salud" },
    { valor: "38_Enfermedad general", texto: "38 - Enfermedad general" },
    { valor: "39_Enfermedad laboral", texto: "39 - Enfermedad laboral" },
    { valor: "40_Promoción y mantenimiento de la salud – intervenciones individuales", texto: "40 - Promoción y mantenimiento de la salud – intervenciones individuales" },
    { valor: "41_Intervención colectiva", texto: "41 - Intervención colectiva" },
    { valor: "42_Atención de población materno perinatal", texto: "42 - Atención de población materno perinatal" },
    { valor: "43_Riesgo ambiental", texto: "43 - Riesgo ambiental" },
    { valor: "44_Otros eventos Catastróficos", texto: "44 - Otros eventos Catastróficos" },
    { valor: "45_Accidente de mina antipersonal – MAP", texto: "45 - Accidente de mina antipersonal – MAP" },
    { valor: "46_Accidente de Artefacto Explosivo Improvisado – AEI", texto: "46 - Accidente de Artefacto Explosivo Improvisado – AEI" },
    { valor: "47_Accidente de Munición Sin Explotar- MUSE", texto: "47 - Accidente de Munición Sin Explotar- MUSE" },
    { valor: "48_Otra víctima de conflicto armado colombiano", texto: "48 - Otra víctima de conflicto armado colombiano" }
  ];


  // Efecto para obtener la especialidad desde appointmentData o especialidadDoctor
  useEffect(() => {
    const obtenerEspecialidad = () => {
      // Si appointmentData tiene especialidad como string (nombre), usarla directamente
      if (appointmentData?.especialidad) {
        if (typeof appointmentData.especialidad === 'string') {
          setEspecialidadNombre(appointmentData.especialidad);
          setValue('servicio', appointmentData.especialidad);
          updateFormData({ servicio: appointmentData.especialidad });
          setCargandoEspecialidad(false);
          return;
        }

        // Si appointmentData tiene especialidad como objeto con name
        if (typeof appointmentData.especialidad === 'object' && appointmentData.especialidad.name) {
          setEspecialidadNombre(appointmentData.especialidad.name);
          setValue('servicio', appointmentData.especialidad.name);
          updateFormData({ servicio: appointmentData.especialidad.name });
          setCargandoEspecialidad(false);
          return;
        }

        // TODO: Si appointmentData tiene especialidad como ID, implementar servicio cuando sea necesario
        // Por ahora, usar especialidadDoctor como respaldo
      }

      // Si no hay appointmentData pero hay especialidadDoctor, usarla
      if (especialidadDoctor && !appointmentData?.especialidad) {
        const valorActual = getValues('servicio');
        if (!valorActual || valorActual.trim() === '' || valorActual === 'Especialidad médica') {
          setEspecialidadNombre(especialidadDoctor);
          setValue('servicio', especialidadDoctor, { shouldValidate: true, shouldDirty: false });
          updateFormData({ servicio: especialidadDoctor });
        }
      }
      
      setCargandoEspecialidad(false);
    };

    obtenerEspecialidad();
  }, [appointmentData?.especialidad, especialidadDoctor, setValue, updateFormData, getValues]);

  // Efecto para precargar el campo motivoConsulta con el motivo de la cita
  useEffect(() => {
    if (motivoCita && !formData.motivoConsulta) {
      setValue('motivoConsulta', motivoCita);
      updateFormData({ motivoConsulta: motivoCita });
    }
  }, [motivoCita, setValue, updateFormData, formData.motivoConsulta]);

  // Efecto para sincronizar cambios del contexto con el formulario
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      // Actualizar todos los campos del formulario con los datos del contexto
      Object.keys(formData).forEach(fieldKey => {
        if (formData[fieldKey] !== undefined && formData[fieldKey] !== null && formData[fieldKey] !== '') {
          // Para el campo servicio, asegurarse de que tenga prioridad la especialidad del doctor
          if (fieldKey === 'servicio' && especialidadDoctor && !formData.servicio) {
            setValue('servicio', especialidadDoctor);
          } else {
            setValue(fieldKey, formData[fieldKey]);
          }
        }
      });
    }
  }, [formData, setValue, especialidadDoctor]);

  // Efecto para sincronizar cambios del formulario con el contexto en tiempo real
  useEffect(() => {
    const subscription = watch((value) => {
      if (value && Object.keys(value).length > 0) {
        // Filtrar valores vacíos para evitar sobrescribir datos válidos
        const filteredValue = Object.fromEntries(
          Object.entries(value).filter(([, val]) => 
            val !== undefined && val !== null && val !== ''
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

  // Efecto para sincronizar datos al montar el componente
  useEffect(() => {
    const currentValues = getValues();
    if (currentValues && Object.keys(currentValues).length > 0) {
      const filteredValues = Object.fromEntries(
        Object.entries(currentValues).filter(([, val]) => 
          val !== undefined && val !== null && val !== ''
        )
      );
      
      if (Object.keys(filteredValues).length > 0) {
        updateFormData(filteredValues);
      }
    }
  }, [getValues, updateFormData]);

  // Función helper para obtener el mensaje de error
  const getErrorMessage = (error: any) => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'Campo requerido';
  };

  // Renderizar campo según su tipo
  const renderField = (fieldName: string, fieldConfig: any) => {
    const { tipo, etiqueta, requerido, max_length } = fieldConfig;
    const isReadOnly = fieldName === 'fechaRegistro';

    const commonProps = {
      ...register(fieldName, { 
        required: requerido ? `${etiqueta} es requerido` : false,
        maxLength: max_length ? { value: max_length, message: `Máximo ${max_length} caracteres` } : undefined
      }),
      className: isReadOnly ? styles.formInputReadOnly : styles.formInput,
      disabled: isReadOnly
    };

    switch (tipo) {
      case 'text':
        return (
          <input
            {...commonProps}
            type="text"
            maxLength={max_length}
            placeholder={`Ingrese ${etiqueta.toLowerCase()}`}
          />
        );

      case 'select':
        let opciones: any[] = [];
        switch (fieldName) {
          case 'motivoAtencion':
            opciones = motivoAtencionOptions;
            break;
          default:
            opciones = [];
        }

        return (
          <select {...commonProps}>
            {opciones.map((opcion: any, index: number) => (
              <option key={index} value={opcion.valor}>
                {opcion.texto}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            maxLength={max_length}
            placeholder={`Describa ${etiqueta.toLowerCase()}`}
            className={isReadOnly ? styles.formInputReadOnly : styles.formInput}
          />
        );

      default:
        return <input {...commonProps} type="text" />;
    }
  };

  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Motivo de Atención</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Complete la información sobre el motivo de la consulta médica.
      </p>
      
      <div className="space-y-4">
        {/* Motivo de Atención */}
        <div>
          <label className={styles.formLabel}>
            Motivo de Atención <span className="text-red-500">*</span>
          </label>
          {renderField('motivoAtencion', { 
            tipo: 'select', 
            etiqueta: 'Motivo de Atención', 
            requerido: true 
          })}
          {errors.motivoAtencion && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.motivoAtencion)}</p>
          )}
        </div>


        {/* Servicio */}
        <div>
          <label className={styles.formLabel}>
            Servicio <span className="text-red-500">*</span>
          </label>
          <input
            {...register('servicio', { 
              required: 'Servicio es requerido',
              maxLength: { value: 100, message: 'Máximo 100 caracteres' }
            })}
            className={(especialidadDoctor || especialidadNombre || formData.servicio) ? styles.formInputReadOnly : styles.formInput}
            readOnly={!!(especialidadDoctor || especialidadNombre || formData.servicio)}
            placeholder="Especialidad médica"
          />
          {errors.servicio && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.servicio)}</p>
          )}
        </div>

        {/* Motivo de Consulta */}
        <div>
          <label className={styles.formLabel}>
            Motivo de Consulta <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('motivoConsulta', { 
              required: 'Motivo de Consulta es requerido',
              maxLength: { value: 500, message: 'Máximo 500 caracteres' }
            })}
            className={motivoCita ? styles.formInputReadOnly : styles.formInput}
            readOnly={!!motivoCita}
            rows={4}
            maxLength={500}
            placeholder={motivoCita ? `Motivo: ${motivoCita}` : 'Describa detalladamente el motivo por el cual el paciente solicita atención médica'}
          />
          {errors.motivoConsulta && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.motivoConsulta)}</p>
          )}
          {motivoCita && (
            <p className="text-sm text-blue-600 mt-1">
              💡 Motivo de consulta precargado desde la cita
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Describa detalladamente el motivo por el cual el paciente solicita atención médica.
          </p>
        </div>

        {/* Enfermedad Actual */}
        <div>
          <label className={styles.formLabel}>
            Enfermedad Actual <span className="text-red-500">*</span>
          </label>
          {renderField('enfermedadActual', { 
            tipo: 'textarea', 
            etiqueta: 'Enfermedad Actual', 
            requerido: true, 
            max_length: 2000 
          })}
          {errors.enfermedadActual && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.enfermedadActual)}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Describa la historia de la enfermedad actual, incluyendo síntomas, duración, evolución y tratamientos previos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeccionMotivoAtencion;
