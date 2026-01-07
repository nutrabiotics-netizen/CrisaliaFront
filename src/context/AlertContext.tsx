import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  title?: string;
  duration?: number;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (type: AlertType, message: string, title?: string, duration?: number) => void;
  removeAlert: (id: string) => void;
  success: (message: string, title?: string, duration?: number) => void;
  error: (message: string, title?: string, duration?: number) => void;
  warning: (message: string, title?: string, duration?: number) => void;
  info: (message: string, title?: string, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const showAlert = useCallback(
    (type: AlertType, message: string, title?: string, duration: number = 5000) => {
      const id = `alert-${Date.now()}-${Math.random()}`;
      const newAlert: Alert = {
        id,
        type,
        message,
        title,
        duration,
      };

      setAlerts((prev) => [...prev, newAlert]);

      // Auto-remover después de la duración especificada
      if (duration > 0) {
        setTimeout(() => {
          removeAlert(id);
        }, duration);
      }
    },
    [removeAlert]
  );

  const success = useCallback(
    (message: string, title?: string, duration?: number) => {
      showAlert('success', message, title, duration);
    },
    [showAlert]
  );

  const error = useCallback(
    (message: string, title?: string, duration?: number) => {
      showAlert('error', message, title, duration);
    },
    [showAlert]
  );

  const warning = useCallback(
    (message: string, title?: string, duration?: number) => {
      showAlert('warning', message, title, duration);
    },
    [showAlert]
  );

  const info = useCallback(
    (message: string, title?: string, duration?: number) => {
      showAlert('info', message, title, duration);
    },
    [showAlert]
  );

  const value: AlertContextType = {
    alerts,
    showAlert,
    removeAlert,
    success,
    error,
    warning,
    info,
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert debe usarse dentro de un AlertProvider');
  }
  return context;
}

export { AlertProvider };

