import React from 'react';
import type { FormulaMedicaResponse } from '../../../../services/formulaMedicaService';
import { FormulaMedicaService } from '../../../../services/formulaMedicaService';

interface DetalleFormulaMedicaProps {
  formula: FormulaMedicaResponse;
  onCerrar: () => void;
}

const DetalleFormulaMedica: React.FC<DetalleFormulaMedicaProps> = ({
  formula,
  onCerrar
}) => {
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatearFrecuencia = (frecuencia: string) => {
    const frecuencias: { [key: string]: string } = {
      '4': 'Cada 4 horas',
      '6': 'Cada 6 horas',
      '8': 'Cada 8 horas',
      '12': 'Cada 12 horas',
      '24': 'Cada 24 horas',
      '48': 'Cada 48 horas',
      '72': 'Cada 72 horas',
      '168': 'Una vez a la semana'
    };
    return frecuencias[frecuencia] || frecuencia;
  };

  const handleVerPDF = () => {
    if (formula.pdfUrl) {
      FormulaMedicaService.abrirPDF(formula.pdfUrl);
    }
  };

  const handleDescargarPDF = async () => {
    if (formula.pdfUrl) {
      try {
        await FormulaMedicaService.descargarPDF(formula.pdfUrl);
      } catch (error) {
        console.error('Error al descargar PDF:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Detalle de Fórmula Médica #{formula.data._id.slice(-6)}
          </h2>
          <div className="flex space-x-2">
            {formula.pdfUrl && (
              <>
                <button
                  onClick={handleVerPDF}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-400 text-white rounded text-sm transition duration-200"
                >
                  👁️ Ver PDF
                </button>
                <button
                  onClick={handleDescargarPDF}
                  className="px-3 py-1 bg-green-500 hover:bg-green-400 text-white rounded text-sm transition duration-200"
                >
                  📥 Descargar
                </button>
              </>
            )}
            <button
              onClick={onCerrar}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-400 text-white rounded text-sm transition duration-200"
            >
              ✕ Cerrar
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Información general */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Información General</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de creación</label>
                <p className="text-sm text-gray-900">{formatearFecha(formula.data.createdAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Última actualización</label>
                <p className="text-sm text-gray-900">{formatearFecha(formula.data.updatedAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID de la cita</label>
                <p className="text-sm text-gray-900 font-mono">{formula.data.citaId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total de medicamentos</label>
                <p className="text-sm text-gray-900">{formula.data.medicamentos.length}</p>
              </div>
            </div>
          </div>

          {/* Medicamentos */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Medicamentos Prescritos</h3>
            <div className="space-y-4">
              {formula.data.medicamentos.map((medicamento, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-900">
                      Medicamento {index + 1}: {medicamento.denominacionComun}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Concentración</label>
                      <p className="text-sm text-gray-900">{medicamento.concentracion} {medicamento.unidadMedida}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Forma farmacéutica</label>
                      <p className="text-sm text-gray-900">{medicamento.formaFarmaceutica}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dosis</label>
                      <p className="text-sm text-gray-900">{medicamento.dosis}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vía de administración</label>
                      <p className="text-sm text-gray-900">{medicamento.viaAdministracion}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Frecuencia</label>
                      <p className="text-sm text-gray-900">{formatearFrecuencia(medicamento.frecuencia)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Días de tratamiento</label>
                      <p className="text-sm text-gray-900">{medicamento.diasTratamiento} días</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cantidad (números)</label>
                      <p className="text-sm text-gray-900">{medicamento.cantidadNumeros}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cantidad (letras)</label>
                      <p className="text-sm text-gray-900">{medicamento.cantidadLetras}</p>
                    </div>
                    {medicamento.fechaInicio && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                        <p className="text-sm text-gray-900">{medicamento.fechaInicio}</p>
                      </div>
                    )}
                    {medicamento.horaInicio && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Hora de inicio</label>
                        <p className="text-sm text-gray-900">{medicamento.horaInicio}</p>
                      </div>
                    )}
                  </div>
                  
                  {medicamento.indicaciones && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Indicaciones</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{medicamento.indicaciones}</p>
                    </div>
                  )}

                  {medicamento.recordatorios && medicamento.recordatorios.length > 0 && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Recordatorios</label>
                      <div className="space-y-1">
                        {medicamento.recordatorios.map((recordatorio, idx) => (
                          <p key={idx} className="text-sm text-gray-900">
                            {recordatorio.fecha} a las {recordatorio.hora}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Diagnósticos */}
          {formula.data.diagnosticos && formula.data.diagnosticos.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Diagnósticos</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Diagnóstico</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Relación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {formula.data.diagnosticos.map((diagnostico, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{diagnostico.codigo}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{diagnostico.nombre}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{diagnostico.tipo || 'N/A'}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{diagnostico.relacionado || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleFormulaMedica;
