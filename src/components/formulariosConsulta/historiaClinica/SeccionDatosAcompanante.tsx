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

interface SeccionDatosAcompananteProps {
  onDataChange: (data: any) => void;
  initialData?: any;
}

const SeccionDatosAcompanante: React.FC<SeccionDatosAcompananteProps> = ({ 
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

  // Opciones para los selects
  const parentescoOptions = [
    { valor: "", texto: "Seleccione parentesco" },
    { valor: "Padre", texto: "Padre" },
    { valor: "Madre", texto: "Madre" },
    { valor: "Hermano/a", texto: "Hermano/a" },
    { valor: "Hijo/a", texto: "Hijo/a" },
    { valor: "Cónyuge", texto: "Cónyuge" },
    { valor: "Abuelo/a", texto: "Abuelo/a" },
    { valor: "Nieto/a", texto: "Nieto/a" },
    { valor: "Tío/a", texto: "Tío/a" },
    { valor: "Sobrino/a", texto: "Sobrino/a" },
    { valor: "Primo/a", texto: "Primo/a" },
    { valor: "Cuñado/a", texto: "Cuñado/a" },
    { valor: "Suegro/a", texto: "Suegro/a" },
    { valor: "Yerno/Nuera", texto: "Yerno/Nuera" },
    { valor: "Otro", texto: "Otro" }
  ];

  // Observar cambios en el parentesco para mostrar/ocultar campo "otro"
  const parentesco = watch('parentesco');

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
      case 'tel':
        return (
          <input
            {...commonProps}
            type={tipo === 'tel' ? 'tel' : 'text'}
            maxLength={max_length}
            placeholder={`Ingrese ${etiqueta.toLowerCase()}`}
          />
        );

      case 'select':
        let opciones: any[] = [];
        switch (fieldName) {
          case 'parentesco':
            opciones = parentescoOptions;
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

      default:
        return <input {...commonProps} type="text" />;
    }
  };

  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Datos del Acompañante</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Complete la información del acompañante si aplica. Todos los campos son opcionales.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primer Nombre del Acompañante */}
        <div>
          <label className={styles.formLabel}>
            Primer Nombre del Acompañante
          </label>
          {renderField('acompanantePrimerNombre', { 
            tipo: 'text', 
            etiqueta: 'Primer Nombre del Acompañante', 
            requerido: false, 
            max_length: 50 
          })}
          {errors.acompanantePrimerNombre && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.acompanantePrimerNombre)}</p>
          )}
        </div>

        {/* Segundo Nombre del Acompañante */}
        <div>
          <label className={styles.formLabel}>
            Segundo Nombre del Acompañante
          </label>
          {renderField('acompananteSegundoNombre', { 
            tipo: 'text', 
            etiqueta: 'Segundo Nombre del Acompañante', 
            requerido: false, 
            max_length: 50 
          })}
          {errors.acompananteSegundoNombre && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.acompananteSegundoNombre)}</p>
          )}
        </div>

        {/* Primer Apellido del Acompañante */}
        <div>
          <label className={styles.formLabel}>
            Primer Apellido del Acompañante
          </label>
          {renderField('acompanantePrimerApellido', { 
            tipo: 'text', 
            etiqueta: 'Primer Apellido del Acompañante', 
            requerido: false, 
            max_length: 50 
          })}
          {errors.acompanantePrimerApellido && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.acompanantePrimerApellido)}</p>
          )}
        </div>

        {/* Segundo Apellido del Acompañante */}
        <div>
          <label className={styles.formLabel}>
            Segundo Apellido del Acompañante
          </label>
          {renderField('acompananteSegundoApellido', { 
            tipo: 'text', 
            etiqueta: 'Segundo Apellido del Acompañante', 
            requerido: false, 
            max_length: 50 
          })}
          {errors.acompananteSegundoApellido && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.acompananteSegundoApellido)}</p>
          )}
        </div>

        {/* Parentesco */}
        <div>
          <label className={styles.formLabel}>
            Parentesco
          </label>
          {renderField('parentesco', { 
            tipo: 'select', 
            etiqueta: 'Parentesco', 
            requerido: false 
          })}
          {errors.parentesco && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.parentesco)}</p>
          )}
        </div>

        {/* Otro Parentesco - Solo se muestra si parentesco es "Otro" */}
        {parentesco === 'Otro' && (
          <div>
            <label className={styles.formLabel}>
              Especifique otro parentesco
            </label>
            {renderField('otroParentesco', { 
              tipo: 'text', 
              etiqueta: 'Especifique otro parentesco', 
              requerido: false, 
              max_length: 100 
            })}
            {errors.otroParentesco && (
              <p className={styles.errorMessage}>{getErrorMessage(errors.otroParentesco)}</p>
            )}
          </div>
        )}

        {/* Teléfono del Acompañante */}
        <div>
          <label className={styles.formLabel}>
            Teléfono del Acompañante
          </label>
          {renderField('acompananteTelefono', { 
            tipo: 'tel', 
            etiqueta: 'Teléfono del Acompañante', 
            requerido: false, 
            max_length: 15 
          })}
          {errors.acompananteTelefono && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.acompananteTelefono)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeccionDatosAcompanante;
