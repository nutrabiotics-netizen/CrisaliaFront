import React, { useEffect, useRef } from 'react';
import type { UseFormRegister, FieldValues } from 'react-hook-form';
import { useHistoriaClinica } from '../../../context/HistoriaClinicaContext';

interface SeccionTipoActividadProps {
  register: UseFormRegister<FieldValues>;
  tipoActividad: string;
  setTipoActividad: (value: string) => void;
  acompanamiento: string;
  setAcompanamiento: (value: string) => void;
  pagador: string;
  setPagador: (value: string) => void;
}

const styles = {
  formLabel: "block text-sm font-semibold text-gray-700 mb-1",
  formInput: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150",
  sectionTitle: "text-lg text-indigo-700 font-bold mb-4 border-l-4 border-indigo-500 pl-3 py-1 bg-indigo-50 rounded-r-md",
};

const SeccionTipoActividad: React.FC<SeccionTipoActividadProps> = ({
  register,
  tipoActividad,
  setTipoActividad,
  acompanamiento,
  setAcompanamiento,
  pagador,
  setPagador
}) => {
  // Usar contexto para sincronización
  const { formData, updateFormData } = useHistoriaClinica();
  const isUpdatingFromContext = useRef(false);

  // Sincronizar datos del contexto con los estados locales (optimizado)
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      isUpdatingFromContext.current = true;
      
      // Sincronizar tipo de actividad
      if (formData.tipoActividad && formData.tipoActividad !== tipoActividad) {
        setTipoActividad(formData.tipoActividad);
      }
      
      // Sincronizar acompañamiento
      if (formData.acompanamiento && formData.acompanamiento !== acompanamiento) {
        setAcompanamiento(formData.acompanamiento);
      }
      
      // Sincronizar pagador
      if (formData.pagador && formData.pagador !== pagador) {
        setPagador(formData.pagador);
      }
      
      // Resetear el flag después de un pequeño delay
      setTimeout(() => {
        isUpdatingFromContext.current = false;
      }, 100);
    }
  }, [formData.tipoActividad, formData.acompanamiento, formData.pagador]); // Solo sincronizar campos específicos

  // Sincronizar cambios locales con el contexto
  useEffect(() => {
    if (!isUpdatingFromContext.current && (tipoActividad || acompanamiento || pagador)) {
      const datosActividad = {
        tipoActividad,
        acompanamiento,
        pagador
      };
      
      // Filtrar valores vacíos
      const datosFiltrados = Object.fromEntries(
        Object.entries(datosActividad).filter(([, value]) => value !== '')
      );
      
      if (Object.keys(datosFiltrados).length > 0) {
        updateFormData(datosFiltrados);
      }
    }
  }, [tipoActividad, acompanamiento, pagador, updateFormData]);
  return (
    <div className="bg-white p-5 rounded-lg mb-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h3 className={styles.sectionTitle}>TIPO DE ACTIVIDAD Y ACOMPAÑAMIENTO DE LA CONSULTA</h3>
      
      {/* Tipo de Actividad */}
      <div className="flex flex-col mt-4">
        <label className={styles.formLabel}>Tipo de Actividad</label>
        <div className="relative">
          <select
            {...register('tipoActividad')}
            value={tipoActividad}
            onChange={(e) => setTipoActividad(e.target.value)}
            className="appearance-none w-full bg-white border border-gray-300 hover:border-indigo-500 px-4 py-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="">Seleccione tipo de actividad</option>
            <option value="Primera Vez">Primera Vez</option>
            <option value="Control">Control</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Pagador - Solo se muestra para Primera Vez */}
      {tipoActividad === 'Primera Vez' && (
        <div className="flex flex-col mt-4">
          <label className={styles.formLabel}>Pagador</label>
          <div className="relative">
            <select
              {...register('pagador')}
              value={pagador}
              onChange={(e) => setPagador(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 hover:border-indigo-500 px-4 py-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
              <option value="">Seleccione pagador</option>
              <option value="Particular">Particular</option>
              <option value="Convenio">Convenio</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Acompañamiento en Consulta */}
      <div className="flex flex-col mt-4">
        <label className={styles.formLabel}>Acompañamiento en consulta</label>
        <div className="relative">
          <select
            {...register('acompanamientoEnConsulta')}
            value={acompanamiento}
            onChange={(e) => setAcompanamiento(e.target.value)}
            className="appearance-none w-full bg-white border border-gray-300 hover:border-indigo-500 px-4 py-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="">Seleccione tipo de acompañamiento</option>
            <option value="Solo">Solo</option>
            <option value="Acompañado con familiar">Acompañado con familiar</option>
            <option value="Acompañado con profesional de la salud">Acompañado con profesional de la salud</option>
            <option value="En consulta con médico">En consulta con médico</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Información sobre las secciones que se mostrarán */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Información sobre las secciones</h3>
            <div className="mt-2 text-sm text-blue-700">
              {tipoActividad === 'Primera Vez' && (
                <p>Al seleccionar <strong>Primera Vez</strong>, se mostrarán todas las secciones del formulario completo.</p>
              )}
              {tipoActividad === 'Control' && (
                <p>Al seleccionar <strong>Control</strong>, solo se mostrarán las secciones: Motivo que origina la atención, Examen físico, Signos vitales, Resultados paraclínicos, Alertas y alergias, Análisis y plan, Diagnósticos y Recomendaciones.</p>
              )}
              {!tipoActividad && (
                <p>Seleccione el tipo de actividad para ver qué secciones se habilitarán en el formulario.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionTipoActividad;
