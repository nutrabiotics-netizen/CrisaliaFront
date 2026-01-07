import React, { useState, useEffect } from 'react';
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
  subsectionTitle: "text-md font-semibold text-gray-800 mb-3 mt-4",
  signosVitalesGrid: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
  signoVitalCard: "bg-blue-50 p-4 rounded-lg border border-blue-200",
  imcCard: "bg-green-50 p-4 rounded-lg border border-green-200",
  calculadoValue: "text-lg font-bold text-green-600"
};

// Función helper para verificar si el acompañamiento es con profesional de la salud
const esAcompanadoConProfesional = (acompanamiento: string): boolean => {
  if (!acompanamiento) return false;
  // Normalizar el string: quitar espacios extra y convertir a minúsculas para comparación
  const normalizado = acompanamiento.trim().toLowerCase();
  const esperado = 'Acompañado con profesional de la salud'.toLowerCase();
  return normalizado === esperado;
};

interface SeccionExamenFisicoProps {
  onDataChange: (data: any) => void;
  initialData?: any;
}

const SeccionExamenFisico: React.FC<SeccionExamenFisicoProps> = ({ 
  onDataChange, 
  initialData = {} 
}) => {
  // Usar contexto global para persistencia
  const { formData, updateFormData } = useHistoriaClinica();
  
  // Combinar datos iniciales con datos del contexto
  const combinedInitialData = { ...initialData, ...formData };
  
  // Valores por defecto
  const defaultValues = {
    ...combinedInitialData,
    tieneEquiposSignos: 'no',
    'examenMedico.cabezaYCuelloSeleccion': 'no',
    'examenMedico.toraxCardioVascularSeleccion': 'no',
    'examenMedico.abdomenSeleccion': 'no',
    'examenMedico.genitalesSeleccion': 'no',
    'examenMedico.extremidadesSeleccion': 'no',
    'examenMedico.pielFanerasSeleccion': 'no',
    'examenMedico.neurologicoSeleccion': 'no',
    'examenMedico.examenMentalSeleccion': 'no'
  };

  const { register, watch, setValue, formState: { errors }, getValues } = useForm({
    defaultValues
  });

  const [imc, setImc] = useState(0);
  const [peso, setPeso] = useState('');
  const [talla, setTalla] = useState('');
  const [acompanamiento, setAcompanamiento] = useState(formData.acompanamiento || '');

  // Sincronizar acompañamiento del contexto
  useEffect(() => {
    if (formData.acompanamiento && formData.acompanamiento !== acompanamiento) {
      setAcompanamiento(formData.acompanamiento);
    }
  }, [formData.acompanamiento, acompanamiento]);

  // Opciones para los selects
  const estadoConcienciaOptions = [
    { valor: "", texto: "Seleccione estado de conciencia" },
    { valor: "Alerta", texto: "Alerta" },
    { valor: "Consciente", texto: "Consciente" },
    { valor: "Orientado", texto: "Orientado" },
    { valor: "Comatoso", texto: "Comatoso" },
    { valor: "Somnolencia (Obnubilación)", texto: "Somnolencia (Obnubilación)" },
    { valor: "Estupor", texto: "Estupor" },
    { valor: "Delirio", texto: "Delirio" }
  ];

  const equiposSignosOptions = [
    { valor: "Manual", texto: "Manual" },
    { valor: "Digital", texto: "Digital" },
    { valor: "Automático", texto: "Automático" }
  ];

  // Calcular IMC automáticamente
  const calcularIMC = (peso: number, talla: number) => {
    if (peso > 0 && talla > 0) {
      const imcCalculado = peso / Math.pow(talla / 100, 2);
      setImc(imcCalculado);
      setValue('imc', imcCalculado);
      return imcCalculado;
    }
    return 0;
  };

  // Manejar cambios en peso y talla
  const handlePesoTallaChange = (field: 'pesoKg' | 'tallaCm', value: string) => {
    const numValue = parseFloat(value) || 0;
    
    if (field === 'pesoKg') {
      setPeso(value);
      calcularIMC(numValue, parseFloat(talla) || 0);
    } else if (field === 'tallaCm') {
      setTalla(value);
      calcularIMC(parseFloat(peso) || 0, numValue);
    }
    
    setValue(field, value);
    const formData = { ...getValues(), [field]: value };
    // Actualizar contexto global
    updateFormData(formData);
    // También notificar al componente padre
    onDataChange(formData);
  };

  // Efecto para sincronizar cambios del contexto con el formulario
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      // Actualizar todos los campos del formulario con los datos del contexto
      Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined && formData[key] !== null && formData[key] !== '') {
          setValue(key, formData[key]);
        }
      });
      
      // Sincronizar peso y talla para el cálculo del IMC
      if (formData.pesoKg) {
        setPeso(formData.pesoKg);
      }
      if (formData.tallaCm) {
        setTalla(formData.tallaCm);
        calcularIMC(parseFloat(formData.pesoKg) || 0, parseFloat(formData.tallaCm) || 0);
      }
    }
  }, [formData, setValue]);

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

  // Obtener clasificación del IMC
  const getIMCClasificacion = (imc: number) => {
    if (imc < 18.5) return "Bajo peso";
    if (imc < 25) return "Normal";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidad grado I";
    if (imc < 40) return "Obesidad grado II";
    return "Obesidad grado III";
  };

  // Función helper para obtener el mensaje de error
  const getErrorMessage = (error: any): string => {
    if (error?.message && typeof error.message === 'string') return error.message;
    return 'Campo requerido';
  };

  // Renderizar campo
  const renderField = (fieldName: string, fieldConfig: any) => {
    const { tipo, etiqueta, requerido, readonly, max_length, min, max, step } = fieldConfig;
    const isReadOnly = readonly || fieldName === 'imc';
    const hasError = errors[fieldName];

    const commonProps = {
      ...register(fieldName, { 
        required: requerido ? `${etiqueta} es requerido` : false,
        maxLength: max_length ? { value: max_length, message: `Máximo ${max_length} caracteres` } : undefined,
        min: min ? { value: min, message: `Valor mínimo: ${min}` } : undefined,
        max: max ? { value: max, message: `Valor máximo: ${max}` } : undefined
      }),
      className: hasError ? styles.formInputError : (isReadOnly ? styles.formInputReadOnly : styles.formInput),
      disabled: isReadOnly
    };

    switch (tipo) {
      case 'text':
        return (
          <input
            {...commonProps}
            type="text"
            maxLength={max_length}
          />
        );

      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              if (fieldName === 'pesoKg' || fieldName === 'tallaCm') {
                handlePesoTallaChange(fieldName, e.target.value);
              }
            }}
          />
        );

      case 'select':
        let opcionesSelect: Array<{valor: string, texto: string}> = [];
        switch (fieldName) {
          case 'estadoDeConciencia':
            opcionesSelect = estadoConcienciaOptions;
            break;
          case 'equiposSignos':
            opcionesSelect = equiposSignosOptions;
            break;
          default:
            opcionesSelect = [];
        }

        return (
          <select {...commonProps}>
            {opcionesSelect.map((opcion, index: number) => (
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
          />
        );

      default:
        return <input {...commonProps} type="text" />;
    }
  };

  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Examen Físico</h3>

      {/* Estado de Conciencia */}
      <div className="mb-6">
        <label className={styles.formLabel}>
          Estado de Conciencia <span className="text-red-500">*</span>
        </label>
        {renderField('estadoDeConciencia', { 
          tipo: 'select', 
          etiqueta: 'Estado de Conciencia', 
          requerido: true 
        })}
        {errors.estadoDeConciencia && (
          <p className={styles.errorMessage}>{getErrorMessage(errors.estadoDeConciencia)}</p>
        )}
      </div>

      {/* Equipos para Signos Vitales */}
      <div className="mb-6">
        <label className={styles.formLabel}>
          ¿Tiene equipos para tomar signos vitales? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              {...register('tieneEquiposSignos')}
              type="radio"
              value="si"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('tieneEquiposSignos')}
              type="radio"
              value="no"
              defaultChecked
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>
        {errors.tieneEquiposSignos && (
          <p className={styles.errorMessage}>{getErrorMessage(errors.tieneEquiposSignos)}</p>
        )}
      </div>

      {/* Signos Vitales - Solo si tiene equipos */}
      {watch('tieneEquiposSignos') === 'si' && (
        <>
      <h4 className={styles.subsectionTitle}>Signos Vitales</h4>
      <div className={styles.signosVitalesGrid}>
        {/* TAS */}
        <div className={styles.signoVitalCard}>
          <label className={styles.formLabel}>TAS (mmHg)</label>
          {renderField('tasMming', { 
            tipo: 'number', 
            etiqueta: 'TAS (mmHg)', 
            requerido: false,
            min: 0,
            max: 300
          })}
          {errors.tasMming && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.tasMming)}</p>
          )}
        </div>

        {/* TAD */}
        <div className={styles.signoVitalCard}>
          <label className={styles.formLabel}>TAD (mmHg)</label>
          {renderField('tad', { 
            tipo: 'number', 
            etiqueta: 'TAD (mmHg)', 
            requerido: false,
            min: 0,
            max: 200
          })}
          {errors.tad && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.tad)}</p>
          )}
        </div>

        {/* FC */}
        <div className={styles.signoVitalCard}>
          <label className={styles.formLabel}>FC (lpm)</label>
          {renderField('fcMin', { 
            tipo: 'number', 
            etiqueta: 'FC (lpm)', 
            requerido: false,
            min: 0,
            max: 300
          })}
          {errors.fcMin && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.fcMin)}</p>
          )}
        </div>

        {/* FR */}
        <div className={styles.signoVitalCard}>
          <label className={styles.formLabel}>FR (rpm)</label>
          {renderField('frMin', { 
            tipo: 'number', 
            etiqueta: 'FR (rpm)', 
            requerido: false,
            min: 0,
            max: 100
          })}
          {errors.frMin && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.frMin)}</p>
          )}
        </div>

        {/* Saturación */}
        <div className={styles.signoVitalCard}>
          <label className={styles.formLabel}>Saturación (%)</label>
          {renderField('saturacion', { 
            tipo: 'number', 
            etiqueta: 'Saturación (%)', 
            requerido: false,
            min: 0,
            max: 100
          })}
          {errors.saturacion && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.saturacion)}</p>
          )}
        </div>

        {/* Temperatura */}
        <div className={styles.signoVitalCard}>
          <label className={styles.formLabel}>Temperatura (°C)</label>
          {renderField('temperatura', { 
            tipo: 'number', 
            etiqueta: 'Temperatura (°C)', 
            requerido: false,
            min: 30,
            max: 45,
            step: 0.1
          })}
          {errors.temperatura && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.temperatura)}</p>
          )}
        </div>
      </div>

      {/* Antropometría */}
      <h4 className={styles.subsectionTitle}>Antropometría</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Peso */}
        <div>
          <label className={styles.formLabel}>Peso (kg)</label>
          {renderField('pesoKg', { 
            tipo: 'number', 
            etiqueta: 'Peso (kg)', 
            requerido: false,
            min: 0,
            max: 500,
            step: 0.1
          })}
          {errors.pesoKg && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.pesoKg)}</p>
          )}
        </div>

        {/* Talla */}
        <div>
          <label className={styles.formLabel}>Talla (cm)</label>
          {renderField('tallaCm', { 
            tipo: 'number', 
            etiqueta: 'Talla (cm)', 
            requerido: false,
            min: 0,
            max: 300,
            step: 0.1
          })}
          {errors.tallaCm && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.tallaCm)}</p>
          )}
        </div>

        {/* IMC */}
        <div className={styles.imcCard}>
          <label className={styles.formLabel}>IMC</label>
          <div className="text-center">
            <div className={styles.calculadoValue}>
              {imc > 0 ? imc.toFixed(1) : '--'}
            </div>
            {imc > 0 && (
              <div className="text-sm text-gray-600 mt-1">
                {getIMCClasificacion(imc)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Otros parámetros antropométricos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Percentil Peso/Talla */}
        <div>
          <label className={styles.formLabel}>Percentil Peso/Talla</label>
          {renderField('percentilPesoTalla', { 
            tipo: 'text', 
            etiqueta: 'Percentil Peso/Talla', 
            requerido: false,
            max_length: 50
          })}
          {errors.percentilPesoTalla && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.percentilPesoTalla)}</p>
          )}
        </div>

        {/* Perímetro Cefálico */}
        <div>
          <label className={styles.formLabel}>Perímetro Cefálico (cm)</label>
          {renderField('perimetroCefalico', { 
            tipo: 'number', 
            etiqueta: 'Perímetro Cefálico (cm)', 
            requerido: false,
            min: 0,
            max: 100,
            step: 0.1
          })}
          {errors.perimetroCefalico && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.perimetroCefalico)}</p>
          )}
        </div>
      </div>
        </>
      )}

      {/* Inspección General */}
      <div className="mb-6">
        <label className={styles.formLabel}>Inspección General</label>
        {renderField('inspeccionGeneral', { 
          tipo: 'textarea', 
          etiqueta: 'Inspección General', 
          requerido: false,
          max_length: 1000
        })}
        {errors.inspeccionGeneral && (
          <p className={styles.errorMessage}>{getErrorMessage(errors.inspeccionGeneral)}</p>
        )}
      </div>

      {/* Examen Médico por Sistemas - Solo si acompañado por profesional de la salud */}
      {esAcompanadoConProfesional(acompanamiento) && (
        <>
      <h4 className={styles.subsectionTitle}>Examen Médico por Sistemas</h4>
      <div className="space-y-4">
        {/* Cabeza y Cuello */}
        <div>
          <label className={styles.formLabel}>Cabeza y Cuello</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className={styles.formLabel}>¿Presenta alteraciones?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.cabezaYCuelloSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.cabezaYCuelloSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            {watch('examenMedico.cabezaYCuelloSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>Observaciones</label>
                <textarea
                  {...register('examenMedico.cabezaYCuello', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa las alteraciones encontradas"
                  className={styles.formInput}
                />
          {errors['examenMedico.cabezaYCuello'] && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
          )}
          </div>
        </div>

        {/* Tórax y Cardiovascular */}
        <div>
          <label className={styles.formLabel}>Tórax y Cardiovascular</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className={styles.formLabel}>¿Presenta alteraciones?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.toraxCardioVascularSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.toraxCardioVascularSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            {watch('examenMedico.toraxCardioVascularSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>Observaciones</label>
                <textarea
                  {...register('examenMedico.toraxCardioVascular', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa las alteraciones encontradas"
                  className={styles.formInput}
                />
          {errors['examenMedico.toraxCardioVascular'] && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
          )}
          </div>
        </div>

        {/* Abdomen */}
        <div>
          <label className={styles.formLabel}>Abdomen</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className={styles.formLabel}>¿Presenta alteraciones?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.abdomenSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.abdomenSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            {watch('examenMedico.abdomenSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>Observaciones</label>
                <textarea
                  {...register('examenMedico.abdomen', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa las alteraciones encontradas"
                  className={styles.formInput}
                />
          {errors['examenMedico.abdomen'] && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
          )}
          </div>
        </div>

        {/* Genitales */}
        <div>
          <label className={styles.formLabel}>Genitales</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className={styles.formLabel}>¿Presenta alteraciones?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.genitalesSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.genitalesSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            {watch('examenMedico.genitalesSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>Observaciones</label>
                <textarea
                  {...register('examenMedico.genitales', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa las alteraciones encontradas"
                  className={styles.formInput}
                />
          {errors['examenMedico.genitales'] && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
          )}
          </div>
        </div>

        {/* Extremidades */}
        <div>
          <label className={styles.formLabel}>Extremidades</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className={styles.formLabel}>¿Presenta alteraciones?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.extremidadesSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.extremidadesSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            {watch('examenMedico.extremidadesSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>Observaciones</label>
                <textarea
                  {...register('examenMedico.extremidades', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa las alteraciones encontradas"
                  className={styles.formInput}
                />
          {errors['examenMedico.extremidades'] && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
          )}
          </div>
        </div>

        {/* Piel y Faneras */}
        <div>
          <label className={styles.formLabel}>Piel y Faneras</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className={styles.formLabel}>¿Presenta alteraciones?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.pielFanerasSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.pielFanerasSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            {watch('examenMedico.pielFanerasSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>Observaciones</label>
                <textarea
                  {...register('examenMedico.pielFaneras', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa las alteraciones encontradas"
                  className={styles.formInput}
                />
          {errors['examenMedico.pielFaneras'] && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
          )}
          </div>
        </div>

        {/* Neurológico */}
        <div>
          <label className={styles.formLabel}>Neurológico</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className={styles.formLabel}>¿Presenta alteraciones?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.neurologicoSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.neurologicoSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            {watch('examenMedico.neurologicoSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>Observaciones</label>
                <textarea
                  {...register('examenMedico.neurologico', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa las alteraciones encontradas"
                  className={styles.formInput}
                />
          {errors['examenMedico.neurologico'] && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
          )}
          </div>
        </div>

        {/* Examen Mental */}
        <div>
          <label className={styles.formLabel}>Examen Mental</label>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className={styles.formLabel}>¿Presenta alteraciones?</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.examenMentalSeleccion')}
                    type="radio"
                    value="si"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register('examenMedico.examenMentalSeleccion')}
                    type="radio"
                    value="no"
                    defaultChecked
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            {watch('examenMedico.examenMentalSeleccion') === 'si' && (
              <div>
                <label className={styles.formLabel}>Observaciones</label>
                <textarea
                  {...register('examenMedico.examenMental', { required: true, maxLength: 1000 })}
                  rows={4}
                  maxLength={1000}
                  placeholder="Describa las alteraciones encontradas"
                  className={styles.formInput}
                />
          {errors['examenMedico.examenMental'] && (
                  <p className={styles.errorMessage}>Las observaciones son requeridas cuando se selecciona "Sí"</p>
                )}
              </div>
          )}
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default SeccionExamenFisico;
