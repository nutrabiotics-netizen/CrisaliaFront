import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistoriaClinica } from '../../../context/HistoriaClinicaContext';
import { useAlert } from '../../../context/AlertContext';
// Los servicios se pueden importar cuando se necesiten
// import { PatientService, type Patient } from '../../../services/patientService';
// import { historiaClinicaService, type HistoriaClinica } from '../../../services/historiaClinicaService';

// Tipos temporales hasta que se implementen los servicios
type Patient = any;
type HistoriaClinica = any;
import moment from 'moment';

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
  grid2Cols: "grid grid-cols-1 md:grid-cols-2 gap-4",
  selectContainer: "relative",
  selectInput: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150",
  selectOptions: "absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto",
  selectOption: "px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0",
  selectOptionSelected: "px-3 py-2 bg-indigo-50 text-indigo-700 cursor-pointer border-b border-gray-100 last:border-b-0",
  loadingSpinner: "animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"
};

interface SeccionInformacionGeneralProps {
  onDataChange: (data: any) => void;
  initialData?: any;
  citaData?: any;
}

const SeccionInformacionGeneral: React.FC<SeccionInformacionGeneralProps> = ({ 
  onDataChange, 
  initialData = {},
  citaData
}) => {
  // Usar contexto global para persistencia
  const { formData, updateFormData, setPacienteSeleccionado: setGlobalPacienteSeleccionado } = useHistoriaClinica();
  const { showAlert } = useAlert();
  
  // Combinar datos iniciales con datos del contexto
  const combinedInitialData = { ...initialData, ...formData };
  
  const { register, watch, setValue, formState: { errors }, getValues } = useForm({
    defaultValues: combinedInitialData
  });

  // Estados para pacientes
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [isLoadingPacientes, setIsLoadingPacientes] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Patient | null>(null);
  const [showPacientesDropdown, setShowPacientesDropdown] = useState(false);
  const [busquedaPaciente, setBusquedaPaciente] = useState('');
  const isUpdatingFromContext = useRef(false);

  // Estados para historias previas
  const [historiasPrevias, setHistoriasPrevias] = useState<HistoriaClinica[]>([]);
  const [isLoadingHistorias, setIsLoadingHistorias] = useState(false);
  const [showHistoriasPrevias, setShowHistoriasPrevias] = useState(false);

  // Efecto para sincronizar cambios del contexto con el formulario (optimizado)
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      isUpdatingFromContext.current = true;
      
      // Actualizar todos los campos del formulario con los datos del contexto
      Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined && formData[key] !== null && formData[key] !== '') {
          setValue(key, formData[key], { shouldValidate: false, shouldDirty: false });
        }
      });
      
      // Sincronizar el paciente seleccionado si existe en el contexto
      if (formData.pacienteId && formData.pacienteNombre) {
        const pacienteExistente = pacientes.find(p => p._id === formData.pacienteId);
        if (pacienteExistente) {
          setPacienteSeleccionado(pacienteExistente);
          setBusquedaPaciente(`${pacienteExistente.firstName} ${pacienteExistente.lastName} - ${pacienteExistente.idType}: ${pacienteExistente.idNumber}`);
        }
      }
      
      // Resetear el flag después de un pequeño delay
      setTimeout(() => {
        isUpdatingFromContext.current = false;
      }, 100);
    }
  }, [formData.pacienteId, formData.pacienteNombre]); // Solo sincronizar cuando cambien datos específicos

  // Efecto para manejar cambios del formulario (solo cuando NO viene del contexto)
  useEffect(() => {
    const subscription = watch((value) => {
      // Solo procesar si no estamos actualizando desde el contexto
      if (!isUpdatingFromContext.current && value && Object.keys(value).length > 0) {
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

  // Efecto para búsqueda dinámica de pacientes con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      buscarPacientes(busquedaPaciente);
    }, 300); // 300ms de delay

    return () => clearTimeout(timeoutId);
  }, [busquedaPaciente]);

  // Efecto para sincronizar paciente seleccionado cuando se cargan los pacientes
  useEffect(() => {
    if (pacientes.length > 0 && formData.pacienteId && !pacienteSeleccionado) {
      const pacienteExistente = pacientes.find(p => p._id === formData.pacienteId);
      if (pacienteExistente) {
        setPacienteSeleccionado(pacienteExistente);
        setBusquedaPaciente(`${pacienteExistente.firstName} ${pacienteExistente.lastName} - ${pacienteExistente.idType}: ${pacienteExistente.idNumber}`);
      }
    }
  }, [pacientes, formData.pacienteId, pacienteSeleccionado]);

  // Efecto para establecer fecha y hora actuales
  useEffect(() => {
    const now = moment();
    setValue('fechaRegistro', now.format('YYYY-MM-DD'));
    setValue('horaRegistro', now.format('HH:mm'));
  }, [setValue]);

  // Efecto para seleccionar automáticamente el paciente de la cita
  useEffect(() => {
    if (citaData && citaData.pacienteId && !pacienteSeleccionado) {
      // Obtener datos del paciente desde citaData
      // El backend puede devolver pacienteId como objeto populado o como string
      let pacienteIdStr = '';
      let pacienteNombre = '';
      let pacienteApellido = '';
      let pacienteEmail = '';
      let pacienteTelefono = '';
      
      if (typeof citaData.pacienteId === 'object' && citaData.pacienteId !== null) {
        // Si está populado como objeto
        pacienteIdStr = (citaData.pacienteId as any)._id?.toString() || '';
        pacienteNombre = (citaData.pacienteId as any).nombre || '';
        pacienteApellido = (citaData.pacienteId as any).apellido || '';
        pacienteEmail = (citaData.pacienteId as any).email || '';
        pacienteTelefono = (citaData.pacienteId as any).telefono || '';
      } else {
        // Si es solo un ID string, usar los datos del objeto de retorno
        pacienteIdStr = citaData.pacienteId.toString();
        pacienteNombre = citaData.pacienteNombre || '';
        pacienteApellido = citaData.pacienteApellido || '';
        pacienteEmail = citaData.paciente?.email || '';
        pacienteTelefono = citaData.paciente?.telefono || '';
      }
      
      // Crear objeto paciente desde los datos de la cita
      const pacienteDesdeCita: Patient = {
        _id: pacienteIdStr,
        firstName: pacienteNombre,
        lastName: pacienteApellido,
        idType: citaData.paciente?.tipoDocumento || 'CC',
        idNumber: citaData.paciente?.numeroDocumento || '',
        phone: pacienteTelefono,
        email: pacienteEmail,
        birthDate: citaData.paciente?.fechaNacimiento || '',
        gender: citaData.paciente?.genero || ''
      };
      
      // Seleccionar el paciente automáticamente
      seleccionarPaciente(pacienteDesdeCita);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citaData?.pacienteId, pacienteSeleccionado]);


  // Efecto para cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.select-container')) {
        setShowPacientesDropdown(false);
      }
    };

    if (showPacientesDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPacientesDropdown]);

  // Función para búsqueda dinámica de pacientes
  const buscarPacientes = async (termino: string) => {
    if (termino.length < 2) {
      setPacientes([]);
      setShowPacientesDropdown(false);
      return;
    }

    try {
      setIsLoadingPacientes(true);
      setShowPacientesDropdown(true);
      // TODO: Implementar servicio de pacientes
      // Por ahora usar datos vacíos
      // const response = await PatientService.getPatients({
      //   search: termino,
      //   limit: 20,
      //   visible: true
      // });
      const response: any = { success: true, data: [] };
      
      if (response.success && response.data) {
        setPacientes(response.data);
      } else {
        setPacientes([]);
      }
    } catch (error) {
      console.error('Error buscando pacientes:', error);
      setPacientes([]);
    } finally {
      setIsLoadingPacientes(false);
    }
  };

  // Función para cargar historias previas del paciente
  const cargarHistoriasPrevias = async (pacienteId: string) => {
    setIsLoadingHistorias(true);
    try {
      // TODO: Implementar servicio de historias clínicas por paciente
      // const response = await historiaClinicaService.getHistoriasClinicasByPaciente(pacienteId);
      const response: any = { historiasClinicas: [] };
      if (response.success && response.historiasClinicas) {
        setHistoriasPrevias(response.historiasClinicas);
      } else {
        setHistoriasPrevias([]);
      }
    } catch (error) {
      console.error('Error cargando historias previas:', error);
      setHistoriasPrevias([]);
    } finally {
      setIsLoadingHistorias(false);
    }
  };

  // Función para mostrar/ocultar historias previas
  const toggleHistoriasPrevias = async () => {
    if (!pacienteSeleccionado) {
      showAlert({
        type: 'warning',
        title: 'Atención',
        message: 'Por favor selecciona un paciente primero'
      });
      return;
    }

    if (!showHistoriasPrevias) {
      await cargarHistoriasPrevias(pacienteSeleccionado._id);
    }
    setShowHistoriasPrevias(!showHistoriasPrevias);
  };

  // Función para convertir antecedentes al formato del formulario
  const convertirAntecedentesParaFormulario = (antecedentes: any[]) => {
    const antecedentesFormulario: any = {};
    
    // Mapeo de tipos de antecedentes a las claves del formulario
    const mapeoTipos = {
      'Patológicos': 'patologicos',
      'Farmacológicos': 'farmacologicos', 
      'Hospitalarios': 'hospitalarios',
      'Transfusionales': 'transfusionales',
      'Quirúrgicos': 'quirurgicos',
      'Alérgicos': 'alergicos',
      'Toxicológicos': 'toxicologicos'
    };

    // Inicializar todos los campos como 'no'
    Object.values(mapeoTipos).forEach(tipo => {
      antecedentesFormulario[`${tipo}Seleccion`] = 'no';
      antecedentesFormulario[`${tipo}Observaciones`] = '';
    });

    // Procesar cada antecedente
    antecedentes.forEach(antecedente => {
      const tipoFormulario = mapeoTipos[antecedente.tipo as keyof typeof mapeoTipos];
      if (tipoFormulario && antecedente.personalCheck === 'si') {
        antecedentesFormulario[`${tipoFormulario}Seleccion`] = 'si';
        antecedentesFormulario[`${tipoFormulario}Observaciones`] = antecedente.personalDescripcion || '';
      }
    });

    return antecedentesFormulario;
  };

  // Función para importar una historia clínica
  const importarHistoriaClinica = (historia: HistoriaClinica) => {
    try {
      // Convertir género a la capitalización correcta para el formulario
      const generoFormateado = historia.paciente?.genero ? 
        historia.paciente.genero.charAt(0).toUpperCase() + historia.paciente.genero.slice(1).toLowerCase() : '';

      // Importar datos del paciente
      if (historia.paciente) {
        setValue('tipoIdentificacion', historia.paciente.idType || '');
        setValue('numeroIdentificacion', historia.paciente.idNumber || '');
        setValue('primerNombre', historia.paciente.primerNombre || '');
        setValue('segundoNombre', historia.paciente.segundoNombre || '');
        setValue('primerApellido', historia.paciente.primerApellido || '');
        setValue('segundoApellido', historia.paciente.segundoApellido || '');
        setValue('fechaNacimiento', historia.paciente.fechaNacimiento || '');
        setValue('genero', generoFormateado);
        setValue('gender', generoFormateado);
        setValue('grupoSanguineo', historia.paciente.grupoSanguineo || '');
        setValue('rh', historia.paciente.rh || '');
        setValue('estadoCivil', historia.paciente.estadoCivil || '');
        setValue('escolaridad', historia.paciente.escolaridad || '');
        setValue('ocupacion', historia.paciente.ocupacion || '');
        setValue('zonaUbicacion', historia.paciente.zonaUbicacion || '');
        setValue('direccion', historia.paciente.direccion || '');
        setValue('barrio', historia.paciente.barrio || '');
        setValue('departamento', historia.paciente.departamento || '');
        setValue('municipio', historia.paciente.municipio || '');
        setValue('email', historia.paciente.email || '');
        setValue('telefono1', historia.paciente.telefono || '');
        setValue('condicionDesplazamiento', historia.paciente.condicionDesplazamiento || '');
        setValue('grupoEtnico', historia.paciente.grupoEtnico || '');
        setValue('paisNacimiento', historia.paciente.paisNacimiento || '');
        setValue('paisResidencia', historia.paciente.paisResidencia || '');
        setValue('tipoDeAfiliado', historia.paciente.tipoDeAfiliado || '');
        setValue('aseguradora', historia.paciente.aseguradora || '');
      }

      // Limpiar antecedentes removiendo _id de MongoDB
      const antecedentesLimpios = (historia.antecedentes || []).map(antecedente => ({
        tipo: antecedente.tipo || '',
        personalCheck: antecedente.personalCheck || 'no',
        personalDescripcion: antecedente.personalDescripcion || ''
      }));

      // Convertir antecedentes al formato que espera el formulario
      const antecedentesFormulario = convertirAntecedentesParaFormulario(antecedentesLimpios);

      // Limpiar sistemas removiendo _id de MongoDB
      const sistemasLimpios = (historia.sistemas || []).map(sistema => ({
        sistema: sistema.sistema || '',
        seleccion: sistema.seleccion || 'no',
        observaciones: sistema.observaciones || ''
      }));

      // Limpiar diagnósticos removiendo _id de MongoDB
      const diagnosticosLimpios = (historia.diagnosticos || []).map(diagnostico => ({
        codigo: diagnostico.codigo || '',
        nombre: diagnostico.nombre || '',
        tipo: diagnostico.tipo || '',
        relacionado: diagnostico.relacionado || ''
      }));

      // Limpiar ginecoobstétricos removiendo _id de MongoDB
      const ginecoobstetricosLimpios = (historia.ginecoobstetricos || []).map(gineco => ({
        g: gineco.g || '',
        p: gineco.p || '',
        a: gineco.a || '',
        c: gineco.c || '',
        v: gineco.v || '',
        m: gineco.m || '',
        fur: gineco.fur || '',
        fup: gineco.fup || '',
        fpp: gineco.fpp || ''
      }));

      // Importar datos de la historia clínica
      setValue('tipoActividad', historia.tipoActividad || '');
      setValue('acompanamiento', historia.acompanamientoEnConsulta || '');
      setValue('acompanamientoEnConsulta', historia.acompanamientoEnConsulta || '');
      setValue('motivoConsulta', historia.motivoConsulta || '');
      setValue('motivoAtencion', historia.motivoAtencion || '');
      setValue('pagador', historia.pagador || '');
      setValue('enfermedadActual', historia.enfermedadActual || '');
      setValue('resultadosParaclinicos', historia.resultadosParaclinicos || '');
      setValue('servicio', historia.servicio || '');
      setValue('antecedentes', antecedentesLimpios);
      setValue('familiares', historia.familiares || '');
      setValue('psicosociales', historia.psicosociales || '');
      setValue('ginecoobstetricos', ginecoobstetricosLimpios);
      setValue('planificacion', historia.planificacion || '');
      setValue('ciclos', historia.ciclos || '');
      setValue('sistemas', sistemasLimpios);

      // Establecer los antecedentes en el formato del formulario
      Object.keys(antecedentesFormulario).forEach(key => {
        setValue(key, antecedentesFormulario[key]);
      });
      setValue('estadoDeConciencia', historia.estadoDeConciencia || '');
      setValue('equiposSignos', historia.equiposSignos || '');
      setValue('signosVitales', historia.signosVitales || {});
      setValue('examenMedico', historia.examenMedico || {});
      setValue('alertas', historia.alertas || '');
      setValue('alergias', historia.alergias || '');
      setValue('diagnosticos', diagnosticosLimpios);
      setValue('analisisyplan', historia.analisisyplan || '');
      setValue('recomendaciones', historia.recomendaciones || '');

      // Actualizar el contexto con todos los datos importados
      const datosImportados = {
        // Datos del paciente
        tipoIdentificacion: historia.paciente?.idType || '',
        numeroIdentificacion: historia.paciente?.idNumber || '',
        primerNombre: historia.paciente?.primerNombre || '',
        segundoNombre: historia.paciente?.segundoNombre || '',
        primerApellido: historia.paciente?.primerApellido || '',
        segundoApellido: historia.paciente?.segundoApellido || '',
        fechaNacimiento: historia.paciente?.fechaNacimiento || '',
        genero: generoFormateado,
        gender: generoFormateado,
        grupoSanguineo: historia.paciente?.grupoSanguineo || '',
        rh: historia.paciente?.rh || '',
        estadoCivil: historia.paciente?.estadoCivil || '',
        escolaridad: historia.paciente?.escolaridad || '',
        ocupacion: historia.paciente?.ocupacion || '',
        zonaUbicacion: historia.paciente?.zonaUbicacion || '',
        direccion: historia.paciente?.direccion || '',
        barrio: historia.paciente?.barrio || '',
        departamento: historia.paciente?.departamento || '',
        municipio: historia.paciente?.municipio || '',
        email: historia.paciente?.email || '',
        telefono1: historia.paciente?.telefono || '',
        condicionDesplazamiento: historia.paciente?.condicionDesplazamiento || '',
        grupoEtnico: historia.paciente?.grupoEtnico || '',
        paisNacimiento: historia.paciente?.paisNacimiento || '',
        paisResidencia: historia.paciente?.paisResidencia || '',
        tipoDeAfiliado: historia.paciente?.tipoDeAfiliado || '',
        aseguradora: historia.paciente?.aseguradora || '',
        
        // Datos de la historia clínica
        tipoActividad: historia.tipoActividad || '',
        acompanamiento: historia.acompanamientoEnConsulta || '',
        acompanamientoEnConsulta: historia.acompanamientoEnConsulta || '',
        motivoConsulta: historia.motivoConsulta || '',
        motivoAtencion: historia.motivoAtencion || '',
        pagador: historia.pagador || '',
        enfermedadActual: historia.enfermedadActual || '',
        resultadosParaclinicos: historia.resultadosParaclinicos || '',
        servicio: historia.servicio || '',
        antecedentes: antecedentesLimpios,
        ...antecedentesFormulario, // Incluir los antecedentes en formato de formulario
        familiares: historia.familiares || '',
        psicosociales: historia.psicosociales || '',
        ginecoobstetricos: ginecoobstetricosLimpios,
        planificacion: historia.planificacion || '',
        ciclos: historia.ciclos || '',
        sistemas: sistemasLimpios,
        estadoDeConciencia: historia.estadoDeConciencia || '',
        equiposSignos: historia.equiposSignos || '',
        signosVitales: historia.signosVitales || {},
        examenMedico: historia.examenMedico || {},
        alertas: historia.alertas || '',
        alergias: historia.alergias || '',
        diagnosticos: diagnosticosLimpios,
        analisisyplan: historia.analisisyplan || '',
        recomendaciones: historia.recomendaciones || ''
      };

      updateFormData(datosImportados);
      onDataChange(datosImportados);

      showAlert({
        type: 'success',
        title: 'Éxito',
        message: 'Historia clínica importada exitosamente'
      });
      setShowHistoriasPrevias(false);
    } catch (error) {
      console.error('Error al importar historia clínica:', error);
      showAlert({
        type: 'error',
        title: 'Error',
        message: 'Error al importar la historia clínica'
      });
    }
  };

  // Función para abrir PDF de historia clínica
  const abrirPDF = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };


  // Función para seleccionar paciente (optimizada)
  const seleccionarPaciente = (paciente: Patient) => {
    // Actualizar estados visuales inmediatamente
    setPacienteSeleccionado(paciente);
    setShowPacientesDropdown(false);
    setBusquedaPaciente(`${paciente.firstName} ${paciente.lastName} - ${paciente.idType}: ${paciente.idNumber}`);
    
    // Guardar paciente seleccionado en el contexto global
    setGlobalPacienteSeleccionado({
      _id: paciente._id,
      firstName: paciente.firstName,
      lastName: paciente.lastName,
      phone: paciente.phone,
      email: paciente.email,
      idNumber: paciente.idNumber,
      birthDate: paciente.birthDate,
      gender: paciente.gender
    });
    
    // Usar requestAnimationFrame para optimizar el rendimiento
    requestAnimationFrame(() => {
      // Actualizar campos básicos del formulario
      setValue('pacienteId', paciente._id);
      setValue('pacienteNombre', `${paciente.firstName} ${paciente.lastName}`);
      
      // Mapear datos del paciente de forma optimizada
      const datosPaciente = {
        // Información básica
        pacienteId: paciente._id,
        pacienteNombre: `${paciente.firstName} ${paciente.lastName}`,
        
        // Datos que se mapean directamente del modelo Patient
        tipoIdentificacion: paciente.idType,
        numeroIdentificacion: paciente.idNumber,
        fechaNacimiento: paciente.birthDate ? moment(paciente.birthDate).utc().format('YYYY-MM-DD') : '',
        primerNombre: paciente.firstName,
        segundoNombre: paciente.secondName || '',
        primerApellido: paciente.lastName,
        segundoApellido: paciente.secondLastName || '',
        genero: paciente.gender ? paciente.gender.charAt(0).toUpperCase() + paciente.gender.slice(1) : '',
        sex: paciente.sex ? paciente.sex.charAt(0).toUpperCase() + paciente.sex.slice(1) : 
             paciente.gender ? paciente.gender.charAt(0).toUpperCase() + paciente.gender.slice(1) : '',
        email: paciente.email || '',
        telefono1: paciente.phone,
        direccion: paciente.address || '',
        estado: paciente.state || '',
        municipio: paciente.municipality || '',
        codigoPostal: paciente.postalCode || '',
        barrio: paciente.barrio || '',
        localidad: paciente.localidad || '',
        hospital: paciente.hospital || '',
        grupoSanguineo: paciente.grupoSanguineo || '',
        rh: paciente.rh || '',
        escolaridad: paciente.escolaridad || '',
        ocupacion: paciente.ocupacion || '',
        condicionDesplazamiento: paciente.condicionDesplazamiento || '',
        grupoEtnico: paciente.grupoEtnico || '',
        estadoCivil: (paciente as any).estadoCivil || '',
        zonaUbicacion: (paciente as any).zonaUbicacion || '',
        
        // Calcular edad automáticamente
        edadActual: paciente.birthDate ? moment().diff(moment(paciente.birthDate), 'years') : '',
        
        // Datos de seguro
        tieneSeguro: paciente.hasInsurance,
        nombreSeguro: paciente.insuranceName || '',
        numeroPoliza: paciente.policyNumber || '',
        aseguradora: paciente.aseguradora ? (typeof paciente.aseguradora === 'object' ? paciente.aseguradora.name : paciente.aseguradora) : '',
        
        // Datos de cuidador
        tieneCuidador: paciente.hasCaretaker,
        nombreCuidador: paciente.caretakerFirstName ? `${paciente.caretakerFirstName} ${paciente.caretakerLastName || ''}`.trim() : '',
        parentescoCuidador: paciente.caretakerRelationship || '',
        telefonoCuidador: paciente.caretakerPhone || '',
        emailCuidador: paciente.caretakerEmail || '',
        
        // Emergencia
        necesitaEmergencia: paciente.necesitaEmergencia,
        motivoEmergencia: paciente.motivoEmergencia || ''
      };
      
      // Actualizar contexto con todos los datos del paciente
      updateFormData(datosPaciente);
    });
  };

  // Los pacientes ya vienen filtrados del backend, no necesitamos filtrar aquí
  const pacientesFiltrados = pacientes;

  // Función helper para obtener el mensaje de error
  const getErrorMessage = (error: any) => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'Campo requerido';
  };

  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Información General</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Complete la información general de la consulta médica.
      </p>
      
      <div className="space-y-4">
        {/* Fecha y Hora de Registro */}
        <div className={styles.grid2Cols}>
          {/* Fecha de Registro */}
          <div>
            <label className={styles.formLabel}>
              Fecha de Registro
            </label>
            <input
              {...register('fechaRegistro')}
              type="date"
              className={styles.formInputReadOnly}
              readOnly
            />
          </div>

          {/* Hora de Registro */}
          <div>
            <label className={styles.formLabel}>
              Hora de Registro
            </label>
            <input
              {...register('horaRegistro')}
              type="time"
              className={styles.formInputReadOnly}
              readOnly
            />
          </div>
        </div>

        {/* Información del Paciente (automáticamente seleccionado de la cita) */}
        <div>
          <label className={styles.formLabel}>
            Paciente <span className="text-red-500">*</span>
          </label>
          {pacienteSeleccionado ? (
            <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
              <div className="font-medium text-gray-900">
                {pacienteSeleccionado.firstName} {pacienteSeleccionado.lastName}
              </div>
              {pacienteSeleccionado.idNumber && (
                <div className="text-sm text-gray-600 mt-1">
                  {pacienteSeleccionado.idType}: {pacienteSeleccionado.idNumber}
                  {pacienteSeleccionado.phone && ` • Tel: ${pacienteSeleccionado.phone}`}
                  {pacienteSeleccionado.email && ` • Email: ${pacienteSeleccionado.email}`}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-300 rounded-md p-4">
              <p className="text-yellow-800 text-sm">Cargando información del paciente...</p>
            </div>
          )}
        </div>

        {/* Información del Paciente Seleccionado */}
        {pacienteSeleccionado && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-900">Paciente Seleccionado</h4>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleHistoriasPrevias}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md text-sm transition-colors duration-200"
                >
                  {showHistoriasPrevias ? 'Ocultar Historias Previas' : 'Ver Historias Previas'}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <p><span className="font-medium">Nombre:</span> {pacienteSeleccionado.firstName} {pacienteSeleccionado.lastName}</p>
              <p><span className="font-medium">Cédula:</span> {pacienteSeleccionado.idType}: {pacienteSeleccionado.idNumber}</p>
              <p><span className="font-medium">Teléfono:</span> {pacienteSeleccionado.phone}</p>
              <p><span className="font-medium">Email:</span> {pacienteSeleccionado.email || 'No registrado'}</p>
            </div>
          </div>
        )}

        {/* Modal de Historias Previas */}
        {showHistoriasPrevias && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">Historias Clínicas Previas</h4>
            {isLoadingHistorias ? (
              <div className="flex items-center justify-center py-4">
                <div className={styles.loadingSpinner}></div>
                <span className="ml-2 text-gray-600">Cargando historias previas...</span>
              </div>
            ) : historiasPrevias.length > 0 ? (
              <div className="space-y-3">
                {historiasPrevias.map((historia) => (
                  <div key={historia._id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          Fecha: {historia.fechaRegistro ? moment(historia.fechaRegistro).format('DD/MM/YYYY') : 'Sin fecha'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Doctor: {historia.profesional?.nombre || 'Sin información'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Especialidad: {historia.profesional?.especialidad || 'Sin información'}
                        </p>
                        {historia.motivoConsulta && (
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Motivo:</span> {historia.motivoConsulta}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          type="button"
                          onClick={() => importarHistoriaClinica(historia)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200"
                        >
                          Importar
                        </button>
                        {historia.pdfUrl && (
                          <button
                            type="button"
                            onClick={() => abrirPDF(historia.pdfUrl!)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200"
                          >
                            Ver PDF
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No hay historias clínicas previas registradas para este paciente.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionInformacionGeneral;
