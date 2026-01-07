import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistoriaClinica } from '../../../context/HistoriaClinicaContext';

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

interface SeccionResultadosParaclinicosProps {
  onDataChange: (data: any) => void;
  initialData?: any;
}

const SeccionResultadosParaclinicos: React.FC<SeccionResultadosParaclinicosProps> = ({ 
  onDataChange, 
  initialData = {} 
}) => {
  // Usar contexto global para persistencia
  const { formData, updateFormData } = useHistoriaClinica();
  
  // Combinar datos iniciales con datos del contexto
  const combinedInitialData = { ...initialData, ...formData };
  
  const { register, watch, setValue, formState: { errors }, getValues } = useForm({
    defaultValues: combinedInitialData
  });


  // Efecto para sincronizar cambios del contexto con el formulario
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      // Actualizar todos los campos del formulario con los datos del contexto
      Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined && formData[key] !== null && formData[key] !== '') {
          setValue(key, formData[key]);
        }
      });
    }
  }, [formData, setValue]);

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


  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Resultados Paraclínicos</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Registre los resultados de exámenes paraclínicos, laboratorios e imágenes diagnósticas.
      </p>
      
      <div>
        <label className={styles.formLabel}>
          Resultados Paraclínicos
        </label>
        <textarea
          {...register('resultadosParaclinicos', { maxLength: 2000 })}
          rows={6}
          maxLength={2000}
          placeholder="Ingrese los resultados de exámenes paraclínicos, laboratorios e imágenes diagnósticas"
          className={styles.formInput}
        />
        {errors.resultadosParaclinicos && (
          <p className={styles.errorMessage}>{getErrorMessage(errors.resultadosParaclinicos)}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Incluya aquí todos los resultados de exámenes realizados y sus hallazgos principales.
        </p>
      </div>
    </div>
  );
};

export default SeccionResultadosParaclinicos;
