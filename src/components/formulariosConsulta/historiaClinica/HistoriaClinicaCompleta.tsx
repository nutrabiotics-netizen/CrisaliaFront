import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';

// Importar componentes de secciones
import SeccionInformacionGeneral from './SeccionInformacionGeneral';
import SeccionDatosPaciente from './SeccionDatosPaciente';
import SeccionTipoActividad from './SeccionTipoActividad';
import SeccionDatosAcompanante from './SeccionDatosAcompanante';
import SeccionMotivoAtencion from './SeccionMotivoAtencion';
import SeccionRevisionSistemas from './SeccionRevisionSistemas';
import SeccionAntecedentes from './SeccionAntecedentes';
import SeccionExamenFisico from './SeccionExamenFisico';
import SeccionResultadosParaclinicos from './SeccionResultadosParaclinicos';
import SeccionAlertasAlergias from './SeccionAlertasAlergias';
import SeccionAnalisisPlan from './SeccionAnalisisPlan';
import SeccionDiagnosticos from './SeccionDiagnosticos';
import SeccionRecomendaciones from './SeccionRecomendaciones';

// Importar contexto global
import { useHistoriaClinica } from '../../../context/HistoriaClinicaContext';
import { useAlert } from '../../../context/AlertContext';

// Definir las secciones directamente (comentado ya que no se usa)

// Estilos del formulario
const styles = {
  formLabel: "block text-sm font-semibold text-gray-700 mb-1",
  formInput: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150",
  formInputReadOnly: "mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium",
  sectionTitle: "text-lg text-indigo-700 font-bold mb-4 border-l-4 border-indigo-500 pl-3 py-1 bg-indigo-50 rounded-r-md",
  button: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 hover:shadow-md",
  buttonSecondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 hover:shadow-md",
  dataSection: "bg-white p-5 rounded-lg mb-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300",
  navigationButton: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 hover:shadow-md",
  navigationButtonSecondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200 hover:shadow-md",
  disabledButton: "bg-gray-300 text-gray-500 font-medium py-2 px-6 rounded-md shadow-sm cursor-not-allowed",
  progressBar: "w-full bg-gray-200 rounded-full h-2.5",
  progressFill: "bg-indigo-600 h-2.5 rounded-full transition-all duration-300",
  sectionIndicator: "flex items-center space-x-2 text-sm text-gray-600",
  sectionDot: "w-3 h-3 rounded-full border-2",
  sectionDotActive: "bg-indigo-600 border-indigo-600",
  sectionDotCompleted: "bg-green-500 border-green-500",
  sectionDotPending: "bg-gray-300 border-gray-300"
};

interface HistoriaClinicaCompletaProps {
  doctorData?: any;
  citaData?: any;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

const HistoriaClinicaCompleta: React.FC<HistoriaClinicaCompletaProps> = ({ 
  doctorData, 
  citaData, 
  onSave, 
  onCancel 
}) => {
  const { handleSubmit, setValue, register } = useForm();
  const { success, error: showError, warning, info } = useAlert();
  
  // Función helper para showConfirm usando window.confirm por ahora
  const showConfirm = async (options: { title: string; message: string; confirmText?: string; cancelText?: string; type?: string }): Promise<boolean> => {
    return window.confirm(`${options.title}\n\n${options.message}`);
  };
  
  // Estados para tipo de actividad y acompañamiento
  const [tipoActividad, setTipoActividad] = useState('');
  const [acompanamiento, setAcompanamiento] = useState('');
  const [pagador, setPagador] = useState('');

  // Usar contexto global para persistencia
  const {
    formData,
    sessionData,
    updateFormData,
    setTipoActividad: setGlobalTipoActividad
  } = useHistoriaClinica();

  // Debug: Log de datos del doctor (removido para mejor rendimiento)

  // Cargar datos persistentes del contexto al inicializar (solo una vez)
  useEffect(() => {
    // Cargar tipo de actividad si existe en el contexto
    if (sessionData.tipoActividad && sessionData.tipoActividad !== tipoActividad) {
      setTipoActividad(sessionData.tipoActividad);
    }
    
    // Cargar acompañamiento si existe en el contexto
    if (sessionData.acompanamiento && sessionData.acompanamiento !== acompanamiento) {
      setAcompanamiento(sessionData.acompanamiento);
    }
    
    // Cargar pagador si existe en el contexto
    if (sessionData.pagador && sessionData.pagador !== pagador) {
      setPagador(sessionData.pagador);
    }
  }, []); // Solo se ejecuta una vez al montar

  // Guardar datos de la cita y doctor en el contexto (solo una vez)
  useEffect(() => {
    if (citaData && doctorData) {
      updateFormData({
        citaData,
        doctorData
      });
    }
  }, [citaData?._id, doctorData?._id]); // Solo dependencias estables

  // Sincronizar cambios de tipo de actividad con el contexto (optimizado)
  useEffect(() => {
    if (tipoActividad || acompanamiento || pagador) {
      setGlobalTipoActividad(tipoActividad, acompanamiento, pagador);
    }
  }, [tipoActividad, acompanamiento, pagador]); // Removido setGlobalTipoActividad de las dependencias


  // Inicializar fecha actual
  useEffect(() => {
    const hoy = moment().format('YYYY-MM-DD');
    setValue('fechaRegistro', hoy);
    
    // Llenar datos del doctor si están disponibles
    if (doctorData) {
      setValue('profesional', `${doctorData.name} ${doctorData.lastName}`);
      setValue('especialidad', doctorData.specialty || 'Sin especialidad');
    }
  }, [setValue, doctorData]);

  // Manejar cambios en los datos del formulario
  const handleDataChange = (sectionData: any) => {
    updateFormData(sectionData);
  };

  // Renderizar todas las secciones en un solo formulario
  const renderAllSections = () => {
    // Obtener la especialidad del doctor desde doctorData
    let especialidadDoctor = '';
    if (typeof doctorData === 'object' && doctorData !== null) {
      // Prioridad 1: Si la especialidad está como objeto populado
      if (doctorData.especialidad && typeof doctorData.especialidad === 'object' && doctorData.especialidad.name) {
        especialidadDoctor = doctorData.especialidad.name;
      } 
      // Prioridad 2: Si la especialidad está como string directo
      else if (doctorData.especialidad && typeof doctorData.especialidad === 'string') {
        especialidadDoctor = doctorData.especialidad;
      }
      // Prioridad 3: Si está en el campo specialty
      else if (doctorData.specialty && typeof doctorData.specialty === 'string') {
        especialidadDoctor = doctorData.specialty;
      }
    }
    
    // Si aún no tenemos nada, usar un valor por defecto
    if (!especialidadDoctor) {
      especialidadDoctor = 'Especialidad médica';
    }
    
    // Extraer motivo de la cita para precargar
    const motivoCita = citaData?.motivo || '';

    return (
      <div className="space-y-8">
        {/* Sección 1: Información General */}
        <SeccionInformacionGeneral
          onDataChange={handleDataChange}
          initialData={formData}
          citaData={citaData}
        />
        
        {/* Sección 2: Tipo de Actividad y Acompañamiento */}
        <SeccionTipoActividad
          register={register}
          tipoActividad={tipoActividad}
          setTipoActividad={setTipoActividad}
          acompanamiento={acompanamiento}
          setAcompanamiento={setAcompanamiento}
          pagador={pagador}
          setPagador={setPagador}
        />
        
        {/* Sección 3: Datos del Paciente */}
        <SeccionDatosPaciente
          onDataChange={handleDataChange}
          initialData={formData}
          pagador={pagador}
        />
        
        {/* Sección 4: Datos del Acompañante (solo si acompañamiento = 'Acompañado con familiar') */}
        {acompanamiento === 'Acompañado con familiar' && (
          <SeccionDatosAcompanante
            onDataChange={handleDataChange}
            initialData={formData}
          />
        )}
        
        {/* Sección 5: Motivo de Atención */}
        <SeccionMotivoAtencion
          onDataChange={handleDataChange}
          initialData={formData}
          especialidadDoctor={especialidadDoctor}
          motivoCita={motivoCita}
          appointmentData={citaData}
        />
        
        {/* Sección 6: Revisión por Sistemas (solo para Primera Vez) */}
        {tipoActividad === 'Primera Vez' && (
          <SeccionRevisionSistemas
            onDataChange={handleDataChange}
            initialData={formData}
          />
        )}
        
        {/* Sección 7: Antecedentes (solo para Primera Vez) */}
        {tipoActividad === 'Primera Vez' && (
          <SeccionAntecedentes
            onDataChange={handleDataChange}
            initialData={formData}
          />
        )}
        
        {/* Sección 8: Examen Físico */}
        <SeccionExamenFisico
          onDataChange={handleDataChange}
          initialData={formData}
        />
        
        {/* Sección 9: Resultados Paraclínicos */}
        <SeccionResultadosParaclinicos
          onDataChange={handleDataChange}
          initialData={formData}
        />
        
        {/* Sección 10: Alertas y Alergias */}
        <SeccionAlertasAlergias
          onDataChange={handleDataChange}
          initialData={formData}
        />
        
        {/* Sección 11: Análisis y Plan */}
        <SeccionAnalisisPlan
          onDataChange={handleDataChange}
          initialData={formData}
        />
        
        {/* Sección 12: Diagnósticos */}
        <SeccionDiagnosticos
          onDataChange={handleDataChange}
          initialData={formData}
        />
        
        {/* Sección 13: Recomendaciones */}
        <SeccionRecomendaciones
          onDataChange={handleDataChange}
          initialData={formData}
          appointmentData={citaData}
          doctorData={doctorData}
        />
      </div>
    );
  };



  // Manejar envío del formulario
  const onSubmit = async (data: any) => {
    try {
      const finalData = { ...formData, ...data };
      
      // Importar el servicio
      const { HistoriaClinicaService } = await import('../../../services/historiaClinicaService');
      
      // Verificar si ya existe una historia clínica para esta cita
      // Solo verificar si tenemos un token válido
      const hasValidToken = localStorage.getItem('tenantToken') || localStorage.getItem('authToken');
      
      // Debug: Verificar configuración de autenticación
      console.log('🔍 Debug - Token disponible:', !!hasValidToken);
      console.log('🔍 Debug - tenantToken:', !!localStorage.getItem('tenantToken'));
      console.log('🔍 Debug - authToken:', !!localStorage.getItem('authToken'));
      console.log('🔍 Debug - URL actual:', window.location.pathname);
      
      // Verificar si ya existe una historia clínica para esta cita
      let existingHistoriaId = null;
      let isUpdate = false;
      
      if (hasValidToken) {
        try {
          const existingHistoria = await HistoriaClinicaService.getHistoriaClinicaByCita(citaData?._id);
          if (existingHistoria.success && existingHistoria.historiaClinica) {
            existingHistoriaId = existingHistoria.historiaClinica._id;
            isUpdate = true;
            
            // Mostrar confirmación para sobrescribir usando AlertContext
            const shouldOverwrite = await showConfirm({
              title: 'Historia Clínica Existente',
              message: 'Ya se guardó una historia clínica para esta cita. ¿Deseas sobrescribir la anterior con los nuevos datos?',
              confirmText: 'Sobrescribir',
              cancelText: 'Cancelar',
              type: 'warning'
            });
            
            if (!shouldOverwrite) {
              info('No se realizaron cambios en la historia clínica.');
              return;
            }
          }
        } catch (error: any) {
          // Si hay error 400 (tenant no encontrado) o 401 (no autorizado), continuar con la creación
          if (error.response?.status === 400 || error.response?.status === 401) {
            console.log('No se pudo verificar historia clínica existente (problema de autenticación), continuando con la creación...');
          } else {
            // Para otros errores, mostrar mensaje pero continuar
            console.warn('Error al verificar historia clínica existente:', error.message);
          }
        }
      } else {
        console.log('No hay token de autenticación, continuando con la creación sin verificar duplicados...');
      }
      
      // Mostrar confirmación antes de guardar (solo si no es una actualización)
      if (!isUpdate) {
        const shouldProceed = await showConfirm({
          title: 'Confirmar Guardado',
          message: '¿Estás seguro de que deseas guardar esta historia clínica? Esta acción no se puede deshacer.',
          confirmText: 'Sí, Guardar',
          cancelText: 'Cancelar',
          type: 'confirm'
        });
        
        if (!shouldProceed) {
          info('No se guardó la historia clínica.');
          return;
        }
      }
      
      // Usar el paciente seleccionado del contexto en lugar del de la cita
      const pacienteSeleccionado = sessionData.pacienteSeleccionado || 
        (formData.pacienteId ? {
          _id: formData.pacienteId,
          firstName: formData.pacienteNombre?.split(' ')[0] || '',
          lastName: formData.pacienteNombre?.split(' ').slice(1).join(' ') || '',
          phone: formData.telefono1 || '',
          email: formData.email || '',
          idNumber: formData.numeroIdentificacion || '',
          birthDate: formData.fechaNacimiento || '',
          gender: formData.genero || ''
        } : null);
      
      if (!pacienteSeleccionado || !pacienteSeleccionado._id) {
        showError('No se ha seleccionado un paciente. Por favor, selecciona un paciente en la primera sección.');
        return;
      }
      
      // Preparar datos para enviar al backend
      const historiaData = {
        ...finalData,
        pacienteId: pacienteSeleccionado._id,
        doctorId: doctorData?._id || doctorData,
        citaId: citaData?._id,
        fechaRegistro: new Date().toISOString(),
        tipoActividad: finalData.tipoActividad || 'Primera Vez',
        acompanamientoEnConsulta: finalData.acompanamiento || finalData.acompanamientoEnConsulta || '',
        motivoConsulta: finalData.motivoConsulta || '',
        motivoAtencion: finalData.motivoAtencion || '',
        pagador: finalData.pagador || '',
        enfermedadActual: finalData.enfermedadActual || '',
        resultadosParaclinicos: finalData.resultadosParaclinicos || '',
        servicio: finalData.servicio || '',
        antecedentes: finalData.antecedentes || [],
        familiares: finalData.familiares || '',
        psicosociales: finalData.psicosociales || '',
        ginecoobstetricos: finalData.ginecoobstetricos || [],
        planificacion: finalData.planificacion || '',
        ciclos: finalData.ciclos || '',
        sistemas: finalData.sistemas || [],
        estadoDeConciencia: finalData.estadoDeConciencia || '',
        equiposSignos: finalData.equiposSignos || '',
        signosVitales: finalData.signosVitales || {},
        examenMedico: finalData.examenMedico || {},
        alertas: finalData.alertas || '',
        alergias: finalData.alergias || '',
        diagnosticos: finalData.diagnosticos || [],
        analisisyplan: finalData.analisisyplan || '',
        recomendaciones: finalData.recomendaciones || '',
        // Agregar información del profesional
        profesional: {
          nombre: doctorData?.name || 'Dr. Sin Nombre',
          especialidad: doctorData?.specialty || doctorData?.especialidad?.name || 'Sin Especialidad'
        }
      };
      
      // Enviar al backend
      let response;
      if (isUpdate && existingHistoriaId) {
        // Actualizar historia clínica existente
        response = await HistoriaClinicaService.updateHistoriaClinica(existingHistoriaId, historiaData);
        console.log('✅ Historia clínica actualizada exitosamente:', response.historiaClinica);
      } else {
        // Crear nueva historia clínica
        response = await HistoriaClinicaService.createHistoriaClinica(historiaData);
        console.log('✅ Historia clínica guardada exitosamente:', response.historiaClinica);
      }
      
      if (response.success) {
        success(`Historia clínica ${isUpdate ? 'actualizada' : 'guardada'} exitosamente`);
        // Llamar callback de éxito
        if (onSave) {
          onSave(response.historiaClinica);
        }
      } else {
        throw new Error(response.message || `Error al ${isUpdate ? 'actualizar' : 'guardar'} la historia clínica`);
      }
      
    } catch (error) {
      console.error('❌ Error al guardar historia clínica:', error);
      
      // Mostrar error al usuario
      showError(`Error al guardar la historia clínica: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {renderAllSections()}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className={styles.navigationButtonSecondary}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.navigationButton}
            >
              Guardar Historia Clínica
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HistoriaClinicaCompleta;
