import { useEffect, useState } from 'react';
import { useAlert, Alert } from '../context/AlertContext';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const AlertNotification = () => {
  const { alerts, removeAlert } = useAlert();
  const [visibleAlerts, setVisibleAlerts] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Agregar nuevas alertas al conjunto de visibles con un pequeño delay para animación
    alerts.forEach((alert) => {
      setTimeout(() => {
        setVisibleAlerts((prev) => new Set(prev).add(alert.id));
      }, 10);
    });

    // Remover alertas que ya no existen
    const alertIds = new Set(alerts.map((a) => a.id));
    setVisibleAlerts((prev) => {
      const newSet = new Set<string>();
      prev.forEach((id) => {
        if (alertIds.has(id)) {
          newSet.add(id);
        }
      });
      return newSet;
    });
  }, [alerts]);

  const handleClose = (id: string) => {
    setVisibleAlerts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    setTimeout(() => {
      removeAlert(id);
    }, 300); // Esperar a que termine la animación
  };

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-50/95 to-green-100/95',
          border: 'border-green-500/60',
          iconBg: 'bg-green-500',
          icon: CheckCircleIcon,
          iconColor: 'text-green-600',
          textColor: 'text-gray-900',
          titleColor: 'text-gray-900',
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-50/95 to-red-100/95',
          border: 'border-red-500/60',
          iconBg: 'bg-red-500',
          icon: ExclamationTriangleIcon,
          iconColor: 'text-red-600',
          textColor: 'text-gray-900',
          titleColor: 'text-gray-900',
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-50/95 to-yellow-100/95',
          border: 'border-yellow-500/60',
          iconBg: 'bg-yellow-500',
          icon: ExclamationTriangleIcon,
          iconColor: 'text-yellow-600',
          textColor: 'text-gray-900',
          titleColor: 'text-gray-900',
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-50/95 to-blue-100/95',
          border: 'border-blue-500/60',
          iconBg: 'bg-blue-500',
          icon: InformationCircleIcon,
          iconColor: 'text-blue-600',
          textColor: 'text-gray-900',
          titleColor: 'text-gray-900',
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-50/95 to-gray-100/95',
          border: 'border-gray-500/60',
          iconBg: 'bg-gray-500',
          icon: InformationCircleIcon,
          iconColor: 'text-gray-600',
          textColor: 'text-gray-900',
          titleColor: 'text-gray-900',
        };
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none">
      {alerts.map((alert, index) => {
        const styles = getAlertStyles(alert.type);
        const Icon = styles.icon;
        const isVisible = visibleAlerts.has(alert.id);

        return (
          <div
            key={alert.id}
            className={`
              pointer-events-auto
              backdrop-blur-md
              ${styles.bg}
              border-2 ${styles.border}
              rounded-xl
              p-5
              shadow-xl
              transform
              transition-all
              duration-300
              ease-out
              ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div className="flex items-start gap-3">
              {/* Icono */}
              <div className={`flex-shrink-0 ${styles.iconBg} rounded-lg p-2.5`}>
                <Icon className={`h-6 w-6 text-white`} />
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                {alert.title && (
                  <h4 className={`text-base font-semibold ${styles.titleColor} mb-1.5 leading-tight`}>
                    {alert.title}
                  </h4>
                )}
                <p className={`text-sm ${styles.textColor} leading-relaxed font-medium`}>
                  {alert.message}
                </p>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={() => handleClose(alert.id)}
                className="flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors duration-200 p-1 hover:bg-black/5 rounded-lg"
                aria-label="Cerrar alerta"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Barra de progreso (opcional, para mostrar tiempo restante) */}
            {alert.duration && alert.duration > 0 && (
              <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${styles.iconBg} transition-all ease-linear`}
                  style={{
                    width: '100%',
                    animation: `shrink ${alert.duration}ms linear forwards`,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default AlertNotification;

