import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistoriaClinica } from '../../../context/HistoriaClinicaContext';

// Estilos del formulario
const styles = {
  formLabel: "block text-sm font-semibold text-gray-700 mb-1",
  formInput: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150",
  formInputError: "mt-1 block w-full px-3 py-2 bg-white border border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500",
  sectionTitle: "text-lg text-indigo-700 font-bold mb-4 border-l-4 border-indigo-500 pl-3 py-1 bg-indigo-50 rounded-r-md",
  dataSection: "bg-white p-5 rounded-lg mb-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300",
  errorMessage: "mt-1 text-sm text-red-600",
  successMessage: "mt-1 text-sm text-green-600",
  sistemaCard: "bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4",
  sistemaTitle: "text-md font-semibold text-gray-800 mb-3",
  radioGroup: "flex space-x-4 mb-3",
  radioLabel: "flex items-center",
  radioInput: "mr-2 text-indigo-600 focus:ring-indigo-500",
  textarea: "mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
};

interface SeccionRevisionSistemasProps {
  onDataChange: (data: any) => void;
  initialData?: any;
}

interface SistemaData {
  sistema: string;
  seleccion: 'no' | 'si';
  observaciones: string;
}

const SeccionRevisionSistemas: React.FC<SeccionRevisionSistemasProps> = ({ 
  onDataChange, 
  initialData = {} 
}) => {
  // Usar contexto global para persistencia
  const { formData, updateFormData } = useHistoriaClinica();
  
  // Combinar datos iniciales con datos del contexto
  const combinedInitialData = { ...initialData, ...formData };
  
  const { register, handleSubmit, watch, setValue, formState: { errors }, getValues } = useForm({
    defaultValues: combinedInitialData
  });

  // Sistemas predefinidos
  const sistemasIniciales: SistemaData[] = [
    { sistema: "Órganos de los sentidos", seleccion: "no", observaciones: "" },
    { sistema: "Piel y faneras", seleccion: "no", observaciones: "" },
    { sistema: "Cardiopulmonar", seleccion: "no", observaciones: "" },
    { sistema: "Gastrointestinal", seleccion: "no", observaciones: "" },
    { sistema: "Genitourinario", seleccion: "no", observaciones: "" },
    { sistema: "Musculo esquelético", seleccion: "no", observaciones: "" },
    { sistema: "Neurológico", seleccion: "no", observaciones: "" }
  ];

  const [sistemas, setSistemas] = useState<SistemaData[]>(
    initialData.sistemas || sistemasIniciales
  );

  // Manejar cambio en la selección de un sistema
  const handleSistemaChange = (index: number, field: 'seleccion' | 'observaciones', value: string) => {
    const nuevosSistemas = [...sistemas];
    nuevosSistemas[index] = {
      ...nuevosSistemas[index],
      [field]: value
    };
    
    // Si se cambia la selección a "No", limpiar las observaciones
    if (field === 'seleccion' && value === 'no') {
      nuevosSistemas[index].observaciones = '';
    }
    
    setSistemas(nuevosSistemas);
    setValue('sistemas', nuevosSistemas);
    const formData = { ...getValues(), sistemas: nuevosSistemas };
    // Actualizar contexto global
    updateFormData(formData);
    // También notificar al componente padre
    onDataChange(formData);
  };

  // Efecto para sincronizar cambios del contexto con el formulario (optimizado)
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      // Actualizar todos los campos del formulario con los datos del contexto
      Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined && formData[key] !== null && formData[key] !== '') {
          setValue(key, formData[key]);
        }
      });
      
      // Si hay datos de sistemas en el contexto, actualizar el estado local
      if (formData.sistemas && Array.isArray(formData.sistemas)) {
        setSistemas(formData.sistemas);
      }
    }
  }, [formData.sistemas]); // Solo sincronizar cuando cambien los sistemas

  // Efecto para sincronizar cambios del formulario con el contexto en tiempo real
  useEffect(() => {
    const subscription = watch((value) => {
      if (value && Object.keys(value).length > 0) {
        updateFormData(value);
        onDataChange(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData, onDataChange]);

  // Renderizar un sistema individual
  const renderSistema = (sistema: SistemaData, index: number) => {
    return (
      <div key={index} className={styles.sistemaCard}>
        <h4 className={styles.sistemaTitle}>{sistema.sistema}</h4>
        
        {/* Opciones de selección */}
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name={`sistema_${index}_seleccion`}
              value="no"
              checked={sistema.seleccion === 'no'}
              onChange={(e) => handleSistemaChange(index, 'seleccion', e.target.value)}
              className={styles.radioInput}
            />
            <span className="text-gray-700">No</span>
          </label>
          
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name={`sistema_${index}_seleccion`}
              value="si"
              checked={sistema.seleccion === 'si'}
              onChange={(e) => handleSistemaChange(index, 'seleccion', e.target.value)}
              className={styles.radioInput}
            />
            <span className="text-gray-700">Sí</span>
          </label>
        </div>

        {/* Campo de observaciones - Solo visible si se selecciona "Sí" */}
        {sistema.seleccion === 'si' && (
          <div>
            <label className={styles.formLabel}>
              Observaciones <span className="text-red-500">*</span>
            </label>
            <textarea
              value={sistema.observaciones}
              onChange={(e) => handleSistemaChange(index, 'observaciones', e.target.value)}
              className={styles.textarea}
              rows={3}
              placeholder="Describa los síntomas o hallazgos específicos..."
              maxLength={500}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Describa específicamente qué síntomas presenta el paciente en este sistema
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Revisión por Sistemas</h3>
      <p className="text-gray-600 mb-6">
        Revise cada sistema corporal y marque si el paciente presenta síntomas o alteraciones.
        Si marca "Sí", aparecerá un campo de observaciones obligatorio para describir los hallazgos específicos.
      </p>

      <div className="space-y-4">
        {sistemas.map((sistema, index) => renderSistema(sistema, index))}
      </div>

      {/* Resumen de sistemas con síntomas */}
      {sistemas.some(s => s.seleccion === 'si') && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-md font-semibold text-yellow-800 mb-2">
            Sistemas con síntomas reportados:
          </h4>
          <ul className="list-disc list-inside space-y-1">
            {sistemas
              .filter(s => s.seleccion === 'si')
              .map((sistema, index) => (
                <li key={index} className="text-yellow-700">
                  <strong>{sistema.sistema}</strong>
                  {sistema.observaciones && (
                    <span className="ml-2">- {sistema.observaciones}</span>
                  )}
                </li>
              ))
            }
          </ul>
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-md font-semibold text-blue-800 mb-2">
          Instrucciones para la revisión por sistemas:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
          <li>Revise cada sistema corporal de manera sistemática</li>
          <li>Marque "Sí" solo si el paciente reporta síntomas o alteraciones</li>
          <li>Al marcar "Sí", aparecerá un campo de observaciones obligatorio</li>
          <li>En las observaciones, describa específicamente qué síntomas presenta</li>
          <li>Incluya información sobre la duración, intensidad y características de los síntomas</li>
          <li>Si no hay síntomas, marque "No" (el campo de observaciones se ocultará automáticamente)</li>
        </ul>
      </div>
    </div>
  );
};

export default SeccionRevisionSistemas;
