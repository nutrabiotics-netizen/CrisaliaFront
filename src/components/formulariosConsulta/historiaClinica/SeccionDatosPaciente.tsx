import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
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

interface SeccionDatosPacienteProps {
  onDataChange: (data: any) => void;
  initialData?: any;
  pagador?: string;
}

const SeccionDatosPaciente: React.FC<SeccionDatosPacienteProps> = ({ 
  onDataChange, 
  initialData = {},
  pagador = ''
}) => {
  // Usar contexto global para persistencia
  const { formData, updateFormData } = useHistoriaClinica();
  
  // Combinar datos iniciales con datos del contexto
  const combinedInitialData = { ...initialData, ...formData };
  
  const { register, watch, setValue, formState: { errors }, getValues } = useForm({
    defaultValues: combinedInitialData
  });
  
  const [edadActual, setEdadActual] = useState(0);
  const [maxLength, setMaxLength] = useState(10);
  const [tipoIdentificacion, setTipoIdentificacion] = useState('CC');
  const isUpdatingFromContext = useRef(false);

  // Opciones para los selects
  const tipoIdentificacionOptions = [
    { valor: "AS", texto: "Adulto sin Identificación" },
    { valor: "CC", texto: "Cédula de Ciudadanía" },
    { valor: "CD", texto: "Carnet Diplomático" },
    { valor: "CE", texto: "Cédula de Extranjería" },
    { valor: "DE", texto: "Documento extranjero" },
    { valor: "MS", texto: "Menor sin Identificación" },
    { valor: "NV", texto: "Certificado de nacido vivo" },
    { valor: "PA", texto: "Pasaporte" },
    { valor: "PE", texto: "Permiso Especial de Permanencia" },
    { valor: "PT", texto: "Permiso por Protección Temporal" },
    { valor: "RC", texto: "Registro Civil" },
    { valor: "SC", texto: "Salvoconducto" },
    { valor: "SI", texto: "Sin Identificación" },
    { valor: "TI", texto: "Tarjeta de Identidad" }
  ];

  const grupoSanguineoOptions = [
    { valor: "", texto: "Seleccione grupo sanguíneo" },
    { valor: "A", texto: "A" },
    { valor: "B", texto: "B" },
    { valor: "AB", texto: "AB" },
    { valor: "O", texto: "O" }
  ];

  const rhOptions = [
    { valor: "", texto: "Seleccione RH" },
    { valor: "Positivo", texto: "Positivo" },
    { valor: "Negativo", texto: "Negativo" }
  ];

  const generoOptions = [
    { valor: "Masculino", texto: "Masculino" },
    { valor: "Femenino", texto: "Femenino" },
    { valor: "Intersexual", texto: "Intersexual" },
    { valor: "No especificado", texto: "No especificado" }
  ];

  const sexoOptions = [
    { valor: "", texto: "Seleccione sexo" },
    { valor: "Masculino", texto: "Masculino" },
    { valor: "Femenino", texto: "Femenino" },
    { valor: "Intersexual", texto: "Intersexual" },
    { valor: "No especificado", texto: "No especificado" }
  ];

  const estadoCivilOptions = [
    { valor: "", texto: "Seleccione estado civil" },
    { valor: "Soltero", texto: "Soltero" },
    { valor: "Casado", texto: "Casado" },
    { valor: "Divorciado", texto: "Divorciado" },
    { valor: "Viudo", texto: "Viudo" },
    { valor: "Unión libre", texto: "Unión libre" },
    { valor: "Separado", texto: "Separado" },
    { valor: "Otro", texto: "Otro" }
  ];

  const zonaOptions = [
    { valor: "", texto: "Seleccione zona de ubicación" },
    { valor: "Urbana", texto: "Urbana" },
    { valor: "Rural", texto: "Rural" },
    { valor: "Semiurbana", texto: "Semiurbana" },
    { valor: "Periurbana", texto: "Periurbana" },
    { valor: "Otro", texto: "Otro" }
  ];

  const escolaridadOptions = [
    { valor: "", texto: "Seleccione nivel de escolaridad" },
    { valor: "Sin estudios", texto: "Sin estudios" },
    { valor: "Primaria incompleta", texto: "Primaria incompleta" },
    { valor: "Primaria completa", texto: "Primaria completa" },
    { valor: "Secundaria incompleta", texto: "Secundaria incompleta" },
    { valor: "Secundaria completa", texto: "Secundaria completa" },
    { valor: "Técnico/Tecnológico incompleto", texto: "Técnico/Tecnológico incompleto" },
    { valor: "Técnico/Tecnológico completo", texto: "Técnico/Tecnológico completo" },
    { valor: "Universitario incompleto", texto: "Universitario incompleto" },
    { valor: "Universitario completo", texto: "Universitario completo" },
    { valor: "Postgrado", texto: "Postgrado" },
    { valor: "Maestría", texto: "Maestría" },
    { valor: "Doctorado", texto: "Doctorado" }
  ];

  const ocupacionOptions = [
    { valor: "", texto: "Seleccione ocupación" },
    { valor: "Empleado", texto: "Empleado" },
    { valor: "Trabajador independiente", texto: "Trabajador independiente" },
    { valor: "Empresario", texto: "Empresario" },
    { valor: "Estudiante", texto: "Estudiante" },
    { valor: "Ama de casa", texto: "Ama de casa" },
    { valor: "Jubilado/Pensionado", texto: "Jubilado/Pensionado" },
    { valor: "Desempleado", texto: "Desempleado" },
    { valor: "Profesional de la salud", texto: "Profesional de la salud" },
    { valor: "Docente", texto: "Docente" },
    { valor: "Funcionario público", texto: "Funcionario público" },
    { valor: "Comerciante", texto: "Comerciante" },
    { valor: "Agricultor", texto: "Agricultor" },
    { valor: "Obrero", texto: "Obrero" },
    { valor: "Técnico", texto: "Técnico" },
    { valor: "Profesional", texto: "Profesional" },
    { valor: "Otro", texto: "Otro" }
  ];

  const condicionDesplazamientoOptions = [
    { valor: "", texto: "Seleccione una condición" },
    { valor: "No aplica", texto: "No aplica" },
    { valor: "Desplazamiento forzado", texto: "Desplazamiento forzado" },
    { valor: "Víctima de conflicto", texto: "Víctima de conflicto" },
    { valor: "Víctima de conflicto armado", texto: "Víctima de conflicto armado" },
    { valor: "Migrante internacional", texto: "Migrante internacional" },
    { valor: "Refugiado", texto: "Refugiado" },
    { valor: "Solicitante de asilo", texto: "Solicitante de asilo" },
    { valor: "Retornado", texto: "Retornado" },
    { valor: "Desplazamiento por desastre natural", texto: "Desplazamiento por desastre natural" },
    { valor: "Desplazamiento por proyecto de desarrollo", texto: "Desplazamiento por proyecto de desarrollo" },
    { valor: "Otro", texto: "Otro" }
  ];

  const grupoEtnicoOptions = [
    { valor: "", texto: "Seleccione un grupo étnico" },
    { valor: "Ninguno", texto: "Ninguno" },
    { valor: "Indígena", texto: "Indígena" },
    { valor: "ROM (Gitano)", texto: "ROM (Gitano)" },
    { valor: "Raizal", texto: "Raizal" },
    { valor: "Palenquero", texto: "Palenquero" },
    { valor: "Negro, Mulato, Afrocolombiano", texto: "Negro, Mulato, Afrocolombiano" },
    { valor: "Mestizo", texto: "Mestizo" },
    { valor: "Blanco", texto: "Blanco" },
    { valor: "Otro", texto: "Otro" }
  ];

  const tipoDeAfiliadoOptions = [
    { valor: "", texto: "Seleccione una opción" },
    { valor: "Cotizante", texto: "Cotizante" },
    { valor: "Beneficiario", texto: "Beneficiario" },
    { valor: "Adicional", texto: "Adicional" },
   
  ];

  // Calcular edad automáticamente
  const calcularEdad = useCallback((fechaNacimiento: string) => {
    if (!fechaNacimiento) return 0;
    const edad = moment().diff(moment(fechaNacimiento), 'years');
    setEdadActual(edad);
    // Usar setValue con shouldValidate: false para evitar disparar el watch
    setValue('edadActual', edad, { shouldValidate: false, shouldDirty: false });
    return edad;
  }, [setValue]);

  // Manejar cambio de tipo de identificación
  const handleTipoIdentificacionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tipo = e.target.value;
    setTipoIdentificacion(tipo);
    setValue('tipoIdentificacion', tipo);
    
    // Establecer longitud máxima según el tipo
    const longitudes = {
      'CC': 10,
      'TI': 10,
      'RC': 10,
      'CE': 10,
      'PA': 20,
      'MS': 0,
      'AS': 0
    };
    setMaxLength(longitudes[tipo as keyof typeof longitudes] || 10);
  };

  // Validación personalizada para número de identificación
  const validateNumeroIdentificacion = (value: string) => {
    if (!value) return 'Número de identificación es requerido';
    
    if (tipoIdentificacion === 'MS' || tipoIdentificacion === 'AS') {
      return true; // No validar para menores o adultos sin identificación
    }
    
    if (value.length !== maxLength) {
      return `El número debe tener ${maxLength} dígitos`;
    }
    
    if (!/^\d+$/.test(value)) {
      return 'El número debe contener solo dígitos';
    }
    
    return true;
  };

  // Validación de email
  const validateEmail = (value: string) => {
    if (!value) return true; // Email es opcional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Formato de email inválido';
  };

  // Validación de teléfono
  const validateTelefono = (value: string) => {
    if (!value) return 'Teléfono es requerido';
    const telefonoRegex = /^[0-9+\-\s()]+$/;
    return telefonoRegex.test(value) || 'Formato de teléfono inválido';
  };

  // Renderizar campo
  const renderField = (fieldName: string, fieldConfig: any) => {
    const { tipo, etiqueta, requerido, readonly, max_length, min, max, step } = fieldConfig;
    const isReadOnly = readonly || fieldName === 'edadActual' || isFieldReadonly(fieldName);
    const hasError = errors[fieldName];

    const commonProps = {
      ...register(fieldName, { 
        required: requerido ? `${etiqueta} es requerido` : false,
        maxLength: max_length ? { value: max_length, message: `Máximo ${max_length} caracteres` } : undefined,
        validate: fieldName === 'numeroIdentificacion' ? validateNumeroIdentificacion : 
                 fieldName === 'email' ? validateEmail :
                 fieldName === 'telefono1' ? validateTelefono : undefined
      }),
      className: hasError ? styles.formInputError : (isReadOnly ? styles.formInputReadOnly : styles.formInput),
      disabled: isReadOnly
    };

    switch (tipo) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            {...commonProps}
            type={tipo === 'email' ? 'email' : tipo === 'tel' ? 'tel' : 'text'}
            maxLength={max_length}
            onChange={(e) => {
              if (fieldName === 'fechaNacimiento') {
                calcularEdad(e.target.value);
              }
            }}
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
          />
        );

      case 'date':
        return (
          <input
            {...commonProps}
            type="date"
            onChange={(e) => {
              if (fieldName === 'fechaNacimiento') {
                calcularEdad(e.target.value);
              }
            }}
          />
        );

      case 'select':
        let opciones: any[] = [];
        switch (fieldName) {
          case 'tipoIdentificacion':
            opciones = tipoIdentificacionOptions;
            break;
          case 'grupoSanguineo':
            opciones = grupoSanguineoOptions;
            break;
          case 'rh':
            opciones = rhOptions;
            break;
          case 'genero':
            opciones = generoOptions;
            break;
          case 'sex':
            opciones = sexoOptions;
            break;
          case 'estadoCivil':
            opciones = estadoCivilOptions;
            break;
          case 'zonaUbicacion':
            opciones = zonaOptions;
            break;
          case 'escolaridad':
            opciones = escolaridadOptions;
            break;
          case 'ocupacion':
            opciones = ocupacionOptions;
            break;
          case 'condicionDesplazamiento':
            opciones = condicionDesplazamientoOptions;
            break;
          case 'grupoEtnico':
            opciones = grupoEtnicoOptions;
            break;
          case 'tipoDeAfiliado':
            opciones = tipoDeAfiliadoOptions;
            break;
          default:
            opciones = [];
        }

        return (
          <select 
            {...commonProps}
            onChange={(e) => {
              if (fieldName === 'tipoIdentificacion') {
                handleTipoIdentificacionChange(e);
              }
            }}
          >
            {(opciones as any[]).map((opcion: any, index: number) => (
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


  // Efecto para sincronizar cambios del contexto con el formulario
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      isUpdatingFromContext.current = true;
      
      // Actualizar todos los campos del formulario con los datos del contexto
      Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined && formData[key] !== null) {
          setValue(key, formData[key], { shouldValidate: false, shouldDirty: false });
        }
      });
      
      // Calcular edad si hay fecha de nacimiento
      if (formData.fechaNacimiento) {
        calcularEdad(formData.fechaNacimiento);
      }
      
      // Resetear el flag después de un pequeño delay
      setTimeout(() => {
        isUpdatingFromContext.current = false;
      }, 200);
    }
  }, [formData, setValue]);

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

  // Efecto para manejar cambios del formulario (solo cuando NO viene del contexto)
  useEffect(() => {
    const subscription = watch((value) => {
      // Solo procesar si no estamos actualizando desde el contexto
      if (!isUpdatingFromContext.current && value && Object.keys(value).length > 0) {
        // Calcular edad si cambió la fecha de nacimiento
        if (value.fechaNacimiento) {
          calcularEdad(value.fechaNacimiento);
        }
        
        // Filtrar valores vacíos para evitar sobrescribir datos válidos
        // Incluir tipoDeAfiliado incluso si está vacío para mantener la selección
        const filteredValue = Object.fromEntries(
          Object.entries(value).filter(([key, val]) => 
            val !== undefined && val !== null && (val !== '' || key === 'tipoDeAfiliado')
          )
        );
        
        if (Object.keys(filteredValue).length > 0) {
          updateFormData(filteredValue);
          onDataChange(filteredValue);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData, onDataChange, calcularEdad]);

  // Efecto para sincronizar datos al montar el componente (solo una vez)
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
  }, []); // Solo se ejecuta al montar

  // Función helper para obtener el mensaje de error
  const getErrorMessage = (error: any) => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'Campo requerido';
  };

  // Función para determinar si un campo debe ser readonly
  const isFieldReadonly = (fieldName: string): boolean => {
    // Campos que se llenan automáticamente del modelo Patient
    const camposDelPaciente = [
      'tipoIdentificacion',
      'numeroIdentificacion', 
      'fechaNacimiento',
      'primerNombre',
      'segundoNombre',
      'primerApellido',
      'segundoApellido',
      'genero',
      'sex',
      'email',
      'telefono1',
      'direccion',
      'estado',
      'municipio',
      'codigoPostal',
      'barrio',
      'localidad',
      'hospital',
      'grupoSanguineo',
      'rh',
      'escolaridad',
      'ocupacion',
      'condicionDesplazamiento',
      'grupoEtnico',
      'estadoCivil',
      'zonaUbicacion',
      'edadActual',
      'tieneSeguro',
      'nombreSeguro',
      'numeroPoliza',
      'aseguradora',
      'tieneCuidador',
      'nombreCuidador',
      'parentescoCuidador',
      'telefonoCuidador',
      'emailCuidador',
      'necesitaEmergencia',
      'motivoEmergencia'
    ];
    
    // Si el campo está en la lista y tiene datos, es readonly
    if (camposDelPaciente.includes(fieldName)) {
      const valor = formData[fieldName];
      return valor !== undefined && valor !== null && valor !== '';
    }
    
    return false;
  };

  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Datos del Paciente</h3>
      {formData.pacienteId && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-blue-800 text-sm">
            <span className="font-semibold">ℹ️ Información del paciente:</span> Los campos marcados con fondo gris se han llenado automáticamente desde la base de datos del paciente. 
            Los campos en blanco están disponibles para completar manualmente.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tipo de Identificación */}
        <div>
          <label className={styles.formLabel}>
            Tipo de Identificación <span className="text-red-500">*</span>
          </label>
          {renderField('tipoIdentificacion', { tipo: 'select', etiqueta: 'Tipo de Identificación', requerido: true })}
          {errors.tipoIdentificacion && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.tipoIdentificacion)}</p>
          )}
        </div>

        {/* Número de Identificación */}
        <div>
          <label className={styles.formLabel}>
            Número de Identificación <span className="text-red-500">*</span>
          </label>
          {renderField('numeroIdentificacion', { tipo: 'text', etiqueta: 'Número de Identificación', requerido: true, max_length: maxLength })}
          {errors.numeroIdentificacion && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.numeroIdentificacion)}</p>
          )}
        </div>

        {/* Fecha de Nacimiento */}
        <div>
          <label className={styles.formLabel}>
            Fecha de Nacimiento <span className="text-red-500">*</span>
          </label>
          {renderField('fechaNacimiento', { tipo: 'date', etiqueta: 'Fecha de Nacimiento', requerido: true })}
          {errors.fechaNacimiento && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.fechaNacimiento)}</p>
          )}
        </div>

        {/* Edad Actual */}
        <div>
          <label className={styles.formLabel}>Edad Actual</label>
          <input
            type="number"
            value={edadActual}
            className={styles.formInputReadOnly}
            readOnly
          />
        </div>

        {/* Grupo Sanguíneo */}
        <div>
          <label className={styles.formLabel}>Grupo Sanguíneo</label>
          {renderField('grupoSanguineo', { tipo: 'select', etiqueta: 'Grupo Sanguíneo', requerido: false })}
          {errors.grupoSanguineo && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.grupoSanguineo)}</p>
          )}
        </div>

        {/* RH */}
        <div>
          <label className={styles.formLabel}>RH</label>
          {renderField('rh', { tipo: 'select', etiqueta: 'RH', requerido: false })}
          {errors.rh && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.rh)}</p>
          )}
        </div>

        {/* Primer Nombre */}
        <div>
          <label className={styles.formLabel}>
            Primer Nombre <span className="text-red-500">*</span>
          </label>
          {renderField('primerNombre', { tipo: 'text', etiqueta: 'Primer Nombre', requerido: true, max_length: 50 })}
          {errors.primerNombre && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.primerNombre)}</p>
          )}
        </div>

        {/* Segundo Nombre */}
        <div>
          <label className={styles.formLabel}>Segundo Nombre</label>
          {renderField('segundoNombre', { tipo: 'text', etiqueta: 'Segundo Nombre', requerido: false, max_length: 50 })}
          {errors.segundoNombre && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.segundoNombre)}</p>
          )}
        </div>

        {/* Primer Apellido */}
        <div>
          <label className={styles.formLabel}>
            Primer Apellido <span className="text-red-500">*</span>
          </label>
          {renderField('primerApellido', { tipo: 'text', etiqueta: 'Primer Apellido', requerido: true, max_length: 50 })}
          {errors.primerApellido && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.primerApellido)}</p>
          )}
        </div>

        {/* Segundo Apellido */}
        <div>
          <label className={styles.formLabel}>Segundo Apellido</label>
          {renderField('segundoApellido', { tipo: 'text', etiqueta: 'Segundo Apellido', requerido: false, max_length: 50 })}
          {errors.segundoApellido && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.segundoApellido)}</p>
          )}
        </div>

        {/* Género */}
        <div>
          <label className={styles.formLabel}>
            Género <span className="text-red-500">*</span>
          </label>
          {renderField('genero', { tipo: 'select', etiqueta: 'Género', requerido: true })}
          {errors.genero && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.genero)}</p>
          )}
        </div>

        {/* Sexo */}
        <div>
          <label className={styles.formLabel}>
            Sexo <span className="text-red-500">*</span>
          </label>
          {renderField('sex', { tipo: 'select', etiqueta: 'Sexo', requerido: true })}
          {errors.sex && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.sex)}</p>
          )}
        </div>

        {/* Estado Civil */}
        <div>
          <label className={styles.formLabel}>
            Estado Civil <span className="text-red-500">*</span>
          </label>
          {renderField('estadoCivil', { tipo: 'select', etiqueta: 'Estado Civil', requerido: true })}
          {errors.estadoCivil && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.estadoCivil)}</p>
          )}
        </div>

        {/* Zona de Ubicación */}
        <div>
          <label className={styles.formLabel}>
            Zona de Ubicación <span className="text-red-500">*</span>
          </label>
          {renderField('zonaUbicacion', { tipo: 'select', etiqueta: 'Zona de Ubicación', requerido: true })}
          {errors.zonaUbicacion && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.zonaUbicacion)}</p>
          )}
        </div>

        {/* Dirección */}
        <div className="md:col-span-2">
          <label className={styles.formLabel}>
            Dirección <span className="text-red-500">*</span>
          </label>
          {renderField('direccion', { tipo: 'text', etiqueta: 'Dirección', requerido: true, max_length: 200 })}
          {errors.direccion && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.direccion)}</p>
          )}
        </div>

        {/* Barrio */}
        <div>
          <label className={styles.formLabel}>Barrio</label>
          {renderField('barrio', { tipo: 'text', etiqueta: 'Barrio', requerido: false, max_length: 100 })}
          {errors.barrio && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.barrio)}</p>
          )}
        </div>

        {/* Localidad */}
        <div>
          <label className={styles.formLabel}>Localidad</label>
          {renderField('localidad', { tipo: 'text', etiqueta: 'Localidad', requerido: false, max_length: 100 })}
          {errors.localidad && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.localidad)}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className={styles.formLabel}>Correo Electrónico</label>
          {renderField('email', { tipo: 'email', etiqueta: 'Correo Electrónico', requerido: false, max_length: 100 })}
          {errors.email && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.email)}</p>
          )}
        </div>

        {/* Teléfono Principal */}
        <div>
          <label className={styles.formLabel}>
            Teléfono Principal <span className="text-red-500">*</span>
          </label>
          {renderField('telefono1', { tipo: 'tel', etiqueta: 'Teléfono Principal', requerido: true, max_length: 15 })}
          {errors.telefono1 && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.telefono1)}</p>
          )}
        </div>


        {/* Escolaridad */}
        <div>
          <label className={styles.formLabel}>
            Nivel de Escolaridad <span className="text-red-500">*</span>
          </label>
          {renderField('escolaridad', { tipo: 'select', etiqueta: 'Nivel de Escolaridad', requerido: true })}
          {errors.escolaridad && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.escolaridad)}</p>
          )}
        </div>

        {/* Ocupación */}
        <div>
          <label className={styles.formLabel}>
            Ocupación <span className="text-red-500">*</span>
          </label>
          {renderField('ocupacion', { tipo: 'select', etiqueta: 'Ocupación', requerido: true })}
          {errors.ocupacion && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.ocupacion)}</p>
          )}
        </div>

        {/* Condición de Desplazamiento */}
        <div>
          <label className={styles.formLabel}>
            Condición de Desplazamiento <span className="text-red-500">*</span>
          </label>
          {renderField('condicionDesplazamiento', { tipo: 'select', etiqueta: 'Condición de Desplazamiento', requerido: true })}
          {errors.condicionDesplazamiento && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.condicionDesplazamiento)}</p>
          )}
        </div>

        {/* Grupo Étnico */}
        <div>
          <label className={styles.formLabel}>
            Grupo Étnico <span className="text-red-500">*</span>
          </label>
          {renderField('grupoEtnico', { tipo: 'select', etiqueta: 'Grupo Étnico', requerido: true })}
          {errors.grupoEtnico && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.grupoEtnico)}</p>
          )}
        </div>

        {/* Aseguradora */}
        <div>
          <label className={styles.formLabel}>Aseguradora</label>
          {renderField('aseguradora', { tipo: 'text', etiqueta: 'Aseguradora', requerido: false, max_length: 50 })}
          {errors.aseguradora && (
            <p className={styles.errorMessage}>{getErrorMessage(errors.aseguradora)}</p>
          )}
        </div>


        {/* Tipo de Afiliado - Solo se muestra cuando pagador es Convenio */}
        {pagador === 'Convenio' && (
          <div>
            <label className={styles.formLabel}>Tipo de Afiliado</label>
            {renderField('tipoDeAfiliado', { tipo: 'select', etiqueta: 'Tipo de Afiliado', requerido: false })}
            {errors.tipoDeAfiliado && (
              <p className={styles.errorMessage}>{getErrorMessage(errors.tipoDeAfiliado)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionDatosPaciente;
