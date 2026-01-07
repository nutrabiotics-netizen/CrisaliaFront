import React, { useEffect, useState } from 'react';
import { FormulaMedicaService } from '../../../../services/formulaMedicaService';
import type { FormulaMedicaResponse } from '../../../../services/formulaMedicaService';
import { useAlert } from '../../../../contexts/AlertContext';

interface ListaFormulasMedicasProps {
  pacienteId: string;
  onVerFormula?: (formula: FormulaMedicaResponse) => void;
  onNuevaFormula?: () => void;
}

const ListaFormulasMedicas: React.FC<ListaFormulasMedicasProps> = ({
  pacienteId,
  onVerFormula,
  onNuevaFormula
}) => {
  const [formulas, setFormulas] = useState<FormulaMedicaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    cargarFormulas();
  }, [pacienteId]);

  const cargarFormulas = async () => {
    try {
      setLoading(true);
      const formulasData = await FormulaMedicaService.obtenerFormulasMedicasPorPaciente(pacienteId);
      // Asegurar que formulasData sea un array
      setFormulas(Array.isArray(formulasData) ? formulasData : []);
    } catch (error: any) {
      console.error('Error al cargar fórmulas médicas:', error);
      setFormulas([]); // Asegurar que siempre sea un array
      showAlert({
        type: 'error',
        title: 'Error',
        message: 'No se pudieron cargar las fórmulas médicas'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleVerPDF = (formula: FormulaMedicaResponse) => {
    if (formula.pdfUrl) {
      FormulaMedicaService.abrirPDF(formula.pdfUrl);
    } else {
      showAlert({
        type: 'warning',
        title: 'PDF no disponible',
        message: 'El PDF de esta fórmula médica no está disponible'
      });
    }
  };

  const handleDescargarPDF = async (formula: FormulaMedicaResponse) => {
    if (formula.pdfUrl) {
      try {
        await FormulaMedicaService.descargarPDF(formula.pdfUrl);
      } catch (error) {
        showAlert({
          type: 'error',
          title: 'Error',
          message: 'No se pudo descargar el PDF'
        });
      }
    } else {
      showAlert({
        type: 'warning',
        title: 'PDF no disponible',
        message: 'El PDF de esta fórmula médica no está disponible'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Fórmulas Médicas</h3>
        {onNuevaFormula && (
          <button
            onClick={onNuevaFormula}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
          >
            Nueva Fórmula
          </button>
        )}
      </div>

      {formulas.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay fórmulas médicas registradas para este paciente</p>
        </div>
      ) : (
        <div className="space-y-3">
          {formulas.map((formula) => (
            <div
              key={formula.data._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-gray-900">
                      Fórmula #{formula.data._id.slice(-6)}
                    </h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {formula.data.medicamentos.length} medicamento{formula.data.medicamentos.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    Creada el {formatearFecha(formula.data.createdAt)}
                  </p>
                  
                  <div className="text-sm text-gray-500">
                    <p>Medicamentos:</p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      {formula.data.medicamentos.slice(0, 3).map((med, index) => (
                        <li key={index}>
                          {med.denominacionComun} - {med.dosis} {med.unidadMedida}
                        </li>
                      ))}
                      {formula.data.medicamentos.length > 3 && (
                        <li className="text-gray-400">
                          ... y {formula.data.medicamentos.length - 3} más
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleVerPDF(formula)}
                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition duration-200"
                    title="Ver PDF"
                  >
                    👁️ Ver
                  </button>
                  <button
                    onClick={() => handleDescargarPDF(formula)}
                    className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded transition duration-200"
                    title="Descargar PDF"
                  >
                    📥 Descargar
                  </button>
                  {onVerFormula && (
                    <button
                      onClick={() => onVerFormula(formula)}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition duration-200"
                      title="Ver detalles"
                    >
                      📋 Detalles
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaFormulasMedicas;
