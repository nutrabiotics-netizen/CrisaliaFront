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
  successMessage: "mt-1 text-sm text-green-600",
  checkboxContainer: "flex items-center space-x-2",
  checkbox: "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded",
  checkboxLabel: "text-sm text-gray-700",
  subSection: "bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200",
  subSectionTitle: "text-md font-semibold text-gray-800 mb-3",
  grid2Cols: "grid grid-cols-1 md:grid-cols-2 gap-4",
  grid3Cols: "grid grid-cols-1 md:grid-cols-3 gap-4"
};

interface SeccionAntecedentesProps {
  onDataChange: (data: any) => void;
  initialData?: any;
}

const SeccionAntecedentes: React.FC<SeccionAntecedentesProps> = ({ 
  onDataChange, 
  initialData = {} 
}) => {
  // Usar contexto global para persistencia
  const { formData, updateFormData } = useHistoriaClinica();
  
  // Combinar datos iniciales con datos del contexto
  const combinedInitialData = { ...initialData, ...formData };
  
  // Valores por defecto para las categorías de antecedentes
  const defaultValues = {
    ...combinedInitialData,
    // Establecer "no" por defecto para todas las categorías
    patologicosSeleccion: 'no',
    farmacologicosSeleccion: 'no',
    quirurgicosSeleccion: 'no',
    toxicosSeleccion: 'no',
    alergicosSeleccion: 'no',
    hospitalariosSeleccion: 'no',
    transfusionalesSeleccion: 'no',
    preventivosSeleccion: 'no',
    familiaresSeleccion: 'no',
    psicosocialesSeleccion: 'no'
  };

  const { register, watch, setValue, formState: { errors }, getValues } = useForm({
    defaultValues
  });

  // Categorías de antecedentes
  const categoriasAntecedentes = [
    { key: 'patologicos', label: 'Patológicos' },
    { key: 'farmacologicos', label: 'Farmacológicos' },
    { key: 'quirurgicos', label: 'Quirúrgicos' },
    { key: 'toxicos', label: 'Tóxicos' },
    { key: 'alergicos', label: 'Alérgicos' },
    { key: 'hospitalarios', label: 'Hospitalarios' },
    { key: 'transfusionales', label: 'Transfusionales' },
    { key: 'preventivos', label: 'Preventivos' }
  ];

  // Efecto para sincronizar cambios del contexto con el formulario
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      // Actualizar todos los campos del formulario con los datos del contexto
        Object.keys(formData).forEach(fieldKey => {
          if (formData[fieldKey] !== undefined && formData[fieldKey] !== null && formData[fieldKey] !== '') {
            setValue(fieldKey, formData[fieldKey]);
          }
        });
    }
  }, [formData, setValue]);

  // Función para construir el array de antecedentes
  const construirAntecedentes = (formValues: any) => {
    const antecedentes: any[] = [];
    
    categoriasAntecedentes.forEach(categoria => {
      const categoriaKey = categoria.key;
      const seleccion = formValues[`${categoriaKey}Seleccion`];
      const observaciones = formValues[`${categoriaKey}Observaciones`];
      
      if (seleccion === 'si' && observaciones) {
        antecedentes.push({
          tipo: categoria.label,
          personalCheck: seleccion,
          personalDescripcion: observaciones
        });
      }
    });
    
    return antecedentes;
  };

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
          // Construir array de antecedentes
          const antecedentes = construirAntecedentes(value);
          const dataToUpdate = {
            ...filteredValue,
            antecedentes: antecedentes
          };
          
          updateFormData(dataToUpdate);
          onDataChange(dataToUpdate);
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
        // Construir array de antecedentes
        const antecedentes = construirAntecedentes(currentValues);
        const dataToUpdate = {
          ...filteredValues,
          antecedentes: antecedentes
        };
        
        updateFormData(dataToUpdate);
      }
    }
  }, [getValues, updateFormData]);

  // Función helper para obtener el mensaje de error
  const getErrorMessage = (error: any) => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'Campo requerido';
  };

  // Renderizar campo de antecedente por categoría
  const renderAntecedenteCategoria = (categoria: any) => {
    const categoriaKey = categoria.key;
    const categoriaLabel = categoria.label;
    
    // Observar el valor del radio button para mostrar/ocultar el textarea
    const tieneAntecedentes = watch(`${categoriaKey}Seleccion`);
    
    return (
      <div key={categoriaKey} className={styles.subSection}>
        <h4 className={styles.subSectionTitle}>{categoriaLabel}</h4>
        
        <div className="space-y-3">
          {/* Radio buttons para indicar si tiene antecedentes */}
          <div className="space-y-2">
            <label className={styles.formLabel}>
              ¿Tiene antecedentes {categoriaLabel.toLowerCase()}?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  {...register(`${categoriaKey}Seleccion`)}
                  type="radio"
                  value="si"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Sí</span>
              </label>
              <label className="flex items-center">
                <input
                  {...register(`${categoriaKey}Seleccion`)}
                  type="radio"
                  value="no"
                  defaultChecked
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
          
          {/* Textarea para observaciones - solo aparece si se selecciona "Sí" */}
          {tieneAntecedentes === 'si' && (
            <div>
              <label className={styles.formLabel}>
                Observaciones
              </label>
              <textarea
                {...register(`${categoriaKey}Observaciones`, { required: true })}
                rows={3}
                maxLength={500}
                placeholder={`Describa los antecedentes ${categoriaLabel.toLowerCase()}`}
                className={styles.formInput}
              />
              {errors[`${categoriaKey}Observaciones`] && (
                <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Antecedentes</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Complete la información sobre los antecedentes médicos del paciente.
      </p>
      
      <div className="space-y-6">
        {/* Antecedentes por categorías */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-4">Antecedentes Médicos</h4>
          <div className="space-y-4">
            {categoriasAntecedentes.map(renderAntecedenteCategoria)}
          </div>
        </div>

        {/* Antecedentes Ginecoobstétricos - Solo para género femenino */}
        {formData.genero === 'Femenino' && (
          <div className={styles.subSection}>
            <h4 className={styles.subSectionTitle}>Antecedentes Ginecoobstétricos</h4>
            <div className={styles.grid3Cols}>
              {/* G (Gestaciones) */}
              <div>
                <label className={styles.formLabel}>G (Gestaciones)</label>
                <input
                  {...register('g')}
                  type="number"
                  min="0"
                  placeholder="0"
                  className={styles.formInput}
                />
                <p className="text-xs text-gray-500 mt-1">Número total de embarazos</p>
              </div>

              {/* P (Partos) */}
              <div>
                <label className={styles.formLabel}>P (Partos)</label>
                <input
                  {...register('p')}
                  type="number"
                  min="0"
                  placeholder="0"
                  className={styles.formInput}
                />
                <p className="text-xs text-gray-500 mt-1">Partos que llegaron a término</p>
              </div>

              {/* A (Abortos) */}
              <div>
                <label className={styles.formLabel}>A (Abortos)</label>
                <input
                  {...register('a')}
                  type="number"
                  min="0"
                  placeholder="0"
                  className={styles.formInput}
                />
                <p className="text-xs text-gray-500 mt-1">Embarazos terminados antes de viabilidad</p>
              </div>

              {/* C (Cesáreas) */}
              <div>
                <label className={styles.formLabel}>C (Cesáreas)</label>
                <input
                  {...register('c')}
                  type="number"
                  min="0"
                  placeholder="0"
                  className={styles.formInput}
                />
                <p className="text-xs text-gray-500 mt-1">Partos por cesárea</p>
              </div>

              {/* V (Vivos) */}
              <div>
                <label className={styles.formLabel}>V (Vivos)</label>
                <input
                  {...register('v')}
                  type="number"
                  min="0"
                  placeholder="0"
                  className={styles.formInput}
                />
                <p className="text-xs text-gray-500 mt-1">Hijos vivos actualmente</p>
              </div>

              {/* M (Muertos) */}
              <div>
                <label className={styles.formLabel}>M (Muertos)</label>
                <input
                  {...register('m')}
                  type="number"
                  min="0"
                  placeholder="0"
                  className={styles.formInput}
                />
                <p className="text-xs text-gray-500 mt-1">Hijos fallecidos</p>
              </div>
            </div>

          <div className={styles.grid3Cols} style={{ marginTop: '1rem' }}>
            {/* FUR */}
            <div>
              <label className={styles.formLabel}>FUR (Fecha Última Regla)</label>
              <input
                {...register('fur')}
                type="date"
                className={styles.formInput}
              />
            </div>

            {/* FUP */}
            <div>
              <label className={styles.formLabel}>FUP (Fecha Último Parto)</label>
              <input
                {...register('fup')}
                type="date"
                className={styles.formInput}
              />
            </div>

            {/* FPP */}
            <div>
              <label className={styles.formLabel}>FPP (Fecha Probable de Parto)</label>
              <input
                {...register('fpp')}
                type="date"
                className={styles.formInput}
              />
            </div>
          </div>
          </div>
        )}

        {/* Planificación y Ciclos - Solo para género femenino */}
        {formData.genero === 'Femenino' && (
          <>
            {/* Planificación */}
            <div>
              <label className={styles.formLabel}>
                Planificación
              </label>
              <input
                {...register('planificacion', { maxLength: 200 })}
                type="text"
                maxLength={200}
                placeholder="Describa métodos de planificación utilizados"
                className={styles.formInput}
              />
              {errors.planificacion && (
                <p className={styles.errorMessage}>{getErrorMessage(errors.planificacion)}</p>
              )}
            </div>

            {/* Ciclos */}
            <div>
              <label className={styles.formLabel}>
                Ciclos
              </label>
              <input
                {...register('ciclos', { maxLength: 200 })}
                type="text"
                maxLength={200}
                placeholder="Describa características de los ciclos menstruales"
                className={styles.formInput}
              />
              {errors.ciclos && (
                <p className={styles.errorMessage}>{getErrorMessage(errors.ciclos)}</p>
              )}
            </div>
          </>
        )}

        {/* Antecedentes Familiares */}
        <div className={styles.subSection}>
          <h4 className={styles.subSectionTitle}>Antecedentes Familiares</h4>
          
          <div className="space-y-3">
            {/* Radio buttons para indicar si tiene antecedentes familiares */}
            <div className="space-y-2">
              <label className={styles.formLabel}>
                ¿Tiene antecedentes familiares?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('familiaresSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('familiaresSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            
            {/* Textarea para observaciones - solo aparece si se selecciona "Sí" */}
            {watch('familiaresSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>
                  Observaciones
                </label>
                <textarea
                  {...register('familiares', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa antecedentes médicos familiares relevantes"
                  className={styles.formInput}
                />
                {errors.familiares && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Antecedentes Psicosociales */}
        <div className={styles.subSection}>
          <h4 className={styles.subSectionTitle}>Antecedentes Psicosociales</h4>
          
          <div className="space-y-3">
            {/* Radio buttons para indicar si tiene antecedentes psicosociales */}
            <div className="space-y-2">
              <label className={styles.formLabel}>
                ¿Tiene antecedentes psicosociales?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('psicosocialesSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('psicosocialesSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            
            {/* Textarea para observaciones - solo aparece si se selecciona "Sí" */}
            {watch('psicosocialesSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>
                  Observaciones
                </label>
                <textarea
                  {...register('psicosociales', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa antecedentes psicosociales relevantes"
                  className={styles.formInput}
                />
                {errors.psicosociales && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionAntecedentes;
