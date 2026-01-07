import React, { useEffect, useState } from 'react';
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

interface SeccionDiagnosticosProps {
  onDataChange: (data: any) => void;
  initialData?: any;
}

interface Cie10Result {
  Icd10Code: string;
  Icd10Title: string;
}

interface Diagnostico {
  codigo: string;
  nombre: string;
  tipo: string;
  relacionado: string;
}

const SeccionDiagnosticos: React.FC<SeccionDiagnosticosProps> = ({ 
  onDataChange, 
  initialData = {} 
}) => {
  // Usar contexto global para persistencia
  const { formData, updateFormData } = useHistoriaClinica();
  
  // Combinar datos iniciales con datos del contexto
  const combinedInitialData = { ...initialData, ...formData };
  
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: combinedInitialData
  });

  // Estados para la búsqueda de CIE10
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Cie10Result[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCie10, setSelectedCie10] = useState<Cie10Result | null>(null);
  const [selectedTipo, setSelectedTipo] = useState('');
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);

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

  // Efecto específico para manejar diagnósticos desde el contexto
  useEffect(() => {
    if (formData.diagnosticos) {
      try {
        // Si viene como string JSON, parsearlo
        const diagnosticosData = typeof formData.diagnosticos === 'string' 
          ? JSON.parse(formData.diagnosticos) 
          : formData.diagnosticos;
        
        if (Array.isArray(diagnosticosData) && diagnosticosData.length > 0) {
          setDiagnosticos(diagnosticosData);
        }
      } catch (error) {
        console.warn('Error parsing diagnosticos from context:', error);
      }
    }
  }, [formData.diagnosticos]);

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

  // Función para buscar diagnósticos CIE10
  const buscarDiagnosticos = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Usar el proxy del backend (VITE_BACKEND_URL es tu servidor Mozart)
      const baseUrl = import.meta.env?.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${baseUrl}/admin/cie10/search?query=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error al buscar diagnósticos:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Función para seleccionar un diagnóstico
  const seleccionarDiagnostico = (diagnostico: Cie10Result) => {
    setSelectedCie10(diagnostico);
    setSearchTerm(''); // Limpiar el término de búsqueda
    setSearchResults([]); // Limpiar resultados

    // Actualizar el campo cie10 con el código y nombre
    setValue('cie10', `${diagnostico.Icd10Code} / ${diagnostico.Icd10Title}`);
  };

  // Función para agregar diagnóstico a la lista
  const agregarDiagnostico = () => {
    if (!selectedCie10 || !selectedTipo) {
      alert('Por favor seleccione un diagnóstico y un tipo');
      return;
    }

    const nuevoDiagnostico = {
      codigo: selectedCie10.Icd10Code,
      nombre: selectedCie10.Icd10Title,
      tipo: selectedTipo,
      relacionado: ''
    };

    // Actualizar la lista de diagnósticos
    const nuevosDiagnosticos = [...diagnosticos, nuevoDiagnostico];
    setDiagnosticos(nuevosDiagnosticos);

    // Actualizar el formData con todos los diagnósticos
    actualizarDiagnosticosEnFormulario(nuevosDiagnosticos);

    // Limpiar selecciones para el siguiente diagnóstico
    setSelectedCie10(null);
    setSelectedTipo('');
    setSearchTerm('');
  };

  // Función para actualizar todos los diagnósticos en el formulario
  const actualizarDiagnosticosEnFormulario = (listaDiagnosticos: Diagnostico[]) => {
    // Guardar como array en el formulario (no como JSON string)
    setValue('diagnosticos', listaDiagnosticos);

    // También mantener el diagnóstico principal en el campo cie10 si existe
    const diagnosticoPrincipal = listaDiagnosticos.find(d => d.tipo === 'Principal');
    if (diagnosticoPrincipal) {
      setValue('cie10', `${diagnosticoPrincipal.codigo} / ${diagnosticoPrincipal.nombre}`);
    }

    // Actualizar el contexto directamente con el array
    updateFormData({ diagnosticos: listaDiagnosticos });
  };

  // Función para eliminar un diagnóstico
  const eliminarDiagnostico = (index: number) => {
    const nuevosDiagnosticos = [...diagnosticos];
    nuevosDiagnosticos.splice(index, 1);
    setDiagnosticos(nuevosDiagnosticos);

    // Actualizar el formData con la lista actualizada
    actualizarDiagnosticosEnFormulario(nuevosDiagnosticos);
  };

  // Función para actualizar el campo relacionado
  const actualizarRelacionado = (index: number, valor: string) => {
    const nuevosDiagnosticos = [...diagnosticos];
    nuevosDiagnosticos[index].relacionado = valor;
    setDiagnosticos(nuevosDiagnosticos);

    // Actualiza también el formData con todos los diagnósticos
    actualizarDiagnosticosEnFormulario(nuevosDiagnosticos);
  };

  return (
    <div className={styles.dataSection}>
      <h3 className={styles.sectionTitle}>Diagnósticos</h3>
      <p className="text-gray-600 mb-4 text-sm">
        Registre los diagnósticos médicos utilizando códigos CIE-10.
      </p>
      
      <div className="space-y-4">
        {/* Búsqueda CIE-10 */}
        <div>
          <label className={styles.formLabel}>
            CIE-10 (Código / Nombre):
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                buscarDiagnosticos(e.target.value);
              }}
              className={styles.formInput}
              placeholder="Buscar por código o nombre"
            />
            <input
              type="hidden"
              {...register('cie10')}
            />

            {isSearching && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((result: Cie10Result, index: number) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                    onClick={() => seleccionarDiagnostico(result)}
                  >
                    <span className="font-medium">{result.Icd10Code}</span> - {result.Icd10Title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedCie10 && (
            <div className="mt-2 p-2 bg-indigo-50 rounded-md">
              <p className="text-sm font-medium">Seleccionado: {selectedCie10.Icd10Code} - {selectedCie10.Icd10Title}</p>
            </div>
          )}
        </div>

        {/* Tipo de diagnóstico */}
        <div className="flex flex-col space-y-2">
          <label className={styles.formLabel}>Tipo de diagnóstico</label>
          <select
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)}
            className={styles.formInput}
          >
            <option value="">Selecciona un tipo</option>
            <option value="01_Impresión diagnóstica">01 Impresión diagnóstica</option>
            <option value="02_Confirmado nuevo">02 Confirmado nuevo</option>
            <option value="03_Confirmado repetido">03 Confirmado repetido</option>
          </select>
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors duration-200 hover:shadow-md"
            onClick={agregarDiagnostico}
          >
            Agregar diagnóstico
          </button>
        </div>

        {/* Lista de diagnósticos agregados */}
        {diagnosticos.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Diagnósticos agregados</h4>
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                {diagnosticos.length} {diagnosticos.length === 1 ? 'diagnóstico' : 'diagnósticos'}
              </span>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                          </svg>
                          
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Diagnóstico
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          Tipo
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          Relación
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {diagnosticos.map((diag: Diagnostico, index: number) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap border-r border-gray-100">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-red-200 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200"
                            onClick={() => eliminarDiagnostico(index)}
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            
                          </button>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <div className="flex flex-col">
                            <div className="flex items-center mb-1">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                {diag.codigo}
                              </span>
                            </div>
                            <p className="text-sm text-gray-900 font-medium leading-relaxed">
                              {diag.nombre}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r border-gray-100">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {diag.tipo.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={diag.relacionado || ''}
                            onChange={(e) => actualizarRelacionado(index, e.target.value)}
                            className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                          >
                            <option value="">Seleccione relación</option>
                            <option value="Principal">Principal</option>
                            <option value="Relacionado 1">Relacionado 1</option>
                            <option value="Relacionado 2">Relacionado 2</option>
                            <option value="Relacionado 3">Relacionado 3</option>
                            <option value="Relacionado 4">Relacionado 4</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionDiagnosticos;
