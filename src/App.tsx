import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import ProtectedRoute from './components/ProtectedRoute';
import AlertNotification from './components/AlertNotification';
import Login from './pages/auth/Login';
import Welcome from './pages/auth/Welcome';

// Módulos del Médico
import MedicoDashboard from './pages/medico/Dashboard';
import PerfilInscripcion from './pages/medico/perfil/Inscripcion';
import PerfilGeneral from './pages/medico/perfil/General';
import PerfilSeguimiento from './pages/medico/perfil/Seguimiento';
import RecopilacionInformacion from './pages/medico/perfil/RecopilacionInformacion';
import Personalizacion from './pages/medico/perfil/Personalizacion';
import MedicoAgendamiento from './pages/medico/agendamiento/Agendamiento';
import MedicoAnamnesis from './pages/medico/anamnesis/Anamnesis';
import MedicoPago from './pages/medico/pago/Pago';
import MedicoConsulta from './pages/medico/consulta/Consulta';
import MedicoIAEntrenada from './pages/medico/ia-entrenada/IAEntrenada';
import MedicoSeguimientoIA from './pages/medico/seguimiento/SeguimientoIA';
import MedicoAdministrativo from './pages/medico/administrativo/Administrativo';

// Módulos del Paciente
import PacienteDashboard from './pages/paciente/Dashboard';
import PacientePerfil from './pages/paciente/perfil/Perfil';
import PacienteAgendamiento from './pages/paciente/agendamiento/Agendamiento';
import PacienteAnamnesis from './pages/paciente/anamnesis/Anamnesis';
import PacientePago from './pages/paciente/pago/Pago';
import PacienteConsulta from './pages/paciente/consulta/Consulta';
import PacienteIAEntrenada from './pages/paciente/ia-entrenada/IAEntrenada';
import PacienteSeguimientoIA from './pages/paciente/seguimiento/SeguimientoIA';
import PacienteAdministrativo from './pages/paciente/administrativo/Administrativo';

// Módulos del Administrativo
import AdministrativoDashboard from './pages/administrativo/Dashboard';
import AdministrativoIngreso from './pages/administrativo/ingreso/Ingreso';
import AdministrativoTerceros from './pages/administrativo/terceros/Terceros';
import AdministrativoGestionAgenda from './pages/administrativo/gestion-agenda/GestionAgenda';
import AdministrativoVisionEstadisticas from './pages/administrativo/vision-estadisticas/VisionEstadisticas';
import AdministrativoContingencia from './pages/administrativo/contingencia/Contingencia';
import AdministrativoExperienciaUsuarios from './pages/administrativo/experiencia-usuarios/ExperienciaUsuarios';
import AdministrativoConexionAlivia from './pages/administrativo/conexion-alivia/ConexionAlivia';
import AdministrativoVisitaPaciente from './pages/administrativo/visita-paciente/VisitaPaciente';
import AdministrativoRipsFacturacion from './pages/administrativo/rips-facturacion/RipsFacturacion';

import { HistoriaClinicaProvider } from './context/HistoriaClinicaContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <HistoriaClinicaProvider>
            <AlertNotification />
            <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Médico */}
          <Route
            path="/medico/dashboard"
            element={
              <ProtectedRoute requiredRole="medico">
                <MedicoDashboard />
              </ProtectedRoute>
            }
          />

          {/* Dashboard Paciente */}
          <Route
            path="/paciente/dashboard"
            element={
              <ProtectedRoute requiredRole="paciente">
                <PacienteDashboard />
              </ProtectedRoute>
            }
          />

          {/* Perfil Médico */}
          <Route
            path="/medico/perfil/inscripcion"
            element={
              <ProtectedRoute requiredRole="medico">
                <PerfilInscripcion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/perfil/general"
            element={
              <ProtectedRoute requiredRole="medico">
                <PerfilGeneral />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/perfil/seguimiento"
            element={
              <ProtectedRoute requiredRole="medico">
                <PerfilSeguimiento />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/perfil/recopilacion"
            element={
              <ProtectedRoute requiredRole="medico">
                <RecopilacionInformacion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/perfil/personalizacion"
            element={
              <ProtectedRoute requiredRole="medico">
                <Personalizacion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/perfil"
            element={<Navigate to="/medico/perfil/general" replace />}
          />

          {/* Otros Módulos Médico */}
          <Route
            path="/medico/agendamiento"
            element={
              <ProtectedRoute requiredRole="medico">
                <MedicoAgendamiento />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/anamnesis"
            element={
              <ProtectedRoute requiredRole="medico">
                <MedicoAnamnesis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/pago"
            element={
              <ProtectedRoute requiredRole="medico">
                <MedicoPago />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/consulta/:citaId"
            element={
              <ProtectedRoute requiredRole="medico">
                <MedicoConsulta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/ia-entrenada"
            element={
              <ProtectedRoute requiredRole="medico">
                <MedicoIAEntrenada />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/seguimiento-ia"
            element={
              <ProtectedRoute requiredRole="medico">
                <MedicoSeguimientoIA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/administrativo"
            element={
              <ProtectedRoute requiredRole="medico">
                <MedicoAdministrativo />
              </ProtectedRoute>
            }
          />

          {/* Módulos Paciente */}
          <Route
            path="/paciente/perfil"
            element={
              <ProtectedRoute requiredRole="paciente">
                <PacientePerfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/agendamiento"
            element={
              <ProtectedRoute requiredRole="paciente">
                <PacienteAgendamiento />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/anamnesis"
            element={
              <ProtectedRoute requiredRole="paciente">
                <PacienteAnamnesis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/pago"
            element={
              <ProtectedRoute requiredRole="paciente">
                <PacientePago />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/consulta"
            element={
              <ProtectedRoute requiredRole="paciente">
                <PacienteConsulta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/ia-entrenada"
            element={
              <ProtectedRoute requiredRole="paciente">
                <PacienteIAEntrenada />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/seguimiento-ia"
            element={
              <ProtectedRoute requiredRole="paciente">
                <PacienteSeguimientoIA />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/administrativo"
            element={
              <ProtectedRoute requiredRole="paciente">
                <PacienteAdministrativo />
              </ProtectedRoute>
            }
          />

          {/* Módulos Administrativo */}
          <Route
            path="/administrativo/dashboard"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrativo/ingreso"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoIngreso />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrativo/terceros"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoTerceros />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrativo/gestion-agenda"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoGestionAgenda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrativo/vision-estadisticas"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoVisionEstadisticas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrativo/contingencia"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoContingencia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrativo/experiencia-usuarios"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoExperienciaUsuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrativo/conexion-alivia"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoConexionAlivia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrativo/visita-paciente"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoVisitaPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administrativo/rips-facturacion"
            element={
              <ProtectedRoute requiredRole="administrativo">
                <AdministrativoRipsFacturacion />
              </ProtectedRoute>
            }
          />

          {/* Welcome solo para médicos */}
          <Route path="/medico/welcome" element={<Welcome />} />
          
          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
          </HistoriaClinicaProvider>
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
