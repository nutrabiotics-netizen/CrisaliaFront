// Servicio para manejar tokens temporales de simulación
export interface SimulationToken {
  token: string;
  expiresAt: number;
  patientId: number;
  startTime: number;
}

const SIMULATION_DURATION = 30 * 60 * 1000; // 30 minutos en milisegundos

class SimulationService {
  // Crear token temporal de simulación
  createSimulationToken(patientId: number): SimulationToken {
    const now = Date.now();
    const expiresAt = now + SIMULATION_DURATION;
    const token = `sim-token-${patientId}-${now}`;
    
    const simulationToken: SimulationToken = {
      token,
      expiresAt,
      patientId,
      startTime: now
    };
    
    localStorage.setItem('simulation_token', JSON.stringify(simulationToken));
    localStorage.setItem('simulation_mode', 'true');
    
    return simulationToken;
  }

  // Obtener token de simulación activo
  getSimulationToken(): SimulationToken | null {
    const tokenStr = localStorage.getItem('simulation_token');
    if (!tokenStr) return null;
    
    try {
      const token: SimulationToken = JSON.parse(tokenStr);
      
      // Verificar si el token ha expirado
      if (Date.now() > token.expiresAt) {
        this.clearSimulationToken();
        return null;
      }
      
      return token;
    } catch {
      return null;
    }
  }

  // Verificar si está en modo simulación
  isSimulationMode(): boolean {
    const token = this.getSimulationToken();
    return token !== null && localStorage.getItem('simulation_mode') === 'true';
  }

  // Obtener tiempo restante en milisegundos
  getTimeRemaining(): number {
    const token = this.getSimulationToken();
    if (!token) return 0;
    
    const remaining = token.expiresAt - Date.now();
    return remaining > 0 ? remaining : 0;
  }

  // Limpiar token de simulación
  clearSimulationToken(): void {
    localStorage.removeItem('simulation_token');
    localStorage.removeItem('simulation_mode');
  }

  // Formatear tiempo restante en formato MM:SS
  formatTimeRemaining(): string {
    const remaining = this.getTimeRemaining();
    if (remaining <= 0) return '00:00';
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

export default new SimulationService();

