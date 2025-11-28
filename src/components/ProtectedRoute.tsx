import { ReactNode } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import simulationService from '../services/simulationService';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'medico' | 'paciente' | 'administrativo';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const isSimulationMode = simulationService.isSimulationMode() || searchParams.get('simulation') === 'true';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Permitir acceso en modo simulación para médicos
  if (isSimulationMode && requiredRole === 'medico') {
    return <>{children}</>;
  }

  if (!isAuthenticated && !isSimulationMode) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole && !isSimulationMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">No autorizado</h1>
          <p className="mt-2 text-gray-600">No tienes permisos para acceder a esta página</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

