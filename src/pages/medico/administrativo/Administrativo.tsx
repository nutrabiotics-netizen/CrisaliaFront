import MedicoLayout from '../../../components/layout/MedicoLayout';
import { useState } from 'react';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  SparklesIcon,
  DocumentArrowDownIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ArrowPathIcon,
  QrCodeIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

const Administrativo = () => {
  const [activeSection, setActiveSection] = useState<'transicion' | 'colaboracion' | 'migracion'>('transicion');

  return (
    <MedicoLayout>
      <div className="space-y-6">
        {/* Transición Segura de Información Clínica */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <ShieldCheckIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Transición Segura de Información Clínica con Cristal-iA
            </h1>
          </div>
          <p className="text-gray-600 mb-6">
            Para garantizar una migración segura, eficiente y conforme a la normativa legal vigente sobre protección de datos personales (habeas data), el médico deberá leer y firmar los consentimientos, términos y condiciones establecidos.
          </p>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveSection('transicion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === 'transicion'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Transición de Datos
              </button>
              <button
                onClick={() => setActiveSection('colaboracion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === 'colaboracion'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Colaboración Médica
              </button>
              <button
                onClick={() => setActiveSection('migracion')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === 'migracion'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Migración de Datos
              </button>
            </nav>
          </div>

          {/* Transición de Datos */}
          {activeSection === 'transicion' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Opciones de Migración Disponibles
                </h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start">
                      <CloudArrowUpIcon className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Envío de Información en Formatos Existentes
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          El médico puede enviar la información de sus pacientes en los diferentes formatos existentes, o autorizar un acceso seguro a su sistema actual para facilitar la integración automatizada mediante APIs o interoperabilidad HL7 FHIR u otros.
                        </p>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                          Iniciar Migración
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start">
                      <DocumentArrowDownIcon className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Archivos Escritos a Mano
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Crisal-iA presentará app en la cual se cargan fotos de los folios de las historias clínicas y se transcriben a PDF, luego se alimentará el historial del paciente en cuestión.
                        </p>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                          Subir Fotos
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start">
                      <SparklesIcon className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Análisis y Procesamiento Automático
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Nuestro sistema analizará los datos que aterrizan en Crisal-iA, integrará la información clínica y generará automáticamente un flujo de funciones correspondiente a lo descrito para una consulta de control.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start">
                      <SparklesIcon className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Completamiento Automático de Información
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          El agente inteligente de Cristal-iA también puede encargarse de completar la información faltante, contactar a los pacientes mediante un chatbot para validarla y enriquecer el perfil clínico de cada uno.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Código QR para Pacientes */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <QrCodeIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Código QR para Resumen de Historia Clínica
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Crisal-iA activará un código QR por medio del cual el paciente podrá obtener un resumen de su historia clínica y disponer de la información para sí mismo o un nuevo MD tratante dentro o fuera de nuestro SW.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <QrCodeIcon className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                  Generar Código QR
                </button>
              </div>

              {/* Terminación de Suscripción */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  En caso de terminación o cancelación de la suscripción
                </h3>
                <p className="text-sm text-gray-700">
                  Conforme a las normativas de interoperabilidad se entregará al MD toda la data de sus pacientes en el formato indicado para ser administrado bajo su dominio.
                </p>
              </div>
            </div>
          )}

          {/* Colaboración Médica */}
          {activeSection === 'colaboracion' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <UserGroupIcon className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Colaboración Médica en Cristal-IA
                  </h2>
                </div>
                <p className="text-gray-700 mb-6">
                  En caso de requerir la remisión a otro especialista, Cristal-IA ofrecerá herramientas para facilitar el trabajo en equipo y la comunicación entre profesionales de la salud.
                </p>
              </div>

              {/* Chat Privado entre Especialistas */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Chat Privado entre Especialistas
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Espacio seguro para discutir casos clínicos en tiempo real, garantizando confidencialidad y eficiencia en la toma de decisiones.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 min-h-48">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs font-medium text-indigo-600">MD</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 bg-white rounded-lg p-2">
                          Hola Dr. García, necesito su opinión sobre el caso de María González...
                        </p>
                        <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <input
                      type="text"
                      placeholder="Escribir mensaje..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
                      Enviar
                    </button>
                  </div>
                </div>
              </div>

              {/* Junta Médica Virtual */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <UsersIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Junta Médica Virtual
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Plataforma integrada que permite la colaboración multidisciplinaria en torno a un paciente, optimizando el abordaje y la personalización del tratamiento.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <p className="font-medium text-gray-900 mb-1">Crear Junta Médica</p>
                    <p className="text-sm text-gray-500">Iniciar sesión colaborativa</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                    <p className="font-medium text-gray-900 mb-1">Ver Juntas Programadas</p>
                    <p className="text-sm text-gray-500">2 juntas esta semana</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Migración de Datos */}
          {activeSection === 'migracion' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Proceso de Migración de Datos
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  Una vez completado el paso de consentimientos, podrá contactar a nuestro equipo de asesores, quienes lo guiarán en la selección del mecanismo más adecuado para transferir la información clínica de sus pacientes desde su software anterior a Cristal-iA.
                </p>
              </div>

              {/* Estado de Migración */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Estado de Migración</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Migración de Historias Clínicas</p>
                      <p className="text-sm text-gray-500">1,234 pacientes</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Procesamiento de Documentos</p>
                      <p className="text-sm text-gray-500">456 documentos</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">60%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contactar Asesores */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contactar con Nuestro Equipo</h3>
                <p className="text-gray-600 mb-4">
                  Nuestro equipo de asesores está disponible para guiarlo en el proceso de migración
                </p>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Contactar Asesor
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actualización de CIE-11 */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <ArrowPathIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              Actualización de Cristal-IA a CIE-11
            </h2>
          </div>
          <p className="text-gray-600 mb-4">
            Cristal-IA deberá contar con la capacidad de adaptarse rápidamente a la actualización del CIE-10 al CIE-11, garantizando precisión y alineación con los estándares internacionales de codificación médica.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Estado de Actualización</p>
                <p className="text-sm text-gray-600">Sistema preparado para migración a CIE-11</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                Listo
              </span>
            </div>
          </div>
        </div>
      </div>
    </MedicoLayout>
  );
};

export default Administrativo;
