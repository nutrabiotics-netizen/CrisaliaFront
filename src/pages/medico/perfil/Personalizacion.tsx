import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState } from 'react';
import {
  Cog6ToothIcon,
  DocumentTextIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BellIcon,
  TagIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const Personalizacion = () => {
  const [activeTab, setActiveTab] = useState<'preajustes' | 'agenda' | 'documentos'>('preajustes');

  return (
    <MedicoLayout>
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-crisal-turquesa to-crisal-azul rounded-full flex items-center justify-center mr-4">
              <Cog6ToothIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-ibrand text-crisal-azul">
                Personalización
              </h1>
              <p className="font-poppins text-crisal-azul opacity-70 mt-1">
                Configure sus preferencias y personalizaciones para optimizar su experiencia en Crisal•IA
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-crisal-gris mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('preajustes')}
                className={`py-4 px-1 border-b-2 font-poppins font-medium text-sm transition-colors ${
                  activeTab === 'preajustes'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                }`}
              >
                Preajustes de Consulta
              </button>
              <button
                onClick={() => setActiveTab('agenda')}
                className={`py-4 px-1 border-b-2 font-poppins font-medium text-sm transition-colors ${
                  activeTab === 'agenda'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                }`}
              >
                Gestión de Agenda
              </button>
              <button
                onClick={() => setActiveTab('documentos')}
                className={`py-4 px-1 border-b-2 font-poppins font-medium text-sm transition-colors ${
                  activeTab === 'documentos'
                    ? 'border-crisal-turquesa text-crisal-azul'
                    : 'border-transparent text-crisal-azul opacity-60 hover:opacity-100 hover:border-crisal-gris'
                }`}
              >
                Documentos y Fórmulas
              </button>
            </nav>
          </div>

          {/* Preajustes de Consulta */}
          {activeTab === 'preajustes' && (
            <div className="space-y-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                Preajustes para Consulta General
              </h2>

              {/* Recomendaciones Automáticas */}
              <div className="border border-crisal-gris rounded-xl p-4 bg-crisal-gris/30">
                <h3 className="font-ibrand font-medium text-crisal-azul mb-3">Recomendaciones Automáticas</h3>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-crisal-gris text-crisal-turquesa focus:ring-crisal-turquesa" defaultChecked />
                  <span className="ml-2 text-sm font-poppins text-crisal-azul">Activar recomendaciones automáticas de la IA</span>
                </label>
              </div>

              {/* Tiempos de Respuesta */}
              <div className="border border-crisal-gris rounded-xl p-4 bg-crisal-gris/30">
                <h3 className="font-ibrand font-medium text-crisal-azul mb-3 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-crisal-turquesa" />
                  Tiempos de Respuesta para Preconsulta
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Tiempo máximo de respuesta (horas)
                    </label>
                    <input
                      type="number"
                      defaultValue={48}
                      className="input-field font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Recordatorio antes de vencer (horas)
                    </label>
                    <input
                      type="number"
                      defaultValue={12}
                      className="input-field font-poppins"
                    />
                  </div>
                </div>
              </div>

              {/* Duración y Precios */}
              <div className="border border-crisal-gris rounded-xl p-4 bg-crisal-gris/30">
                <h3 className="font-ibrand font-medium text-crisal-azul mb-3 flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-crisal-turquesa" />
                  Duración y Precios de Consultas
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Consulta Inicial (minutos)
                    </label>
                    <input
                      type="number"
                      defaultValue={60}
                      className="input-field font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Consulta de Seguimiento (minutos)
                    </label>
                    <input
                      type="number"
                      defaultValue={30}
                      className="input-field font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Consulta de Revaloración (minutos)
                    </label>
                    <input
                      type="number"
                      defaultValue={45}
                      className="input-field font-poppins"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-4">
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Precio Consulta Inicial ($)
                    </label>
                    <input
                      type="number"
                      defaultValue={200000}
                      className="input-field font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Precio Seguimiento ($)
                    </label>
                    <input
                      type="number"
                      defaultValue={150000}
                      className="input-field font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Precio Revaloración ($)
                    </label>
                    <input
                      type="number"
                      defaultValue={180000}
                      className="input-field font-poppins"
                    />
                  </div>
                </div>
              </div>

              {/* Requisitos para Consulta */}
              <div className="border border-crisal-gris rounded-xl p-4 bg-crisal-gris/30">
                <h3 className="font-ibrand font-medium text-crisal-azul mb-3">Requisitos que debe cumplir el paciente</h3>
                <textarea
                  rows={4}
                  className="input-field font-poppins"
                  placeholder="Ej: Anamnesis completada, resultados de laboratorio cargados..."
                />
              </div>

              {/* Activación de Secciones ET */}
              <div className="border border-crisal-gris rounded-xl p-4 bg-crisal-gris/30">
                <h3 className="font-ibrand font-medium text-crisal-azul mb-3">Activación de Secciones de Estrategias Terapéuticas (ET)</h3>
                <div className="space-y-2">
                  {[
                    'Formulación Nutrabiotics',
                    'Prescripción de Medicamentos',
                    'Ejercicios y Rutinas',
                    'Recomendaciones Alimentarias',
                    'Terapias Complementarias',
                    'Dispositivos Wearables'
                  ].map((section) => (
                    <label key={section} className="flex items-center">
                      <input type="checkbox" className="rounded border-crisal-gris text-crisal-turquesa focus:ring-crisal-turquesa" defaultChecked />
                      <span className="ml-2 text-sm font-poppins text-crisal-azul">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Descuentos */}
              <div className="border border-crisal-gris rounded-xl p-4 bg-crisal-gris/30">
                <h3 className="font-ibrand font-medium text-crisal-azul mb-3 flex items-center">
                  <TagIcon className="h-5 w-5 mr-2 text-crisal-turquesa" />
                  Estrategias de Venta y Descuentos
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Porcentaje de descuento general (%)
                    </label>
                    <input
                      type="number"
                      defaultValue={0}
                      min={0}
                      max={100}
                      className="input-field font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                      Porcentaje guardado para nueva cita (%)
                    </label>
                    <input
                      type="number"
                      defaultValue={10}
                      min={0}
                      max={100}
                      className="input-field font-poppins"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-poppins font-medium text-crisal-azul mb-2">
                    Códigos de Descuento
                  </label>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 border border-crisal-gris rounded-lg hover:bg-crisal-gris flex items-center justify-between transition-colors">
                      <span className="text-sm font-poppins text-crisal-azul">Crear código permanente</span>
                      <TagIcon className="h-5 w-5 text-crisal-turquesa" />
                    </button>
                    <button className="w-full text-left px-4 py-2 border border-crisal-gris rounded-lg hover:bg-crisal-gris flex items-center justify-between transition-colors">
                      <span className="text-sm font-poppins text-crisal-azul">Crear código único</span>
                      <TagIcon className="h-5 w-5 text-crisal-turquesa" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Comunicación y Notificaciones */}
              <div className="border border-crisal-gris rounded-xl p-4 bg-crisal-gris/30">
                <h3 className="font-ibrand font-medium text-crisal-azul mb-3 flex items-center">
                  <BellIcon className="h-5 w-5 mr-2 text-crisal-turquesa" />
                  Medios de Comunicación y Notificaciones
                </h3>
                <div className="space-y-2">
                  {['Email', 'WhatsApp', 'SMS', 'Notificaciones en App'].map((medio) => (
                    <label key={medio} className="flex items-center">
                      <input type="checkbox" className="rounded border-crisal-gris text-crisal-turquesa focus:ring-crisal-turquesa" defaultChecked />
                      <span className="ml-2 text-sm font-poppins text-crisal-azul">{medio}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Gestión de Agenda */}
          {activeTab === 'agenda' && (
            <div className="space-y-6">
              <h2 className="text-xl font-ibrand text-crisal-azul mb-4">
                Herramienta de Personalización de Agenda
              </h2>

              {/* Jornadas Activas */}
              <div className="border border-crisal-gris rounded-xl p-4 bg-crisal-gris/30">
                <h3 className="font-ibrand font-medium text-crisal-azul mb-3">Asignar Jornadas Activas</h3>
                <p className="text-sm font-poppins text-crisal-azul opacity-80 mb-4">
                  Asigne jornadas activas para las semanas o meses siguientes
                </p>
                <div className="space-y-3">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
                    <div key={dia} className="flex items-center justify-between p-3 bg-white rounded-lg border border-crisal-gris">
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded border-crisal-gris text-crisal-turquesa focus:ring-crisal-turquesa" />
                        <span className="ml-3 font-poppins font-medium text-crisal-azul">{dia}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          defaultValue="08:00"
                          className="input-field font-poppins"
                        />
                        <span className="text-crisal-azul opacity-60">-</span>
                        <input
                          type="time"
                          defaultValue="18:00"
                          className="input-field font-poppins"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modalidad de Atención */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Modalidad de Atención por Jornada</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Modalidad Matutina
                    </label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                      <option>Presencial</option>
                      <option>Virtual</option>
                      <option>Mixta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Modalidad Vespertina
                    </label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                      <option>Presencial</option>
                      <option>Virtual</option>
                      <option>Mixta</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tiempos de Inactividad */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Tiempos de Inactividad</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="time"
                      defaultValue="12:00"
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="time"
                      defaultValue="14:00"
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <span className="text-sm text-gray-600">Almuerzo</span>
                    <button className="text-red-600 hover:text-red-700 text-sm">Eliminar</button>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                    + Agregar tiempo de inactividad
                  </button>
                </div>
              </div>

              {/* Integración con Google Maps */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Integración con Google Maps</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección del Consultorio
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Ingrese la dirección completa"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    La IA utilizará esta información para optimizar la ubicación de pacientes
                  </p>
                </div>
              </div>

              {/* Optimización y Gestión Dinámica */}
              <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                <h3 className="font-medium text-gray-900 mb-3">Optimización y Gestión Dinámica de la Agenda</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-2">La IA manejará la cancelación y modificación de consultas para evitar espacios vacíos</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-2">Reubicará pacientes según su ubicación geográfica para maximizar la eficiencia</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2">La reubicación solo se realizará si la flexibilidad está habilitada</span>
                  </label>
                </div>
                <p className="mt-3 text-xs text-gray-600">
                  <strong>Nota:</strong> La IA tendrá la capacidad de notificar oportunamente al paciente sobre la cancelación programada o inesperada de la agenda del médico y ofrecerá alternativas más próximas disponibles
                </p>
              </div>

              {/* Integración con Calendarios */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Integración con Calendarios Externos</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Google Calendar</p>
                      <p className="text-sm text-gray-500">Sincronizar agenda con Google Calendar</p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm">Conectar</button>
                  </button>
                  <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Outlook</p>
                      <p className="text-sm text-gray-500">Sincronizar agenda con Outlook</p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm">Conectar</button>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Documentos y Fórmulas */}
          {activeTab === 'documentos' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Personalización de Documentos y Fórmulas para Pacientes
              </h2>

              {/* Logo Personal */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <PhotoIcon className="h-5 w-5 mr-2" />
                  Logo Personal
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <PhotoIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm">
                      Subir Logo
                    </button>
                    <p className="mt-2 text-xs text-gray-500">
                      Formatos: PNG, JPG, SVG (máx. 2MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Firma Digital */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Firma Digital</h3>
                <p className="text-sm text-gray-600 mb-4">
                  El software de historias clínicas debe integrar la firma digital conforme a los estándares técnicos exigidos por MinTIC y MinSalud, asegurando interoperabilidad, seguridad y trazabilidad.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-48 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm">
                      Configurar Firma Digital
                    </button>
                    <p className="mt-2 text-xs text-gray-500">
                      Requiere certificado digital válido
                    </p>
                  </div>
                </div>
              </div>

              {/* Plantillas de Documentos */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Plantillas de Documentos</h3>
                <div className="space-y-3">
                  {[
                    'Recetas Médicas',
                    'Órdenes de Laboratorio',
                    'Informes de Consulta',
                    'Recomendaciones Terapéuticas',
                    'Certificados Médicos'
                  ].map((doc) => (
                    <div key={doc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{doc}</span>
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-700 text-sm">Personalizar</button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm">Vista Previa</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automatización y Branding */}
              <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                <h3 className="font-medium text-gray-900 mb-2">Automatización y Branding</h3>
                <p className="text-sm text-gray-700">
                  Los documentos generados para el paciente incluirán automáticamente su logotipo personal y firma digital, reforzando su identidad profesional. Se garantizará un formato uniforme para las recetas, informes y recomendaciones, adaptado a la identidad de cada profesional de la salud.
                </p>
              </div>
            </div>
          )}

          {/* Botones de Acción */}
          <div className="flex justify-end pt-6 border-t border-crisal-gris">
            <button className="btn-secondary font-poppins mr-3">
              Cancelar
            </button>
            <button className="btn-primary font-poppins">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Personalizacion;

