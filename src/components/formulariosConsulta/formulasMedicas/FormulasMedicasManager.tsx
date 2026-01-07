import React, { useState, useEffect } from 'react';
import { api } from '../../../../services/api';
import { useFormulasMedicas } from '../../../../contexts/FormulasMedicasContext';
import { useAlert } from '../../../../contexts/AlertContext';
import FormulasMedicasCompleta from './FormulasMedicasCompleta';

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

interface FormulasMedicasManagerProps {
  citaData: CitaData | null;
  doctorData: DoctorData | null;
}

const FormulasMedicasManager: React.FC<FormulasMedicasManagerProps> = ({
  citaData,
  doctorData
}) => {
  const { addMedicamento } = useFormulasMedicas();
  const { showAlert } = useAlert();
  const [historiaClinica, setHistoriaClinica] = useState<any>(null);
  const [formulasPrevias, setFormulasPrevias] = useState<any[]>([]);
  const [mostrarFormulasPrevias, setMostrarFormulasPrevias] = useState(false);
  const [loadingFormulas, setLoadingFormulas] = useState(false);

  // Cargar historia clínica y fórmulas previas
  useEffect(() => {
    if (citaData?._id) {
      cargarHistoriaClinica();
    }
  }, [citaData?._id]);

  const cargarHistoriaClinica = async () => {
    if (!citaData?._id) return;
    
    try {
      const response = await api.get(`/api/historia-clinica/cita/${citaData._id}`);
      if (response.data.success && response.data.historiaClinica) {
        setHistoriaClinica(response.data.historiaClinica);
        
        // Cargar fórmulas previas del paciente
        if (response.data.historiaClinica.pacienteId?._id) {
          cargarFormulasPrevias(response.data.historiaClinica.pacienteId._id);
        }
      }
    } catch (error) {
      console.error('Error cargando historia clínica:', error);
    }
  };

  const cargarFormulasPrevias = async (pacienteId: string) => {
    if (!pacienteId) return;
    
    try {
      setLoadingFormulas(true);
      const response = await api.get(`/api/formulas-medicas/paciente/${pacienteId}`);
      setFormulasPrevias(response.data.data || []);
    } catch (error) {
      console.error('Error al cargar fórmulas médicas previas:', error);
    } finally {
      setLoadingFormulas(false);
    }
  };

  const verPDFFormula = (pdfUrl: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      alert('No hay un PDF disponible para esta fórmula médica');
    }
  };

  const importarMedicamentos = (formula: any) => {
    if (formula.medicamentos && formula.medicamentos.length > 0) {
      // Importar cada medicamento de la fórmula
      formula.medicamentos.forEach((medicamento: any) => {
        addMedicamento(medicamento);
      });
      
      showAlert({
        type: 'success',
        title: 'Medicamentos importados',
        message: `Se han importado ${formula.medicamentos.length} medicamento(s) de la fórmula médica.`
      });
    } else {
      showAlert({
        type: 'warning',
        title: 'Sin medicamentos',
        message: 'Esta fórmula médica no contiene medicamentos para importar'
      });
    }
  };

  const handleFormulaGuardada = (data: any) => {
    console.log('Fórmula médica guardada:', data);
    // Recargar fórmulas previas
    if (historiaClinica?.pacienteId?._id) {
      cargarFormulasPrevias(historiaClinica.pacienteId._id);
    }
  };

  if (!citaData?.pacienteId?._id) {
    return (
      <div className="p-4 text-center text-red-600">
        No se puede gestionar fórmulas médicas sin un ID de paciente.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Diagnósticos de la historia clínica */}
          {historiaClinica?.diagnosticos && historiaClinica.diagnosticos.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-bold text-blue-800 mb-3">Diagnósticos de la Historia Clínica</h3>
              <div className="space-y-2">
                {historiaClinica.diagnosticos.map((diagnostico: any, index: number) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {diagnostico.codigo} - {diagnostico.nombre}
                        </p>
                        <p className="text-sm text-gray-600">
                          Tipo: {diagnostico.tipo} | Relacionado: {diagnostico.relacionado}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botón para mostrar/ocultar fórmulas previas */}
          <div>
            <button
              type="button"
              onClick={() => setMostrarFormulasPrevias(!mostrarFormulasPrevias)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            >
              {mostrarFormulasPrevias ? 'Ocultar Fórmulas Previas' : 'Ver Fórmulas Previas'}
            </button>
          </div>

          {/* Sección de fórmulas previas */}
          {mostrarFormulasPrevias && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Fórmulas Médicas Previas</h3>
              
              {loadingFormulas ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                </div>
              ) : formulasPrevias.length > 0 ? (
                <div className="space-y-4">
                  {formulasPrevias.map((formula, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">
                            Fecha: {new Date(formula.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Doctor: {formula.doctorId?.name} {formula.doctorId?.lastName}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => verPDFFormula(formula.pdfUrl || '')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Ver PDF
                          </button>
                          <button
                            onClick={() => importarMedicamentos(formula)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Importar
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Medicamentos:</p>
                        <ul className="mt-1 space-y-2">
                          {formula.medicamentos.map((med: any, medIndex: number) => (
                            <li key={medIndex} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              <div className="font-medium">{med.denominacionComun}</div>
                              <div className="text-xs text-gray-500">
                                Concentración: {med.concentracion} {med.unidadMedida} - {med.formaFarmaceutica} - {med.viaAdministracion}
                              </div>
                              <div className="text-xs text-gray-500">
                                Dosis: {med.dosis} - Frecuencia: {med.frecuencia} - Días: {med.diasTratamiento} - Cantidad: {med.cantidadLetras}
                              </div>
                              {med.indicaciones && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Indicaciones: {med.indicaciones}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No hay fórmulas médicas previas</p>
              )}
            </div>
          )}

          {/* Formulario de nueva fórmula médica */}
          <FormulasMedicasCompleta
            citaData={citaData}
            doctorData={doctorData}
            onSave={handleFormulaGuardada}
            onCancel={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default FormulasMedicasManager;