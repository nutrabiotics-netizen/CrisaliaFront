import React, { useEffect } from 'react';
import axios from 'axios';
import { useAlert } from '../../../../contexts/AlertContext';
import { useFormulasMedicas } from '../../../../contexts/FormulasMedicasContext';
import { FormulaMedicaService } from '../../../../services/formulaMedicaService';

// Función para convertir números a letras
const numeroALetras = (numero: number): string => {
  const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const especiales = ['', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
  
  if (numero === 0) return 'cero';
  if (numero === 1) return 'uno';
  
  if (numero < 10) return unidades[numero];
  if (numero < 20) return especiales[numero - 10];
  if (numero < 100) {
    const unidad = numero % 10;
    const decena = Math.floor(numero / 10);
    if (unidad === 0) return decenas[decena];
    if (decena === 2) return 'veinti' + unidades[unidad];
    return decenas[decena] + ' y ' + unidades[unidad];
  }
  if (numero < 1000) {
    const centena = Math.floor(numero / 100);
    const resto = numero % 100;
    if (resto === 0) {
      if (centena === 1) return 'cien';
      return centenas[centena];
    }
    return centenas[centena] + ' ' + numeroALetras(resto);
  }
  
  return 'número fuera de rango';
};

// Interfaces
interface CitaData {
  _id: string;
  pacienteId: {
    _id: string;
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    idNumber?: string;
  };
  doctorId: {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    especialidad: {
      _id: string;
      name: string;
    };
  };
  fecha: string;
  hora: string;
  tipo: 'Presencial' | 'Virtual' | 'Telefónica';
  estado: 'Agendada' | 'Cancelada' | 'Completada' | 'No Asistió' | 'PendienteAgendar';
  motivo?: string;
  notas?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface DoctorData {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  especialidad: {
    _id: string;
    name: string;
  };
}

interface Medicamento {
  denominacionComun: string;
  concentracion: string;
  unidadMedida: string;
  formaFarmaceutica: string;
  dosis: string;
  viaAdministracion: string;
  frecuencia: string;
  diasTratamiento: string;
  cantidadNumeros: string;
  cantidadLetras: string;
  indicaciones: string;
  fechaInicio?: string;
  horaInicio?: string;
  recordatorios?: Array<{
    fecha: string;
    hora: string;
  }>;
}

interface FormulasMedicasCompletaProps {
  citaData: CitaData | null;
  doctorData: DoctorData | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const FormulasMedicasCompleta: React.FC<FormulasMedicasCompletaProps> = ({
  citaData,
  doctorData: _doctorData,
  onSave,
  onCancel
}) => {
  const { showAlert, showConfirm } = useAlert();
  const {
    formData,
    addMedicamento,
    removeMedicamento,
    updateMedicamentoActual,
    clearMedicamentoActual,
    setSearchData,
    selectMedicamento,
    setModoEntrada,
    setLoading
  } = useFormulasMedicas();

  const {
    medicamentos,
    medicamentoActual,
    loading,
    searchTerm,
    searchResults,
    isSearching,
    modoEntrada
  } = formData;

  // Verificar si es psiquiatría (para futuras funcionalidades específicas)
  // const esPsiquiatria = doctorData?.especialidad?.name === 'Psiquiatria';

  // Efecto para calcular automáticamente la cantidad
  useEffect(() => {
    if (medicamentoActual.dosis && medicamentoActual.frecuencia && medicamentoActual.diasTratamiento) {
      try {
        // Calcular dosis por día
        const dosisPorToma = parseFloat(medicamentoActual.dosis) || 0;
        const frecuenciaHoras = parseInt(medicamentoActual.frecuencia) || 0;
        const diasTratamiento = parseInt(medicamentoActual.diasTratamiento) || 0;
        
        // Calcular cuántas tomas hay en un día (24 horas / frecuencia en horas)
        const tomasPorDia = 24 / frecuenciaHoras;
        
        // Calcular cantidad total: dosis por toma × tomas por día × días de tratamiento
        const cantidadTotal = dosisPorToma * tomasPorDia * diasTratamiento;
        
        // Redondear a un número entero si es necesario
        const cantidadRedondeada = Math.round(cantidadTotal);
        
        updateMedicamentoActual({
          cantidadNumeros: cantidadRedondeada.toString(),
          cantidadLetras: numeroALetras(cantidadRedondeada)
        });
      } catch (error) {
        console.error("Error al calcular la cantidad:", error);
      }
    }
  }, [medicamentoActual.dosis, medicamentoActual.frecuencia, medicamentoActual.diasTratamiento]);

  const handleMedicamentoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateMedicamentoActual({ [name]: value });
  };

  // Función para buscar medicamentos en CUMS
  const buscarMedicamentos = async (query: string) => {
    if (!query || query.length < 3) {
      setSearchData(query, [], false);
      return;
    }

    setSearchData(query, [], true);
    try {
      // Usar el proxy del backend (VITE_BACKEND_URL es tu servidor Mozart)
      const baseUrl = import.meta.env?.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      if (!baseUrl) {
        console.error('URL del backend no disponible');
        return;
      }

      const response = await axios.get(`${baseUrl}/admin/cums/search`, {
        params: { query }
      });
      setSearchData(query, response.data, false);
    } catch (error) {
      console.error('Error al buscar medicamentos:', error);
      showAlert({
        type: 'error',
        title: 'Error',
        message: 'No se pudieron cargar los medicamentos. Por favor, intenta de nuevo.'
      });
      setSearchData(query, [], false);
    }
  };

  // Función para seleccionar un medicamento de los resultados
  const seleccionarMedicamento = (med: any) => {
    selectMedicamento(med);
  };



  const handleAddMedicamento = () => {
    // Validar campos requeridos
    const camposRequeridos = [
      'denominacionComun', 'concentracion', 'unidadMedida', 'formaFarmaceutica',
      'dosis', 'viaAdministracion', 'frecuencia', 'diasTratamiento', 'indicaciones'
    ];

    for (const campo of camposRequeridos) {
      if (!medicamentoActual[campo as keyof Medicamento] || 
          medicamentoActual[campo as keyof Medicamento] === '') {
        showAlert({
          type: 'error',
          title: 'Campo requerido',
          message: `Por favor complete el campo: ${campo}`
        });
        return;
      }
    }

    // Agregar medicamento a la lista
    addMedicamento(medicamentoActual);
    
    // Limpiar formulario
    clearMedicamentoActual();

    showAlert({
      type: 'success',
      title: 'Medicamento agregado',
      message: 'El medicamento ha sido agregado correctamente'
    });
  };

  const handleRemoveMedicamento = (index: number) => {
    removeMedicamento(index);
  };

  const mostrarOpcionesFormulaExistente = async (): Promise<'ver' | 'sobrescribir' | 'cancelar'> => {
    return new Promise((resolve) => {
      // Crear un modal personalizado con tres opciones
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50';
      modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-gray-900">Fórmula médica existente</h3>
              </div>
            </div>
            <div class="mb-6">
              <p class="text-sm text-gray-500">
                Ya existe una fórmula médica para esta cita. ¿Qué deseas hacer?
              </p>
            </div>
            <div class="flex flex-col space-y-2">
              <button id="ver-formula" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200">
                Ver fórmula existente
              </button>
              <button id="sobrescribir" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-200">
                Sobrescribir con nueva fórmula
              </button>
              <button id="cancelar" class="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-200">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Event listeners
      modal.querySelector('#ver-formula')?.addEventListener('click', () => {
        document.body.removeChild(modal);
        resolve('ver');
      });
      
      modal.querySelector('#sobrescribir')?.addEventListener('click', () => {
        document.body.removeChild(modal);
        resolve('sobrescribir');
      });
      
      modal.querySelector('#cancelar')?.addEventListener('click', () => {
        document.body.removeChild(modal);
        resolve('cancelar');
      });
      
      // Cerrar al hacer clic fuera del modal
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
          resolve('cancelar');
        }
      });
    });
  };

  const guardarFormulaMedica = async (sobrescribir = false) => {
    if (medicamentos.length === 0) {
      showAlert({
        type: 'warning',
        title: 'Sin medicamentos',
        message: 'Debe agregar al menos un medicamento a la prescripción'
      });
      return;
    }

    if (!citaData?._id || !citaData?.pacienteId?._id || !citaData?.doctorId?._id) {
      showAlert({
        type: 'error',
        title: 'Datos incompletos',
        message: 'Faltan datos de la cita, paciente o doctor'
      });
      return;
    }

    // Verificar si existe historia clínica antes de proceder
    try {
      const { api } = await import('../../../../services/api');
      const response = await api.get(`/api/historia-clinica/cita/${citaData._id}`);

      if (!response.data.success || !response.data.historiaClinica) {
        showAlert({
          type: 'warning',
          title: 'Historia clínica requerida',
          message: 'Debe completar la historia clínica con diagnósticos antes de crear una fórmula médica. Por favor, vaya a la pestaña de Historia Clínica y complete los diagnósticos.'
        });
        return;
      }

      // Verificar que tiene diagnósticos
      if (!response.data.historiaClinica.diagnosticos || response.data.historiaClinica.diagnosticos.length === 0) {
        showAlert({
          type: 'warning',
          title: 'Diagnósticos requeridos',
          message: 'La historia clínica debe tener al menos un diagnóstico antes de crear una fórmula médica. Por favor, agregue diagnósticos en la Historia Clínica.'
        });
        return;
      }
    } catch (error) {
      console.error('Error verificando historia clínica:', error);
      showAlert({
        type: 'warning',
        title: 'Historia clínica requerida',
        message: 'No se pudo verificar la historia clínica. Asegúrese de completar la historia clínica con diagnósticos antes de crear una fórmula médica.'
      });
      return;
    }

    try {
      setLoading(true);
      
      const datosAEnviar = {
        citaId: citaData._id,
        pacienteId: citaData.pacienteId._id,
        doctorId: citaData.doctorId._id,
        medicamentos: medicamentos,
        sobrescribir: sobrescribir
      };

      const response = await FormulaMedicaService.verificarYCrearFormulaMedica(datosAEnviar);

      if (response.success) {
        onSave({
          success: true,
          data: response.data,
          pdfUrl: response.pdfUrl
        });

        // Mostrar alert con opciones como en historia clínica
        if (response.pdfUrl) {
          const verPDF = await showConfirm({
            type: 'success',
            title: 'Fórmula médica guardada',
            message: sobrescribir ? 'La fórmula médica se ha sobrescrito exitosamente. ¿Desea ver el PDF?' : 'La fórmula médica se ha creado exitosamente. ¿Desea ver el PDF?',
            confirmText: 'Ver PDF',
            cancelText: 'Cerrar'
          });
          
          if (verPDF) {
            FormulaMedicaService.abrirPDF(response.pdfUrl);
          }
        } else {
          showAlert({
            type: 'success',
            title: 'Fórmula médica guardada',
            message: sobrescribir ? 'La fórmula médica se ha sobrescrito exitosamente' : 'La fórmula médica se ha creado exitosamente'
          });
        }
      }
    } catch (error: any) {
      console.error('Error al enviar formulario:', error);
      
      if (error.response?.status === 409) {
        // Mostrar opciones para fórmula médica existente
        const opcion = await mostrarOpcionesFormulaExistente();
        
        if (opcion === 'ver') {
          FormulaMedicaService.abrirPDF(error.response.data.data.pdfUrl);
        } else if (opcion === 'sobrescribir') {
          // Intentar guardar nuevamente con flag de sobrescribir
          await guardarFormulaMedica(true);
        }
        // Si opcion === 'cancelar', no hacer nada
      } else if (error.response?.status === 400) {
        // Error específico para falta de historia clínica o diagnósticos
        showAlert({
          type: 'warning',
          title: 'Historia clínica requerida',
          message: error.response?.data?.message || 'Debe completar la historia clínica con diagnósticos antes de crear una fórmula médica'
        });
      } else {
        showAlert({
          type: 'error',
          title: 'Error al guardar',
          message: error.response?.data?.message || 'Error al guardar la fórmula médica'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    await guardarFormulaMedica();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold text-blue-700 mb-6 pb-2 border-b-2 border-blue-200">
          Fórmula Médica
        </h2>

        {/* Formulario de medicamento */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Agregar Medicamento</h3>
          
          {/* Selector de modo de entrada */}
          <div className="mb-4 flex items-center">
            <span className="mr-4 text-gray-700 font-medium">Modo de entrada:</span>
            <div className="flex bg-gray-200 rounded-lg p-1">
              <button
                type="button"
                className={`px-4 py-2 rounded-md ${modoEntrada === 'busqueda' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700'}`}
                onClick={() => setModoEntrada('busqueda')}
              >
                Búsqueda
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md ${modoEntrada === 'manual' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700'}`}
                onClick={() => setModoEntrada('manual')}
              >
                Manual
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Denominación Común *
              </label>
              {modoEntrada === 'busqueda' ? (
                <div className="relative">
                  <input
                    type="text"
                    name="denominacionComun"
                    value={searchTerm}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchData(value, [], false);
                      buscarMedicamentos(value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Buscar medicamento..."
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                    </div>
                  )}
                  {searchResults.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {searchResults.map((med, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                          onClick={() => seleccionarMedicamento(med)}
                        >
                          <div className="font-medium">{med.producto}</div>
                          <div className="text-sm text-gray-600">
                            {med.formafarmaceutica} - {med.concentracion} {med.unidadmedida}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  name="denominacionComun"
                  value={medicamentoActual.denominacionComun}
                  onChange={handleMedicamentoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingrese el nombre del medicamento"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Concentración *
              </label>
              <input
                type="text"
                name="concentracion"
                value={medicamentoActual.concentracion}
                onChange={handleMedicamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 500, 850, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unidad de Medida *
              </label>
              <input
                type="text"
                name="unidadMedida"
                value={medicamentoActual.unidadMedida}
                onChange={handleMedicamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: mg, ml, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forma Farmacéutica *
              </label>
              <input
                type="text"
                name="formaFarmaceutica"
                value={medicamentoActual.formaFarmaceutica}
                onChange={handleMedicamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: tableta, jarabe, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dosis *
              </label>
              <input
                type="text"
                name="dosis"
                value={medicamentoActual.dosis}
                onChange={handleMedicamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 1, 2, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frecuencia *
              </label>
              <select
                name="frecuencia"
                value={medicamentoActual.frecuencia}
                onChange={handleMedicamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecciona una opción</option>
                <option value="4">Cada 4 horas</option>
                <option value="6">Cada 6 horas</option>
                <option value="8">Cada 8 horas</option>
                <option value="12">Cada 12 horas</option>
                <option value="24">Cada 24 horas (una vez al día)</option>
                <option value="48">Cada 48 horas</option>
                <option value="72">Cada 72 horas</option>
                <option value="168">Una vez a la semana</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vía de Administración *
              </label>
              <select
                name="viaAdministracion"
                value={medicamentoActual.viaAdministracion}
                onChange={handleMedicamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecciona una opción</option>
                <option value="BUCAL">Bucal</option>
                <option value="CONJUNTIVAL">Conjuntival</option>
                <option value="DENTAL">Dental</option>
                <option value="EPIDURAL">Epidural</option>
                <option value="IMPLANTE">Implante</option>
                <option value="INFILTRATIVA - BLOQUEOS">Infiltrativa - Bloqueos</option>
                <option value="INFILTRATIVA - EPIDURAL">Infiltrativa - Epidural</option>
                <option value="INFILTRATIVA - LOCAL">Infiltrativa - Local</option>
                <option value="INFUSIÓN INTRAVENOSA">Infusión Intravenosa</option>
                <option value="INHALACION">Inhalación</option>
                <option value="INSUFLACION">Insuflación</option>
                <option value="INTRA-ARTERIAL">Intra-arterial</option>
                <option value="INTRA-ARTICULAR">Intra-articular</option>
                <option value="INTRA-CARDIAC">Intra-cardiaca</option>
                <option value="INTRACAVERNOSA">Intracavernosa</option>
                <option value="INTRACEREBROVENTRICULAR">Intracerebroventricular</option>
                <option value="INTRADERMAL">Intradermal</option>
                <option value="INTRALINFATICA">Intralinfática</option>
                <option value="INTRAMUSCULAR">Intramuscular</option>
                <option value="INTRANASAL">Intranasal</option>
                <option value="INTRAOCULAR">Intraocular</option>
                <option value="INTRAPERITONEAL">Intraperitoneal</option>
                <option value="INTRATECAL">Intratecal</option>
                <option value="INTRATRAQUEAL">Intratraqueal</option>
                <option value="INTRAUTERINA">Intrauterina</option>
                <option value="INTRAVASCULAR EN HEMODIÁLISIS">Intravascular en Hemodiálisis</option>
                <option value="INTRAVENOSA">Intravenosa</option>
                <option value="INTRAVESICAL">Intravesical</option>
                <option value="IRRIGACIÓN">Irrigación</option>
                <option value="OFTÁLMICA">Oftálmica</option>
                <option value="ORAL">Oral</option>
                <option value="OTICO AURICULAR">Ótico auricular</option>
                <option value="PARENTERAL">Parenteral</option>
                <option value="PERFUSION INTRAVENOSA">Perfusión intravenosa</option>
                <option value="PERIARTICULAR">Periarticular</option>
                <option value="PERINEURAL">Perineural</option>
                <option value="RAQUIDEA">Raquídea</option>
                <option value="RECTAL">Rectal</option>
                <option value="SUBCUTANEA">Subcutánea</option>
                <option value="SUBLINGUAL">Sublingual</option>
                <option value="TÓPICA OCULAR">Tópica ocular</option>
                <option value="TEJIDO BLANDO">Tejido blando</option>
                <option value="TOPICA (EXTERNA)">Tópica (externa)</option>
                <option value="TRANSDERMAL">Transdermal</option>
                <option value="URETRAL">Uretral</option>
                <option value="VAGINAL">Vaginal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Días de Tratamiento *
              </label>
              <input
                type="number"
                name="diasTratamiento"
                value={medicamentoActual.diasTratamiento}
                onChange={handleMedicamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Número de días"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad (en números)
              </label>
              <input
                type="text"
                name="cantidadNumeros"
                value={medicamentoActual.cantidadNumeros}
                onChange={handleMedicamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Se calcula automáticamente"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad (en letras)
              </label>
              <input
                type="text"
                name="cantidadLetras"
                value={medicamentoActual.cantidadLetras}
                onChange={handleMedicamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Se calcula automáticamente"
                readOnly
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Indicaciones *
              </label>
              <textarea
                name="indicaciones"
                value={medicamentoActual.indicaciones}
                onChange={handleMedicamentoChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Instrucciones de uso"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddMedicamento}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Agregar Medicamento
          </button>
        </div>

        {/* Lista de medicamentos */}
        {medicamentos.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Medicamentos Agregados</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">Medicamento</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">Dosis</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">Frecuencia</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">Vía</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">Días</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicamentos.map((med, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-3 text-sm">{med.denominacionComun}</td>
                      <td className="py-2 px-3 text-sm">{med.dosis}</td>
                      <td className="py-2 px-3 text-sm">
                        {med.frecuencia === '4' ? 'Cada 4 horas' :
                         med.frecuencia === '6' ? 'Cada 6 horas' :
                         med.frecuencia === '8' ? 'Cada 8 horas' :
                         med.frecuencia === '12' ? 'Cada 12 horas' :
                         med.frecuencia === '24' ? 'Cada 24 horas' :
                         med.frecuencia === '48' ? 'Cada 48 horas' :
                         med.frecuencia === '72' ? 'Cada 72 horas' :
                         med.frecuencia === '168' ? 'Una vez a la semana' :
                         med.frecuencia}
                      </td>
                      <td className="py-2 px-3 text-sm">{med.viaAdministracion}</td>
                      <td className="py-2 px-3 text-sm">{med.diasTratamiento}</td>
                      <td className="py-2 px-3 text-sm">{med.cantidadNumeros}</td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => handleRemoveMedicamento(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || medicamentos.length === 0}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md transition duration-200"
          >
            {loading ? 'Guardando...' : 'Guardar Fórmula Médica'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormulasMedicasCompleta;
