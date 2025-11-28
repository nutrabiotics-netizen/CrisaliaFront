import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState } from 'react';
import {
  UserIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const RecopilacionInformacion = () => {
  const [activeSection, setActiveSection] = useState<string>('personal');

  const sections = [
    { id: 'personal', name: 'Datos Personales', icon: UserIcon },
    { id: 'profesional', name: 'Datos Profesionales', icon: AcademicCapIcon },
    { id: 'documentos', name: 'Documentos Legales', icon: DocumentTextIcon },
    { id: 'seguridad', name: 'Seguridad y Protección', icon: ShieldCheckIcon },
    { id: 'facturacion', name: 'Facturación y Pago', icon: CreditCardIcon }
  ];

  return (
    <MedicoLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Recopilación de la Información
          </h1>
          <p className="text-gray-600 mb-6">
            Complete toda la información necesaria para su registro como médico en CRISALIA
          </p>

          {/* Navegación de Secciones */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeSection === section.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <section.icon className="h-5 w-5 mr-2" />
                  {section.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Datos Personales */}
          {activeSection === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Datos Personales y Profesionales para Verificación de Identidad
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Género *
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option>Seleccione...</option>
                    <option>Masculino</option>
                    <option>Femenino</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de nacimiento *
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de documento *
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option>Cédula de Ciudadanía</option>
                    <option>Cédula de Extranjería</option>
                    <option>Pasaporte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de documento *
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    País *
                  </label>
                  <input
                    type="text"
                    defaultValue="Colombia"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad de vivienda *
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección de vivienda *
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código postal
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Celular de contacto *
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fotos del médico y su entorno clínico
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Datos Profesionales */}
          {activeSection === 'profesional' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Datos Profesionales
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Registro Médico:</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ReTHUS o tarjeta profesional *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Número de registro"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subir documento
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Título profesional universitario:</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Médico / Médico cirujano *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Especialidad médica (si aplica)
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Formación en Medicina Funcional:</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-700">Diplomado en MF</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-700">Formación certificada o en curso con IFM</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-700">Formación con Kresser</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-700">Formación con FMU</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Estilo de Práctica y Modalidades Terapéuticas:</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estilo de práctica, modalidades semiológicas y terapéuticas
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Describa su estilo de práctica..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Selección de motivos generales de consulta que atenderá
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Liste los motivos de consulta..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Datos de Habilitación Profesional:</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de registro ante el Ministerio de Salud
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección del consultorio habilitado
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono del lugar de trabajo
                      </label>
                      <input
                        type="tel"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documentos Legales */}
          {activeSection === 'documentos' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Documentos Legales y de Cumplimiento de Ley
              </h2>
              <p className="text-gray-600 mb-4">
                El médico debe entregar los siguientes documentos en formato digital:
              </p>
              <div className="space-y-4">
                {[
                  { name: 'Copia de la tarjeta profesional o certificación de ReTHUS', required: true },
                  { name: 'Copia de la cédula de ciudadanía', required: true },
                  { name: 'RUT actualizado (Registro Único Tributario)', required: true },
                  { name: 'Autorización de tratamiento de datos personales (Habeas Data)', required: true },
                  { name: 'Consentimiento informado para el uso de la IA en historias clínicas', required: true }
                ].map((doc, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          {doc.required && (
                            <span className="text-xs text-red-600">Requerido</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.png"
                          className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seguridad y Protección */}
          {activeSection === 'seguridad' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Seguridad y Protección de Datos
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Verificación de identidad:</h3>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm text-gray-700">¿Requiere validación mediante datos biométricos?</span>
                  </label>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Autorizaciones necesarias:</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="ml-2 text-sm text-gray-700">Almacenamiento y cifrado de datos en la nube</span>
                    </label>
                    <div className="ml-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Permiso para compartir datos anonimizados con fines:</p>
                      <div className="space-y-1">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <span className="ml-2 text-sm text-gray-700">Estadísticos</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <span className="ml-2 text-sm text-gray-700">Mejora del software</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <span className="ml-2 text-sm text-gray-700">Entrenamiento de IA</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Facturación y Pago */}
          {activeSection === 'facturacion' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Información de Facturación y Pago
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Tipo de facturación:</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center mb-3">
                        <input type="radio" name="facturacion" value="juridica" className="text-indigo-600 focus:ring-indigo-500" />
                        <span className="ml-2 font-medium text-gray-900">Persona Jurídica</span>
                      </label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ml-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Razón social</label>
                          <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">NIT</label>
                          <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                          <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Régimen tributario</label>
                          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            <option>Simplificado</option>
                            <option>Común</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center mb-3">
                        <input type="radio" name="facturacion" value="natural" className="text-indigo-600 focus:ring-indigo-500" />
                        <span className="ml-2 font-medium text-gray-900">Persona Natural</span>
                      </label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ml-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                          <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cédula de ciudadanía</label>
                          <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                          <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">RUT (Registro Único Tributario)</label>
                          <input type="text" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Método de pago preferido:</h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {['Tarjeta de crédito', 'Débito automático', 'Transferencia bancaria', 'Otros'].map((method) => (
                      <label key={method} className="flex items-center border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                        <input type="radio" name="pago" value={method.toLowerCase()} className="text-indigo-600 focus:ring-indigo-500" />
                        <span className="ml-2 text-sm text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-red-600">* No se autoriza pago en efectivo.</p>
                </div>
              </div>
            </div>
          )}

          {/* Botones de Acción */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Guardar Borrador
            </button>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Anterior
              </button>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default RecopilacionInformacion;

