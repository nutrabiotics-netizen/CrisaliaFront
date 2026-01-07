import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import interrogatorioService from '../../../services/interrogatorioService';
import { useAlert } from '../../../context/AlertContext';
import { Anamnesis } from '../../../types';

interface Pregunta {
  id: string;
  seccion: string;
  texto: string;
  tipo: 'texto' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'numero';
  opciones?: string[];
  requerida: boolean;
  placeholder?: string;
}

// Preguntas del interrogatorio de medicina funcional
const PREGUNTAS: Pregunta[] = [
  // Sección: Información General
  {
    id: 'motivo_consulta',
    seccion: 'Información General',
    texto: '¿Cuál es el motivo principal de su consulta?',
    tipo: 'textarea',
    requerida: true,
    placeholder: 'Describa brevemente el motivo de su consulta...'
  },
  {
    id: 'sintomas_principales',
    seccion: 'Información General',
    texto: '¿Cuáles son sus síntomas principales?',
    tipo: 'textarea',
    requerida: true,
    placeholder: 'Liste sus síntomas principales...'
  },
  {
    id: 'duracion_sintomas',
    seccion: 'Información General',
    texto: '¿Desde cuándo presenta estos síntomas?',
    tipo: 'texto',
    requerida: true,
    placeholder: 'Ej: 3 meses, 1 año, etc.'
  },
  
  // Sección: Antecedentes Personales
  {
    id: 'enfermedades_previas',
    seccion: 'Antecedentes Personales',
    texto: '¿Tiene alguna enfermedad previa o condición médica diagnosticada?',
    tipo: 'textarea',
    requerida: false,
    placeholder: 'Mencione enfermedades, cirugías, etc.'
  },
  {
    id: 'medicamentos_actuales',
    seccion: 'Antecedentes Personales',
    texto: '¿Toma algún medicamento actualmente?',
    tipo: 'textarea',
    requerida: false,
    placeholder: 'Liste los medicamentos que toma actualmente...'
  },
  {
    id: 'alergias',
    seccion: 'Antecedentes Personales',
    texto: '¿Tiene alguna alergia conocida?',
    tipo: 'textarea',
    requerida: false,
    placeholder: 'Mencione alergias a medicamentos, alimentos, etc.'
  },
  
  // Sección: Estilo de Vida
  {
    id: 'alimentacion',
    seccion: 'Estilo de Vida',
    texto: '¿Cómo describiría su alimentación?',
    tipo: 'select',
    requerida: true,
    opciones: ['Muy saludable', 'Saludable', 'Regular', 'Poco saludable', 'Muy poco saludable']
  },
  {
    id: 'horas_sueno',
    seccion: 'Estilo de Vida',
    texto: '¿Cuántas horas duerme en promedio por noche?',
    tipo: 'numero',
    requerida: true,
    placeholder: 'Ej: 7, 8, 6.5'
  },
  {
    id: 'calidad_sueno',
    seccion: 'Estilo de Vida',
    texto: '¿Cómo calificaría la calidad de su sueño?',
    tipo: 'select',
    requerida: true,
    opciones: ['Excelente', 'Buena', 'Regular', 'Mala', 'Muy mala']
  },
  {
    id: 'ejercicio',
    seccion: 'Estilo de Vida',
    texto: '¿Realiza ejercicio físico regularmente?',
    tipo: 'select',
    requerida: true,
    opciones: ['Sí, diariamente', 'Sí, 3-4 veces por semana', 'Sí, ocasionalmente', 'No']
  },
  {
    id: 'nivel_estres',
    seccion: 'Estilo de Vida',
    texto: '¿Cómo calificaría su nivel de estrés?',
    tipo: 'select',
    requerida: true,
    opciones: ['Muy bajo', 'Bajo', 'Moderado', 'Alto', 'Muy alto']
  },
  
  // Sección: Sistema Digestivo
  {
    id: 'digestion',
    seccion: 'Sistema Digestivo',
    texto: '¿Tiene problemas digestivos?',
    tipo: 'select',
    requerida: false,
    opciones: ['Ninguno', 'Ocasionales', 'Frecuentes', 'Constantes']
  },
  {
    id: 'sintomas_digestivos',
    seccion: 'Sistema Digestivo',
    texto: 'Si tiene problemas digestivos, ¿cuáles?',
    tipo: 'checkbox',
    requerida: false,
    opciones: ['Gases', 'Hinchazón', 'Acidez', 'Estreñimiento', 'Diarrea', 'Náuseas', 'Otros']
  },
  
  // Sección: Energía y Estado de Ánimo
  {
    id: 'nivel_energia',
    seccion: 'Energía y Estado de Ánimo',
    texto: '¿Cómo calificaría su nivel de energía durante el día?',
    tipo: 'select',
    requerida: true,
    opciones: ['Muy alto', 'Alto', 'Moderado', 'Bajo', 'Muy bajo']
  },
  {
    id: 'estado_animo',
    seccion: 'Energía y Estado de Ánimo',
    texto: '¿Cómo describiría su estado de ánimo general?',
    tipo: 'select',
    requerida: true,
    opciones: ['Muy positivo', 'Positivo', 'Neutral', 'Negativo', 'Muy negativo']
  },
  
  // Sección: Peso y Metabolismo
  {
    id: 'cambios_peso',
    seccion: 'Peso y Metabolismo',
    texto: '¿Ha experimentado cambios significativos de peso recientemente?',
    tipo: 'select',
    requerida: false,
    opciones: ['No', 'Aumento de peso', 'Pérdida de peso', 'Fluctuaciones']
  },
  {
    id: 'apetito',
    seccion: 'Peso y Metabolismo',
    texto: '¿Cómo describiría su apetito?',
    tipo: 'select',
    requerida: false,
    opciones: ['Normal', 'Aumentado', 'Disminuido', 'Variable']
  },
  
  // Sección: Objetivos
  {
    id: 'objetivos_salud',
    seccion: 'Objetivos',
    texto: '¿Cuáles son sus principales objetivos de salud?',
    tipo: 'textarea',
    requerida: true,
    placeholder: 'Ej: Mejorar energía, perder peso, mejorar digestión, etc.'
  }
];

interface InterrogatorioFormularioProps {
  interrogatorioId?: string;
  onCompletar?: () => void;
  onCancelar?: () => void;
}

const InterrogatorioFormulario = ({ interrogatorioId, onCompletar, onCancelar }: InterrogatorioFormularioProps) => {
  const navigate = useNavigate();
  const { success, error } = useAlert();
  const [interrogatorio, setInterrogatorio] = useState<Anamnesis | null>(null);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, any>>({});
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (interrogatorioId) {
      cargarInterrogatorio();
    } else {
      crearInterrogatorio();
    }
  }, [interrogatorioId]);

  useEffect(() => {
    if (interrogatorio?.respuestas && Object.keys(respuestas).length === 0) {
      // Solo actualizar respuestas si el estado local está vacío (carga inicial)
      setRespuestas(interrogatorio.respuestas);
      // Calcular pregunta actual basada en respuestas solo en la carga inicial
      const primeraSinResponder = PREGUNTAS.findIndex(p => !interrogatorio.respuestas[p.id]);
      if (primeraSinResponder !== -1) {
        setPreguntaActual(primeraSinResponder);
      }
    }
  }, [interrogatorio]);

  const cargarInterrogatorio = async () => {
    if (!interrogatorioId) return;
    
    try {
      setCargando(true);
      const data = await interrogatorioService.obtenerInterrogatorio(interrogatorioId);
      setInterrogatorio(data);
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al cargar el interrogatorio');
    } finally {
      setCargando(false);
    }
  };

  const crearInterrogatorio = async () => {
    try {
      setCargando(true);
      const data = await interrogatorioService.crearInterrogatorio({ tipo: 'primera_vez' });
      setInterrogatorio(data);
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al crear el interrogatorio');
    } finally {
      setCargando(false);
    }
  };

  const guardarRespuesta = (preguntaId: string, respuesta: any) => {
    // Actualizar estado local inmediatamente para que el usuario vea su escritura
    const nuevasRespuestas = {
      ...respuestas,
      [preguntaId]: respuesta
    };
    setRespuestas(nuevasRespuestas);
  };

  const guardarRespuestaEnServidor = async (preguntaId: string) => {
    if (!interrogatorio?._id) return;

    try {
      setGuardando(true);
      const data = await interrogatorioService.actualizarRespuestas(interrogatorio._id, {
        respuestas: respuestas
      });
      setInterrogatorio(data);
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al guardar la respuesta');
    } finally {
      setGuardando(false);
    }
  };

  const siguientePregunta = () => {
    if (preguntaActual < PREGUNTAS.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    }
  };

  const preguntaAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  const completarInterrogatorio = async () => {
    if (!interrogatorio?._id) return;

    try {
      setGuardando(true);
      await interrogatorioService.completarInterrogatorio(interrogatorio._id);
      success('Interrogatorio completado exitosamente. El análisis con IA está siendo generado...');
      
      // Esperar un momento y recargar para obtener el análisis
      setTimeout(async () => {
        try {
          const actualizado = await interrogatorioService.obtenerInterrogatorio(interrogatorio._id);
          setInterrogatorio(actualizado);
        } catch (err) {
          console.error('Error al cargar análisis:', err);
        }
      }, 3000);
      
      if (onCompletar) {
        onCompletar();
      }
    } catch (err: any) {
      error(err.response?.data?.message || 'Error al completar el interrogatorio');
    } finally {
      setGuardando(false);
    }
  };

  const pregunta = PREGUNTAS[preguntaActual];
  const progreso = Math.round(((preguntaActual + 1) / PREGUNTAS.length) * 100);
  const todasRespondidas = PREGUNTAS.every(p => respuestas[p.id] !== undefined && respuestas[p.id] !== '');

  if (cargando) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando interrogatorio...</p>
        </div>
      </div>
    );
  }

  if (!interrogatorio) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Barra de progreso */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progreso: {progreso}%
          </span>
          <span className="text-sm text-gray-500">
            Pregunta {preguntaActual + 1} de {PREGUNTAS.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progreso}%` }}
          ></div>
        </div>
      </div>

      {/* Pregunta actual */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <span className="text-xs font-semibold text-indigo-600 uppercase">
            {pregunta.seccion}
          </span>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {pregunta.texto}
          {pregunta.requerida && <span className="text-red-500 ml-1">*</span>}
        </h2>

        {/* Campo de respuesta según el tipo */}
        <div className="mb-6">
          {pregunta.tipo === 'texto' && (
            <input
              type="text"
              value={respuestas[pregunta.id] || ''}
              onChange={(e) => guardarRespuesta(pregunta.id, e.target.value)}
              placeholder={pregunta.placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}

          {pregunta.tipo === 'textarea' && (
            <textarea
              value={respuestas[pregunta.id] || ''}
              onChange={(e) => guardarRespuesta(pregunta.id, e.target.value)}
              placeholder={pregunta.placeholder}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}

          {pregunta.tipo === 'numero' && (
            <input
              type="number"
              value={respuestas[pregunta.id] || ''}
              onChange={(e) => guardarRespuesta(pregunta.id, e.target.value)}
              placeholder={pregunta.placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}

          {pregunta.tipo === 'select' && pregunta.opciones && (
            <select
              value={respuestas[pregunta.id] || ''}
              onChange={(e) => {
                guardarRespuesta(pregunta.id, e.target.value);
                guardarRespuestaEnServidor(pregunta.id);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Seleccione una opción</option>
              {pregunta.opciones.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          )}

          {pregunta.tipo === 'radio' && pregunta.opciones && (
            <div className="space-y-2">
              {pregunta.opciones.map((opcion) => (
                <label key={opcion} className="flex items-center">
                  <input
                    type="radio"
                    name={pregunta.id}
                    value={opcion}
                    checked={respuestas[pregunta.id] === opcion}
                    onChange={(e) => {
                      guardarRespuesta(pregunta.id, e.target.value);
                      guardarRespuestaEnServidor(pregunta.id);
                    }}
                    className="mr-2"
                  />
                  <span>{opcion}</span>
                </label>
              ))}
            </div>
          )}

          {pregunta.tipo === 'checkbox' && pregunta.opciones && (
            <div className="space-y-2">
              {pregunta.opciones.map((opcion) => (
                <label key={opcion} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={(respuestas[pregunta.id] || []).includes(opcion)}
                    onChange={(e) => {
                      const actuales = respuestas[pregunta.id] || [];
                      const nuevas = e.target.checked
                        ? [...actuales, opcion]
                        : actuales.filter((r: string) => r !== opcion);
                      guardarRespuesta(pregunta.id, nuevas);
                      guardarRespuestaEnServidor(pregunta.id);
                    }}
                    className="mr-2"
                  />
                  <span>{opcion}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {guardando && (
          <div className="text-sm text-gray-500 mb-4">
            Guardando...
          </div>
        )}

        {/* Navegación */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            onClick={preguntaAnterior}
            disabled={preguntaActual === 0}
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Anterior
          </button>

          {preguntaActual < PREGUNTAS.length - 1 ? (
            <button
              onClick={async () => {
                // Guardar respuesta antes de avanzar
                if (interrogatorio?._id && respuestas[pregunta.id]) {
                  await guardarRespuestaEnServidor(pregunta.id);
                }
                siguientePregunta();
              }}
              disabled={pregunta.requerida && !respuestas[pregunta.id]}
              className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={async () => {
                // Guardar respuesta antes de completar
                if (interrogatorio?._id && respuestas[pregunta.id]) {
                  await guardarRespuestaEnServidor(pregunta.id);
                }
                await completarInterrogatorio();
              }}
              disabled={!todasRespondidas || guardando}
              className="flex items-center px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Completar Interrogatorio
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default InterrogatorioFormulario;

