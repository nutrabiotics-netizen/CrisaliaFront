import AdministrativoLayout from '../../../components/layout/AdministrativoLayout';
import { 
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const RipsFacturacion = () => {
  const [activePhase, setActivePhase] = useState<'fase1' | 'fase2' | 'fase3' | 'fase4' | 'fase5'>('fase1');

  const ripsFiles = [
    { code: 'US', name: 'Datos del Usuario', status: 'completo', records: 150 },
    { code: 'AC', name: 'Consultas', status: 'completo', records: 89 },
    { code: 'AM', name: 'Medicamentos', status: 'pendiente', records: 0 },
    { code: 'AP', name: 'Procedimientos', status: 'completo', records: 45 },
    { code: 'AT', name: 'Urgencias', status: 'no-aplica', records: 0 },
    { code: 'AU', name: 'Otros Servicios', status: 'completo', records: 12 },
    { code: 'AF', name: 'Factura', status: 'completo', records: 89 },
    { code: 'CT', name: 'Control Maestro', status: 'pendiente', records: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'no-aplica':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <AdministrativoLayout>
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center mr-4">
              <DocumentTextIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-ibrand text-crisal-azul mb-2">
                Módulo de RIPS y Facturación
              </h1>
              <p className="font-poppins text-crisal-azul opacity-70">
                Gestión completa de Registros Individuales de Prestación de Servicios de Salud
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-crisal-gris mb-6">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActivePhase('fase1')}
                className={`${
                  activePhase === 'fase1'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                } whitespace-nowrap py-4 px-1 border-b-2 font-poppins-medium text-sm transition-colors`}
              >
                Fase 1: Captura de Datos
              </button>
              <button
                onClick={() => setActivePhase('fase2')}
                className={`${
                  activePhase === 'fase2'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                } whitespace-nowrap py-4 px-1 border-b-2 font-poppins-medium text-sm transition-colors`}
              >
                Fase 2: Consolidación
              </button>
              <button
                onClick={() => setActivePhase('fase3')}
                className={`${
                  activePhase === 'fase3'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                } whitespace-nowrap py-4 px-1 border-b-2 font-poppins-medium text-sm transition-colors`}
              >
                Fase 3: Validación
              </button>
              <button
                onClick={() => setActivePhase('fase4')}
                className={`${
                  activePhase === 'fase4'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                } whitespace-nowrap py-4 px-1 border-b-2 font-poppins-medium text-sm transition-colors`}
              >
                Fase 4: Generación y Envío
              </button>
              <button
                onClick={() => setActivePhase('fase5')}
                className={`${
                  activePhase === 'fase5'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                } whitespace-nowrap py-4 px-1 border-b-2 font-poppins-medium text-sm transition-colors`}
              >
                Fase 5: Almacenamiento
              </button>
            </nav>
          </div>

          {/* FASE 1: Captura de Datos */}
          {activePhase === 'fase1' && (
            <div className="space-y-6">
              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-6">
                <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                  FASE 1: Captura de Datos en la Historia Clínica
                </h2>
                <p className="font-poppins text-crisal-azul opacity-80 mb-4">
                  Objetivo: Capturar de forma estructurada los datos requeridos por los RIPS
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      1. Ingreso y consolidación de datos clínicos y administrativos obligatorios
                    </h3>
                    <p className="font-poppins text-sm text-crisal-azul opacity-70">
                      Es el equivalente a crear o actualizar la ficha maestra del usuario, y constituye la base de los registros RIPS, específicamente del archivo US (Usuarios).
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      2. Asignación y realización del servicio
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Registro de tipo de atención: consulta externa</li>
                      <li>Asignación del profesional responsable</li>
                      <li>Registro del código del servicio (CUPS actualizado) y fecha de atención</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      3. Registro clínico estructurado
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Anamnesis, examen físico, diagnósticos codificados (CIE-10-11)</li>
                      <li>Plan de manejo y procedimientos realizados</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      4. Prescripción o generación de servicios asociados
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Orden de medicamentos, procedimientos, imágenes, interconsultas, etc.</li>
                      <li>Codificación de cada ítem según manual tarifario vigente</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FASE 2: Consolidación */}
          {activePhase === 'fase2' && (
            <div className="space-y-6">
              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-6">
                <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                  FASE 2: Consolidación de la Atención para Generar el Registro RIPS
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      5. Cierre de atención / encuentro
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Validación de que todos los datos requeridos por los archivos RIPS estén completos</li>
                      <li>Confirmación del cierre administrativo y clínico del episodio</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      6. Construcción automatizada de archivos RIPS
                    </h3>
                    <p className="font-poppins text-sm text-crisal-azul opacity-70 mb-2">
                      Validación interna de campos obligatorios y formatos de los archivos planos para generar formatos JSON:
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {ripsFiles.map((file) => (
                        <div
                          key={file.code}
                          className={`p-2 rounded border ${getStatusColor(file.status)}`}
                        >
                          <div className="font-poppins-semibold text-xs">{file.code}</div>
                          <div className="font-poppins text-xs opacity-80">{file.name}</div>
                          <div className="font-poppins text-xs mt-1">{file.records} registros</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FASE 3: Validación */}
          {activePhase === 'fase3' && (
            <div className="space-y-6">
              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-6">
                <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                  FASE 3: Validación Técnica y de Integridad
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      7. Motor de validación automatizado
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-2 list-disc list-inside">
                      <li>Validación conforme a estructura de archivos planos del Ministerio de Salud (delimitadores, tipos de datos, longitud, campos obligatorios, etc.)</li>
                      <li>Validación de reglas cruzadas (por ejemplo: que un procedimiento registrado en AP esté asociado a un usuario en US)</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      8. Reporte de inconsistencias
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-2 list-disc list-inside">
                      <li>Notificación automática al perfil administrativo para corrección</li>
                      <li>Mecanismo de trazabilidad y control de errores antes de generar el archivo definitivo</li>
                    </ul>
                  </div>

                  {/* Estado de Validación */}
                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand font-semibold text-crisal-azul mb-4">
                      Estado de Validación
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-poppins text-sm text-crisal-azul">Archivo US: Validado</span>
                        </div>
                        <span className="font-poppins text-xs text-green-600">150 registros</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mr-2" />
                          <span className="font-poppins text-sm text-crisal-azul">Archivo AM: Pendiente validación</span>
                        </div>
                        <span className="font-poppins text-xs text-yellow-600">0 registros</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FASE 4: Generación y Envío */}
          {activePhase === 'fase4' && (
            <div className="space-y-6">
              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-6">
                <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                  FASE 4: Generación y Envío del RIPS
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      9. Generación del archivo CT (Control Total)
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Consolidación de todos los demás archivos y su conteo de registros</li>
                      <li>El archivo CT debe incluir fecha, número de registros por archivo y nombre del prestador</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      10. Compresión y firma digital del paquete RIPS
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Generación del paquete .zip con los archivos planos</li>
                      <li>Aplicación de firma digital si se requiere validación por entidad receptora</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      11. Entrega o envío
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Envío del archivo al sistema habilitado por la EPS, Secretaría de Salud o al repositorio nacional definido por MinSalud</li>
                      <li>Integración futura con repositorio de información clínica interoperable</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      12. Acuse de recibo y trazabilidad
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Confirmación del recibo y validación de carga</li>
                      <li>Registro del evento dentro del historial del sistema, con sello de tiempo</li>
                    </ul>
                  </div>

                  {/* Acciones */}
                  <div className="bg-white rounded-lg p-6 border border-crisal-gris">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-ibrand text-crisal-azul">
                        Generar Paquete RIPS
                      </h3>
                      <button className="btn-primary font-poppins">
                        <ArrowDownTrayIcon className="h-5 w-5 mr-2 inline" />
                        Generar y Descargar
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-crisal-gris rounded-lg">
                        <span className="font-poppins text-sm text-crisal-azul">Período:</span>
                        <span className="font-poppins text-sm font-semibold text-crisal-azul">Noviembre 2025</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-crisal-gris rounded-lg">
                        <span className="font-poppins text-sm text-crisal-azul">Total de registros:</span>
                        <span className="font-poppins text-sm font-semibold text-crisal-azul">385</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FASE 5: Almacenamiento */}
          {activePhase === 'fase5' && (
            <div className="space-y-6">
              <div className="bg-crisal-turquesa/10 border border-crisal-turquesa rounded-xl p-6">
                <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                  FASE 5: Almacenamiento y Auditoría
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      13. Almacenamiento local y en la nube
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Copia interna cifrada y respaldo del paquete RIPS por mínimo 5 años, según normatividad</li>
                      <li>Indexación por tipo de atención, número de factura y usuario</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-crisal-gris">
                    <h3 className="font-ibrand text-crisal-azul mb-3">
                      14. Auditoría técnica
                    </h3>
                    <ul className="font-poppins text-sm text-crisal-azul opacity-70 space-y-1 list-disc list-inside">
                      <li>Registro en log de sistema de todos los eventos (fecha de creación, validaciones, errores, correcciones, envíos, acuses)</li>
                      <li>Panel de auditoría accesible para perfil administrativo y técnico autorizado</li>
                    </ul>
                  </div>

                  {/* Historial de Envíos */}
                  <div className="bg-white rounded-lg p-6 border border-crisal-gris">
                    <h3 className="font-ibrand font-semibold text-crisal-azul mb-4">
                      Historial de Envíos RIPS
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-crisal-gris rounded-lg">
                        <div>
                          <p className="font-poppins font-semibold text-crisal-azul">Noviembre 2025</p>
                          <p className="font-poppins text-xs text-crisal-azul opacity-70">Enviado: 26 Nov 2025, 10:30 AM</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          <span className="font-poppins text-sm text-green-600">Confirmado</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-crisal-gris rounded-lg">
                        <div>
                          <p className="font-poppins font-semibold text-crisal-azul">Octubre 2025</p>
                          <p className="font-poppins text-xs text-crisal-azul opacity-70">Enviado: 31 Oct 2025, 09:15 AM</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          <span className="font-poppins text-sm text-green-600">Confirmado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdministrativoLayout>
  );
};

export default RipsFacturacion;

