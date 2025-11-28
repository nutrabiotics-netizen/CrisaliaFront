import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { AuthUser, LoginCredentials } from '../services/authService';
import simulationService from '../services/simulationService';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // Verificar si está en modo simulación
      const isSimulationMode = simulationService.isSimulationMode();
      
      if (isSimulationMode) {
        // Crear usuario temporal para simulación
        const simToken = simulationService.getSimulationToken();
        if (simToken) {
          const tempUser: AuthUser = {
            _id: 'sim-' + simToken.patientId,
            email: 'simulacion@crisalia.com',
            nombre: 'Médico',
            apellido: 'Simulación',
            especialidad: 'Medicina Funcional',
            numeroColegiatura: 'SIM-' + simToken.patientId,
            telefono: '+57 300 000 0000',
            role: 'medico'
          };
          setUser(tempUser);
          setLoading(false);
          return;
        }
      }

      const token = authService.getToken();
      const storedUser = authService.getUser();

      if (token && storedUser) {
        try {
          // Con autenticación hardcodeada, simplemente usar el usuario almacenado
          setUser(storedUser);
        } catch (error) {
          // Token inválido, limpiar
          authService.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      // La respuesta tiene la estructura { success, message, data: { token, user } }
      authService.setToken(response.data.token);
      authService.setUser(response.data.user);
      setUser(response.data.user);
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    // Limpiar también el modo simulación si existe
    simulationService.clearSimulationToken();
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

export { AuthProvider };

